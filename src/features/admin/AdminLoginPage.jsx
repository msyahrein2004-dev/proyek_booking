import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Shield, Lock, User, AlertCircle, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';

export const AdminLoginPage = () => {
  const { adminAuth, loginAdmin } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to /admin
  React.useEffect(() => {
    if (adminAuth?.isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [adminAuth, navigate]);

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(username, password);
      setIsLoading(false);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMessage(res.error || 'Autentikasi gagal.');
      }
    }, 400);
  };

  const fillDemoCredentials = () => {
    setUsername('mauldi');
    setPassword('123');
    setErrorMessage('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--brand-black)',
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(109, 40, 217, 0.18), transparent 60%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6) var(--space-4)'
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'var(--brand-purple)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-gold)',
              boxShadow: '0 0 25px rgba(109, 40, 217, 0.45)',
              border: '1px solid rgba(217, 182, 111, 0.3)',
              marginBottom: 'var(--space-4)'
            }}
          >
            <Shield size={30} strokeWidth={2.2} />
          </div>

          <h1 style={{ fontSize: '1.65rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--white)' }}>
            PORTAL ADMINISTRASI
          </h1>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: 'var(--brand-gold)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: '4px'
            }}
          >
            KINGZ Operasional &amp; Manajemen
          </span>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Area akses terbatas untuk staf pengelola studio.
          </p>
        </div>

        {/* Login Box */}
        <Card variant="raised" padding="lg" style={{ border: '1px solid var(--gray-800)', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}>
          {errorMessage && (
            <div
              style={{
                backgroundColor: 'rgba(201, 52, 69, 0.12)',
                border: '1px solid var(--brand-red)',
                borderRadius: 'var(--radius-input)',
                padding: 'var(--space-3) var(--space-4)',
                marginBottom: 'var(--space-5)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#FCA5A5',
                fontSize: '0.85rem'
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Input
              label="Username Admin"
              type="text"
              placeholder="Masukkan username admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />

            <div style={{ position: 'relative' }}>
              <Input
                label="Kata Sandi (Password)"
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan kata sandi admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '38px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                {showPassword ? 'Sembunyikan' : 'Lihat'}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              style={{
                width: '100%',
                marginTop: 'var(--space-2)',
                background: 'linear-gradient(135deg, var(--brand-purple) 0%, #4C1D95 100%)',
                boxShadow: '0 4px 15px rgba(109, 40, 217, 0.4)'
              }}
              icon={KeyRound}
            >
              {isLoading ? 'Memverifikasi Kredensial...' : 'Masuk ke Portal Admin'}
            </Button>
          </form>

          {/* Demonstration Helper Box */}
          <div
            style={{
              marginTop: 'var(--space-6)',
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: 'rgba(217, 182, 111, 0.08)',
              border: '1px dashed rgba(217, 182, 111, 0.35)',
              borderRadius: 'var(--radius-input)',
              fontSize: '0.8rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontWeight: '700', color: 'var(--brand-gold)' }}>Kredensial Resmi Admin:</span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--white)',
                  textDecoration: 'underline',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Isi Otomatis
              </button>
            </div>
            <div style={{ color: 'var(--text-secondary)', display: 'flex', gap: '16px' }}>
              <span>User: <strong style={{ color: 'var(--white)' }}>mauldi</strong></span>
              <span>Password: <strong style={{ color: 'var(--white)' }}>123</strong></span>
            </div>
          </div>
        </Card>

        {/* Back to public link */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              transition: 'color var(--transition-fast)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Website Utama KINGZ</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
