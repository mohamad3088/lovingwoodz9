import React, { useState } from 'react';
import { Send, CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === name ? 'var(--gold)' : 'rgba(196,163,90,0.2)'}`,
    padding: '14px 0',
    fontFamily: 'Jost',
    fontSize: '15px',
    fontWeight: 300,
    color: 'var(--ivory)',
    outline: 'none',
    transition: 'border-color 0.3s',
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Jost',
    fontSize: '9px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    display: 'block',
    marginBottom: '4px',
  };

  if (submitted) {
    return (
      <div style={{ background: 'var(--black)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            border: '1px solid var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 32px',
            background: 'rgba(196,163,90,0.06)',
          }}>
            <CheckCircle size={32} color="var(--gold)" />
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 300, color: 'var(--ivory)', marginBottom: '20px', lineHeight: 1.1 }}>
            Bericht<br /><em style={{ color: 'var(--gold)' }}>ontvangen.</em>
          </h1>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(245,239,230,0.55)', fontWeight: 300, marginBottom: '40px' }}>
            Bedankt voor uw aanvraag. Wij nemen binnen 48 uur contact met u op om uw wensen te bespreken.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              background: 'none', border: 'none', cursor: 'none',
              fontFamily: 'Jost', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--gold)', borderBottom: '1px solid var(--gold)', paddingBottom: '2px',
            }}
          >
            Nieuw bericht sturen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--black)', paddingTop: '120px' }}>

      {/* ── HEADER ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px) clamp(40px, 6vw, 80px)' }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div className="line-grow" style={{ height: '1px', width: '48px', background: 'var(--gold)' }} />
          <span className="section-label">Contact</span>
        </div>
        <h1 className="display reveal delay-1" style={{ fontSize: 'clamp(52px, 9vw, 128px)', fontWeight: 300, lineHeight: 1.0, color: 'var(--ivory)', marginBottom: '16px' }}>
          Start a
        </h1>
        <h1 className="display reveal delay-2" style={{ fontSize: 'clamp(52px, 9vw, 128px)', fontWeight: 300, lineHeight: 1.0, fontStyle: 'italic', color: 'var(--gold)', marginBottom: '32px' }}>
          Project.
        </h1>
        <p className="reveal delay-3" style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(245,239,230,0.5)', fontWeight: 300, maxWidth: '480px' }}>
          Wij verwelkomen privéopdrachten en architecturale samenwerkingen door heel Nederland.
        </p>
      </section>

      {/* ── MAIN GRID ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'start' }}>

          {/* Contact info */}
          <div className="reveal">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              <div>
                <span className="section-label" style={{ display: 'block', marginBottom: '12px' }}>Locatie</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={16} color="var(--gold)" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <p className="display" style={{ fontSize: '22px', fontWeight: 400, fontStyle: 'italic', color: 'var(--ivory)', lineHeight: 1.4 }}>
                    Nijverheidsweg 24,<br />6163 BZ, Geleen, NL
                  </p>
                </div>
              </div>
              <div>
                <span className="section-label" style={{ display: 'block', marginBottom: '12px' }}>Contactgegevens</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a href="tel:+31645066847" style={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'none', textDecoration: 'none' }}>
                    <Phone size={14} color="var(--gold)" />
                    <span style={{ fontFamily: 'Jost', fontSize: '15px', color: 'rgba(245,239,230,0.65)', fontWeight: 300 }}>+31 6 45066847 (Thijs)</span>
                  </a>
                  <a href="mailto:info@lovingwoodz.com" style={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'none', textDecoration: 'none' }}>
                    <Mail size={14} color="var(--gold)" />
                    <span style={{ fontFamily: 'Jost', fontSize: '15px', color: 'rgba(245,239,230,0.65)', fontWeight: 300 }}>info@lovingwoodz.com</span>
                  </a>
                </div>
              </div>
              <div>
                <span className="section-label" style={{ display: 'block', marginBottom: '12px' }}>Openingstijden</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Clock size={14} color="var(--gold)" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: 'Jost', fontSize: '14px', color: 'rgba(245,239,230,0.65)', fontWeight: 300, marginBottom: '8px' }}>Maandag t/m vrijdag: 08:00 – 16:30</p>
                    <p style={{ fontFamily: 'Jost', fontSize: '12px', color: 'rgba(245,239,230,0.35)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6 }}>
                      Graag vooraf een afspraak maken zodat we u goed kunnen ontvangen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal delay-2">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div>
                  <label style={labelStyle}>Voornaam *</label>
                  <input
                    required type="text"
                    style={inputStyle('fname')}
                    onFocus={() => setFocused('fname')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Achternaam *</label>
                  <input
                    required type="text"
                    style={inputStyle('lname')}
                    onFocus={() => setFocused('lname')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>E-mailadres *</label>
                <input
                  required type="email"
                  style={inputStyle('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <div>
                <label style={labelStyle}>Telefoonnummer</label>
                <input
                  type="tel"
                  style={inputStyle('tel')}
                  onFocus={() => setFocused('tel')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <div>
                <label style={labelStyle}>Type project</label>
                <select
                  style={{ ...inputStyle('project'), appearance: 'none', cursor: 'none' }}
                  onFocus={() => setFocused('project')}
                  onBlur={() => setFocused(null)}
                >
                  <option style={{ background: 'var(--dark)' }}>Maatwerk Keuken</option>
                  <option style={{ background: 'var(--dark)' }}>Uniek Meubel</option>
                  <option style={{ background: 'var(--dark)' }}>Totaal Interieur</option>
                  <option style={{ background: 'var(--dark)' }}>Architecturale Samenwerking</option>
                  <option style={{ background: 'var(--dark)' }}>Overig</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Projectomschrijving *</label>
                <textarea
                  required rows={5}
                  style={{
                    ...inputStyle('msg'),
                    borderBottom: 'none',
                    border: `1px solid ${focused === 'msg' ? 'var(--gold)' : 'rgba(196,163,90,0.2)'}`,
                    padding: '16px',
                    resize: 'vertical',
                  }}
                  onFocus={() => setFocused('msg')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <button
                type="submit"
                className="btn-solid"
                style={{ width: '100%', justifyContent: 'center', padding: '20px', cursor: 'none', fontSize: '11px' }}
              >
                <span>Stuur bericht</span>
                <Send size={14} />
              </button>

              <p style={{ fontFamily: 'Jost', fontSize: '11px', color: 'rgba(245,239,230,0.3)', textAlign: 'center', lineHeight: 1.6 }}>
                Wij reageren binnen 48 uur · info@lovingwoodz.com
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM CTA ── */}
      <div style={{ borderTop: '1px solid rgba(196,163,90,0.15)', background: 'var(--deep)', padding: '48px clamp(24px, 5vw, 80px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <p style={{ fontFamily: 'Jost', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Volg ons</p>
          <p className="display" style={{ fontSize: '24px', fontWeight: 300, fontStyle: 'italic', color: 'var(--ivory)' }}>@lovingwoodz</p>
        </div>
        <a
          href="https://www.instagram.com/lovingwoodz/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxury"
          style={{ cursor: 'none' }}
        >
          <span>Instagram bekijken</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Contact;
