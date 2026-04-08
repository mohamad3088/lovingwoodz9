import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

/* ─── Animated number counter ─── */
const Counter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ end, suffix = '', duration = 2000 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setVal(Math.round(ease * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref} className="counter">{val}{suffix}</span>;
};

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { data } = useSiteData();
  const { home } = data;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parallaxY = scrollY * 0.35;
  const projects = home.featuredProjects;
  const processSteps = home.processSteps;

  return (
    <div style={{ background: 'var(--black)' }}>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{ position: 'relative', height: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}
      >
        {/* Video bg with parallax */}
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${parallaxY}px)`, willChange: 'transform' }}>
          <video
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '110%', objectFit: 'cover', objectPosition: 'center' }}
          >
            <source src={home.heroVideo} type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(12,9,7,0.25) 0%, rgba(12,9,7,0.15) 40%, rgba(12,9,7,0.75) 85%, rgba(12,9,7,1) 100%)' }} />
        </div>

        {/* Hero text */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', padding: '0 32px 80px', maxWidth: '1280px', margin: '0 auto' }}>
          {/* Label */}
          <div className="reveal" style={{ marginBottom: '24px' }}>
            <span className="section-label">{home.heroLabel}</span>
          </div>

          <h1
            className="display reveal delay-1"
            style={{
              fontSize: 'clamp(52px, 9vw, 130px)',
              fontWeight: 300,
              lineHeight: 1.0,
              color: 'var(--ivory)',
              marginBottom: '12px',
              maxWidth: '900px',
            }}
          >
            {home.heroTitle1}
          </h1>
          <h1
            className="display reveal delay-2"
            style={{
              fontSize: 'clamp(52px, 9vw, 130px)',
              fontWeight: 300,
              lineHeight: 1.0,
              fontStyle: 'italic',
              color: 'var(--gold)',
              marginBottom: '40px',
              maxWidth: '900px',
            }}
          >
            {home.heroTitle2}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <Link to="/portfolio" className="btn-luxury reveal delay-3" style={{ cursor: 'none' }}>
              <span>Ontdek ons werk</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/about"
              className="gold-link reveal delay-4"
              style={{ fontFamily: 'Jost', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.55)', cursor: 'none' }}
            >
              Ons verhaal
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '32px', right: '40px', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.4)', writingMode: 'vertical-rl' }}>Scroll</span>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--gold), transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
        </div>
        <style>{`@keyframes scrollPulse { 0%,100%{opacity:0.4;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(0.6)} }`}</style>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ borderTop: '1px solid rgba(196,163,90,0.2)', borderBottom: '1px solid rgba(196,163,90,0.2)', padding: '18px 0', overflow: 'hidden', background: 'var(--deep)' }}>
        <div className="marquee-track" style={{ display: 'flex', gap: '60px', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...Array(2)].map((_, gi) => (
            ['Maatwerk Keukens', '·', 'Kastenwanden', '·', 'TV-Meubels', '·', 'Wandpanelen', '·', 'Badkamermeubels', '·', 'Eettafels', '·', 'Interieur op Maat', '·'].map((t, i) => (
              <span key={`${gi}-${i}`} style={{
                fontFamily: t === '·' ? 'Jost' : 'Cormorant Garamond',
                fontSize: t === '·' ? '14px' : '15px',
                fontStyle: t === '·' ? 'normal' : 'italic',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: t === '·' ? 'var(--gold)' : 'rgba(245,239,230,0.5)',
              }}>{t}</span>
            ))
          ))}
        </div>
      </div>

      {/* ── PHILOSOPHY ── */}
      <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '80px', alignItems: 'center' }}>
          {/* Text */}
          <div>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div className="line-grow" style={{ height: '1px', width: '48px', background: 'var(--gold)' }} />
              <span className="section-label">Onze Filosofie</span>
            </div>
            <h2
              className="display reveal delay-1"
              style={{ fontSize: 'clamp(38px, 5vw, 72px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--ivory)', marginBottom: '32px' }}
            >
              {home.philosophyTitle}<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{home.philosophyEmphasis}</em>
            </h2>
            <p
              className="reveal delay-2"
              style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(245,239,230,0.6)', fontWeight: 300, marginBottom: '40px', maxWidth: '480px' }}
            >
              {home.philosophyText}
            </p>
            <Link to="/about" className="gold-link reveal delay-3" style={{ fontFamily: 'Jost', fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', cursor: 'none' }}>
              Ontdek mijn verhaal
            </Link>
          </div>

          {/* Image */}
          <div className="reveal-right delay-2" style={{ position: 'relative' }}>
            {/* Decorative border */}
            <div style={{
              position: 'absolute', top: '-16px', right: '-16px', bottom: '16px', left: '16px',
              border: '1px solid rgba(196,163,90,0.2)',
              pointerEvents: 'none', zIndex: 0,
            }} />
            <div className="parallax-wrap" style={{ position: 'relative', zIndex: 1, aspectRatio: '3/4', overflow: 'hidden' }}>
              <video
                autoPlay muted loop playsInline
                style={{ width: '100%', height: '112%', objectFit: 'cover', marginTop: '-6%', display: 'block' }}
              >
                <source src={home.philosophyVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ borderTop: '1px solid rgba(196,163,90,0.15)', borderBottom: '1px solid rgba(196,163,90,0.15)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px clamp(24px, 5vw, 80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '48px' }}>
          {home.stats.map((s, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s`, textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>
                <Counter end={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: 'Jost', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.4)', marginTop: '12px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED PROJECTS ── */}
      <section style={{ padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div className="line-grow" style={{ height: '1px', width: '48px', background: 'var(--gold)' }} />
              <span className="section-label">Recente Projecten</span>
            </div>
            <h2 className="display reveal delay-1" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: 'var(--ivory)', lineHeight: 1.1 }}>
              Maatwerk<br /><em style={{ color: 'var(--gold)' }}>in beeld.</em>
            </h2>
          </div>
          <Link to="/portfolio" className="btn-luxury reveal delay-2" style={{ cursor: 'none' }}>
            <span>Alle projecten</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Projects grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px' }}>
          {projects.map((p, i) => (
            <Link
              key={i}
              to="/portfolio"
              className="reveal"
              style={{ transitionDelay: `${i * 0.15}s`, position: 'relative', display: 'block', aspectRatio: i === 0 ? '3/4' : '4/5', overflow: 'hidden', cursor: 'none' }}
            >
              <img
                src={p.img}
                alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)' }}
                className="project-img"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,9,7,0.85) 0%, transparent 60%)', transition: 'opacity 0.4s' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 28px' }}>
                <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                  {p.cat} · {p.loc}
                </span>
                <h3 className="display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--ivory)', marginBottom: '12px' }}>
                  {p.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                  <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ivory)' }}>Bekijk</span>
                  <ArrowRight size={12} color="var(--ivory)" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <style>{`.reveal a:hover .project-img { transform: scale(1.06); }`}</style>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: 'var(--deep)', padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '80px' }}>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div className="line-grow" style={{ height: '1px', width: '48px', background: 'var(--gold)' }} />
              <span className="section-label">Ons Proces</span>
            </div>
            <h2 className="display reveal delay-1" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: 'var(--ivory)', lineHeight: 1.1 }}>
              {home.processTitle}<br /><em style={{ color: 'var(--gold)' }}>{home.processEmphasis}</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2px' }}>
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  transitionDelay: `${i * 0.12}s`,
                  padding: '48px 40px',
                  borderLeft: i === 0 ? '1px solid rgba(196,163,90,0.3)' : '1px solid rgba(196,163,90,0.1)',
                  background: i === 0 ? 'rgba(196,163,90,0.04)' : 'transparent',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '24px' }}>
                  <span className="display" style={{ fontSize: '56px', fontWeight: 300, color: 'rgba(196,163,90,0.2)', lineHeight: 1 }}>{step.num}</span>
                  <div style={{ height: '1px', flex: 1, background: 'rgba(196,163,90,0.2)' }} />
                </div>
                <h3 className="display" style={{ fontSize: '28px', fontWeight: 400, fontStyle: 'italic', color: 'var(--ivory)', marginBottom: '16px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(245,239,230,0.5)', fontWeight: 300 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED CTA ── */}
      <section style={{ position: 'relative', height: 'clamp(400px, 60vh, 700px)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src={home.ctaVideo} type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,9,7,0.7)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}>
          <p className="reveal section-label" style={{ marginBottom: '24px' }}>{home.ctaLabel}</p>
          <h2 className="display reveal delay-1" style={{ fontSize: 'clamp(40px, 7vw, 100px)', fontWeight: 300, color: 'var(--ivory)', lineHeight: 1.05, marginBottom: '48px' }}>
            {home.ctaTitle}<br /><em style={{ color: 'var(--gold)' }}>{home.ctaEmphasis}</em>
          </h2>
          <Link to="/contact" className="btn-luxury reveal delay-2" style={{ cursor: 'none' }}>
            <span>Neem contact op</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* WhatsApp float */}
      <a
        href="https://wa.me/31645066847"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        style={{
          position: 'fixed', bottom: '32px', right: '32px', zIndex: 40,
          width: '52px', height: '52px',
          background: 'var(--gold)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(196,163,90,0.3)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          cursor: 'none',
        }}
        className="wa-btn"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--black)" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <style>{`.wa-btn:hover { transform: scale(1.12); box-shadow: 0 12px 40px rgba(196,163,90,0.45); }`}</style>
      </a>
    </div>
  );
};

export default Home;
