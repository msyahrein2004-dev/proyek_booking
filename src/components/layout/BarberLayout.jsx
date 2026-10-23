import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { RoleSwitcher } from './RoleSwitcher';
import { ToastContainer } from '../feedback/Toast';
import { useApp } from '../../context/AppContext';
import { Scissors, Crown, Calendar, ExternalLink } from 'lucide-react';

export const BarberLayout = () => {
  const { currentBarber } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Role Switcher */}
      <RoleSwitcher />

      {/* Barber Header */}
      <header
        style={{
          backgroundColor: 'var(--surface-dark)',
          borderBottom: '1px solid var(--gray-800)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div
          className="container"
          style={{
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60A5FA'
              }}
            >
              <Scissors size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>KINGZ BARBER PORTAL</span>
                <span
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    color: '#93C5FD',
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: '700'
                  }}
                >
                  STAF
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Sedang Bertugas: <strong>{currentBarber?.name || 'Raka Pratama'}</strong> ({currentBarber?.role})
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid var(--gray-800)'
              }}
            >
              <ExternalLink size={14} />
              <span>Website Publik</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Barber Content */}
      <main style={{ flex: 1, padding: 'var(--space-6) 0' }}>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};
