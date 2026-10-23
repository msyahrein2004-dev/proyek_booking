import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/feedback/EmptyState';
import { ReviewModal } from './ReviewModal';
import {
  Calendar,
  Clock,
  Scissors,
  Star,
  XCircle,
  Plus,
  AlertTriangle
} from 'lucide-react';

export const MyBookingsPage = () => {
  const { bookings, currentCustomer, cancelBooking } = useApp();

  const [activeTab, setActiveTab] = useState('Semua'); // 'Semua' | 'Aktif' | 'Selesai' | 'Dibatalkan'
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [reviewingBooking, setReviewingBooking] = useState(null);

  // Filter bookings for current customer (or all customer bookings in demo)
  const customerBookings = bookings.filter(b => b.customerId === currentCustomer?.id);

  const filteredBookings = customerBookings.filter((b) => {
    if (activeTab === 'Semua') return true;
    if (activeTab === 'Aktif') {
      return ['Menunggu Konfirmasi', 'Dikonfirmasi', 'Sedang Dilayani'].includes(b.status);
    }
    if (activeTab === 'Selesai') return b.status === 'Selesai';
    if (activeTab === 'Dibatalkan') return b.status === 'Dibatalkan';
    return true;
  });

  const handleConfirmCancel = async () => {
    if (!cancellingBooking) return;
    try {
      await cancelBooking(cancellingBooking.id);
      setCancellingBooking(null);
    } catch (err) {
      // Handled in toast
    }
  };

  return (
    <div style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-8)',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <span style={{ color: 'var(--brand-gold)', fontSize: '0.82rem', fontWeight: '700', letterSpacing: '0.08em' }}>
              PANEL PELANGGAN
            </span>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: '2px' }}>
              Riwayat Reservasi Saya
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Memantau status, jadwal, dan riwayat booking atas nama <strong>{currentCustomer?.name}</strong>
            </p>
          </div>

          <Link to="/booking">
            <Button variant="primary" icon={Plus}>
              Reservasi Baru
            </Button>
          </Link>
        </div>

        {/* Tab Filters */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: 'var(--space-6)',
            borderBottom: '1px solid var(--gray-800)',
            paddingBottom: 'var(--space-3)',
            overflowX: 'auto'
          }}
        >
          {['Semua', 'Aktif', 'Selesai', 'Dibatalkan'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: activeTab === tab ? '700' : '500',
                backgroundColor: activeTab === tab ? 'var(--brand-purple)' : 'transparent',
                color: activeTab === tab ? 'var(--white)' : 'var(--text-secondary)',
                border: activeTab === tab ? '1px solid var(--brand-purple-light)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <EmptyState
            title="Tidak Ada Reservasi"
            description={`Tidak ditemukan reservasi untuk tab "${activeTab}".`}
            actionLabel="Buat Booking Sekarang"
            onAction={() => window.location.href = '/booking'}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {filteredBookings.map((b) => {
              const canCancel = ['Menunggu Konfirmasi', 'Dikonfirmasi'].includes(b.status);
              const canReview = b.status === 'Selesai' && !b.review;

              return (
                <Card key={b.id} variant="surface" padding="normal">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-3)',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--brand-gold)', letterSpacing: '0.04em' }}>
                        {b.code}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        Dipesan: {new Date(b.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <Badge status={b.status} type="booking" />
                      <Badge status={b.paymentStatus} type="payment" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-3) 0',
                      borderTop: '1px solid var(--gray-800)',
                      borderBottom: '1px solid var(--gray-800)',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Layanan:</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--white)' }}>{b.serviceName}</strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Master Barber:</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--brand-purple-light)' }}>{b.barberName}</strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Jadwal Kunjungan:</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--white)' }}>{b.date} ({b.startTime} - {b.endTime} WIB)</strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Biaya:</span>
                      <span className="price-display" style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--brand-gold)' }}>
                        Rp{b.priceSnapshot.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Review snippet if exists */}
                  {b.review && (
                    <div
                      style={{
                        padding: '10px 14px',
                        backgroundColor: 'var(--surface-raised)',
                        borderRadius: 'var(--radius-input)',
                        marginBottom: 'var(--space-3)',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                        {[...Array(b.review.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="var(--brand-gold)" color="var(--brand-gold)" />
                        ))}
                        <span style={{ fontSize: '0.75rem', color: 'var(--brand-gold)', fontWeight: '700', marginLeft: '4px' }}>
                          Ulasan Anda
                        </span>
                      </div>
                      <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', margin: 0 }}>
                        "{b.review.comment}"
                      </p>
                    </div>
                  )}

                  {/* Card Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                    {canReview && (
                      <Button
                        variant="gold"
                        size="sm"
                        icon={Star}
                        onClick={() => setReviewingBooking(b)}
                      >
                        Beri Ulasan Layanan
                      </Button>
                    )}

                    {canCancel && (
                      <Button
                        variant="danger"
                        size="sm"
                        icon={XCircle}
                        onClick={() => setCancellingBooking(b)}
                      >
                        Batalkan Booking
                      </Button>
                    )}

                    <Link to={`/booking/confirmation/${b.id}`}>
                      <Button variant="ghost" size="sm">
                        Rincian Tiket
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Cancellation */}
      <Modal
        isOpen={Boolean(cancellingBooking)}
        onClose={() => setCancellingBooking(null)}
        title="Konfirmasi Pembatalan Booking"
        footer={
          <>
            <Button variant="ghost" onClick={() => setCancellingBooking(null)}>
              Kembali
            </Button>
            <Button variant="danger" onClick={handleConfirmCancel}>
              Ya, Batalkan Booking Ini
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--brand-red)' }}>
            <AlertTriangle size={24} />
            <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>
              Apakah Anda yakin ingin membatalkan booking ini?
            </h4>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Kode Reservasi: <strong>{cancellingBooking?.code}</strong> ({cancellingBooking?.serviceName} pada {cancellingBooking?.date} jam {cancellingBooking?.startTime}). Slot yang dibatalkan akan dibuka kembali untuk pelanggan lain.
          </p>
        </div>
      </Modal>

      {/* Review Modal */}
      <ReviewModal
        isOpen={Boolean(reviewingBooking)}
        onClose={() => setReviewingBooking(null)}
        booking={reviewingBooking}
      />
    </div>
  );
};
