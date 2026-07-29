/* Shared primitives for the Phes Landscaping website kit */

/* Real business contact — Phes Landscaping, Huntsville AL */
const PHONE_DISPLAY = '(423) 681-9742';
const PHONE_TEL = 'tel:+14236819742';
const SERVICE_AREA = 'Huntsville, Madison, Athens & Owens Cross Roads';

function Icon({ name, size = 20, color, stroke = 1.75, style = {} }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({ attrs: { width: size, height: size, 'stroke-width': stroke } });
    }
  }, [name, size, stroke]);
  return <span ref={ref} style={{ display: 'inline-flex', color, ...style }} />;
}

/* Photo placeholder — stands in for Phes's real project photos.
   Soft green gradient + icon + label so it never looks broken. */
function Photo({ label, icon = 'image', h = 240, radius = 'var(--r-lg)', tone = 0, style = {} }) {
  const tones = [
    'linear-gradient(135deg,#8DA65A 0%,#2E6B43 70%)',
    'linear-gradient(135deg,#3E8C57 0%,#1E3D2A 75%)',
    'linear-gradient(135deg,#B6C68C 0%,#5A7A3B 80%)',
    'linear-gradient(135deg,#D8C8A8 0%,#A8895A 85%)',
  ];
  return (
    <div style={{
      height: h, borderRadius: radius, background: tones[tone % tones.length],
      position: 'relative', overflow: 'hidden', display: 'flex',
      alignItems: 'flex-end', ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', opacity: 0.35, color: '#fff',
      }}>
        <Icon name={icon} size={54} stroke={1.4} />
      </div>
      {label && (
        <span style={{
          position: 'relative', margin: 12, fontSize: 11, fontWeight: 700,
          letterSpacing: '0.05em', textTransform: 'uppercase',
          background: 'rgba(255,255,255,0.88)', color: 'var(--forest)',
          padding: '4px 9px', borderRadius: 'var(--r-xs)',
        }}>{label}</span>
      )}
    </div>
  );
}

function Button({ children, variant = 'primary', size = 'md', icon, iconBefore, onClick, href, style = {} }) {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  const base = {
    fontFamily: 'var(--font-sans)', fontWeight: 700, border: 'none',
    borderRadius: 'var(--r-pill)', cursor: 'pointer', display: 'inline-flex',
    alignItems: 'center', gap: 8, whiteSpace: 'nowrap', textDecoration: 'none', lineHeight: 1,
    transition: 'background var(--dur-fast), transform var(--dur-fast)',
    fontSize: size === 'lg' ? 16 : size === 'sm' ? 13 : 15,
    padding: size === 'lg' ? '15px 30px' : size === 'sm' ? '9px 16px' : '12px 24px',
  };
  const variants = {
    primary: { background: p ? 'var(--pine)' : h ? 'var(--leaf)' : 'var(--fern)', color: '#fff', boxShadow: 'var(--shadow-sm)', transform: p ? 'translateY(1px)' : 'none' },
    secondary: { background: h ? '#cdbb96' : 'var(--sand)', color: 'var(--forest)' },
    outline: { background: h ? 'rgba(46,107,67,0.06)' : 'transparent', color: 'var(--fern)', border: '1.5px solid var(--fern)' },
    ghostLight: { background: h ? 'rgba(255,255,255,0.12)' : 'transparent', color: 'var(--cream)', border: '1.5px solid rgba(255,255,255,0.4)' },
    accent: { background: h ? '#b8791f' : 'var(--harvest)', color: '#fff', boxShadow: 'var(--shadow-sm)', transform: p ? 'translateY(1px)' : 'none' },
  };
  const iconSize = size === 'lg' ? 18 : 16;
  const inner = (<>
    {iconBefore && <Icon name={iconBefore} size={iconSize} />}
    {children}
    {icon && <Icon name={icon} size={iconSize} />}
  </>);
  const handlers = {
    onMouseEnter: () => setH(true), onMouseLeave: () => { setH(false); setP(false); },
    onMouseDown: () => setP(true), onMouseUp: () => setP(false),
    style: { ...base, ...variants[variant], ...style },
  };
  if (href) {
    return <a href={href} onClick={onClick} {...handlers}>{inner}</a>;
  }
  return <button onClick={onClick} {...handlers}>{inner}</button>;
}

function Eyebrow({ children, onDark }) {
  return <div style={{
    fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12.5,
    letterSpacing: 'var(--track-label)', textTransform: 'uppercase',
    color: onDark ? 'var(--sage-2)' : 'var(--fern)',
  }}>{children}</div>;
}

function Logo({ onDark, size = 'md' }) {
  const markSize = size === 'lg' ? 34 : 26;
  const labSize = size === 'lg' ? 11 : 9.5;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 11 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: markSize, letterSpacing: '-0.02em', color: onDark ? 'var(--cream)' : 'var(--forest)' }}>Phes</span>
      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: labSize, letterSpacing: '0.3em', textTransform: 'uppercase', color: onDark ? 'var(--sage-2)' : 'var(--fern)' }}>Landscaping</span>
    </div>
  );
}

Object.assign(window, { Icon, Photo, Button, Eyebrow, Logo, PHONE_DISPLAY, PHONE_TEL, SERVICE_AREA });
