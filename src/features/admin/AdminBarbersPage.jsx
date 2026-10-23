import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Users, Edit2, Star, Calendar, Check, Scissors } from 'lucide-react';

export const AdminBarbersPage = () => {
  const { barbers, updateBarber } = useApp();

  const [editingBarber, setEditingBarber] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [specialtiesText, setSpecialtiesText] = useState('');
  const [bio, setBio] = useState('');
  const [workingDays, setWorkingDays] = useState([]);

  const dayOptions = [
    { value: 1, label: 'Senin' },
    { value: 2, label: 'Selasa' },
    { value: 3, label: 'Rabu' },
    { value: 4, label: 'Kamis' },
    { value: 5, label: 'Jumat' },
    { value: 6, label: 'Sabtu' },
    { value: 7, label: 'Minggu' }
  ];

  const handleOpenEdit = (b) => {
    setEditingBarber(b);
    setName(b.name);
    setRole(b.role);
    setSpecialtiesText(b.specialties.join(', '));
    setBio(b.bio);
    setWorkingDays(b.workingDays || []);
  };

  const toggleDay = (dayVal) => {
    if (workingDays.includes(dayVal)) {
      setWorkingDays(workingDays.filter(d => d !== dayVal));
    } else {
      setWorkingDays([...workingDays, dayVal].sort());
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editingBarber) return;

    const specialties = specialtiesText.split(',').map(s => s.trim()).filter(Boolean);

    updateBarber(editingBarber.id, {
      name,
      role,
      specialties,
      bio,
      workingDays
    });

    setEditingBarber(null);
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <span style={{ color: 'var(--brand-gold)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em' }}>
          DATA STAF &amp; TENAGA AHLI
        </span>
        <h1 style={{ fontSize: '1.75rem', marginTop: '2px' }}>
          Kelola Tim Master Barber
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Atur spesialisasi pemotongan rambut, jadwal kerja mingguan, dan profil barber
        </p>
      </div>

      {/* Barbers Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-6)'
        }}
      >
        {barbers.map((b) => (
          <Card key={b.id} variant="surface" padding="normal" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'var(--space-4)' }}>
              <img
                src={b.avatar}
                alt={b.name}
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '14px',
                  objectFit: 'cover',
                  border: '2px solid var(--brand-gold)'
                }}
              />
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>{b.name}</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--brand-purple-light)', fontWeight: '600', display: 'block' }}>
                  {b.role}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  ⭐ {b.rating} ({b.reviewCount} ulasan)
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', flex: 1 }}>
              {b.bio}
            </p>

            <div style={{ marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Spesialisasi:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {b.specialties.map(spec => (
                  <span
                    key={spec}
                    style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--surface-raised)',
                      border: '1px solid var(--gray-800)',
                      color: 'var(--white)'
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Hari Kerja Aktif:
              </span>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {dayOptions.map(day => {
                  const isWork = b.workingDays.includes(day.value);
                  return (
                    <span
                      key={day.value}
                      style={{
                        fontSize: '0.7rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: isWork ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
                        color: isWork ? '#4ADE80' : 'var(--gray-600)',
                        border: isWork ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid var(--gray-800)'
                      }}
                    >
                      {day.label.slice(0, 3)}
                    </span>
                  );
                })}
              </div>
            </div>

            <div style={{ paddingTop: 'var(--space-3)', borderTop: '1px solid var(--gray-800)', display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="secondary" size="sm" icon={Edit2} onClick={() => handleOpenEdit(b)}>
                Edit Profil Barber
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Barber Modal */}
      <Modal
        isOpen={Boolean(editingBarber)}
        onClose={() => setEditingBarber(null)}
        title="Edit Profil &amp; Jadwal Barber"
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditingBarber(null)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Simpan Perubahan
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Input
            label="Nama Master Barber"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Jabatan / Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />

          <Input
            label="Spesialisasi (Pisahkan dengan koma)"
            placeholder="Contoh: Classic Cut, Modern Fade, Beard Sculpting"
            value={specialtiesText}
            onChange={(e) => setSpecialtiesText(e.target.value)}
            required
          />

          <Textarea
            label="Bio Singkat"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Pilih Hari Kerja Aktif:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {dayOptions.map(day => {
                const checked = workingDays.includes(day.value);
                return (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => toggleDay(day.value)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: checked ? '700' : '500',
                      border: checked ? '1px solid var(--brand-purple-light)' : '1px solid var(--gray-800)',
                      backgroundColor: checked ? 'var(--brand-purple)' : 'var(--surface-raised)',
                      color: checked ? 'var(--white)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
