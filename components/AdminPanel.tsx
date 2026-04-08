import React, { useState } from 'react';
import { X, LogOut, Home, Image, Grid, Info, Phone, Plus, Trash2, ChevronDown, ChevronUp, Save, RotateCcw, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSiteData, PortfolioProject } from '../contexts/SiteDataContext';

/* ── Reusable field components ─────────────────────────────── */
const Field: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}> = ({ label, value, onChange, multiline, placeholder }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={labelStyle}>{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
    )}
  </div>
);

const MediaField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}> = ({ label, value, onChange, hint }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={labelStyle}>{label}</label>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="URL of pad naar bestand (bijv. /images/video.mp4 of https://...)"
      style={inputStyle}
    />
    {hint && <p style={{ fontFamily: 'Jost', fontSize: '10px', color: 'rgba(245,239,230,0.25)', margin: '6px 0 0', lineHeight: 1.6 }}>{hint}</p>}
    {/* Preview */}
    {value && (
      <div style={{ marginTop: '10px', border: '1px solid rgba(196,163,90,0.15)' }}>
        {value.endsWith('.mp4') || value.endsWith('.webm') ? (
          <video src={value} muted style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', display: 'block' }} />
        ) : (
          <img src={value} alt="preview" style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', display: 'block' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        )}
      </div>
    )}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', marginTop: '8px' }}>
    <div style={{ height: '1px', width: '32px', background: 'var(--gold)' }} />
    <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)' }}>
      {children}
    </span>
  </div>
);

const Divider = () => <div style={{ height: '1px', background: 'rgba(196,163,90,0.12)', margin: '32px 0' }} />;

/* ── Styles ───────────────────────────────────────────────── */
const labelStyle: React.CSSProperties = {
  fontFamily: 'Jost, sans-serif', fontSize: '9px',
  letterSpacing: '0.3em', textTransform: 'uppercase',
  color: 'rgba(245,239,230,0.4)', display: 'block', marginBottom: '8px',
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  background: 'rgba(245,239,230,0.04)',
  border: '1px solid rgba(196,163,90,0.15)',
  color: 'var(--ivory)',
  fontFamily: 'Jost, sans-serif', fontSize: '12px',
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s', cursor: 'none',
};

const TAB_ICONS: Record<string, React.ReactNode> = {
  home: <Home size={14} />,
  portfolio: <Grid size={14} />,
  media: <Image size={14} />,
  about: <Info size={14} />,
  contact: <Phone size={14} />,
};

/* ── Portfolio Project Editor ─────────────────────────────── */
const ProjectEditor: React.FC<{
  project: PortfolioProject;
  onUpdate: (id: string, updates: Partial<PortfolioProject>) => void;
  onRemove: (id: string) => void;
}> = ({ project, onUpdate, onRemove }) => {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const u = (key: keyof PortfolioProject, val: string) => onUpdate(project.id, { [key]: val });

  return (
    <div style={{
      border: '1px solid rgba(196,163,90,0.15)',
      marginBottom: '12px',
      background: 'rgba(245,239,230,0.02)',
    }}>
      {/* Header */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', cursor: 'none',
        }}
        onClick={() => setOpen(!open)}
      >
        <div>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', fontStyle: 'italic', color: 'var(--ivory)' }}>
            {project.title || 'Naamloos project'}
          </span>
          <span style={{ fontFamily: 'Jost', fontSize: '10px', color: 'var(--gold)', marginLeft: '12px', letterSpacing: '0.2em' }}>
            {project.cat}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {!confirmDelete ? (
            <button
              onClick={e => { e.stopPropagation(); setConfirmDelete(true); }}
              style={{ background: 'none', border: '1px solid rgba(220,80,80,0.3)', padding: '6px 8px', cursor: 'none', color: 'rgba(220,80,80,0.6)', display: 'flex', alignItems: 'center' }}
            >
              <Trash2 size={11} />
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '6px' }} onClick={e => e.stopPropagation()}>
              <button
                onClick={() => onRemove(project.id)}
                style={{ background: 'rgba(220,80,80,0.8)', border: 'none', padding: '6px 10px', cursor: 'none', color: 'white', fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.2em' }}
              >
                VERWIJDER
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{ background: 'none', border: '1px solid rgba(245,239,230,0.15)', padding: '6px 10px', cursor: 'none', color: 'rgba(245,239,230,0.4)', fontFamily: 'Jost', fontSize: '9px' }}
              >
                Annuleer
              </button>
            </div>
          )}
          {open ? <ChevronUp size={14} color="var(--gold)" /> : <ChevronDown size={14} color="rgba(245,239,230,0.3)" />}
        </div>
      </div>

      {/* Expanded fields */}
      {open && (
        <div style={{ padding: '0 20px 24px', borderTop: '1px solid rgba(196,163,90,0.1)' }}>
          <div style={{ height: '20px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="Titel" value={project.title} onChange={v => u('title', v)} />
            <Field label="Ondertitel" value={project.sub} onChange={v => u('sub', v)} />
            <Field label="Locatie" value={project.loc} onChange={v => u('loc', v)} />
            <Field label="Categorie" value={project.cat} onChange={v => u('cat', v)} />
            <Field label="Jaar" value={project.year} onChange={v => u('year', v)} />
          </div>
          <Field label="Beschrijving" value={project.description} onChange={v => u('description', v)} multiline />
          <MediaField label="Video URL" value={project.video} onChange={v => u('video', v)} hint="Lokaal bestand: /images/naam.mp4" />
          <MediaField label="Hoofd afbeelding URL" value={project.img} onChange={v => u('img', v)} />
          <Field label="Galerij afbeeldingen (komma-gescheiden URLs)" value={project.gallery.join(', ')} onChange={v => onUpdate(project.id, { gallery: v.split(',').map(s => s.trim()).filter(Boolean) })} multiline />
        </div>
      )}
    </div>
  );
};

/* ── Main AdminPanel ─────────────────────────────────────── */
const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { logout } = useAuth();
  const { data, updateHome, updatePortfolioProject, addPortfolioProject, removePortfolioProject, updateAbout, updateContact, resetAll } = useSiteData();

  const [tab, setTab] = useState<'home' | 'portfolio' | 'media' | 'about' | 'contact'>('home');
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const addNewProject = () => {
    const newProject: PortfolioProject = {
      id: Date.now().toString(),
      title: 'Nieuw Project',
      sub: '',
      loc: 'Nederland',
      cat: 'Woonkamer',
      year: new Date().getFullYear().toString(),
      video: '/images/home1.mp4',
      img: 'https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=1400',
      description: '',
      gallery: [],
    };
    addPortfolioProject(newProject);
  };

  const tabs: { id: typeof tab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'media', label: 'Media' },
    { id: 'about', label: 'Over ons' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
      pointerEvents: 'none',
    }}>
      {/* Backdrop (subtle) */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(12,9,7,0.6)',
          backdropFilter: 'blur(4px)',
          pointerEvents: 'all',
          cursor: 'none',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '560px', height: '100vh',
        background: '#0a0806',
        borderLeft: '1px solid rgba(196,163,90,0.2)',
        display: 'flex', flexDirection: 'column',
        pointerEvents: 'all',
        animation: 'slideInRight 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>

        {/* Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid rgba(196,163,90,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 400, fontStyle: 'italic', color: 'var(--ivory)' }}>
              Admin Panel
            </span>
            <span style={{ fontFamily: 'Jost', fontSize: '10px', color: 'var(--gold)', marginLeft: '12px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Lovingwoodz
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Save indicator */}
            {saved && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px',
                background: 'rgba(80,180,100,0.15)',
                border: '1px solid rgba(80,180,100,0.3)',
                animation: 'fadeIn 0.2s ease',
              }}>
                <Check size={11} color="rgba(80,180,100,0.9)" />
                <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(80,180,100,0.9)' }}>OPGESLAGEN</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              title="Uitloggen"
              style={{
                background: 'none', border: '1px solid rgba(245,239,230,0.1)',
                padding: '8px', cursor: 'none',
                color: 'rgba(245,239,230,0.4)',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.2em',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ivory)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,239,230,0.4)'; }}
            >
              <LogOut size={12} />
              Uitloggen
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'none', border: '1px solid rgba(245,239,230,0.1)',
                width: '36px', height: '36px', cursor: 'none',
                color: 'rgba(245,239,230,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ivory)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,239,230,0.4)'; }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', borderBottom: '1px solid rgba(196,163,90,0.12)',
          flexShrink: 0, overflowX: 'auto',
        }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '14px 20px',
                background: 'none', border: 'none',
                borderBottom: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent',
                color: tab === t.id ? 'var(--gold)' : 'rgba(245,239,230,0.35)',
                fontFamily: 'Jost', fontSize: '9px',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                cursor: 'none', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'color 0.2s',
              }}
            >
              {TAB_ICONS[t.id]}
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>

          {/* ── HOME TAB ── */}
          {tab === 'home' && (
            <div>
              <SectionTitle>Hero sectie</SectionTitle>
              <Field label="Label (bijv. Est. 2010 · Geleen)" value={data.home.heroLabel} onChange={v => updateHome({ heroLabel: v })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Field label="Titel regel 1" value={data.home.heroTitle1} onChange={v => updateHome({ heroTitle1: v })} />
                <Field label="Titel regel 2 (goud, cursief)" value={data.home.heroTitle2} onChange={v => updateHome({ heroTitle2: v })} />
              </div>

              <Divider />
              <SectionTitle>Filosofie sectie</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Field label="Titel" value={data.home.philosophyTitle} onChange={v => updateHome({ philosophyTitle: v })} />
                <Field label="Titel nadruk (goud)" value={data.home.philosophyEmphasis} onChange={v => updateHome({ philosophyEmphasis: v })} />
              </div>
              <Field label="Tekst" value={data.home.philosophyText} onChange={v => updateHome({ philosophyText: v })} multiline />

              <Divider />
              <SectionTitle>Statistieken</SectionTitle>
              {data.home.stats.map((stat, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: '0 12px', alignItems: 'end' }}>
                  <Field
                    label={`Stat ${i + 1} - Waarde`}
                    value={String(stat.val)}
                    onChange={v => {
                      const newStats = [...data.home.stats];
                      newStats[i] = { ...newStats[i], val: parseInt(v) || 0 };
                      updateHome({ stats: newStats });
                    }}
                  />
                  <Field
                    label="Suffix"
                    value={stat.suffix}
                    onChange={v => {
                      const newStats = [...data.home.stats];
                      newStats[i] = { ...newStats[i], suffix: v };
                      updateHome({ stats: newStats });
                    }}
                  />
                  <Field
                    label="Label"
                    value={stat.label}
                    onChange={v => {
                      const newStats = [...data.home.stats];
                      newStats[i] = { ...newStats[i], label: v };
                      updateHome({ stats: newStats });
                    }}
                  />
                </div>
              ))}

              <Divider />
              <SectionTitle>Proces sectie</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Field label="Titel" value={data.home.processTitle} onChange={v => updateHome({ processTitle: v })} />
                <Field label="Titel nadruk (goud)" value={data.home.processEmphasis} onChange={v => updateHome({ processEmphasis: v })} />
              </div>
              {data.home.processSteps.map((step, i) => (
                <div key={i} style={{ border: '1px solid rgba(196,163,90,0.1)', padding: '16px', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'Jost', fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.3em' }}>STAP {step.num}</span>
                  <div style={{ marginTop: '12px' }}>
                    <Field
                      label="Titel stap"
                      value={step.title}
                      onChange={v => {
                        const steps = [...data.home.processSteps];
                        steps[i] = { ...steps[i], title: v };
                        updateHome({ processSteps: steps });
                      }}
                    />
                    <Field
                      label="Beschrijving"
                      value={step.desc}
                      onChange={v => {
                        const steps = [...data.home.processSteps];
                        steps[i] = { ...steps[i], desc: v };
                        updateHome({ processSteps: steps });
                      }}
                      multiline
                    />
                  </div>
                </div>
              ))}

              <Divider />
              <SectionTitle>CTA sectie</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Field label="Label" value={data.home.ctaLabel} onChange={v => updateHome({ ctaLabel: v })} />
                <Field label="Titel regel 1" value={data.home.ctaTitle} onChange={v => updateHome({ ctaTitle: v })} />
              </div>
              <Field label="Titel nadruk (goud)" value={data.home.ctaEmphasis} onChange={v => updateHome({ ctaEmphasis: v })} />
            </div>
          )}

          {/* ── PORTFOLIO TAB ── */}
          {tab === 'portfolio' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontFamily: 'Jost', fontSize: '11px', color: 'rgba(245,239,230,0.4)', letterSpacing: '0.2em' }}>
                  {data.portfolio.projects.length} projecten
                </span>
                <button
                  onClick={addNewProject}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 18px',
                    background: 'rgba(196,163,90,0.1)',
                    border: '1px solid rgba(196,163,90,0.3)',
                    color: 'var(--gold)',
                    fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
                    cursor: 'none', transition: 'background 0.2s',
                  }}
                >
                  <Plus size={12} />
                  Nieuw project
                </button>
              </div>

              {data.portfolio.projects.map(project => (
                <ProjectEditor
                  key={project.id}
                  project={project}
                  onUpdate={updatePortfolioProject}
                  onRemove={removePortfolioProject}
                />
              ))}

              {data.portfolio.projects.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <Grid size={32} color="rgba(196,163,90,0.3)" style={{ margin: '0 auto 16px' }} />
                  <p style={{ fontFamily: 'Jost', fontSize: '12px', color: 'rgba(245,239,230,0.3)' }}>
                    Geen projecten. Voeg er een toe.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── MEDIA TAB ── */}
          {tab === 'media' && (
            <div>
              <SectionTitle>Hero video</SectionTitle>
              <MediaField
                label="Hero video (achtergrond)"
                value={data.home.heroVideo}
                onChange={v => updateHome({ heroVideo: v })}
                hint="Lokaal bestand in /images/ map, of externe URL"
              />

              <Divider />
              <SectionTitle>Filosofie video</SectionTitle>
              <MediaField
                label="Filosofie sectie video"
                value={data.home.philosophyVideo}
                onChange={v => updateHome({ philosophyVideo: v })}
              />

              <Divider />
              <SectionTitle>CTA video</SectionTitle>
              <MediaField
                label="Call-to-action sectie video"
                value={data.home.ctaVideo}
                onChange={v => updateHome({ ctaVideo: v })}
              />

              <Divider />
              <SectionTitle>Uitgelichte projecten (Home)</SectionTitle>
              {data.home.featuredProjects.map((proj, i) => (
                <div key={i} style={{ border: '1px solid rgba(196,163,90,0.1)', padding: '16px', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'Jost', fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.3em' }}>PROJECT {i + 1}</span>
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                      <Field
                        label="Titel"
                        value={proj.title}
                        onChange={v => {
                          const fps = [...data.home.featuredProjects];
                          fps[i] = { ...fps[i], title: v };
                          updateHome({ featuredProjects: fps });
                        }}
                      />
                      <Field
                        label="Categorie"
                        value={proj.cat}
                        onChange={v => {
                          const fps = [...data.home.featuredProjects];
                          fps[i] = { ...fps[i], cat: v };
                          updateHome({ featuredProjects: fps });
                        }}
                      />
                      <Field
                        label="Locatie"
                        value={proj.loc}
                        onChange={v => {
                          const fps = [...data.home.featuredProjects];
                          fps[i] = { ...fps[i], loc: v };
                          updateHome({ featuredProjects: fps });
                        }}
                      />
                    </div>
                    <MediaField
                      label="Afbeelding URL"
                      value={proj.img}
                      onChange={v => {
                        const fps = [...data.home.featuredProjects];
                        fps[i] = { ...fps[i], img: v };
                        updateHome({ featuredProjects: fps });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ABOUT TAB ── */}
          {tab === 'about' && (
            <div>
              <SectionTitle>Over ons pagina</SectionTitle>
              <Field label="Hero titel" value={data.about.heroTitle} onChange={v => updateAbout({ heroTitle: v })} />
              <Field label="Hero ondertitel" value={data.about.heroText} onChange={v => updateAbout({ heroText: v })} multiline />
            </div>
          )}

          {/* ── CONTACT TAB ── */}
          {tab === 'contact' && (
            <div>
              <SectionTitle>Contactgegevens</SectionTitle>
              <Field label="E-mailadres" value={data.contact.email} onChange={v => updateContact({ email: v })} />
              <Field label="Telefoonnummer" value={data.contact.phone} onChange={v => updateContact({ phone: v })} />
              <Field label="Adres" value={data.contact.address} onChange={v => updateContact({ address: v })} />
              <Field label="Stad & Postcode" value={data.contact.city} onChange={v => updateContact({ city: v })} />
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div style={{
          padding: '20px 32px',
          borderTop: '1px solid rgba(196,163,90,0.12)',
          display: 'flex', gap: '12px', alignItems: 'center',
          flexShrink: 0,
          background: '#0a0806',
        }}>
          <button
            onClick={() => { showSaved(); }}
            style={{
              flex: 1, padding: '13px',
              background: 'var(--gold)', border: 'none',
              color: 'var(--black)',
              fontFamily: 'Jost', fontSize: '9px', fontWeight: 600,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              cursor: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'opacity 0.2s',
            }}
          >
            <Save size={12} />
            Wijzigingen opslaan
          </button>
          <button
            onClick={() => setConfirmReset(!confirmReset)}
            title="Reset alles naar standaard"
            style={{
              padding: '13px',
              background: 'none',
              border: `1px solid ${confirmReset ? 'rgba(220,80,80,0.5)' : 'rgba(245,239,230,0.1)'}`,
              color: confirmReset ? 'rgba(220,80,80,0.8)' : 'rgba(245,239,230,0.3)',
              cursor: 'none',
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.2em',
              transition: 'all 0.2s',
            }}
          >
            <RotateCcw size={12} />
            {confirmReset ? 'Bevestig reset' : 'Reset'}
          </button>
          {confirmReset && (
            <button
              onClick={() => { resetAll(); setConfirmReset(false); showSaved(); }}
              style={{
                padding: '13px 16px',
                background: 'rgba(220,80,80,0.8)', border: 'none',
                color: 'white', cursor: 'none',
                fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.2em',
              }}
            >
              JA, RESET
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
