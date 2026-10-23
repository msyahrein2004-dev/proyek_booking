import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Clock, Scissors, Check, Sparkles, Filter } from 'lucide-react';

export const ServicesPage = () => {
  const { services } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Haircut', 'Combo', 'Premium', 'Coloring', 'Treatment'];

  const filteredServices = selectedCategory === 'Semua'
    ? services.filter(s => s.active)
    : services.filter(s => s.active && s.category === selectedCategory);

  return (
    <div style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-8)' }}>
          <span style={{ color: 'var(--brand-gold)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
            KATALOG &amp; TARIF RESMI
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            Layanan Grooming &amp; Styling KINGZ
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Pilih layanan yang Anda butuhkan. Setiap perawatan mencakup konsultasi bentuk wajah, teknik potong presisi, dan styling profesional.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-8)'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.88rem',
                fontWeight: selectedCategory === cat ? '700' : '500',
                backgroundColor: selectedCategory === cat ? 'var(--brand-purple)' : 'var(--surface-raised)',
                color: selectedCategory === cat ? 'var(--white)' : 'var(--text-secondary)',
                border: selectedCategory === cat ? '1px solid var(--brand-purple-light)' : '1px solid var(--gray-800)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-6)'
          }}
        >
          {filteredServices.map((svc) => (
            <Card
              key={svc.id}
              variant="surface"
              padding="normal"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {svc.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '16px',
                    backgroundColor: 'var(--brand-gold)',
                    color: 'var(--brand-black)',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    padding: '2px 10px',
                    borderRadius: 'var(--radius-pill)',
                    boxShadow: '0 2px 8px var(--brand-gold-glow)'
                  }}
                >
                  TERFAVORIT
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
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
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <Clock size={14} />
                  {svc.durationMinutes} Menit
                </span>
              </div>

              <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>
                {svc.name}
              </h2>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', flex: 1, lineHeight: 1.6 }}>
                {svc.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--gray-800)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Tarif Layanan</span>
                  <span className="price-display" style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--brand-gold)' }}>
                    Rp{svc.price.toLocaleString('id-ID')}
                  </span>
                </div>

                <Link to={`/booking?serviceId=${svc.id}`}>
                  <Button variant="primary" size="md">
                    Reservasi Slot
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
