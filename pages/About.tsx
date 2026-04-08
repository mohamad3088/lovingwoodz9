import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    { num: '01', title: 'Ambacht', desc: 'Elk stuk wordt met de hand gemaakt. Geen industriële productie — alleen geduld, precisie en passie.' },
    { num: '02', title: 'Authenticiteit', desc: 'Wij werken uitsluitend met massief hout. Geen MDF-omlijstingen, geen nep-fineer. Echte materialen, echte verhalen.' },
    { num: '03', title: 'Tijdloosheid', desc: 'Trends vervagen. Onze ontwerpen niet. We ontwerpen voor generaties, niet voor seizoenen.' },
  ];

  return (
    <div style={{ background: 'var(--black)', paddingTop: '120px' }}>

      {/* ── HEADER ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px)' }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div className="line-grow" style={{ height: '1px', width: '48px', background: 'var(--gold)' }} />
          <span className="section-label">Over Lovingwoodz</span>
        </div>
        <h1
          className="display reveal delay-1"
          style={{ fontSize: 'clamp(48px, 8vw, 120px)', fontWeight: 300, lineHeight: 1.0, color: 'var(--ivory)', maxWidth: '900px' }}
        >
          Driven by a<br />
          <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>passion for wood.</em>
        </h1>
      </section>

      {/* ── PULL QUOTE ── */}
      <div style={{ borderTop: '1px solid rgba(196,163,90,0.15)', borderBottom: '1px solid rgba(196,163,90,0.15)', padding: '48px clamp(24px, 5vw, 80px)', background: 'var(--deep)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <blockquote
            className="display reveal"
            style={{ fontSize: 'clamp(22px, 3.5vw, 44px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(245,239,230,0.7)', lineHeight: 1.4, maxWidth: '900px' }}
          >
            "Interieurs voor de mooiste momenten in je leven."
          </blockquote>
          <p className="reveal delay-2" style={{ marginTop: '16px', fontFamily: 'Jost', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            — Thijs, Founder
          </p>
        </div>
      </div>

      {/* ── STORY ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'start' }}>

          {/* Image column */}
          <div className="reveal-left" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '16px', left: '-16px', bottom: '-16px', right: '16px', border: '1px solid rgba(196,163,90,0.2)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img
                src="https://images.squarespace-cdn.com/content/v1/595d4778be6594bb746dd8ca/7cbb9564-aac9-4d40-b715-d78aaa859d2c/interiorbythijs-lovingwoodz-luxehouteninterieurs.jpg?format=750w"
                alt="Thijs — Oprichter Lovingwoodz"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* Stats overlay */}
            <div style={{
              position: 'absolute', bottom: '-32px', right: '-24px',
              background: 'var(--deep)', border: '1px solid rgba(196,163,90,0.2)',
              padding: '28px 36px',
            }}>
              <div className="display" style={{ fontSize: '52px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>14+</div>
              <div style={{ fontFamily: 'Jost', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.5)', marginTop: '8px' }}>Jaar ervaring</div>
            </div>
          </div>

          {/* Text column */}
          <div style={{ paddingTop: '32px' }}>
            <h2 className="display reveal delay-1" style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--ivory)', marginBottom: '32px' }}>
              A Legacy of Craft
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p className="reveal delay-2" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(245,239,230,0.6)', fontWeight: 300 }}>
                Het begon ooit in het schuurtje naast mijn ouderlijke huis. Tussen het stof en wat oud gereedschap maakte ik vroeger al mijn eerste projectjes. Geen grote plannen, maar altijd nieuwsgierig. Daar heb ik geleerd hoe iets eenvoudigs als hout karakter krijgt als je het met aandacht maakt.
              </p>
              <p className="reveal delay-3" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(245,239,230,0.6)', fontWeight: 300 }}>
                Ik ontdekte al vroeg mijn ambitie om dingen te bedenken en te ontwerpen. In mijn eerste opleiding Bouwkunde leerde ik vervolgens alles over de samenhang tussen ontwerp en maken. Daar kregen mijn ideeën verder vorm en mijn ontwerpen werden tastbaar.
              </p>
              <p className="reveal delay-4" style={{ fontSize: '15px', lineHeight: 1.9, color: 'rgba(245,239,230,0.6)', fontWeight: 300 }}>
                Interieurs hebben voor mij altijd iets speciaals gehad. Het is het gevoel dat je krijgt als je ergens binnenloopt. Het gevoel dat je iets unieks ervaart. Dat gevoel ontwerp ik.
              </p>
            </div>

            <div className="reveal delay-5" style={{ marginTop: '48px', paddingTop: '40px', borderTop: '1px solid rgba(196,163,90,0.15)', display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
              {[{ val: '120+', label: 'Projecten' }, { val: '100%', label: 'Maatwerk' }, { val: 'NL', label: 'Gebaseerd in' }].map((s, i) => (
                <div key={i}>
                  <div className="display" style={{ fontSize: '36px', fontWeight: 300, color: 'var(--gold)' }}>{s.val}</div>
                  <div style={{ fontFamily: 'Jost', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.4)', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ background: 'var(--deep)', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div className="line-grow" style={{ height: '1px', width: '48px', background: 'var(--gold)' }} />
              <span className="section-label">Onze Waarden</span>
            </div>
            <h2 className="display reveal delay-1" style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300, color: 'var(--ivory)', lineHeight: 1.1 }}>
              Waarom kiezen voor<br /><em style={{ color: 'var(--gold)' }}>Lovingwoodz?</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0' }}>
            {values.map((v, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  transitionDelay: `${i * 0.15}s`,
                  padding: '48px 40px',
                  borderRight: i < values.length - 1 ? '1px solid rgba(196,163,90,0.12)' : 'none',
                  borderBottom: '1px solid rgba(196,163,90,0.12)',
                }}
              >
                <span className="display" style={{ fontSize: '64px', fontWeight: 300, color: 'rgba(196,163,90,0.15)', display: 'block', lineHeight: 1, marginBottom: '24px' }}>
                  {v.num}
                </span>
                <h3 className="display" style={{ fontSize: '28px', fontWeight: 400, fontStyle: 'italic', color: 'var(--ivory)', marginBottom: '16px' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(245,239,230,0.5)', fontWeight: 300 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED IMAGE ── */}
      <section style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=2000"
          alt="Workshop"
          style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center', marginTop: '-7.5%', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,9,7,0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '32px' }}>
          <p className="reveal section-label">Klaar om te beginnen?</p>
          <Link to="/contact" className="btn-luxury reveal delay-2" style={{ cursor: 'none' }}>
            <span>Start uw project</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
