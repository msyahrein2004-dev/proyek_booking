import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, Play, Check, Clock, Scissors, User, Phone, Calendar } from 'lucide-react';

export const BarberBookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, updateBookingStatus } = useApp();

  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
        <h2>Booking Tidak Ditemukan</h2>
        <Link to="/barber">
          <Button variant="secondary" style={{ marginTop: '16px' }}>Kembali ke Antrean</Button>
        </Link>
      </div>
    );
  }

  const handleStatusChange = async (newStatus) => {
    await updateBookingStatus(booking.id, newStatus);
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <Link to="/barber" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} />
          <span>Kembali ke Jadwal Antrean</span>
        </Link>
      </div>

      <Card variant="surface" padding="lg">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--gray-800)' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>KODE RESERVASI</span>
            <h1 style={{ fontSize: '1.6rem', color: 'var(--brand-gold)', fontWeight: '800' }}>
              {booking.code}
            </h1>
          </div>
          <Badge status={booking.status} type="booking" />
        </div>

        {/* Customer & Service Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={18} color="var(--brand-purple-light)" />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Pelanggan:</span>
              <strong style={{ color: 'var(--white)' }}>{booking.customerName}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Phone size={18} color="var(--brand-purple-light)" />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Nomor Telepon:</span>
              <span style={{ color: 'var(--text-secondary)' }}>{booking.customerPhone}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Scissors size={18} color="var(--brand-gold)" />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Layanan Terpilih:</span>
              <strong style={{ color: 'var(--white)' }}>{booking.serviceName}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={18} color="var(--brand-gold)" />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Jadwal &amp; Jam:</span>
              <strong style={{ color: '#4ADE80' }}>
                {booking.date} · {booking.startTime} - {booking.endTime} WIB
              </strong>
            </div>
          </div>

          {booking.notes && (
            <div style={{ padding: '12px', backgroundColor: 'var(--surface-raised)', borderRadius: '8px', borderLeft: '3px solid var(--brand-gold)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Catatan Khusus Klien:</span>
              <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', margin: '4px 0 0' }}>
                "{booking.notes}"
              </p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {booking.status === 'Dikonfirmasi' && (
            <Button
              variant="primary"
              size="lg"
              icon={Play}
              onClick={() => handleStatusChange('Sedang Dilayani')}
            >
              Mulai Layanan Sekarang
            </Button>
          )}

          {booking.status === 'Sedang Dilayani' && (
            <Button
              variant="gold"
              size="lg"
              icon={Check}
              onClick={() => handleStatusChange('Selesai')}
            >
              Selesaikan Layanan (Tandai Selesai)
            </Button>
          )}

          {booking.status === 'Selesai' && (
            <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'rgba(34, 197, 94, 0.15)', borderRadius: '8px', color: '#4ADE80', fontWeight: '600' }}>
              ✓ Layanan ini telah diselesaikan
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
