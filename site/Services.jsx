/* Services grid */

const SERVICES = [
  { icon: 'sprout', title: 'Sod Installation', tone: 2, copy: 'Fresh, healthy sod graded and laid for a lawn that takes root fast and looks finished day one.' },
  { icon: 'flower-2', title: 'Planting', tone: 0, copy: 'Trees, shrubs, and flower beds chosen and planted to thrive in your yard for years to come.' },
  { icon: 'layout-grid', title: 'Paver Patios & Walkways', tone: 1, copy: 'Custom brick and stone surfaces built to drain right and last for decades.' },
  { icon: 'droplets', title: 'Irrigation — Install & Repair', tone: 0, copy: 'Efficient sprinkler design, installs, and fast repairs that keep every zone green.' },
  { icon: 'layers', title: 'Mulch & Bed Work', tone: 3, copy: 'Clean-edged beds and fresh mulch that lock in moisture and keep your yard sharp all season.' },
  { icon: 'scissors', title: 'Trimming & Pruning', tone: 2, copy: 'Shaped hedges, pruned shrubs, and tidy cleanup from a crew that shows up on schedule.' },
  { icon: 'spray-can', title: 'Pressure Washing', tone: 1, copy: 'Driveways, patios, and walkways blasted clean — years of grime gone in an afternoon.' },
  { icon: 'waves', title: 'Drainage Solutions', tone: 0, copy: 'French drains, regrading, and downspout routing that send standing water away for good.' },
  { icon: 'lightbulb', title: 'Outdoor Lighting', tone: 3, copy: 'Path and landscape lighting that makes your property safer — and stunning after dark.' },
];

function ServiceCard({ s }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-3px)' : 'none',
        transition: 'transform var(--dur), box-shadow var(--dur)',
      }}>
      <div style={{ position: 'relative' }}>
        <Photo icon={s.icon} h={132} radius="0" tone={s.tone} />
        <div style={{
          position: 'absolute', bottom: -20, right: 18, width: 44, height: 44,
          borderRadius: '50%', background: '#fff', display: 'flex',
          alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)', color: 'var(--fern)',
        }}><Icon name={s.icon} size={21} /></div>
      </div>
      <div style={{ padding: '26px 20px 22px' }}>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18.5, color: 'var(--fg)', margin: 0 }}>{s.title}</h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.55, color: 'var(--fg-2)', margin: '8px 0 0' }}>{s.copy}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, color: 'var(--fern)', fontWeight: 700, fontSize: 13.5, cursor: 'pointer' }}>
          Learn more <Icon name="arrow-right" size={15} />
        </div>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" style={{ background: 'var(--cream)', padding: '88px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 620 }}>
          <Eyebrow>What we do</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(30px,3.4vw,44px)', lineHeight: 1.1, letterSpacing: '-0.015em', color: 'var(--fg)', margin: '14px 0 0' }}>
            Full-service landscaping, start to finish.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, lineHeight: 1.55, color: 'var(--fg-2)', margin: '14px 0 0' }}>
            From the first plan to the last cut of the season — one local crew handles your whole yard.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, marginTop: 44 }}>
          {SERVICES.map(s => <ServiceCard key={s.title} s={s} />)}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Services });
