import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Input';
import { Star } from 'lucide-react';

export const ReviewModal = ({ isOpen, onClose, booking }) => {
  const { addReview } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await addReview(booking.id, rating, comment);
      onClose();
    } catch (err) {
      // Handled in context toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Beri Ulasan Layanan"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Batal
          </Button>
          <Button
            variant="gold"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={!comment.trim()}
          >
            Kirim Ulasan
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Layanan:</span>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--white)', marginTop: '2px' }}>
            {booking.serviceName} bersama {booking.barberName}
          </h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Kode: {booking.code} · Tanggal: {booking.date}
          </span>
        </div>

        {/* Star Rating Select */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
            Rating Kepuasan (1 - 5 Bintang):
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3, 4, 5].map((starVal) => {
              const active = hoverRating ? starVal <= hoverRating : starVal <= rating;
              return (
                <button
                  key={starVal}
                  type="button"
                  onMouseEnter={() => setHoverRating(starVal)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(starVal)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  aria-label={`${starVal} bintang`}
                >
                  <Star
                    size={28}
                    fill={active ? 'var(--brand-gold)' : 'none'}
                    color={active ? 'var(--brand-gold)' : 'var(--gray-600)'}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Comment Input */}
        <Textarea
          label="Komentar / Pengalaman Anda"
          placeholder="Bagikan kepuasan Anda mengenai hasil potongan rambut, kerapian, atau keramahan barber..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          required
        />
      </div>
    </Modal>
  );
};
