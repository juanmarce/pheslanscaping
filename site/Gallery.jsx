/* Gallery — filterable, with an interactive before/after slider */

function BeforeAfter() {
  const [pos, setPos] = React.useState(50);
  const ref = React.useRef(null);
  const drag = React.useRef(false);
  const move = (clientX) => {
    const r = ref.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      ref={ref}
      onMouseDown={(e) => { drag.current = true; move(e.clientX); }}
      onMouseMove={(e) => drag.current && move(e.clientX)}
      onMouseUp={() => (drag.current = false)}
      onMouseLeave={() => (drag.current = false)}
      style={{ position: 'relative', height: 420, borderRadius: 'var(--r-xl)', overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none', boxShadow: 'var(--shadow-lg)' }}>
      <Photo icon="sprout" h={420} radius="0" tone={2} label="After" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', inset: 0, width: pos + '%', overflow: 'hidden' }}>
        <Photo icon="image" h={420} radius="0" tone={3} label="Before" style={{ position: 'absolute', inset: 0, width: ref.current ? ref.current.getBoundingClientRect().width : 900 }} />
      </div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `calc(${pos}% - 1.5px)`, width: 3, background: '#fff', boxShadow: '0 0 8px rgba(0,0,0,0.3)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 42, height: 42, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)', color: 'var(--fern)' }}>
          <Icon name="move-horizontal" size={20} />
        </div>
      </div>
    </div>
  );
}

const FILTERS = ['All', 'Pavers', 'Sod', 'Irrigation', 'Mulch'];
const PROJECTS = [
  { t: 'Hampton Cove patio', f: 'Pavers', icon: 'layout-grid', tone: 1 },
  { t: 'Full sod replacement', f: 'Sod', icon: 'sprout', tone: 2 },
  { t: 'Drip irrigation zone', f: 'Irrigation', icon: 'droplets', tone: 0 },
  { t: 'Front bed refresh', f: 'Mulch', icon: 'layers', tone: 3 },
  { t: 'Stone walkway', f: 'Pavers', icon: 'layout-grid', tone: 0 },
  { t: 'Backyard regrade', f: 'Sod', icon: 'trees', tone: 2 },
];

function Gallery() {
  const [filter, setFilter] = React.useState('All');
  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.f === filter);
  return (
    <section id="our-work" style={{ background: 'var(--wheat)', padding: '88px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ maxWidth: 560 }}>
            <Eyebrow>Our work</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(30px,3.4vw,44px)', lineHeight: 1.1, letterSpacing: '-0.015em', color: 'var(--fg)', margin: '14px 0 0' }}>
              Drag to see the difference.
            </h2>
          </div>
        </div>
        <div style={{ marginTop: 28 }}><BeforeAfter /></div>

        <div style={{ display: 'flex', gap: 10, marginTop: 40, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 600,
              padding: '8px 16px', borderRadius: 'var(--r-pill)', cursor: 'pointer',
              border: '1.5px solid ' + (filter === f ? 'var(--fern)' : 'var(--border-strong)'),
              background: filter === f ? 'var(--fern)' : '#fff',
              color: filter === f ? '#fff' : 'var(--fg-2)', transition: 'all var(--dur-fast)',
            }}>{f}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 22 }}>
          {shown.map(p => (
            <div key={p.t}>
              <Photo icon={p.icon} h={200} tone={p.tone} />
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--fg)', marginTop: 10 }}>{p.t}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>{p.f}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Gallery });
