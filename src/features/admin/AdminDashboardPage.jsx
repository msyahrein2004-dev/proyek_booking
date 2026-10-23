import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getTodayDateStr } from '../../services/mockApi';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  CalendarCheck,
  Users,
  CreditCard,
  Clock,
  ArrowRight,
  Plus,
  Scissors,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { bookings, customers, services, barbers, updateBookingStatus } = useApp();

  const todayStr = getTodayDateStr();

  // Metrics
  const todayBookings = bookings.filter(b => b.date === todayStr);
  const pendingConfirmation = bookings.filter(b => b.status === 'Menunggu Konfirmasi');
  const pendingPayment = bookings.filter(b => b.paymentStatus === 'Menunggu Verifikasi');

  // Revenue received (Lunas only, per PRD Rule 9)
  const receivedRevenue = bookings
    .filter(b => b.paymentStatus === 'Lunas')
    .reduce((acc, curr) => acc + (curr.priceSnapshot || 0), 0);

  return (
    <div>
      {/* Top Banner / Heading */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ color: 'var(--brand-gold)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em' }}>
            OVERVIEW OPERASIONAL
          </span>
          <h1 style={{ fontSize: '1.75rem', marginTop: '2px' }}>
            Ringkasan Dashboard Studio
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Status harian KINGZ Barber Studio pada tanggal {todayStr}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/admin/bookings">
            <Button variant="primary" size="sm" icon={CalendarCheck}>
              Kelola Semua Booking
            </Button>
          </Link>
          <Link to="/booking">
            <Button variant="secondary" size="sm" icon={Plus}>
              Booking Manual
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Metrics Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)'
        }}
      >
        {/* Metric 1: Total Booking Hari Ini */}
        <Card variant="raised" padding="normal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Booking Hari Ini
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(109, 40, 217, 0.15)', color: 'var(--brand-purple-light)' }}>
              <Clock size={18} />
            </div>
          </div>
          <div className="metric-value" style={{ fontSize: '1.9rem', fontWeight: '800', color: 'var(--white)', marginTop: '8px' }}>
            {todayBookings.length}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--brand-purple-light)', marginTop: '4px', display: 'block' }}>
            {todayBookings.filter(b => b.status === 'Sedang Dilayani').length} sedang dilayani
          </span>
        </Card>

        {/* Metric 2: Pendapatan Lunas */}
        <Card variant="raised" padding="normal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Pendapatan Diterima
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(217, 182, 111, 0.15)', color: 'var(--brand-gold)' }}>
              <CreditCard size={18} />
            </div>
          </div>
          <div className="metric-value price-display" style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--brand-gold)', marginTop: '8px' }}>
            Rp{receivedRevenue.toLocaleString('id-ID')}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            Khusus status pembayaran "Lunas"
          </span>
        </Card>

        {/* Metric 3: Menunggu Verifikasi */}
        <Card variant="raised" padding="normal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Perlu Tindakan Admin
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(201, 52, 69, 0.15)', color: '#F87171' }}>
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="metric-value" style={{ fontSize: '1.9rem', fontWeight: '800', color: '#F87171', marginTop: '8px' }}>
            {pendingConfirmation.length + pendingPayment.length}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
            {pendingConfirmation.length} booking &amp; {pendingPayment.length} transfer
          </span>
        </Card>

        {/* Metric 4: Total Pelanggan & Barber */}
        <Card variant="raised" padding="normal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Total Pelanggan Terdaftar
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80' }}>
              <Users size={18} />
            </div>
          </div>
          <div className="metric-value" style={{ fontSize: '1.9rem', fontWeight: '800', color: '#4ADE80', marginTop: '8px' }}>
            {customers.length}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
            {barbers.filter(b => b.active).length} Master Barber aktif
          </span>
        </Card>
      </div>

      {/* Today's Schedule Table */}
      <Card variant="surface" padding="normal" style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Antrean &amp; Jadwal Hari Ini</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Daftar reservasi untuk {todayStr}</p>
          </div>
          <Link to="/admin/bookings">
            <Button variant="ghost" size="sm" icon={ArrowRight}>
              Buka Semua ({bookings.length})
            </Button>
          </Link>
        </div>

        {todayBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Belum ada booking terjadwal untuk hari ini.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--gray-800)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>Kode</th>
                  <th style={{ padding: '10px 12px' }}>Jam</th>
                  <th style={{ padding: '10px 12px' }}>Pelanggan</th>
                  <th style={{ padding: '10px 12px' }}>Layanan</th>
                  <th style={{ padding: '10px 12px' }}>Barber</th>
                  <th style={{ padding: '10px 12px' }}>Status Booking</th>
                  <th style={{ padding: '10px 12px' }}>Status Bayar</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {todayBookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--surface-raised)' }}>
                    <td style={{ padding: '12px', fontWeight: '700', color: 'var(--brand-gold)' }}>{b.code}</td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }} className="time-tag">
                      {b.startTime} - {b.endTime}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: 'var(--white)', display: 'block' }}>{b.customerName}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.customerPhone}</span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{b.serviceName}</td>
                    <td style={{ padding: '12px', color: 'var(--brand-purple-light)' }}>{b.barberName}</td>
                    <td style={{ padding: '12px' }}><Badge status={b.status} type="booking" /></td>
                    <td style={{ padding: '12px' }}><Badge status={b.paymentStatus} type="payment" /></td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      {b.status === 'Menunggu Konfirmasi' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => updateBookingStatus(b.id, 'Dikonfirmasi')}
                        >
                          Konfirmasi
                        </Button>
                      )}
                      {b.status === 'Dikonfirmasi' && (
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Siap dilayani
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
