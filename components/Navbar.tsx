import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Materialen', path: '/materials' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className="fixed w-full z-[80] transition-all duration-700"
        style={{
          background: scrolled ? 'rgba(12,9,7,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(196,163,90,0.12)' : '1px solid transparent',
          padding: scrolled ? '16px 0' : '28px 0',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="relative z-10 group"
            style={{ cursor: 'none' }}
          >
            <span
              className="display font-light tracking-[0.5em] uppercase text-base"
              style={{ color: 'var(--ivory)', letterSpacing: '0.45em', fontSize: '15px' }}
            >
              Loving
            </span>
            <span
              className="display font-semibold tracking-[0.5em] uppercase text-base"
              style={{ color: 'var(--gold)', letterSpacing: '0.45em', fontSize: '15px' }}
            >
              woodz
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{ cursor: 'none' }}
                className="relative group"
              >
                <span
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: isActive(link.path) ? 'var(--gold)' : 'rgba(245,239,230,0.6)',
                    transition: 'color 0.3s',
                  }}
                  className="group-hover:!text-[var(--ivory)]"
                >
                  {link.name}
                </span>
                {/* Active indicator */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    height: '1px',
                    width: isActive(link.path) ? '100%' : '0',
                    background: 'var(--gold)',
                    transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  className="group-hover:!w-full"
                />
              </Link>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-6">
            <Link
              to="/contact"
              className="hidden lg:inline-block btn-luxury text-[10px]"
              style={{ padding: '11px 28px', cursor: 'none' }}
            >
              <span>Start a Project</span>
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex flex-col gap-[5px] p-2"
              style={{ cursor: 'none' }}
              aria-label="Toggle menu"
            >
              <span
                style={{
                  display: 'block', width: '28px', height: '1px',
                  background: 'var(--ivory)',
                  transform: isOpen ? 'rotate(45deg) translateY(6px)' : 'none',
                  transition: 'transform 0.3s',
                }}
              />
              <span
                style={{
                  display: 'block', width: '20px', height: '1px',
                  background: 'var(--gold)',
                  opacity: isOpen ? 0 : 1,
                  transition: 'opacity 0.3s',
                  marginLeft: 'auto',
                }}
              />
              <span
                style={{
                  display: 'block', width: '28px', height: '1px',
                  background: 'var(--ivory)',
                  transform: isOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
                  transition: 'transform 0.3s',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--black)',
          zIndex: 70,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Decorative gold line */}
        <div style={{ width: '1px', height: '60px', background: 'var(--gold)', marginBottom: '48px', opacity: 0.5 }} />

        {links.map((link, i) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            style={{
              cursor: 'none',
              display: 'block',
              padding: '16px 0',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(40px, 8vw, 72px)',
              fontWeight: 300,
              fontStyle: isActive(link.path) ? 'italic' : 'normal',
              color: isActive(link.path) ? 'var(--gold)' : 'var(--ivory)',
              letterSpacing: '0.05em',
              textAlign: 'center',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1), transform 0.6s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1)`,
            }}
          >
            {link.name}
          </Link>
        ))}

        <div style={{ width: '1px', height: '60px', background: 'var(--gold)', marginTop: '48px', opacity: 0.5 }} />

        <a
          href="mailto:info@lovingwoodz.com"
          style={{
            marginTop: '32px',
            fontFamily: 'Jost, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(245,239,230,0.4)',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.6s 0.5s',
            cursor: 'none',
          }}
        >
          info@lovingwoodz.com
        </a>
      </div>
    </>
  );
};

export default Navbar;
