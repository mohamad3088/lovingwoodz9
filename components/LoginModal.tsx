import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ onClose }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate short delay for UX
    await new Promise(r => setTimeout(r, 600));

    const ok = login(username, password);
    if (ok) {
      onClose();
    } else {
      setError('Ongeldige gebruikersnaam of wachtwoord.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(12,9,7,0.88)',
          backdropFilter: 'blur(20px)',
          cursor: 'none',
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: '420px',
          background: '#0f0b09',
          border: '1px solid rgba(196,163,90,0.2)',
          padding: '56px 48px',
          animation: shake ? 'shake 0.4s ease' : 'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            width: '32px', height: '32px',
            border: '1px solid rgba(245,239,230,0.1)',
            background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'none', color: 'rgba(245,239,230,0.4)',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ivory)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(245,239,230,0.3)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,239,230,0.4)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(245,239,230,0.1)'; }}
        >
          <X size={14} />
        </button>

        {/* Lock icon */}
        <div style={{
          width: '48px', height: '48px',
          border: '1px solid rgba(196,163,90,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '32px',
        }}>
          <Lock size={18} color="var(--gold)" />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '28px', fontWeight: 400, fontStyle: 'italic',
          color: 'var(--ivory)', marginBottom: '8px',
        }}>
          Owner Access
        </h2>
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '11px', letterSpacing: '0.2em',
          color: 'rgba(245,239,230,0.35)', marginBottom: '40px',
          textTransform: 'uppercase',
        }}>
          Beheer uw website
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Username */}
          <div>
            <label style={{
              fontFamily: 'Jost, sans-serif', fontSize: '9px',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(245,239,230,0.4)', display: 'block', marginBottom: '10px',
            }}>
              Gebruikersnaam
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              style={{
                width: '100%', padding: '14px 16px',
                background: 'rgba(245,239,230,0.04)',
                border: `1px solid ${error ? 'rgba(220,80,80,0.5)' : 'rgba(196,163,90,0.2)'}`,
                color: 'var(--ivory)',
                fontFamily: 'Jost, sans-serif', fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
                cursor: 'none',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(196,163,90,0.5)')}
              onBlur={e => (e.target.style.borderColor = error ? 'rgba(220,80,80,0.5)' : 'rgba(196,163,90,0.2)')}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label style={{
              fontFamily: 'Jost, sans-serif', fontSize: '9px',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(245,239,230,0.4)', display: 'block', marginBottom: '10px',
            }}>
              Wachtwoord
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                style={{
                  width: '100%', padding: '14px 48px 14px 16px',
                  background: 'rgba(245,239,230,0.04)',
                  border: `1px solid ${error ? 'rgba(220,80,80,0.5)' : 'rgba(196,163,90,0.2)'}`,
                  color: 'var(--ivory)',
                  fontFamily: 'Jost, sans-serif', fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                  cursor: 'none',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(196,163,90,0.5)')}
                onBlur={e => (e.target.style.borderColor = error ? 'rgba(220,80,80,0.5)' : 'rgba(196,163,90,0.2)')}
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  color: 'rgba(245,239,230,0.3)', cursor: 'none',
                  display: 'flex', alignItems: 'center',
                }}
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p style={{
              fontFamily: 'Jost, sans-serif', fontSize: '11px',
              color: 'rgba(220,80,80,0.8)', margin: 0,
              letterSpacing: '0.05em',
            }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              padding: '15px 32px',
              background: loading ? 'rgba(196,163,90,0.4)' : 'var(--gold)',
              border: 'none',
              color: 'var(--black)',
              fontFamily: 'Jost, sans-serif',
              fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'none',
              transition: 'background 0.2s, opacity 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: '12px', height: '12px',
                  border: '2px solid rgba(12,9,7,0.3)',
                  borderTopColor: 'var(--black)',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                  display: 'inline-block',
                }} />
                Inloggen...
              </>
            ) : 'Inloggen'}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginModal;
