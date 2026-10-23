import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Star, Calendar, Check, Clock, Scissors } from 'lucide-react';

export const BarbersPage = () => {
  const { barbers } = useApp();

  const dayNames = {
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat',
    6: 'Sabtu',
    7: 'Minggu'
  };

  return (
    <div style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-10)' }}>
          <span style={{ color: 'var(--brand-gold)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
            MASTER STYLIST &amp; BARBER
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            Tim Profesional KINGZ Studio
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Pilih barber sesuai gaya dan preferensi potongan rambut Anda. Setiap staf memiliki keahlian khusus dan jam kerja fleksibel.
          </p>
        </div>

        {/* Barbers Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 'var(--space-8)'
          }}
        >
          {barbers.map((b) => (
            <Card
              key={b.id}
              variant="surface"
              padding="lg"
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'var(--space-4)' }}>
                <img
                  src={b.avatar}
                  alt={b.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    border: '2px solid var(--brand-purple-light)'
                  }}
                />
                <div>
                  <h2 style={{ fontSize: '1.25rem', marginBottom: '2px' }}>{b.name}</h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--brand-gold)', fontWeight: '600', display: 'block' }}>
                    {b.role}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <Star size={15} fill="var(--brand-gold)" color="var(--brand-gold)" />
                    <span style={{ fontWeight: '700', fontSize: '0.88rem' }}>{b.rating}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({b.reviewCount} ulasan)</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', flex: 1, lineHeight: 1.6 }}>
                {b.bio}
              </p>

              {/* Specialties */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Spesialisasi:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {b.specialties.map((spec) => (
                    <span
                      key={spec}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--surface-raised)',
                        border: '1px solid var(--gray-800)',
                        color: 'var(--brand-purple-light)'
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Schedule */}
              <div
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: 'var(--surface-raised)',
                  borderRadius: 'var(--radius-input)',
                  marginBottom: 'var(--space-6)',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <Calendar size={14} color="var(--brand-gold)" />
                  <span>Hari Kerja:</span>
                </div>
                <span style={{ fontWeight: '600', color: 'var(--white)' }}>
                  {b.workingDays.map(d => dayNames[d]).join(', ')}
                </span>
              </div>

              <Link to={`/booking?barberId=${b.id}`}>
                <Button variant="primary" style={{ width: '100%' }} icon={Scissors}>
                  Reservasi dengan {b.name.split(' ')[0]}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
