# Phes Landscaping

Full-service residential & commercial landscaping.

## Services

Lay sod · Planting · Paver floors · Irrigation (install & repair) · Mulch ·
Trimming · Pressure washing · Drainage · Outdoor lighting

## Repo layout

| Path | What it is |
| --- | --- |
| `.claude/agents/phes-landscaping.md` | The Phes Landscaping business-assistant agent (quotes, scheduling, customer emails, invoices). |
| `site/` | The marketing website. `index.html` is the standalone build; the `.jsx` files are the source components. |
| `site/colors_and_type.css` | Site colors and typography. |

## Using the agent

In Claude Code, address the agent with `@phes-landscaping` or just ask a
business question (e.g. *"write a quote for a 300 sq ft mulch job for the Garcia
property"*). It knows the full service list and helps with quotes, scheduling,
customer communication, and invoices.
