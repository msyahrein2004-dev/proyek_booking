import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { User, Phone, Mail, Award, Scissors, Check } from 'lucide-react';

export const ProfilePage = () => {
  const { currentCustomer, bookings, showToast } = useApp();

  const [name, setName] = useState(currentCustomer?.name || 'Ahmad Rizky');
  const [email, setEmail] = useState(currentCustomer?.email || 'ahmad@gmail.com');
  const [phone, setPhone] = useState(currentCustomer?.phone || '081234567890');
  const [notes, setNotes] = useState(currentCustomer?.notes || 'Lebih suka potongan rambut bagian samping sangat tipis (mid fade)');

  const customerBookings = bookings.filter(b => b.customerId === currentCustomer?.id);
  const completedCount = customerBookings.filter(b => b.status === 'Selesai').length;

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Profil pelanggan berhasil diperbarui (Prototype Sync)!', 'success');
  };

  return (
    <div style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <span style={{ color: 'var(--brand-gold)', fontSize: '0.82rem', fontWeight: '700', letterSpacing: '0.08em' }}>
            AKUN SAYA
          </span>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '2px' }}>
            Profil &amp; Preferensi Pelanggan
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Kelola data diri dan catatan gaya rambut favorit Anda
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <Card variant="raised" padding="normal">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Total Reservasi</span>
            <div className="metric-value" style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--brand-gold)', marginTop: '4px' }}>
              {customerBookings.length} Kali
            </div>
          </Card>
          <Card variant="raised" padding="normal">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Selesai Dilayani</span>
            <div className="metric-value" style={{ fontSize: '1.6rem', fontWeight: '800', color: '#4ADE80', marginTop: '4px' }}>
              {completedCount} Sesi
            </div>
          </Card>
          <Card variant="raised" padding="normal">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Status Membership</span>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--brand-purple-light)', marginTop: '6px' }}>
              KINGZ Member
            </div>
          </Card>
        </div>

        {/* Form Card */}
        <Card variant="surface" padding="normal">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Input
              label="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
              <Input
                label="Alamat Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Nomor WhatsApp / HP"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <Textarea
              label="Catatan Preferensi Gaya Rambut"
              helperText="Catatan ini otomatis terlihat oleh barber pada setiap sesi pangkas Anda."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
              <Button type="submit" variant="primary" icon={Check}>
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
