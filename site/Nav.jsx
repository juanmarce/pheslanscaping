/* Sticky top navigation + Hero */

function Nav({ onQuote }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const root = document.getElementById('site');
    const onScroll = () => setScrolled((root ? root.scrollTop : window.scrollY) > 30);
    const target = root || window;
    target.addEventListener('scroll', onScroll);
    return () => target.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['Services', 'Our Work', 'About', 'Reviews'];
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView ? el.scrollIntoView({ behavior: 'smooth', block: 'start' }) : null;
  };
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(246,242,233,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background var(--dur), border-color var(--dur)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {links.map(l => (
            <a key={l} onClick={() => go(l.replace(' ', '-').toLowerCase())} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14.5,
              color: 'var(--fg-2)', cursor: 'pointer', textDecoration: 'none',
            }}>{l}</a>
          ))}
          <a onClick={onQuote} style={{
            fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14.5,
            color: 'var(--fg-2)', cursor: 'pointer', textDecoration: 'none',
          }}>Free quote</a>
          <Button size="sm" iconBefore="phone" href={PHONE_TEL}>{PHONE_DISPLAY}</Button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onQuote }) {
  return (
    <section style={{ background: 'var(--forest)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 75% 10%, rgba(62,140,87,0.45), transparent 60%)' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 32px 88px', position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center' }}>
        <div>
          <Eyebrow onDark>Serving {SERVICE_AREA}</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(38px,4.4vw,62px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--cream)', margin: '18px 0 0', textWrap: 'balance', maxWidth: 600 }}>
            A yard you’re proud<br />to come home to.
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 19, lineHeight: 1.55, color: 'var(--fg-on-dark-2)', maxWidth: 480, margin: '22px 0 0' }}>
            Design, hardscaping, irrigation, and lawn care for North Alabama homeowners — done right the first time.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
            <Button size="lg" iconBefore="phone" href={PHONE_TEL}>Call {PHONE_DISPLAY}</Button>
            <Button size="lg" variant="ghostLight" onClick={() => { const e = document.getElementById('our-work'); if (e && e.scrollIntoView) e.scrollIntoView({ behavior: 'smooth' }); }}>See our work</Button>
          </div>
          <div style={{ display: 'flex', gap: 26, marginTop: 38 }}>
            {[['badge-check', 'Licensed & insured'], ['leaf', 'Locally owned'], ['calendar-check', 'Free estimates']].map(([ic, tx]) => (
              <div key={tx} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--sage-2)', fontWeight: 600, fontSize: 13.5 }}>
                <Icon name={ic} size={17} color="var(--sage-2)" /> {tx}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: 14 }}>
          <Photo label="Paver patio" icon="layout-grid" h={210} tone={1} style={{ gridColumn: '1 / 2' }} />
          <Photo label="Fresh sod" icon="sprout" h={210} tone={2} />
          <Photo label="Backyard transformation" icon="trees" h={150} tone={0} style={{ gridColumn: '1 / 3' }} />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero });
