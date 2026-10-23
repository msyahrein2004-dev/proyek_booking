import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { FileBarChart, Printer, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';

export const AdminReportsPage = () => {
  const { bookings, settings } = useApp();

  const [periodPreset, setPeriodPreset] = useState('Semua');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter bookings based on period
  const filteredBookings = bookings.filter((b) => {
    if (startDate && b.date < startDate) return false;
    if (endDate && b.date > endDate) return false;
    return true;
  });

  // Calculate metrics (Rule 9: verified/received payments only!)
  const paidBookings = filteredBookings.filter(b => b.paymentStatus === 'Lunas');
  const totalOmset = paidBookings.reduce((sum, b) => sum + (b.priceSnapshot || 0), 0);
  const completedServicesCount = filteredBookings.filter(b => b.status === 'Selesai').length;
  const avgTicket = paidBookings.length > 0 ? Math.round(totalOmset / paidBookings.length) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Title & Action */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ color: 'var(--brand-gold)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em' }}>
            LAPORAN KEUANGAN &amp; OPERASIONAL
          </span>
          <h1 style={{ fontSize: '1.75rem', marginTop: '2px' }}>
            Rekapitulasi Pendapatan &amp; Layanan
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Menghitung pendapatan yang telah sah diterima (Lunas) sesuai Aturan Bisnis PRD No. 9
          </p>
        </div>

        <Button variant="gold" icon={Printer} onClick={handlePrint} className="btn-print">
          Cetak Dokumen Laporan (Print)
        </Button>
      </div>

      {/* Filter Bar (no-print) */}
      <Card variant="surface" padding="normal" className="no-print" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', alignItems: 'flex-end' }}>
          <Input
            label="Tanggal Mulai"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <Input
            label="Tanggal Selesai"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          {(startDate || endDate) && (
            <div>
              <button
                type="button"
                onClick={() => { setStartDate(''); setEndDate(''); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--brand-gold)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  padding: '10px 0'
                }}
              >
                Reset Rentang Tanggal
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* Printable Report Document */}
      <div className="printable-report">
        {/* Printable Header */}
        <div style={{ borderBottom: '2px solid var(--gray-800)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '0.04em' }}>
                KINGZ BARBER STUDIO
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0' }}>
                {settings.address} · Telp: {settings.phone}
              </p>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Dokumen Rekapitulasi Pembayaran &amp; Reservasi Resmi
              </span>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div>Tanggal Cetak: {new Date().toLocaleDateString('id-ID')}</div>
              <div>Periode: {startDate || 'Awal'} s/d {endDate || 'Sekarang'}</div>
            </div>
          </div>
        </div>

        {/* Metrics Overview in Print / Screen */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <Card variant="raised" padding="normal">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Omset Diterima (Lunas)</span>
            <div className="metric-value price-display" style={{ fontSize: '1.7rem', fontWeight: '800', color: 'var(--brand-gold)', marginTop: '4px' }}>
              Rp{totalOmset.toLocaleString('id-ID')}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
              Dari {paidBookings.length} pembayaran sah
            </span>
          </Card>

          <Card variant="raised" padding="normal">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Layanan Selesai Dikerjakan</span>
            <div className="metric-value" style={{ fontSize: '1.7rem', fontWeight: '800', color: '#4ADE80', marginTop: '4px' }}>
              {completedServicesCount} Sesi
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
              Status "Selesai"
            </span>
          </Card>

          <Card variant="raised" padding="normal">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rata-rata Nilai Transaksi</span>
            <div className="metric-value price-display" style={{ fontSize: '1.7rem', fontWeight: '800', color: 'var(--brand-purple-light)', marginTop: '4px' }}>
              Rp{avgTicket.toLocaleString('id-ID')}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
              Per transaksi lunas
            </span>
          </Card>
        </div>

        {/* Breakdown Table */}
        <Card variant="surface" padding="normal">
          <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>
            Daftar Transaksi Rekapitulasi ({filteredBookings.length})
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--gray-800)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '8px 10px' }}>No</th>
                  <th style={{ padding: '8px 10px' }}>Kode Booking</th>
                  <th style={{ padding: '8px 10px' }}>Tanggal</th>
                  <th style={{ padding: '8px 10px' }}>Pelanggan</th>
                  <th style={{ padding: '8px 10px' }}>Layanan</th>
                  <th style={{ padding: '8px 10px' }}>Barber</th>
                  <th style={{ padding: '8px 10px' }}>Nominal</th>
                  <th style={{ padding: '8px 10px' }}>Metode</th>
                  <th style={{ padding: '8px 10px' }}>Status Bayar</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b, idx) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--surface-raised)' }}>
                    <td style={{ padding: '10px' }}>{idx + 1}</td>
                    <td style={{ padding: '10px', fontWeight: '700', color: 'var(--brand-gold)' }}>{b.code}</td>
                    <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>{b.date}</td>
                    <td style={{ padding: '10px' }}>{b.customerName}</td>
                    <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>{b.serviceName}</td>
                    <td style={{ padding: '10px' }}>{b.barberName}</td>
                    <td style={{ padding: '10px', fontWeight: '700' }} className="price-display">
                      Rp{b.priceSnapshot.toLocaleString('id-ID')}
                    </td>
                    <td style={{ padding: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {b.paymentMethod.includes('Transfer') ? 'Transfer' : 'Tunai'}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <Badge status={b.paymentStatus} type="payment" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
