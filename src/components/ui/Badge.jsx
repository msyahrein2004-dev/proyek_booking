import React from 'react';
import { Clock, CheckCircle2, Scissors, Check, XCircle, AlertCircle, DollarSign } from 'lucide-react';

export const Badge = ({
  status,
  type = 'booking', // 'booking' | 'payment' | 'custom'
  className = '',
  icon = true,
  children
}) => {
  const label = children || status;

  // Booking status configs
  const bookingStyles = {
    'Menunggu Konfirmasi': {
      bg: 'rgba(217, 182, 111, 0.14)',
      text: '#E5C78A',
      border: 'rgba(217, 182, 111, 0.35)',
      Icon: Clock
    },
    'Dikonfirmasi': {
      bg: 'rgba(109, 40, 217, 0.18)',
      text: '#A78BFA',
      border: 'rgba(109, 40, 217, 0.4)',
      Icon: CheckCircle2
    },
    'Sedang Dilayani': {
      bg: 'rgba(59, 130, 246, 0.16)',
      text: '#60A5FA',
      border: 'rgba(59, 130, 246, 0.35)',
      Icon: Scissors
    },
    'Selesai': {
      bg: 'rgba(34, 197, 94, 0.14)',
      text: '#4ADE80',
      border: 'rgba(34, 197, 94, 0.35)',
      Icon: Check
    },
    'Dibatalkan': {
      bg: 'rgba(201, 52, 69, 0.14)',
      text: '#F87171',
      border: 'rgba(201, 52, 69, 0.35)',
      Icon: XCircle
    }
  };

  // Payment status configs
  const paymentStyles = {
    'Belum Dibayar': {
      bg: 'rgba(249, 115, 22, 0.14)',
      text: '#FB923C',
      border: 'rgba(249, 115, 22, 0.35)',
      Icon: AlertCircle
    },
    'Menunggu Verifikasi': {
      bg: 'rgba(217, 182, 111, 0.16)',
      text: '#D9B66F',
      border: 'rgba(217, 182, 111, 0.4)',
      Icon: Clock
    },
    'Lunas': {
      bg: 'rgba(34, 197, 94, 0.14)',
      text: '#4ADE80',
      border: 'rgba(34, 197, 94, 0.35)',
      Icon: DollarSign
    },
    'Ditolak': {
      bg: 'rgba(201, 52, 69, 0.14)',
      text: '#F87171',
      border: 'rgba(201, 52, 69, 0.35)',
      Icon: XCircle
    }
  };

  const styleConfig = type === 'payment'
    ? (paymentStyles[status] || { bg: 'rgba(255,255,255,0.08)', text: 'var(--text-secondary)', border: 'var(--gray-800)', Icon: AlertCircle })
    : (bookingStyles[status] || { bg: 'rgba(255,255,255,0.08)', text: 'var(--text-secondary)', border: 'var(--gray-800)', Icon: Clock });

  const StatusIcon = styleConfig.Icon;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        fontSize: '0.78rem',
        fontWeight: '600',
        backgroundColor: styleConfig.bg,
        color: styleConfig.text,
        border: `1px solid ${styleConfig.border}`,
        whiteSpace: 'nowrap',
        lineHeight: 1
      }}
      className={`badge ${className}`}
    >
      {icon && StatusIcon && <StatusIcon size={13} strokeWidth={2.2} />}
      <span>{label}</span>
    </span>
  );
};
