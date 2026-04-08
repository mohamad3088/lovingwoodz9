import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const Services: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      num: '01',
      title: 'Maatwerk Keukens',
      sub: 'Het hart van je huis',
      desc: 'Keukens die rust uitstralen. Wij combineren warme houtsoorten met moderne functionaliteit. Elke keuken is een uniek ontwerp — van de eerste schets tot de laatste handgreep.',
      img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400',
      features: ['Massief eiken & walnoot', 'Soft-close mechanismen', 'Geïntegreerde verlichting', 'Custom afwerking'],
    },
    {
      num: '02',
      title: 'Unieke Meubels',
      sub: 'Verhalen in hout',
      desc: 'Van eettafels die generaties meegaan tot zwevende badkamermeubels. Elk stuk is een persoonlijk verhaal — gemaakt voor jou, om te duren.',
      img: 'https://images.unsplash.com/photo-1620626011761-9963d7521477?q=80&w=1400',
      features: ['Eettafels & stoelen', 'TV-meubels & kasten', 'Badkamermeubels', 'Boekenwanden'],
    },
    {
      num: '03',
      title: 'Totaal Interieur',
      sub: 'Van vloer tot plafond',
      desc: 'Wandpanelen, kastenwanden en vloeren die naadloos op elkaar aansluiten. Een volledig coherent interieur dat ademt als één geheel.',
      img: 'https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=1400',
      features: ['Wandpanelen & lamellen', 'Vliegende kastenwanden', 'Hardhouten vloeren', 'Volumecomposities'],
    },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800',
    'https://images.unsplash.com/photo-1507652313519-d4c9174996dd?q=80&w=800',
    'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800',
    'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=800',
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800',
    'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=800',
  ];

  return (
    <div style={{ background: 'var(--black)', paddingTop: '120px' }}>

      {/* ── HEADER ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px)' }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div className="line-grow" style={{ height: '1px', width: '48px', background: 'var(--gold)' }} />
          <span className="section-label">Onze Diensten</span>
        </div>
        <h1 className="display reveal delay-1" style={{ fontSize: 'clamp(44px, 7vw, 100px)', fontWeight: 300, lineHeight: 1.0, color: 'var(--ivory)', marginBottom: '32px' }}>
          Interieurs voor de<br />
          <em style={{ color: 'var(--gold)' }}>mooiste momenten.</em>
        </h1>
        <p className="reveal delay-2" style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(245,239,230,0.55)', fontWeight: 300, maxWidth: '600px' }}>
          Wij maken interieurs voor iedereen die bewust kiest voor hout — voor mensen die anders willen dan anders en kiezen voor karakter en trots.
        </p>
      </section>

      {/* ── PHILOSOPHY SPLIT ── */}
      <div style={{ borderTop: '1px solid rgba(196,163,90,0.15)', background: 'var(--deep)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px clamp(24px, 5vw, 80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px' }}>
          <div className="reveal">
            <h2 className="display" style={{ fontSize: '24px', fontWeight: 400, fontStyle: 'italic', color: 'var(--ivory)', marginBottom: '16px' }}>De kracht van hout</h2>
            <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(245,239,230,0.5)', fontWeight: 300 }}>
              Hout brengt sfeer, karakter en rust in huis. Geen millimeter is hetzelfde — elk stukje leeft en vertelt z'n eigen verhaal. Hout verandert mee met de tijd. Puur materiaal, met aandacht verwerkt.
            </p>
          </div>
          <div className="reveal delay-2">
            <h2 className="display" style={{ fontSize: '24px', fontWeight: 400, fontStyle: 'italic', color: 'var(--ivory)', marginBottom: '16px' }}>Trouw aan vakmanschap</h2>
            <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(245,239,230,0.5)', fontWeight: 300 }}>
              Wij blijven trouw aan het gevoel van echt vakmanschap en de trots van maatwerk. Alles in eigen beheer en met eigen handen — van ontwerp tot plaatsing.
            </p>
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {services.map((s, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredService(i)}
              onMouseLeave={() => setHoveredService(null)}
              style={{
                borderTop: '1px solid rgba(196,163,90,0.15)',
                padding: '64px 0',
                borderBottom: i === services.length - 1 ? '1px solid rgba(196,163,90,0.15)' : 'none',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', alignItems: 'center' }}>
                {/* Image */}
                <div
                  className={i % 2 === 1 ? 'reveal-right' : 'reveal-left'}
                  style={{ order: i % 2 === 1 ? 2 : 1, position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      transform: hoveredService === i ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                  {/* Number overlay */}
                  <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
                    <span className="display" style={{ fontSize: '80px', fontWeight: 300, color: 'rgba(245,239,230,0.12)', lineHeight: 1 }}>
                      {s.num}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="reveal" style={{ order: i % 2 === 1 ? 1 : 2, transitionDelay: '0.1s' }}>
                  <span className="section-label" style={{ display: 'block', marginBottom: '16px' }}>{s.sub}</span>
                  <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300, color: 'var(--ivory)', lineHeight: 1.1, marginBottom: '24px' }}>
                    {s.title}
                  </h2>
                  <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'rgba(245,239,230,0.55)', fontWeight: 300, marginBottom: '32px' }}>
                    {s.desc}
                  </p>
                  {/* Features */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
                    {s.features.map((f, fi) => (
                      <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Jost', fontSize: '13px', color: 'rgba(245,239,230,0.6)', fontWeight: 300 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="gold-link"
                    style={{ fontFamily: 'Jost', fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', cursor: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    Start dit project <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INSPIRATION GALLERY ── */}
      <section id="inspiration-gallery" style={{ background: 'var(--deep)', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div className="line-grow" style={{ height: '1px', width: '48px', background: 'var(--gold)' }} />
                <span className="section-label">Inspiratie</span>
              </div>
              <h2 className="display reveal delay-1" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, color: 'var(--ivory)', lineHeight: 1.1 }}>
                Recente<br /><em style={{ color: 'var(--gold)' }}>projecten.</em>
              </h2>
            </div>
            <Link to="/portfolio" className="btn-luxury reveal delay-2" style={{ cursor: 'none' }}>
              <span>Alle projecten</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  transitionDelay: `${(i % 3) * 0.1}s`,
                  aspectRatio: i % 3 === 1 ? '3/4' : '4/3',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={img}
                  alt={`Project ${i + 1}`}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.5s',
                    filter: 'grayscale(20%)',
                  }}
                  onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.06)'; (e.target as HTMLImageElement).style.filter = 'grayscale(0%)'; }}
                  onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; (e.target as HTMLImageElement).style.filter = 'grayscale(20%)'; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
