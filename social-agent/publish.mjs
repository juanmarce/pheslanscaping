#!/usr/bin/env node
/**
 * Phes Landscaping — social media publisher.
 *
 * Reads pending posts from content/queue/, publishes the ones whose date is
 * due to Facebook (and Instagram when the post has an image), then marks
 * them as published so the workflow can commit the updated state.
 *
 * Required environment variables:
 *   META_ACCESS_TOKEN  Page access token (needs pages_manage_posts; add
 *                      instagram_content_publish for Instagram).
 *   FB_PAGE_ID         Facebook Page ID.
 *   IG_USER_ID         Instagram Business account ID (optional — skip to
 *                      publish only to Facebook).
 *
 * Optional:
 *   DRY_RUN=1          Print what would be published without calling the API.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GRAPH = 'https://graph.facebook.com/v21.0';
const QUEUE_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'content', 'queue');

const TOKEN = process.env.META_ACCESS_TOKEN;
const PAGE_ID = process.env.FB_PAGE_ID;
const IG_ID = process.env.IG_USER_ID;
const DRY_RUN = process.env.DRY_RUN === '1';

if (!DRY_RUN && (!TOKEN || !PAGE_ID)) {
  console.error('Missing META_ACCESS_TOKEN or FB_PAGE_ID. Set DRY_RUN=1 to test without credentials.');
  process.exit(1);
}

// "Today" in the business's timezone (Huntsville, AL).
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());

async function graphPost(endpoint, params) {
  const body = new URLSearchParams({ ...params, access_token: TOKEN });
  const res = await fetch(`${GRAPH}/${endpoint}`, { method: 'POST', body });
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(`Graph API ${endpoint} failed: ${JSON.stringify(json.error ?? json)}`);
  }
  return json;
}

function buildCaption(post) {
  const tags = (post.hashtags ?? []).join(' ');
  return tags ? `${post.message}\n\n${tags}` : post.message;
}

async function publishFacebook(post) {
  const caption = buildCaption(post);
  if (post.image_url) {
    return graphPost(`${PAGE_ID}/photos`, { url: post.image_url, caption });
  }
  return graphPost(`${PAGE_ID}/feed`, { message: caption });
}

async function publishInstagram(post) {
  if (!IG_ID) throw new Error('IG_USER_ID not set');
  if (!post.image_url) throw new Error('Instagram requires image_url');
  const caption = buildCaption(post);
  const container = await graphPost(`${IG_ID}/media`, { image_url: post.image_url, caption });
  return graphPost(`${IG_ID}/media_publish`, { creation_id: container.id });
}

const files = (await readdir(QUEUE_DIR)).filter(f => f.endsWith('.json')).sort();
let published = 0;

for (const file of files) {
  const filePath = path.join(QUEUE_DIR, file);
  const post = JSON.parse(await readFile(filePath, 'utf8'));

  if (post.status !== 'pending' || post.date > today) continue;

  console.log(`\nDue post: ${file} (${post.date})`);
  const results = {};
  const platforms = post.platforms ?? ['facebook'];

  for (const platform of platforms) {
    if (platform === 'instagram' && !post.image_url) {
      console.log('  instagram: skipped (no image_url)');
      results.instagram = 'skipped: no image';
      continue;
    }
    if (platform === 'instagram' && !IG_ID) {
      console.log('  instagram: skipped (IG_USER_ID not configured)');
      results.instagram = 'skipped: not configured';
      continue;
    }
    if (DRY_RUN) {
      console.log(`  ${platform}: DRY RUN — would publish:\n${buildCaption(post).replace(/^/gm, '    ')}`);
      continue;
    }
    try {
      const res = platform === 'instagram' ? await publishInstagram(post) : await publishFacebook(post);
      results[platform] = res.id ?? res.post_id;
      console.log(`  ${platform}: published (id ${results[platform]})`);
    } catch (err) {
      results[platform] = `error: ${err.message}`;
      console.error(`  ${platform}: FAILED — ${err.message}`);
      process.exitCode = 1;
    }
  }

  if (!DRY_RUN) {
    const anySuccess = platforms.some(p => results[p] && !String(results[p]).startsWith('error'));
    if (anySuccess) {
      post.status = 'published';
      post.published_at = new Date().toISOString();
      post.results = results;
      await writeFile(filePath, JSON.stringify(post, null, 2) + '\n');
      published++;
    }
  }
}

console.log(DRY_RUN ? '\nDry run complete.' : `\nDone. ${published} post(s) published.`);
