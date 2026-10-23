import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Crown, UserPlus } from 'lucide-react';

export const RegisterPage = () => {
  const { switchRole, showToast } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Registrasi akun pelanggan berhasil (Demonstrasi Mock)!', 'success');
    switchRole('customer');
    navigate('/my-bookings');
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
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Daftar Akun Baru</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
            Bergabunglah dengan KINGZ untuk reservasi lebih cepat
          </p>
        </div>

        <Card variant="surface" padding="normal">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="Contoh: Budi Santoso"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Nomor WhatsApp / HP"
              type="tel"
              placeholder="081234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input
              label="Alamat Email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Kata Sandi"
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" style={{ width: '100%', marginTop: 'var(--space-2)' }} icon={UserPlus}>
              Buat Akun Sekarang
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--gray-800)', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Sudah memiliki akun? </span>
            <Link to="/login" style={{ color: 'var(--brand-gold)', fontWeight: '600' }}>
              Masuk di Sini
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
