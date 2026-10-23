import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Users, Search, Phone, Mail, Calendar, Eye } from 'lucide-react';

export const AdminCustomersPage = () => {
  const { customers, bookings } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const customerBookings = selectedCustomer
    ? bookings.filter(b => b.customerId === selectedCustomer.id)
    : [];

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <span style={{ color: 'var(--brand-gold)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em' }}>
          DATABASE KLIEN
        </span>
        <h1 style={{ fontSize: '1.75rem', marginTop: '2px' }}>
          Data Pelanggan Terdaftar
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Lihat riwayat pemesanan, frekuensi kedatangan, dan preferensi potongan rambut klien
        </p>
      </div>

      <Card variant="surface" padding="normal" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ maxWidth: '360px' }}>
          <Input
            label="Cari Pelanggan"
            placeholder="Cari nama, email, nomor HP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>

      <Card variant="surface" padding="normal">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gray-800)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Nama Pelanggan</th>
                <th style={{ padding: '10px 12px' }}>Kontak</th>
                <th style={{ padding: '10px 12px' }}>Total Booking</th>
                <th style={{ padding: '10px 12px' }}>Preferensi / Catatan</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((c) => {
                const totalBkg = bookings.filter(b => b.customerId === c.id).length;
                return (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--surface-raised)' }}>
                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: 'var(--white)' }}>{c.name}</strong>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{c.phone}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.email}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span className="metric-value" style={{ fontWeight: '700', color: 'var(--brand-gold)' }}>
                        {totalBkg} Reservasi
                      </span>
                    </td>
                    <td style={{ padding: '12px', maxWidth: '320px' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        {c.notes || '-'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Eye}
                        onClick={() => setSelectedCustomer(c)}
                      >
                        Riwayat
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Customer History Modal */}
      <Modal
        isOpen={Boolean(selectedCustomer)}
        onClose={() => setSelectedCustomer(null)}
        title={`Riwayat Booking: ${selectedCustomer?.name}`}
        maxWidth="680px"
        footer={
          <Button variant="ghost" onClick={() => setSelectedCustomer(null)}>
            Tutup
          </Button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ padding: '10px 14px', backgroundColor: 'var(--surface-raised)', borderRadius: '8px', fontSize: '0.85rem' }}>
            <div><strong>WhatsApp:</strong> {selectedCustomer?.phone}</div>
            <div><strong>Email:</strong> {selectedCustomer?.email}</div>
            <div style={{ marginTop: '4px' }}><strong>Preferensi:</strong> {selectedCustomer?.notes || '-'}</div>
          </div>

          <h4 style={{ fontSize: '1rem', fontWeight: '700', marginTop: '6px' }}>
            Daftar Reservasi ({customerBookings.length})
          </h4>

          {customerBookings.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Belum ada booking tercatat.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '340px', overflowY: 'auto' }}>
              {customerBookings.map((b) => (
                <div
                  key={b.id}
                  style={{
                    padding: '10px 14px',
                    backgroundColor: 'var(--surface-raised)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: '700', color: 'var(--brand-gold)' }}>{b.code}</span>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      {b.serviceName} ({b.barberName})
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {b.date} · {b.startTime} WIB
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: '4px' }}><Badge status={b.status} type="booking" /></div>
                    <span className="price-display" style={{ fontWeight: '700', color: 'var(--white)' }}>
                      Rp{b.priceSnapshot.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
