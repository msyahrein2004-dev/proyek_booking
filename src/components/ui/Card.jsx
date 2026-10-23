import React from 'react';

export const Card = ({
  children,
  variant = 'surface', // 'surface' | 'raised' | 'highlight'
  padding = 'normal', // 'none' | 'sm' | 'normal' | 'lg'
  className = '',
  onClick,
  style = {},
  ...props
}) => {
  const paddingMap = {
    none: '0',
    sm: 'var(--space-3)',
    normal: 'var(--space-5)',
    lg: 'var(--space-8)'
  };

  const variantStyles = {
    surface: {
      backgroundColor: 'var(--surface-dark)',
      border: '1px solid var(--gray-800)'
    },
    raised: {
      backgroundColor: 'var(--surface-raised)',
      border: '1px solid var(--gray-800)'
    },
    highlight: {
      backgroundColor: 'var(--surface-raised)',
      border: '1px solid var(--brand-purple)',
      boxShadow: '0 4px 20px var(--brand-purple-glow)'
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 'var(--radius-card)',
        padding: paddingMap[padding],
        transition: 'all var(--transition-fast)',
        cursor: onClick ? 'pointer' : 'default',
        ...variantStyles[variant],
        ...style
      }}
      className={`card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
