import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Materials: React.FC = () => {
  const [activeWood, setActiveWood] = useState(0);

  const woodTypes = [
    {
      name: 'Europees Eiken',
      en: 'European Oak',
      origin: 'Europa',
      color: '#B8956A',
      desc: 'Het meest veelzijdige hout in ons repertoire. Klassiek, duurzaam en rijkelijk getekend. Onze populairste keuze voor keuken- en woonkamerprojecten. Eiken veroudert met gratie — de kleur verdiept, het karakter groeit.',
      traits: ['Hoge hardheid', 'Prachtige nerf', 'Geschikt voor steam bending', 'Veroudert naar warm goud'],
      img: 'https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200',
    },
    {
      name: 'Amerikaans Notenhout',
      en: 'American Walnut',
      origin: 'Noord-Amerika',
      color: '#5C3D2E',
      desc: 'Donker, stemmig en prestige. Notenhout heeft een diepe chocoladebruine toon die elke ruimte verankert. Ideaal voor statement meubels en tv-wanden die indruk maken.',
      traits: ['Donkere rijke kleur', 'Fijne nerf', 'Uitstekend te bewerken', 'Premium uitstraling'],
      img: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1200',
    },
    {
      name: 'Es',
      en: 'Ash',
      origin: 'Europa',
      color: '#D4C4A8',
      desc: 'Licht, flexibel en met een uitgesproken open nerf. Es is perfect voor Scandinavisch geïnspireerde, minimalistische interieurs waar licht en ruimte centraal staan.',
      traits: ['Lichte toon', 'Uitgesproken nerf', 'Taai en flexibel', 'Scandinavische stijl'],
      img: 'https://images.unsplash.com/photo-1507652313519-d4c9174996dd?q=80&w=1200',
    },
    {
      name: 'Gerookt Eiken',
      en: 'Smoked Oak',
      origin: 'Europa',
      color: '#7A6552',
      desc: 'Een diepe, warme toon verkregen door een natuurlijk rookproces met ammoniak. Gerookt eiken straalt luxe en exclusiviteit uit — elk stuk is uniek door het ambachtelijke procedé.',
      traits: ['Uniek rookproces', 'Diepe warme kleur', 'Extreem exclusief', 'Tijdloze elegantie'],
      img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200',
    },
  ];

  const finishingSteps = [
    { num: '01', title: 'Schuren', desc: 'Handmatig geschuurd tot 400 grit voor een fluweel-zachte afwerking. Elk oppervlak wordt met de hand gevoeld.' },
    { num: '02', title: 'Reinigen', desc: 'Verwijdering van alle stof en vet voor een perfecte hechting van de afwerklaag.' },
    { num: '03', title: 'Olie applicatie', desc: 'Meerdere lagen natuurlijke harde-wax olie, ingewreven met de hand voor maximale penetratie.' },
    { num: '04', title: 'Buffering', desc: 'Traditioneel gebuffeld voor een zijdezachte, open-pore afwerking die het hout laat ademen.' },
  ];

  const active = woodTypes[activeWood];

  return (
    <div style={{ background: 'var(--black)', paddingTop: '120px' }}>

      {/* ── HEADER ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px)' }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div className="line-grow" style={{ height: '1px', width: '48px', background: 'var(--gold)' }} />
          <span className="section-label">Materialen</span>
        </div>
        <h1 className="display reveal delay-1" style={{ fontSize: 'clamp(44px, 7vw, 100px)', fontWeight: 300, lineHeight: 1.0, color: 'var(--ivory)', marginBottom: '32px' }}>
          Pure<br /><em style={{ color: 'var(--gold)' }}>Materiality.</em>
        </h1>
        <p className="reveal delay-2" style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(245,239,230,0.5)', fontWeight: 300, maxWidth: '560px' }}>
          Wij werken uitsluitend met massief, natuurlijk hout dat veroudert met gratie en verhalen vertelt. Geen vervangers — alleen het echte werk.
        </p>
      </section>

      {/* ── INTERACTIVE WOOD SELECTOR ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)' }}>
        {/* Tab bar */}
        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid rgba(196,163,90,0.15)', marginBottom: '0', overflowX: 'auto' }}>
          {woodTypes.map((w, i) => (
            <button
              key={i}
              onClick={() => setActiveWood(i)}
              style={{
                padding: '20px 32px',
                background: 'none', border: 'none',
                borderBottom: activeWood === i ? '2px solid var(--gold)' : '2px solid transparent',
                color: activeWood === i ? 'var(--ivory)' : 'rgba(245,239,230,0.4)',
                fontFamily: 'Jost', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase',
                cursor: 'none', whiteSpace: 'nowrap',
                transition: 'color 0.3s, border-color 0.3s',
                flexShrink: 0,
              }}
            >
              {w.en}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0', borderBottom: '1px solid rgba(196,163,90,0.15)' }}>
          {/* Image */}
          <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
            <img
              key={activeWood}
              src={active.img}
              alt={active.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'fadeIn 0.5s ease' }}
            />
            {/* Color swatch */}
            <div style={{
              position: 'absolute', bottom: '24px', right: '24px',
              background: 'rgba(12,9,7,0.8)', backdropFilter: 'blur(8px)',
              padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px',
              border: '1px solid rgba(196,163,90,0.2)',
            }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: active.color }} />
              <span style={{ fontFamily: 'Jost', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ivory)' }}>
                {active.origin}
              </span>
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: '64px 56px', borderLeft: '1px solid rgba(196,163,90,0.1)' }}>
            <span className="section-label" style={{ display: 'block', marginBottom: '16px' }}>{active.en}</span>
            <h2 className="display" style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--ivory)', marginBottom: '24px' }}>
              {active.name}
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'rgba(245,239,230,0.55)', fontWeight: 300, marginBottom: '40px' }}>
              {active.desc}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {active.traits.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Jost', fontSize: '13px', color: 'rgba(245,239,230,0.6)', fontWeight: 300 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@keyframes fadeIn { from { opacity:0; transform:scale(1.02); } to { opacity:1; transform:scale(1); } }`}</style>
      </section>

      {/* ── FINISHING PROCESS ── */}
      <section style={{ background: 'var(--deep)', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div className="line-grow" style={{ height: '1px', width: '48px', background: 'var(--gold)' }} />
                <span className="section-label">Afwerking</span>
              </div>
              <h2 className="display reveal delay-1" style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300, color: 'var(--ivory)', lineHeight: 1.1, marginBottom: '24px' }}>
                Finishing<br /><em style={{ color: 'var(--gold)' }}>Techniques.</em>
              </h2>
              <p className="reveal delay-2" style={{ fontSize: '15px', lineHeight: 1.85, color: 'rgba(245,239,230,0.55)', fontWeight: 300 }}>
                Wij vermijden zware lakken die de textuur van het hout maskeren. In plaats daarvan gebruiken we natuurlijke oliën en wassen die in de vezels penetreren — bescherming met behoud van het authentieke open-pore gevoel.
              </p>
            </div>

            <div className="reveal-right delay-2" style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1622397333309-3056849bc70b?q=80&w=1200"
                alt="Wood grain close-up"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0' }}>
            {finishingSteps.map((step, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  transitionDelay: `${i * 0.12}s`,
                  padding: '40px 32px',
                  borderLeft: '1px solid rgba(196,163,90,0.12)',
                  borderBottom: '1px solid rgba(196,163,90,0.12)',
                }}
              >
                <span className="display" style={{ fontSize: '52px', fontWeight: 300, color: 'rgba(196,163,90,0.2)', display: 'block', lineHeight: 1, marginBottom: '20px' }}>
                  {step.num}
                </span>
                <h3 className="display" style={{ fontSize: '22px', fontWeight: 400, fontStyle: 'italic', color: 'var(--ivory)', marginBottom: '12px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(245,239,230,0.45)', fontWeight: 300 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)', textAlign: 'center' }}>
        <p className="reveal section-label" style={{ marginBottom: '24px' }}>Klaar voor jouw project?</p>
        <h2 className="display reveal delay-1" style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 300, color: 'var(--ivory)', marginBottom: '48px', lineHeight: 1.1 }}>
          Laten we samen<br /><em style={{ color: 'var(--gold)' }}>iets moois maken.</em>
        </h2>
        <Link to="/contact" className="btn-luxury reveal delay-2" style={{ cursor: 'none' }}>
          <span>Start een project</span>
          <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
};

export default Materials;
