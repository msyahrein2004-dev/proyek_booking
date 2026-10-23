import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'gold' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  icon: Icon,
  ...props
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
    borderRadius: 'var(--radius-btn)',
    border: '1px solid transparent',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-fast)',
    textDecoration: 'none',
    lineHeight: '1.2',
    minHeight: size === 'sm' ? '36px' : size === 'lg' ? '50px' : '44px',
    padding: size === 'sm' ? '0 14px' : size === 'lg' ? '0 24px' : '0 18px',
    fontSize: size === 'sm' ? '0.85rem' : size === 'lg' ? '1.05rem' : '0.95rem',
    opacity: disabled ? 0.5 : 1,
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--brand-purple)',
      color: 'var(--white)',
      borderColor: 'var(--brand-purple-light)',
      boxShadow: '0 2px 10px rgba(109, 40, 217, 0.3)'
    },
    secondary: {
      backgroundColor: 'var(--surface-raised)',
      color: 'var(--text-primary)',
      borderColor: 'var(--gray-800)'
    },
    gold: {
      backgroundColor: 'var(--brand-gold)',
      color: 'var(--brand-black)',
      borderColor: '#E5C78A',
      fontWeight: '700',
      boxShadow: '0 2px 12px var(--brand-gold-glow)'
    },
    danger: {
      backgroundColor: 'var(--brand-red)',
      color: 'var(--white)',
      borderColor: '#D44A5B'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
      borderColor: 'transparent'
    }
  };

  const currentVariant = variantStyles[variant] || variantStyles.primary;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      style={{ ...baseStyles, ...currentVariant }}
      className={`btn-interactive ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 16 : 18} />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 16 : 18} />
      ) : null}
      <span>{children}</span>
    </button>
  );
};
