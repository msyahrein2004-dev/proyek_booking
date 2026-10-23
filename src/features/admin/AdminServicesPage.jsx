import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Scissors, Plus, Edit2, Trash2, Clock, Check } from 'lucide-react';

export const AdminServicesPage = () => {
  const { services, createService, updateService, deleteService } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Haircut');
  const [price, setPrice] = useState(75000);
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [description, setDescription] = useState('');
  const [popular, setPopular] = useState(false);

  const categories = ['Haircut', 'Combo', 'Premium', 'Coloring', 'Treatment'];

  const handleOpenAdd = () => {
    setEditingService(null);
    setName('');
    setCategory('Haircut');
    setPrice(75000);
    setDurationMinutes(45);
    setDescription('');
    setPopular(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (svc) => {
    setEditingService(svc);
    setName(svc.name);
    setCategory(svc.category);
    setPrice(svc.price);
    setDurationMinutes(svc.durationMinutes);
    setDescription(svc.description);
    setPopular(Boolean(svc.popular));
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name,
      category,
      price: Number(price),
      durationMinutes: Number(durationMinutes),
      description,
      popular
    };

    if (editingService) {
      updateService(editingService.id, payload);
    } else {
      createService(payload);
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deletingService) {
      deleteService(deletingService.id);
      setDeletingService(null);
    }
  };

  return (
    <div>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ color: 'var(--brand-gold)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em' }}>
            KATALOG &amp; HARGA
          </span>
          <h1 style={{ fontSize: '1.75rem', marginTop: '2px' }}>
            Kelola Layanan Cukur &amp; Perawatan
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Atur tarif, durasi pengerjaan, dan deskripsi katalog yang tampil di website publik
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={handleOpenAdd}>
          Tambah Layanan Baru
        </Button>
      </div>

      {/* Services Table */}
      <Card variant="surface" padding="normal">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gray-800)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Nama Layanan</th>
                <th style={{ padding: '10px 12px' }}>Kategori</th>
                <th style={{ padding: '10px 12px' }}>Durasi</th>
                <th style={{ padding: '10px 12px' }}>Tarif</th>
                <th style={{ padding: '10px 12px' }}>Badge</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.id} style={{ borderBottom: '1px solid var(--surface-raised)' }}>
                  <td style={{ padding: '12px' }}>
                    <strong style={{ color: 'var(--white)', display: 'block' }}>{svc.name}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '380px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {svc.description}
                    </span>
                  </td>

                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: 'var(--brand-purple-light)',
                        backgroundColor: 'rgba(109, 40, 217, 0.15)',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {svc.category}
                    </span>
                  </td>

                  <td style={{ padding: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {svc.durationMinutes} Menit
                  </td>

                  <td style={{ padding: '12px' }}>
                    <span className="price-display" style={{ fontWeight: '800', color: 'var(--brand-gold)' }}>
                      Rp{svc.price.toLocaleString('id-ID')}
                    </span>
                  </td>

                  <td style={{ padding: '12px' }}>
                    {svc.popular ? (
                      <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--brand-gold)', color: 'var(--brand-black)', fontWeight: '800', padding: '2px 8px', borderRadius: '10px' }}>
                        Terfavorit
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reguler</span>
                    )}
                  </td>

                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <Button variant="secondary" size="sm" icon={Edit2} onClick={() => handleOpenEdit(svc)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" icon={Trash2} onClick={() => setDeletingService(svc)}>
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'Edit Layanan' : 'Tambah Layanan Baru'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {editingService ? 'Simpan Perubahan' : 'Tambahkan Layanan'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Input
            label="Nama Layanan"
            placeholder="Contoh: Classic Gentleman Haircut"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>
            <Select
              label="Kategori"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categories.map(c => ({ value: c, label: c }))}
            />

            <Input
              label="Tarif (Rupiah)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <Input
              label="Durasi (Menit)"
              type="number"
              step="5"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              required
            />
          </div>

          <Textarea
            label="Deskripsi Layanan"
            placeholder="Jelaskan detail pengerjaan, manfaat, dan produk yang digunakan..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
            <input
              type="checkbox"
              checked={popular}
              onChange={(e) => setPopular(e.target.checked)}
            />
            <span>Tandai sebagai Layanan Terfavorit (Popular Badge)</span>
          </label>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deletingService)}
        onClose={() => setDeletingService(null)}
        title="Hapus Layanan dari Katalog"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeletingService(null)}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Ya, Hapus Layanan Ini
            </Button>
          </>
        }
      >
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Apakah Anda yakin ingin menghapus layanan <strong>{deletingService?.name}</strong>? Layanan ini tidak akan lagi muncul dalam opsi booking pelanggan.
        </p>
      </Modal>
    </div>
  );
};
