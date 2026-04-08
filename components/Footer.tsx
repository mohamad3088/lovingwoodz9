import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import AdminPanel from './AdminPanel';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { isLoggedIn, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const navCols = [
    {
      label: 'Navigatie',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Materialen', path: '/materials' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      label: 'Contact',
      links: [
        { name: 'info@lovingwoodz.com', path: 'mailto:info@lovingwoodz.com', ext: true },
        { name: '+31 6 45066847', path: 'tel:+31645066847', ext: true },
        { name: '@lovingwoodz', path: 'https://www.instagram.com/lovingwoodz/', ext: true },
      ],
    },
  ];

  return (
    <footer style={{ background: 'var(--deep)', borderTop: '1px solid rgba(196,163,90,0.12)' }}>

      {/* Main footer */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(64px, 8vw, 100px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', alignItems: 'start' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '24px', cursor: 'none', textDecoration: 'none' }}>
              <span className="display" style={{ fontSize: '28px', fontWeight: 300, color: 'var(--ivory)', letterSpacing: '0.1em' }}>
                Loving
              </span>
              <span className="display" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.1em' }}>
                woodz
              </span>
            </Link>
            <p style={{ fontFamily: 'Jost', fontSize: '13px', lineHeight: 1.8, color: 'rgba(245,239,230,0.45)', fontWeight: 300, maxWidth: '240px' }}>
              Interieurs voor de mooiste momenten in je leven. Ambachtelijk vakmanschap en de trots van maatwerk.
            </p>

            {/* Divider */}
            <div style={{ height: '1px', width: '48px', background: 'var(--gold)', margin: '32px 0' }} />

            {/* Studio info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontFamily: 'Jost', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>Studio & Werkplaats</span>
              <span style={{ fontFamily: 'Jost', fontSize: '13px', color: 'rgba(245,239,230,0.5)', fontWeight: 300 }}>Nijverheidsweg 24</span>
              <span style={{ fontFamily: 'Jost', fontSize: '13px', color: 'rgba(245,239,230,0.5)', fontWeight: 300 }}>6163 BZ, Geleen</span>
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map((col, ci) => (
            <div key={ci}>
              <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '24px' }}>
                {col.label}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {col.links.map((link, li) => (
                  ('ext' in link && link.ext) ? (
                    <a
                      key={li}
                      href={link.path}
                      target={link.path.startsWith('http') ? '_blank' : undefined}
                      rel={link.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="gold-link"
                      style={{ fontFamily: 'Jost', fontSize: '13px', color: 'rgba(245,239,230,0.55)', fontWeight: 300, textDecoration: 'none', cursor: 'none' }}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={li}
                      to={link.path}
                      className="gold-link"
                      style={{ fontFamily: 'Jost', fontSize: '13px', color: 'rgba(245,239,230,0.55)', fontWeight: 300, textDecoration: 'none', cursor: 'none' }}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}

          {/* Hours */}
          <div>
            <span style={{ fontFamily: 'Jost', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '24px' }}>
              Openingstijden
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontFamily: 'Jost', fontSize: '13px', color: 'rgba(245,239,230,0.55)', fontWeight: 300 }}>Ma – Vr: 08:00 – 16:30</span>
              <span style={{ fontFamily: 'Jost', fontSize: '11px', color: 'rgba(245,239,230,0.3)', fontWeight: 300, lineHeight: 1.6, fontStyle: 'italic', marginTop: '8px' }}>
                Graag vooraf een afspraak zodat we je goed kunnen ontvangen.
              </span>
            </div>

            {/* WhatsApp quick link */}
            <a
              href="https://wa.me/31645066847"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                marginTop: '32px',
                padding: '10px 20px',
                border: '1px solid rgba(196,163,90,0.3)',
                color: 'var(--gold)',
                fontFamily: 'Jost', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase',
                textDecoration: 'none', cursor: 'none',
                transition: 'border-color 0.3s, color 0.3s',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(196,163,90,0.1)', padding: '24px clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: 'Jost', fontSize: '11px', color: 'rgba(245,239,230,0.3)', fontWeight: 300 }}>
            © {year} Lovingwoodz. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {['Privacy Policy', 'Algemene Voorwaarden'].map((t, i) => (
              <a
                key={i} href="#"
                style={{ fontFamily: 'Jost', fontSize: '11px', color: 'rgba(245,239,230,0.3)', fontWeight: 300, textDecoration: 'none', cursor: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = 'rgba(245,239,230,0.6)'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(245,239,230,0.3)'}
              >
                {t}
              </a>
            ))}

            {/* ── Owner Login Button ── */}
            {isLoggedIn ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => setShowAdmin(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'rgba(196,163,90,0.08)',
                    border: '1px solid rgba(196,163,90,0.25)',
                    padding: '6px 12px',
                    cursor: 'none',
                    fontFamily: 'Jost', fontSize: '9px',
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: 'var(--gold)',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(196,163,90,0.15)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(196,163,90,0.08)'; }}
                >
                  <Lock size={10} />
                  Beheer
                </button>
                <button
                  onClick={logout}
                  title="Uitloggen"
                  style={{
                    display: 'flex', alignItems: 'center',
                    background: 'none',
                    border: '1px solid rgba(245,239,230,0.1)',
                    padding: '6px 8px',
                    cursor: 'none',
                    color: 'rgba(245,239,230,0.25)',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,239,230,0.6)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,239,230,0.25)'; }}
                >
                  <LogOut size={10} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  background: 'none', border: 'none',
                  cursor: 'none',
                  fontFamily: 'Jost', fontSize: '10px',
                  color: 'rgba(245,239,230,0.18)',
                  letterSpacing: '0.2em',
                  transition: 'color 0.3s',
                  padding: '4px 0',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,239,230,0.45)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,239,230,0.18)'; }}
              >
                <Lock size={9} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </footer>
  );
};

export default Footer;
