/* About strip + Testimonials */

function About() {
  const stats = [['Free', 'On-site estimates'], ['Licensed', '& fully insured'], ['Local', 'Family-run crew']];
  return (
    <section id="about" style={{ background: 'var(--cream)', padding: '88px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <Photo icon="trees" h={400} tone={1} label="The Phes crew" />
        <div>
          <Eyebrow>About Phes</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(28px,3vw,40px)', lineHeight: 1.12, letterSpacing: '-0.015em', color: 'var(--fg)', margin: '14px 0 0' }}>
            A local crew that treats your yard like our own.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.6, color: 'var(--fg-2)', margin: '16px 0 0' }}>
            Phes Landscaping is a family-run team based right here in Huntsville. We handle every part of the job ourselves — no subcontractors, no surprises. You get one crew, a clear plan, and a job site we leave spotless.
          </p>
          <div style={{ display: 'flex', gap: 36, marginTop: 30 }}>
            {stats.map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 38, color: 'var(--fern)', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 13.5, color: 'var(--fg-3)', marginTop: 6, fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30 }}>
            <Button size="lg" iconBefore="phone" href={PHONE_TEL}>Call {PHONE_DISPLAY}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { q: 'Phes redid our whole backyard — new sod, irrigation, and a paver patio. The crew was on time every day and left it spotless.', n: 'Dana M.', loc: 'Hampton Cove, AL', i: 'DM' },
  { q: 'Honest quote, no upselling, and the lawn looks incredible. Our neighbors keep asking who did it.', n: 'Robert T.', loc: 'Madison, AL', i: 'RT' },
  { q: 'They designed beds that finally make sense with our slope. Three seasons in and everything still looks great.', n: 'Alicia G.', loc: 'Huntsville, AL', i: 'AG' },
];

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
      {[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" size={16} color="var(--harvest)" />)}
    </div>
  );
}

function Testimonials() {
  return (
    <section id="reviews" style={{ background: 'var(--pine)', padding: '88px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <Eyebrow onDark>Reviews</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(28px,3vw,42px)', lineHeight: 1.12, letterSpacing: '-0.015em', color: 'var(--cream)', margin: '14px 0 0' }}>
            Homeowners who’d hire us again.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, marginTop: 44 }}>
          {REVIEWS.map(r => (
            <div key={r.n} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--r-lg)', padding: 26 }}>
              <Stars />
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 19, lineHeight: 1.45, color: 'var(--cream)', margin: 0 }}>“{r.q}”</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#8DA65A,#2E6B43)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>{r.i}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--cream)' }}>{r.n}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--fg-on-dark-2)' }}>{r.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About, Testimonials });
