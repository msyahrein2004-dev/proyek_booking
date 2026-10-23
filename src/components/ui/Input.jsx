import React from 'react';

export const Input = ({
  label,
  id,
  error,
  helperText,
  className = '',
  required = false,
  ...props
}) => {
  const inputId = id || props.name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--brand-red)' }}>*</span>}
        </label>
      )}
      <input
        id={inputId}
        required={required}
        style={{
          width: '100%',
          minHeight: '44px',
          padding: '0 14px',
          backgroundColor: 'var(--surface-raised)',
          border: error ? '1px solid var(--brand-red)' : '1px solid var(--gray-800)',
          borderRadius: 'var(--radius-input)',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
          outline: 'none',
          transition: 'border-color var(--transition-fast)'
        }}
        className={className}
        {...props}
      />
      {error && (
        <span style={{ fontSize: '0.8rem', color: 'var(--brand-red)', fontWeight: '500' }}>
          {error}
        </span>
      )}
      {helperText && !error && (
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export const Select = ({
  label,
  id,
  options = [],
  error,
  helperText,
  required = false,
  className = '',
  ...props
}) => {
  const selectId = id || props.name || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--brand-red)' }}>*</span>}
        </label>
      )}
      <select
        id={selectId}
        required={required}
        style={{
          width: '100%',
          minHeight: '44px',
          padding: '0 14px',
          backgroundColor: 'var(--surface-raised)',
          border: error ? '1px solid var(--brand-red)' : '1px solid var(--gray-800)',
          borderRadius: 'var(--radius-input)',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
          outline: 'none',
          cursor: 'pointer'
        }}
        className={className}
        {...props}
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            style={{ backgroundColor: 'var(--surface-raised)', color: 'var(--text-primary)' }}
          >
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span style={{ fontSize: '0.8rem', color: 'var(--brand-red)', fontWeight: '500' }}>
          {error}
        </span>
      )}
      {helperText && !error && (
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export const Textarea = ({
  label,
  id,
  error,
  helperText,
  required = false,
  rows = 3,
  className = '',
  ...props
}) => {
  const areaId = id || props.name || `area-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          htmlFor={areaId}
          style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--brand-red)' }}>*</span>}
        </label>
      )}
      <textarea
        id={areaId}
        rows={rows}
        required={required}
        style={{
          width: '100%',
          padding: '10px 14px',
          backgroundColor: 'var(--surface-raised)',
          border: error ? '1px solid var(--brand-red)' : '1px solid var(--gray-800)',
          borderRadius: 'var(--radius-input)',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
          outline: 'none',
          resize: 'vertical'
        }}
        className={className}
        {...props}
      />
      {error && (
        <span style={{ fontSize: '0.8rem', color: 'var(--brand-red)', fontWeight: '500' }}>
          {error}
        </span>
      )}
      {helperText && !error && (
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {helperText}
        </span>
      )}
    </div>
  );
};
