import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowRight, Play, Pause, ArrowUpRight } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

interface Project {
  id: string;
  title: string;
  sub: string;
  loc: string;
  cat: string;
  video: string;
  img: string;
  gallery: string[];
  description: string;
  year: string;
}

const VideoCard: React.FC<{ project: Project; onOpen: (p: Project) => void }> = ({ project, onOpen }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setPlaying(true); }
    else { videoRef.current.pause(); setPlaying(false); }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', cursor: 'none' }}
      onClick={() => onOpen(project)}
    >
      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: 'var(--deep)', marginBottom: '24px' }}>
        <video
          ref={videoRef}
          muted loop playsInline
          onClick={toggle}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)' }}
          className="portfolio-video"
        >
          <source src={project.video} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,9,7,0.25)', transition: 'opacity 0.3s' }} />

        {/* Play/Pause */}
        <div
          onClick={toggle}
          style={{
            position: 'absolute', bottom: '20px', right: '20px',
            width: '44px', height: '44px',
            border: '1px solid rgba(245,239,230,0.3)',
            background: 'rgba(12,9,7,0.5)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'none',
            transition: 'border-color 0.2s',
          }}
        >
          {playing
            ? <Pause size={14} color="var(--ivory)" />
            : <Play size={14} color="var(--ivory)" style={{ marginLeft: '2px' }} />
          }
        </div>

        {/* Category tag */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(12,9,7,0.7)', backdropFilter: 'blur(8px)', padding: '6px 14px', border: '1px solid rgba(196,163,90,0.2)' }}>
          <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>{project.cat}</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.35)', display: 'block', marginBottom: '6px' }}>
            {project.loc} · {project.year}
          </span>
          <h3 className="display" style={{ fontSize: '26px', fontWeight: 400, fontStyle: 'italic', color: 'var(--ivory)', marginBottom: '12px' }}>
            {project.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)' }}>
            <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Details bekijken</span>
            <ArrowUpRight size={11} />
          </div>
        </div>
      </div>

      <style>{`.portfolio-video:hover { transform: scale(1.04); }`}</style>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const { data } = useSiteData();
  const projects = data.portfolio.projects as Project[];

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <div style={{ background: 'var(--black)', paddingTop: '120px' }}>

      {/* ── HEADER ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px)' }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div className="line-grow" style={{ height: '1px', width: '48px', background: 'var(--gold)' }} />
          <span className="section-label">Portfolio</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <h1 className="display reveal delay-1" style={{ fontSize: 'clamp(48px, 8vw, 110px)', fontWeight: 300, lineHeight: 1.0, color: 'var(--ivory)' }}>
            Maatwerk<br /><em style={{ color: 'var(--gold)' }}>in beeld.</em>
          </h1>
          <p className="reveal delay-2" style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(245,239,230,0.5)', fontWeight: 300, maxWidth: '320px' }}>
            Klik op de video's om ze te starten. Klik op een project voor meer details en foto's.
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '64px 48px' }}>
          {projects.map((p, i) => (
            <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 2) * 0.15}s` }}>
              <VideoCard project={p} onOpen={setSelected} />
            </div>
          ))}
        </div>
      </section>

      {/* ── MODAL ── */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(12,9,7,0.92)', backdropFilter: 'blur(20px)', cursor: 'none' }}
            onClick={() => setSelected(null)}
          />
          <div style={{
            position: 'relative', width: '100%', maxWidth: '1100px', maxHeight: '90vh',
            background: 'var(--deep)', border: '1px solid rgba(196,163,90,0.15)',
            overflowY: 'auto', zIndex: 1,
          }}>
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'fixed', top: '32px', right: '32px', zIndex: 210,
                width: '44px', height: '44px', border: '1px solid rgba(245,239,230,0.2)',
                background: 'rgba(12,9,7,0.8)', backdropFilter: 'blur(8px)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'none', color: 'var(--ivory)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', minHeight: '100%' }}>
              {/* Sidebar */}
              <div style={{ padding: '60px 40px', borderRight: '1px solid rgba(196,163,90,0.1)', position: 'sticky', top: 0, alignSelf: 'start' }}>
                <span className="section-label" style={{ display: 'block', marginBottom: '16px' }}>{selected.loc}</span>
                <h2 className="display" style={{ fontSize: '36px', fontWeight: 400, fontStyle: 'italic', color: 'var(--ivory)', lineHeight: 1.2, marginBottom: '24px' }}>
                  {selected.title}
                </h2>
                <div style={{ height: '1px', background: 'rgba(196,163,90,0.2)', marginBottom: '24px' }} />
                <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'rgba(245,239,230,0.55)', fontWeight: 300, marginBottom: '32px' }}>
                  {selected.description}
                </p>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '4px' }}>Categorie</span>
                    <span style={{ fontFamily: 'Jost', fontSize: '13px', color: 'var(--ivory)', fontWeight: 300 }}>{selected.cat}</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '4px' }}>Jaar</span>
                    <span style={{ fontFamily: 'Jost', fontSize: '13px', color: 'var(--ivory)', fontWeight: 300 }}>{selected.year}</span>
                  </div>
                </div>
              </div>

              {/* Media */}
              <div style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <video autoPlay muted loop playsInline style={{ width: '100%', display: 'block' }}>
                  <source src={selected.video} type="video/mp4" />
                </video>
                {selected.gallery.map((img, i) => (
                  <img key={i} src={img} alt={`Detail ${i + 1}`} style={{ width: '100%', display: 'block' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
