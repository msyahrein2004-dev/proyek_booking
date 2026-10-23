import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getTodayDateStr } from '../../services/mockApi';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Scissors, Clock, Calendar, CheckCircle2, Play, Check, User, ArrowRight } from 'lucide-react';

export const BarberDashboardPage = () => {
  const { currentBarber, bookings, updateBookingStatus } = useApp();
  const todayStr = getTodayDateStr();

  // Bookings assigned to current barber
  const myBookings = bookings.filter(b => b.barberId === currentBarber?.id);
  const myTodayBookings = myBookings.filter(b => b.date === todayStr);

  const currentlyServing = myTodayBookings.find(b => b.status === 'Sedang Dilayani');
  const upcomingQueue = myTodayBookings.filter(b => ['Menunggu Konfirmasi', 'Dikonfirmasi'].includes(b.status));
  const finishedToday = myTodayBookings.filter(b => b.status === 'Selesai');

  return (
    <div>
      {/* Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ color: 'var(--brand-gold)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em' }}>
            PORTAL KERJA MASTER BARBER
          </span>
          <h1 style={{ fontSize: '1.75rem', marginTop: '2px' }}>
            Halo, {currentBarber?.name}!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Jadwal pengerjaan Anda untuk hari ini ({todayStr})
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              padding: '6px 14px',
              backgroundColor: 'var(--surface-raised)',
              border: '1px solid var(--gray-800)',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)'
            }}
          >
            Jam Kerja: <strong>10.00 – 21.00 WIB</strong>
          </span>
        </div>
      </div>

      {/* Hero: Active Serving Client */}
      {currentlyServing ? (
        <Card
          variant="highlight"
          padding="normal"
          style={{
            marginBottom: 'var(--space-8)',
            border: '2px solid var(--brand-purple-light)',
            backgroundColor: 'rgba(109, 40, 217, 0.12)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#60A5FA',
                  boxShadow: '0 0 10px #60A5FA'
                }}
              />
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#93C5FD', letterSpacing: '0.05em' }}>
                SEDANG DILAYANI DI KURSI ANDA
              </span>
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Slot: {currentlyServing.startTime} – {currentlyServing.endTime} WIB
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--white)', marginBottom: '4px' }}>
                {currentlyServing.customerName}
              </h2>
              <div style={{ fontSize: '0.95rem', color: 'var(--brand-gold)', fontWeight: '600' }}>
                {currentlyServing.serviceName}
              </div>
              {currentlyServing.notes && (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', fontStyle: 'italic' }}>
                  Catatan Klien: "{currentlyServing.notes}"
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                variant="gold"
                size="lg"
                icon={Check}
                onClick={() => updateBookingStatus(currentlyServing.id, 'Selesai')}
              >
                Selesaikan Layanan
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card variant="surface" padding="normal" style={{ marginBottom: 'var(--space-8)', textAlign: 'center', border: '1px dashed var(--gray-800)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Saat ini tidak ada pelanggan yang berstatus <strong>"Sedang Dilayani"</strong>. Pilih antrean di bawah untuk memulai layanan.
          </span>
        </Card>
      )}

      {/* Upcoming Queue Section */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)' }}>
          Antrean Jadwal Hari Ini ({upcomingQueue.length} Klien Menunggu)
        </h2>

        {upcomingQueue.length === 0 ? (
          <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-dark)', borderRadius: 'var(--radius-card)', color: 'var(--text-muted)', textAlign: 'center' }}>
            Tidak ada antrean klien berikutnya untuk hari ini.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {upcomingQueue.map((b) => (
              <Card key={b.id} variant="surface" padding="normal">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'var(--surface-raised)',
                        borderRadius: '8px',
                        textAlign: 'center',
                        minWidth: '70px'
                      }}
                    >
                      <div className="time-tag" style={{ fontSize: '1.1rem', fontWeight: '800', color: '#4ADE80' }}>
                        {b.startTime}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{b.endTime}</div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--white)' }}>{b.customerName}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--brand-gold)', fontWeight: '700' }}>{b.code}</span>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {b.serviceName}
                      </span>
                      {b.notes && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Catatan: {b.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Badge status={b.status} type="booking" />

                    <Button
                      variant="primary"
                      size="sm"
                      icon={Play}
                      onClick={() => updateBookingStatus(b.id, 'Sedang Dilayani')}
                    >
                      Mulai Layanan
                    </Button>

                    <Link to={`/barber/bookings/${b.id}`}>
                      <Button variant="ghost" size="sm">
                        Rincian
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Completed Today Section */}
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)' }}>
          Riwayat Selesai Hari Ini ({finishedToday.length} Klien)
        </h2>

        {finishedToday.length === 0 ? (
          <div style={{ padding: 'var(--space-4)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Belum ada layanan yang diselesaikan hari ini.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {finishedToday.map((b) => (
              <div
                key={b.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: 'var(--surface-dark)',
                  borderRadius: 'var(--radius-input)',
                  border: '1px solid var(--gray-800)',
                  fontSize: '0.88rem'
                }}
              >
                <div>
                  <strong>{b.customerName}</strong> · {b.serviceName}
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Jam: {b.startTime} - {b.endTime} WIB · Kode: {b.code}
                  </div>
                </div>
                <Badge status={b.status} type="booking" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
