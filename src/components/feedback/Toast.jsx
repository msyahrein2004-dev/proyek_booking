import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1100,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100% - 48px)'
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const Icon = isSuccess ? CheckCircle2 : isError ? AlertCircle : Info;

        const borderColor = isSuccess
          ? 'var(--brand-purple-light)'
          : isError
          ? 'var(--brand-red)'
          : 'var(--brand-gold)';

        const iconColor = isSuccess
          ? '#4ADE80'
          : isError
          ? 'var(--brand-red)'
          : 'var(--brand-gold)';

        return (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'var(--surface-raised)',
              border: `1px solid ${borderColor}`,
              borderRadius: 'var(--radius-input)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              animation: 'slideUp 0.2s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
              <Icon size={18} color={iconColor} style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: '500', lineHeight: 1.4 }}>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                padding: '2px'
              }}
              aria-label="Tutup notifikasi"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
