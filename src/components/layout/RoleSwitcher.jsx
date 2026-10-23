import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Scissors, RotateCcw } from 'lucide-react';

export const RoleSwitcher = () => {
  const { currentRole, switchRole, barbers, currentBarber, resetStore } = useApp();
  const navigate = useNavigate();

  const handleSelectRole = (newRole, extraId = null) => {
    switchRole(newRole, extraId);
    if (newRole === 'admin') {
      navigate('/admin');
    } else if (newRole === 'barber') {
      navigate('/barber');
    } else {
      navigate('/');
    }
  };

  return (
    <div
      className="no-print role-switcher-banner"
      style={{
        backgroundColor: 'var(--brand-black)',
        borderBottom: '1px solid var(--gray-800)',
        padding: '6px var(--space-4)',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            backgroundColor: 'rgba(217, 182, 111, 0.15)',
            color: 'var(--brand-gold)',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: '700',
            fontSize: '0.72rem',
            letterSpacing: '0.04em'
          }}
        >
          DEMO PROTOTYPE
        </span>
        <span style={{ color: 'var(--text-muted)' }}>
          Mode Peran:{' '}
          <strong style={{ color: 'var(--text-primary)' }}>
            {currentRole === 'admin'
              ? 'Admin KINGZ'
              : currentRole === 'barber'
              ? `Barber (${currentBarber?.name})`
              : 'Pelanggan'}
          </strong>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>Ubah Peran:</span>
        <button
          onClick={() => handleSelectRole('customer')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            border: currentRole === 'customer' ? '1px solid var(--brand-purple)' : '1px solid var(--gray-800)',
            backgroundColor: currentRole === 'customer' ? 'var(--brand-purple)' : 'var(--surface-raised)',
            color: 'var(--white)',
            cursor: 'pointer'
          }}
        >
          <User size={12} />
          <span>Pelanggan</span>
        </button>

        <button
          onClick={() => handleSelectRole('admin')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            border: currentRole === 'admin' ? '1px solid var(--brand-gold)' : '1px solid var(--gray-800)',
            backgroundColor: currentRole === 'admin' ? 'var(--brand-gold)' : 'var(--surface-raised)',
            color: currentRole === 'admin' ? 'var(--brand-black)' : 'var(--text-primary)',
            fontWeight: currentRole === 'admin' ? '700' : '500',
            cursor: 'pointer'
          }}
        >
          <Shield size={12} />
          <span>Admin</span>
        </button>

        {barbers.map((b) => (
          <button
            key={b.id}
            onClick={() => handleSelectRole('barber', b.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              border: currentRole === 'barber' && currentBarber?.id === b.id ? '1px solid #60A5FA' : '1px solid var(--gray-800)',
              backgroundColor: currentRole === 'barber' && currentBarber?.id === b.id ? 'rgba(59, 130, 246, 0.25)' : 'var(--surface-raised)',
              color: currentRole === 'barber' && currentBarber?.id === b.id ? '#93C5FD' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <Scissors size={12} />
            <span>{b.name.split(' ')[0]}</span>
          </button>
        ))}

        <button
          onClick={resetStore}
          title="Reset data demo ke awal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '0.72rem',
            border: '1px solid var(--gray-800)',
            backgroundColor: 'transparent',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            marginLeft: '6px'
          }}
        >
          <RotateCcw size={11} />
          <span>Reset Demo</span>
        </button>
      </div>
    </div>
  );
};
