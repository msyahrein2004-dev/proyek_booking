import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Clock, Calendar, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const AdminSchedulesPage = () => {
  const { settings, barbers, showToast } = useApp();

  const [holidays, setHolidays] = useState(settings.holidays || ['2026-12-25', '2026-01-01']);
  const [newHoliday, setNewHoliday] = useState('');

  const handleAddHoliday = (e) => {
    e.preventDefault();
    if (!newHoliday) return;
    if (holidays.includes(newHoliday)) {
      showToast('Tanggal libur ini sudah ada dalam daftar.', 'error');
      return;
    }
    setHolidays([...holidays, newHoliday]);
    setNewHoliday('');
    showToast(`Tanggal libur ${newHoliday} berhasil ditambahkan (Demo Sync)!`, 'success');
  };

  const handleRemoveHoliday = (dateStr) => {
    setHolidays(holidays.filter(h => h !== dateStr));
    showToast(`Tanggal libur ${dateStr} dihapus.`, 'info');
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <span style={{ color: 'var(--brand-gold)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em' }}>
          PENGATURAN OPERASIONAL
        </span>
        <h1 style={{ fontSize: '1.75rem', marginTop: '2px' }}>
          Jadwal &amp; Jam Operasional Studio
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Atur jam buka, interval slot booking, dan tanggal libur toko untuk mencegah booking otomatis
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        {/* Operating Hours Card */}
        <Card variant="surface" padding="normal">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-4)' }}>
            <Clock size={20} color="var(--brand-gold)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: '700' }}>Jam Buka Toko (Regular Hours)</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'var(--surface-raised)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Jam Buka:</span>
              <strong style={{ color: 'var(--white)' }}>{settings.openingHours.start} WIB</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'var(--surface-raised)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Jam Tutup:</span>
              <strong style={{ color: 'var(--white)' }}>{settings.openingHours.end} WIB</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'var(--surface-raised)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Interval Slot Reservasi:</span>
              <strong style={{ color: 'var(--brand-purple-light)' }}>{settings.openingHours.slotIntervalMinutes} Menit</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'var(--surface-raised)', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Batas Maksimal Batal:</span>
              <strong style={{ color: 'var(--brand-gold)' }}>{settings.cancellationCutoffHours} Jam Sebelum Jadwal</strong>
            </div>
          </div>
        </Card>

        {/* Holidays / Blackout Dates */}
        <Card variant="surface" padding="normal">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-4)' }}>
            <Calendar size={20} color="var(--brand-red)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: '700' }}>Tanggal Libur (Toko Tutup)</h2>
          </div>

          <form onSubmit={handleAddHoliday} style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-4)' }}>
            <Input
              type="date"
              value={newHoliday}
              onChange={(e) => setNewHoliday(e.target.value)}
              placeholder="Pilih tanggal libur"
            />
            <Button type="submit" variant="primary" icon={Plus}>
              Tambah
            </Button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {holidays.map((hDate) => (
              <div
                key={hDate}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: 'var(--surface-raised)',
                  borderRadius: '6px',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--brand-red)' }} />
                  <strong>{hDate}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    (Slot booking otomatis tertutup)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveHoliday(hDate)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--brand-red)',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  title="Hapus tanggal libur"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
