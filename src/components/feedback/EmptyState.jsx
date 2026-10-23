import React from 'react';
import { CalendarX, Inbox, Search } from 'lucide-react';
import { Button } from '../ui/Button';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'Tidak Ada Data',
  description = 'Belum ada informasi yang tersedia untuk ditampilkan.',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-10) var(--space-6)',
        backgroundColor: 'var(--surface-dark)',
        border: '1px dashed var(--gray-800)',
        borderRadius: 'var(--radius-card)',
        width: '100%'
      }}
      className={className}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--surface-raised)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-4)',
          color: 'var(--brand-gold)'
        }}
      >
        <Icon size={28} />
      </div>
      <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: 'var(--space-2)' }}>
        {title}
      </h4>
      <p style={{ maxWidth: '420px', color: 'var(--text-secondary)', marginBottom: actionLabel ? 'var(--space-6)' : 0 }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export const LoadingSpinner = ({ label = 'Memuat data...' }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-12)',
        color: 'var(--text-secondary)'
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid var(--gray-800)',
          borderTopColor: 'var(--brand-purple)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}
      />
      <span style={{ fontSize: '0.9rem' }}>{label}</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
