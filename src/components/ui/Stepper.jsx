import React from 'react';
import { Check } from 'lucide-react';

export const Stepper = ({
  steps = ['Layanan', 'Barber', 'Tanggal & Jam', 'Konfirmasi'],
  currentStep = 0,
  onStepClick
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto var(--space-8)',
        position: 'relative'
      }}
    >
      {/* Background connector line */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '40px',
          right: '40px',
          height: '2px',
          backgroundColor: 'var(--gray-800)',
          zIndex: 0
        }}
      />
      {/* Progress connector line */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '40px',
          width: `${(currentStep / (steps.length - 1)) * 88}%`,
          height: '2px',
          backgroundColor: 'var(--brand-purple)',
          zIndex: 1,
          transition: 'width var(--transition-normal)'
        }}
      />

      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;

        return (
          <div
            key={label}
            onClick={() => {
              if (isCompleted && onStepClick) {
                onStepClick(index);
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-2)',
              position: 'relative',
              zIndex: 2,
              cursor: isCompleted ? 'pointer' : 'default',
              minWidth: '70px'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                fontWeight: '700',
                transition: 'all var(--transition-fast)',
                backgroundColor: isCompleted
                  ? 'var(--brand-purple)'
                  : isCurrent
                  ? 'var(--surface-raised)'
                  : 'var(--brand-black)',
                color: isCompleted
                  ? 'var(--white)'
                  : isCurrent
                  ? 'var(--brand-gold)'
                  : 'var(--gray-600)',
                border: isCurrent
                  ? '2px solid var(--brand-gold)'
                  : isCompleted
                  ? '2px solid var(--brand-purple-light)'
                  : '2px solid var(--gray-800)',
                boxShadow: isCurrent ? '0 0 12px var(--brand-gold-glow)' : 'none'
              }}
            >
              {isCompleted ? <Check size={18} strokeWidth={3} /> : index + 1}
            </div>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: isCurrent ? '700' : '500',
                color: isCurrent ? 'var(--white)' : isCompleted ? 'var(--text-secondary)' : 'var(--gray-600)',
                textAlign: 'center'
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
