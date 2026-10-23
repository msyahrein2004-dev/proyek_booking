import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Crown,
  Calendar,
  Clock,
  Scissors,
  Sparkles,
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone
} from 'lucide-react';

export const HomePage = () => {
  const { services, barbers, bookings } = useApp();

  const featuredServices = services.slice(0, 3);
  const completedReviews = bookings
    .filter(b => b.review)
    .map(b => ({
      customerName: b.customerName,
      serviceName: b.serviceName,
      barberName: b.barberName,
      rating: b.review.rating,
      comment: b.review.comment
    }));

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(var(--space-10), 8vw, var(--space-16)) 0',
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(109, 40, 217, 0.25), transparent 70%)',
          borderBottom: '1px solid var(--gray-800)'
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(217, 182, 111, 0.1)',
              border: '1px solid rgba(217, 182, 111, 0.3)',
              color: 'var(--brand-gold)',
              fontSize: '0.85rem',
              fontWeight: '700',
              marginBottom: 'var(--space-6)'
            }}
          >
            <Crown size={16} />
            <span>PREMIUM FUTURISTIC GROOMING EXPERIENCE</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              maxWidth: '920px',
              margin: '0 auto var(--space-6)',
              color: 'var(--white)'
            }}
          >
            Potongan Rambut Presisi &amp; Perawatan Kelas Atas untuk Para <span style={{ color: 'var(--brand-gold)' }}>Raja</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              maxWidth: '680px',
              margin: '0 auto var(--space-8)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
          >
            Nikmati kemudahan reservasi online instan tanpa antre panjang. Pilih layanan favorit, tentukan master barber pilihan Anda, dan nikmati waktu perawatan terbaik.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-4)',
              flexWrap: 'wrap'
            }}
          >
            <Link to="/booking">
              <Button variant="gold" size="lg" icon={Calendar}>
                Reservasi Slot Online
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" size="lg" icon={Scissors}>
                Lihat Semua Layanan
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 'var(--space-4)',
              maxWidth: '840px',
              margin: 'var(--space-12) auto 0',
              padding: 'var(--space-6)',
              backgroundColor: 'var(--surface-dark)',
              border: '1px solid var(--gray-800)',
              borderRadius: 'var(--radius-card)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div>
              <div className="metric-value" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--white)' }}>
                100%
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Slot Terjadwal Bebas Bentrok
              </div>
            </div>
            <div>
              <div className="metric-value" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--brand-gold)' }}>
                4.9 / 5.0
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Kepuasan Pelanggan
              </div>
            </div>
            <div>
              <div className="metric-value" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--brand-purple-light)' }}>
                3 Master
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Barber Tersertifikasi
              </div>
            </div>
            <div>
              <div className="metric-value" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--white)' }}>
                10.00 – 21.00
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Buka Setiap Hari
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--gray-800)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <span style={{ color: 'var(--brand-purple-light)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
              KEUNGGULAN SISTEM KINGZ
            </span>
            <h2 style={{ fontSize: '2rem', marginTop: 'var(--space-2)' }}>
              Standar Pelayanan Masa Depan
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            <Card variant="surface" padding="lg">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(109, 40, 217, 0.15)',
                  border: '1px solid rgba(109, 40, 217, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand-purple-light)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <Calendar size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                Sistem Booking Real-Time
              </h3>
              <p style={{ fontSize: '0.92rem' }}>
                Algoritma ketersediaan otomatis menghitung durasi layanan dan jadwal barber untuk mencegah slot bentrok.
              </p>
            </Card>

            <Card variant="surface" padding="lg">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(217, 182, 111, 0.15)',
                  border: '1px solid rgba(217, 182, 111, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand-gold)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <Scissors size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                Master Barber Profesional
              </h3>
              <p style={{ fontSize: '0.92rem' }}>
                Setiap staf memiliki spesialisasi terverifikasi, mulai dari classic pompadour, skin fade presisi, hingga perapian jenggot.
              </p>
            </Card>

            <Card variant="surface" padding="lg">
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4ADE80',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                Transparansi &amp; Riwayat
              </h3>
              <p style={{ fontSize: '0.92rem' }}>
                Harga terkunci di awal tanpa biaya tersembunyi. Pelanggan dapat memantau status pengerjaan dan memberi ulasan setelah selesai.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--gray-800)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-8)',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <span style={{ color: 'var(--brand-gold)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
                MENU UNGGULAN
              </span>
              <h2 style={{ fontSize: '2rem', marginTop: 'var(--space-2)' }}>
                Layanan Terfavorit Pelanggan
              </h2>
            </div>
            <Link to="/services">
              <Button variant="ghost" icon={ArrowRight}>
                Lihat Semua ({services.length} Layanan)
              </Button>
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            {featuredServices.map((svc) => (
              <Card key={svc.id} variant="surface" padding="normal" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: 'var(--brand-purple-light)',
                      backgroundColor: 'rgba(109, 40, 217, 0.15)',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {svc.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <Clock size={14} />
                    {svc.durationMinutes} Menit
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                  {svc.name}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', flex: 1 }}>
                  {svc.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--gray-800)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Tarif Layanan</span>
                    <span className="price-display" style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--brand-gold)' }}>
                      Rp{svc.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <Link to={`/booking?serviceId=${svc.id}`}>
                    <Button variant="primary" size="sm">
                      Pilih Layanan
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Barber Team Preview */}
      <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--gray-800)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <span style={{ color: 'var(--brand-purple-light)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
              TIM MASTER BARBER
            </span>
            <h2 style={{ fontSize: '2rem', marginTop: 'var(--space-2)' }}>
              Tangan Ahli di Balik Ketajaman Gaya Anda
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            {barbers.map((b) => (
              <Card key={b.id} variant="raised" padding="normal" style={{ textAlign: 'center' }}>
                <img
                  src={b.avatar}
                  alt={b.name}
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto var(--space-4)',
                    border: '2px solid var(--brand-gold)'
                  }}
                />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{b.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--brand-gold)', fontWeight: '600', display: 'block', marginBottom: 'var(--space-3)' }}>
                  {b.role}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: 'var(--space-4)' }}>
                  <Star size={16} fill="var(--brand-gold)" color="var(--brand-gold)" />
                  <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{b.rating}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({b.reviewCount} ulasan)</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                  {b.specialties.map((spec) => (
                    <span
                      key={spec}
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--surface-dark)',
                        border: '1px solid var(--gray-800)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <Link to={`/booking?barberId=${b.id}`}>
                  <Button variant="secondary" size="sm" style={{ width: '100%' }}>
                    Booking dengan {b.name.split(' ')[0]}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      {completedReviews.length > 0 && (
        <section style={{ padding: 'var(--space-12) 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <span style={{ color: 'var(--brand-gold)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
                ULASAN PELANGGAN
              </span>
              <h2 style={{ fontSize: '2rem', marginTop: 'var(--space-2)' }}>
                Apa Kata Mereka Tentang KINGZ
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-6)'
              }}
            >
              {completedReviews.map((rev, idx) => (
                <Card key={idx} variant="surface" padding="normal">
                  <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--space-3)' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="var(--brand-gold)" color="var(--brand-gold)" />
                    ))}
                  </div>
                  <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
                    "{rev.comment}"
                  </p>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--text-secondary)' }}>{rev.customerName}</strong> · Layanan {rev.serviceName} bersama {rev.barberName}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
