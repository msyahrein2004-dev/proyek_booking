import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Crown, Shield, User, Scissors, LogIn, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const { switchRole, showToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('ahmad@gmail.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Masuk berhasil sebagai Pelanggan (Demonstrasi Mock)', 'success');
    switchRole('customer');
    navigate('/my-bookings');
  };

  const handleQuickLogin = (role, extraId = null) => {
    if (role === 'admin') {
      navigate('/admin/login');
      return;
    }
    switchRole(role, extraId);
    if (role === 'barber') {
      navigate('/barber');
    } else {
      navigate('/my-bookings');
    }
  };

  return (
    <div style={{ padding: 'var(--space-12) var(--space-4)', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--brand-purple) 0%, #4C1D95 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-gold)',
              margin: '0 auto var(--space-4)',
              boxShadow: '0 4px 15px rgba(109, 40, 217, 0.4)'
            }}
          >
            <Crown size={26} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Masuk ke Akun KINGZ</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
            Akses riwayat booking, profil, dan reservasi Anda
          </p>
        </div>

        {/* Quick Demo Role Selector */}
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--surface-raised)',
            border: '1px solid var(--gray-800)',
            borderRadius: 'var(--radius-card)',
            marginBottom: 'var(--space-6)'
          }}
        >
          <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--brand-gold)', display: 'block', marginBottom: '8px' }}>
            DEMO ROLE SHORTCUT (PROTOTYPE):
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 4px',
                borderRadius: '8px',
                border: '1px solid var(--brand-purple)',
                backgroundColor: 'rgba(109, 40, 217, 0.15)',
                color: 'var(--white)',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <User size={16} color="var(--brand-purple-light)" />
              <span>Pelanggan</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              title="Portal Admin membutuhkan login: user mauldi & pw 123"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 4px',
                borderRadius: '8px',
                border: '1px solid var(--brand-gold)',
                backgroundColor: 'rgba(217, 182, 111, 0.15)',
                color: 'var(--brand-gold)',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Shield size={16} />
              <span>Admin 🔒</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('barber', 'bar-001')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 4px',
                borderRadius: '8px',
                border: '1px solid #60A5FA',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                color: '#93C5FD',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Scissors size={16} />
              <span>Barber</span>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <Card variant="surface" padding="normal">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Input
              label="Alamat Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Kata Sandi"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" style={{ width: '100%', marginTop: 'var(--space-2)' }} icon={LogIn}>
              Masuk Sekarang
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--gray-800)', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Belum punya akun? </span>
            <Link to="/register" style={{ color: 'var(--brand-gold)', fontWeight: '600' }}>
              Daftar Sekarang
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
