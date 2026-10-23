import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Input';
import { CreditCard, CheckCircle2, XCircle, AlertCircle, DollarSign } from 'lucide-react';

export const AdminPaymentsPage = () => {
  const { bookings, updatePaymentStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filteredBookings = filterStatus === 'Semua'
    ? bookings
    : bookings.filter(b => b.paymentStatus === filterStatus);

  const pendingVerificationCount = bookings.filter(b => b.paymentStatus === 'Menunggu Verifikasi').length;
  const unpaidCount = bookings.filter(b => b.paymentStatus === 'Belum Dibayar').length;
  const totalReceived = bookings
    .filter(b => b.paymentStatus === 'Lunas')
    .reduce((acc, curr) => acc + (curr.priceSnapshot || 0), 0);

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <span style={{ color: 'var(--brand-gold)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em' }}>
          VERIFIKASI &amp; KASIR
        </span>
        <h1 style={{ fontSize: '1.75rem', marginTop: '2px' }}>
          Pencatatan &amp; Verifikasi Pembayaran
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Kelola penerimaan kas kasir dan verifikasi transfer manual rekening BCA KINGZ
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card variant="raised" padding="normal">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Menunggu Verifikasi Transfer</span>
          <div className="metric-value" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--brand-gold)', marginTop: '4px' }}>
            {pendingVerificationCount} Transaksi
          </div>
        </Card>

        <Card variant="raised" padding="normal">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Belum Dibayar (Tunai Kasir)</span>
          <div className="metric-value" style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FB923C', marginTop: '4px' }}>
            {unpaidCount} Transaksi
          </div>
        </Card>

        <Card variant="raised" padding="normal">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Penerimaan Sah (Lunas)</span>
          <div className="metric-value price-display" style={{ fontSize: '1.6rem', fontWeight: '800', color: '#4ADE80', marginTop: '4px' }}>
            Rp{totalReceived.toLocaleString('id-ID')}
          </div>
        </Card>
      </div>

      {/* Filter */}
      <Card variant="surface" padding="normal" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ maxWidth: '280px' }}>
          <Select
            label="Filter Status Pembayaran"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'Semua', label: 'Semua Status' },
              { value: 'Menunggu Verifikasi', label: 'Menunggu Verifikasi (Transfer)' },
              { value: 'Belum Dibayar', label: 'Belum Dibayar' },
              { value: 'Lunas', label: 'Lunas' },
              { value: 'Ditolak', label: 'Ditolak' }
            ]}
          />
        </div>
      </Card>

      {/* Table */}
      <Card variant="surface" padding="normal">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gray-800)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Kode Booking</th>
                <th style={{ padding: '10px 12px' }}>Tanggal</th>
                <th style={{ padding: '10px 12px' }}>Pelanggan</th>
                <th style={{ padding: '10px 12px' }}>Metode Pembayaran</th>
                <th style={{ padding: '10px 12px' }}>Jumlah Tagihan</th>
                <th style={{ padding: '10px 12px' }}>Status Pembayaran</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--surface-raised)' }}>
                  <td style={{ padding: '12px', fontWeight: '800', color: 'var(--brand-gold)' }}>
                    {b.code}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                    {b.date}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <strong style={{ color: 'var(--white)', display: 'block' }}>{b.customerName}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.customerPhone}</span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                    {b.paymentMethod}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className="price-display" style={{ fontWeight: '800', color: 'var(--white)' }}>
                      Rp{b.priceSnapshot.toLocaleString('id-ID')}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Badge status={b.paymentStatus} type="payment" />
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      {b.paymentStatus === 'Menunggu Verifikasi' && (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            icon={CheckCircle2}
                            onClick={() => updatePaymentStatus(b.id, 'Lunas')}
                          >
                            Verifikasi Lunas
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => updatePaymentStatus(b.id, 'Ditolak')}
                          >
                            Tolak
                          </Button>
                        </>
                      )}

                      {b.paymentStatus === 'Belum Dibayar' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={DollarSign}
                          onClick={() => updatePaymentStatus(b.id, 'Lunas')}
                        >
                          Catat Tunai Lunas
                        </Button>
                      )}

                      {b.paymentStatus === 'Lunas' && (
                        <span style={{ fontSize: '0.78rem', color: '#4ADE80', fontWeight: '600', padding: '4px 8px' }}>
                          ✓ Terverifikasi
                        </span>
                      )}

                      {b.paymentStatus === 'Ditolak' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updatePaymentStatus(b.id, 'Menunggu Verifikasi')}
                        >
                          Ulangi
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
