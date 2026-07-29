/* Quote form (contact) + Footer */

function Field({ label, children, error }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 700, color: 'var(--fg-2)', marginBottom: 6 }}>{label}</span>
      {children}
      {error && <span style={{ display: 'block', fontSize: 11.5, color: 'var(--error)', marginTop: 5, fontWeight: 600 }}>{error}</span>}
    </label>
  );
}

const fieldStyle = (err, focus) => ({
  width: '100%', fontFamily: 'var(--font-sans)', fontSize: 15,
  padding: '12px 14px', borderRadius: 'var(--r-md)', background: '#fff', color: 'var(--fg)',
  border: '1.5px solid ' + (err ? 'var(--error)' : focus ? 'var(--fern)' : 'var(--border-strong)'),
  boxShadow: focus && !err ? '0 0 0 3px var(--ring)' : 'none', outline: 'none',
  transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
});

function QuoteForm() {
  const [data, setData] = React.useState({ name: '', email: '', zip: '', service: 'Paver patio & walkways', notes: '' });
  const [focus, setFocus] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const submit = () => {
    const e = {};
    if (!data.name.trim()) e.name = 'Tell us your name.';
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) e.email = 'Enter a valid email.';
    if (!/^\d{5}$/.test(data.zip)) e.zip = 'Enter a 5-digit ZIP.';
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  return (
    <section id="quote" style={{ background: 'var(--forest)', padding: '88px 32px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <Eyebrow onDark>Free estimate</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(30px,3.2vw,46px)', lineHeight: 1.08, letterSpacing: '-0.015em', color: 'var(--cream)', margin: '14px 0 0' }}>
            Let’s plan your yard.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.6, color: 'var(--fg-on-dark-2)', margin: '16px 0 0' }}>
            The fastest way to get started is a quick call — we’ll answer your questions and set up a free on-site estimate. Prefer to write? Send the form and we’ll get back within one business day.
          </p>
          <div style={{ marginTop: 24 }}>
            <Button size="lg" variant="accent" iconBefore="phone" href={PHONE_TEL}>Call {PHONE_DISPLAY}</Button>
          </div>
          <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['phone', PHONE_DISPLAY], ['map-pin', '3515 Conger Rd SW, Huntsville, AL 35805'], ['clock', 'Mon–Sat · 7am–6pm']].map(([ic, tx]) => (
              <div key={tx} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--sage-2)', fontSize: 14.5, fontWeight: 600 }}>
                <Icon name={ic} size={17} color="var(--sage-2)" /> <span style={{ color: 'var(--cream)' }}>{tx}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--paper)', borderRadius: 'var(--r-xl)', padding: 30, boxShadow: 'var(--shadow-lg)' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', color: 'var(--success)' }}>
                <Icon name="check" size={30} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26, color: 'var(--fg)', margin: 0 }}>Thanks, {data.name.split(' ')[0]}!</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--fg-2)', margin: '10px 0 0' }}>We’ll reach out within one business day to set up your free estimate.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="Full name" error={errors.name}>
                  <input style={fieldStyle(errors.name, focus === 'name')} placeholder="Jane Homeowner"
                    value={data.name} onChange={e => set('name', e.target.value)}
                    onFocus={() => setFocus('name')} onBlur={() => setFocus('')} />
                </Field>
                <Field label="ZIP code" error={errors.zip}>
                  <input style={fieldStyle(errors.zip, focus === 'zip')} placeholder="35805"
                    value={data.zip} onChange={e => set('zip', e.target.value)}
                    onFocus={() => setFocus('zip')} onBlur={() => setFocus('')} />
                </Field>
              </div>
              <Field label="Email address" error={errors.email}>
                <input style={fieldStyle(errors.email, focus === 'email')} placeholder="jane@email.com"
                  value={data.email} onChange={e => set('email', e.target.value)}
                  onFocus={() => setFocus('email')} onBlur={() => setFocus('')} />
              </Field>
              <Field label="Service needed">
                <select style={{ ...fieldStyle(false, focus === 'service'), appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235A645B' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                  value={data.service} onChange={e => set('service', e.target.value)}
                  onFocus={() => setFocus('service')} onBlur={() => setFocus('')}>
                  {['Paver patio & walkways', 'Irrigation system', 'Sod & grass install', 'Mulch & bed work', 'Landscape design', 'Lawn maintenance'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Project details">
                <textarea rows={3} style={{ ...fieldStyle(false, focus === 'notes'), resize: 'vertical' }} placeholder="Tell us what you have in mind…"
                  value={data.notes} onChange={e => set('notes', e.target.value)}
                  onFocus={() => setFocus('notes')} onBlur={() => setFocus('')} />
              </Field>
              <Button size="lg" onClick={submit} style={{ justifyContent: 'center', width: '100%' }}>Request my free quote</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    ['Services', ['Paver patios', 'Irrigation', 'Sod install', 'Mulch & beds', 'Maintenance']],
    ['Company', ['About', 'Our work', 'Reviews', 'Service area', 'Careers']],
  ];
  return (
    <footer style={{ background: 'var(--forest)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '56px 32px 36px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <Logo onDark size="lg" />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: 'var(--fg-on-dark-2)', margin: '16px 0 0', maxWidth: 260 }}>
            Residential landscaping, hardscaping, and lawn care for Huntsville, Madison, Athens &amp; Owens Cross Roads.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            {[
              ['Instagram', 'M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.83s0 3.57-.07 4.83c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.83.07s-3.57 0-4.83-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.57 2.2 15.19 2.2 12s0-3.57.07-4.83c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.43 2.21 8.81 2.2 12 2.2Zm0 1.62c-3.14 0-3.51 0-4.75.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.75s0 3.51.07 4.75c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.75.07s3.51 0 4.75-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.75s0-3.51-.07-4.75c-.04-.9-.19-1.39-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.75-.07Zm0 2.76a5.42 5.42 0 1 1 0 10.84 5.42 5.42 0 0 1 0-10.84Zm0 1.62a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm5.6-2.9a1.27 1.27 0 1 1 0 2.54 1.27 1.27 0 0 1 0-2.54Z'],
              ['Facebook', 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z'],
            ].map(([name, path]) => (
              <div key={name} title={name} style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sage-2)', cursor: 'pointer' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
              </div>
            ))}
          </div>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage-2)', marginBottom: 14 }}>{h}</div>
            {items.map(i => <div key={i} style={{ fontSize: 14, color: 'var(--fg-on-dark-2)', padding: '5px 0', cursor: 'pointer' }}>{i}</div>)}
          </div>
        ))}
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage-2)', marginBottom: 14 }}>Get in touch</div>
          {[['phone', PHONE_DISPLAY], ['mail', 'hello@pheslandscaping.com'], ['map-pin', 'Huntsville, AL 35805']].map(([ic, tx]) => (
            <div key={tx} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, color: 'var(--fg-on-dark-2)', padding: '5px 0' }}>
              <Icon name={ic} size={15} color="var(--sage-2)" /> {tx}
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '32px auto 0', paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--fg-on-dark-2)' }}>
        <span>© 2026 Phes Landscaping. All rights reserved.</span>
        <span>Licensed &amp; insured · Huntsville, Alabama</span>
      </div>
    </footer>
  );
}

Object.assign(window, { QuoteForm, Footer });
