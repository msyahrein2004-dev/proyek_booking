import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input, Select } from '../../components/ui/Input';
import { Search, Filter, Calendar, Scissors, UserCheck, RefreshCw } from 'lucide-react';

export const AdminBookingsPage = () => {
  const { bookings, updateBookingStatus, updatePaymentStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [paymentFilter, setPaymentFilter] = useState('Semua');
  const [dateFilter, setDateFilter] = useState('');

  const bookingStatuses = [
    'Semua',
    'Menunggu Konfirmasi',
    'Dikonfirmasi',
    'Sedang Dilayani',
    'Selesai',
    'Dibatalkan'
  ];

  const paymentStatuses = [
    'Semua',
    'Belum Dibayar',
    'Menunggu Verifikasi',
    'Lunas',
    'Ditolak'
  ];

  const filteredBookings = bookings.filter((b) => {
    // Search match
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      b.code.toLowerCase().includes(q) ||
      b.customerName.toLowerCase().includes(q) ||
      b.barberName.toLowerCase().includes(q) ||
      b.serviceName.toLowerCase().includes(q);

    // Status match
    const matchesStatus = statusFilter === 'Semua' || b.status === statusFilter;
    const matchesPayment = paymentFilter === 'Semua' || b.paymentStatus === paymentFilter;
    const matchesDate = !dateFilter || b.date === dateFilter;

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <span style={{ color: 'var(--brand-gold)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em' }}>
          MANAJEMEN OPERASIONAL
        </span>
        <h1 style={{ fontSize: '1.75rem', marginTop: '2px' }}>
          Kelola Reservasi &amp; Antrean
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Pantau, konfirmasi, ubah status pengerjaan, dan verifikasi status pembayaran
        </p>
      </div>

      {/* Filters Bar */}
      <Card variant="surface" padding="normal" style={{ marginBottom: 'var(--space-6)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
            alignItems: 'flex-end'
          }}
        >
          <Input
            label="Cari Booking"
            placeholder="Kode KZ, Nama, Barber..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Select
            label="Filter Status Booking"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={bookingStatuses.map(s => ({ value: s, label: s }))}
          />

          <Select
            label="Filter Status Pembayaran"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            options={paymentStatuses.map(p => ({ value: p, label: p }))}
          />

          <Input
            label="Filter Tanggal"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        {(searchQuery || statusFilter !== 'Semua' || paymentFilter !== 'Semua' || dateFilter) && (
          <div style={{ marginTop: 'var(--space-3)', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('Semua');
                setPaymentFilter('Semua');
                setDateFilter('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--brand-gold)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </Card>

      {/* Bookings Table / List */}
      <Card variant="surface" padding="normal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Menampilkan <strong>{filteredBookings.length}</strong> reservasi
          </span>
        </div>

        {filteredBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)' }}>
            Tidak ada reservasi yang cocok dengan kriteria pencarian/filter.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--gray-800)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>Kode &amp; Tanggal</th>
                  <th style={{ padding: '10px 12px' }}>Pelanggan</th>
                  <th style={{ padding: '10px 12px' }}>Layanan &amp; Barber</th>
                  <th style={{ padding: '10px 12px' }}>Tarif</th>
                  <th style={{ padding: '10px 12px' }}>Status Booking</th>
                  <th style={{ padding: '10px 12px' }}>Status Bayar</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--surface-raised)' }}>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontWeight: '800', color: 'var(--brand-gold)', display: 'block' }}>{b.code}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {b.date} · {b.startTime} WIB
                      </span>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: 'var(--white)', display: 'block' }}>{b.customerName}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.customerPhone}</span>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <span style={{ color: 'var(--text-primary)', display: 'block' }}>{b.serviceName}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--brand-purple-light)' }}>
                        Barber: {b.barberName}
                      </span>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <span className="price-display" style={{ fontWeight: '700', color: 'var(--white)' }}>
                        Rp{b.priceSnapshot.toLocaleString('id-ID')}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {b.paymentMethod.includes('Transfer') ? 'Transfer' : 'Tunai'}
                      </span>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <Badge status={b.status} type="booking" />
                    </td>

                    <td style={{ padding: '12px' }}>
                      <Badge status={b.paymentStatus} type="payment" />
                    </td>

                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                        {/* Booking Status Dropdown */}
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                          style={{
                            fontSize: '0.75rem',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: 'var(--surface-raised)',
                            border: '1px solid var(--gray-800)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                          <option value="Dikonfirmasi">Dikonfirmasi</option>
                          <option value="Sedang Dilayani">Sedang Dilayani</option>
                          <option value="Selesai">Selesai</option>
                          <option value="Dibatalkan">Dibatalkan</option>
                        </select>

                        {/* Payment Status Dropdown */}
                        <select
                          value={b.paymentStatus}
                          onChange={(e) => updatePaymentStatus(b.id, e.target.value)}
                          style={{
                            fontSize: '0.75rem',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: 'var(--surface-raised)',
                            border: '1px solid var(--gray-800)',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Belum Dibayar">Belum Dibayar</option>
                          <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                          <option value="Lunas">Lunas</option>
                          <option value="Ditolak">Ditolak</option>
                        </select>
                      </div>
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
