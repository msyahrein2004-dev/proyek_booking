import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckCircle2, Calendar, Clock, Scissors, CreditCard, ArrowRight, Home, Copy } from 'lucide-react';

export const BookingConfirmationPage = () => {
  const { id } = useParams();
  const { bookings, showToast } = useApp();

  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return (
      <div className="container" style={{ padding: 'var(--space-12) 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-4)' }}>Booking Tidak Ditemukan</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
          ID pemesanan tidak ditemukan dalam data demonstrasi.
        </p>
        <Link to="/booking">
          <Button variant="primary">Buat Booking Baru</Button>
        </Link>
      </div>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(booking.code);
    showToast(`Kode booking ${booking.code} disalin ke clipboard!`, 'success');
  };

  return (
    <div style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        {/* Success Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              border: '2px solid rgba(34, 197, 94, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4ADE80',
              margin: '0 auto var(--space-4)'
            }}
          >
            <CheckCircle2 size={36} />
          </div>
          <span style={{ color: '#4ADE80', fontSize: '0.88rem', fontWeight: '700', letterSpacing: '0.05em' }}>
            RESERVASI BERHASIL DIBUAT
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', marginTop: '4px' }}>
            Terima Kasih, {booking.customerName}!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Slot Anda telah tercatat dalam sistem KINGZ Studio. Silakan simpan kode booking Anda.
          </p>
        </div>

        {/* Booking Code Card */}
        <Card variant="raised" padding="normal" style={{ textAlign: 'center', marginBottom: 'var(--space-6)', border: '1px solid var(--brand-gold)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            KODE RESERVASI RESMI
          </span>
          <div
            style={{
              fontSize: '2rem',
              fontWeight: '800',
              letterSpacing: '0.1em',
              color: 'var(--brand-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <span>{booking.code}</span>
            <button
              onClick={handleCopyCode}
              title="Salin kode booking"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                padding: '4px'
              }}
            >
              <Copy size={18} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
            <Badge status={booking.status} type="booking" />
            <Badge status={booking.paymentStatus} type="payment" />
          </div>
        </Card>

        {/* Detailed Summary */}
        <Card variant="surface" padding="normal" style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--gray-800)' }}>
            Rincian Jadwal &amp; Layanan
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Scissors size={15} /> Layanan:
              </span>
              <strong style={{ color: 'var(--white)' }}>{booking.serviceName}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Scissors size={15} /> Barber:
              </span>
              <strong style={{ color: 'var(--brand-gold)' }}>{booking.barberName}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={15} /> Tanggal:
              </span>
              <strong style={{ color: 'var(--white)' }}>{booking.date}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={15} /> Jam Kedatangan:
              </span>
              <strong style={{ color: '#4ADE80' }}>{booking.startTime} – {booking.endTime} WIB</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={15} /> Metode Bayar:
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>{booking.paymentMethod}</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--gray-800)',
                marginTop: 'var(--space-2)'
              }}
            >
              <span style={{ fontWeight: '700' }}>Total Biaya (Price Snapshot):</span>
              <span className="price-display" style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--brand-gold)' }}>
                Rp{booking.priceSnapshot.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <div
          style={{
            padding: 'var(--space-4) var(--space-5)',
            backgroundColor: 'var(--surface-raised)',
            borderRadius: 'var(--radius-input)',
            border: '1px solid var(--gray-800)',
            marginBottom: 'var(--space-8)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}
        >
          <strong style={{ color: 'var(--white)', display: 'block', marginBottom: '4px' }}>
            Petunjuk Kehadiran:
          </strong>
          Harap tiba di studio KINGZ (Jl. Senopati No. 88, Kebayoran Baru) paling lambat 10 menit sebelum jam {booking.startTime} WIB. Tunjukkan kode reservasi <strong>{booking.code}</strong> kepada resepsionis kami.
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/my-bookings">
            <Button variant="primary" icon={ArrowRight}>
              Lihat Riwayat Booking Saya
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" icon={Home}>
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
