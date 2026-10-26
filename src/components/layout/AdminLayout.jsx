import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { RoleSwitcher } from './RoleSwitcher';
import { ToastContainer } from '../feedback/Toast';
import {
  LayoutDashboard,
  CalendarCheck,
  Scissors,
  Users,
  Clock,
  UserCheck,
  CreditCard,
  FileBarChart,
  Crown,
  Menu,
  X,
  ExternalLink,
  LogOut,
  ShieldCheck
} from 'lucide-react';

export const AdminLayout = () => {
  const { adminAuth, logoutAdmin } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const adminNav = [
    { label: 'Ringkasan Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Kelola Booking', path: '/admin/bookings', icon: CalendarCheck },
    { label: 'Katalog Layanan', path: '/admin/services', icon: Scissors },
    { label: 'Data Barber', path: '/admin/barbers', icon: Users },
    { label: 'Jadwal & Jam Buka', path: '/admin/schedules', icon: Clock },
    { label: 'Data Pelanggan', path: '/admin/customers', icon: UserCheck },
    { label: 'Verifikasi Pembayaran', path: '/admin/payments', icon: CreditCard },
    { label: 'Laporan & Keuangan', path: '/admin/reports', icon: FileBarChart }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Role Switcher */}
      <RoleSwitcher />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar for Desktop & Drawer for Mobile */}
        <aside
          className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
          style={{
            width: '260px',
            backgroundColor: 'var(--surface-dark)',
            borderRight: '1px solid var(--gray-800)',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0,
            height: 'calc(100vh - 36px)',
            zIndex: 90
          }}
        >
          {/* Brand Wordmark */}
          <div
            style={{
              padding: 'var(--space-5) var(--space-6)',
              borderBottom: '1px solid var(--gray-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--brand-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand-gold)'
                }}
              >
                <Crown size={18} />
              </div>
              <div>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '0.04em' }}>
                  KINGZ ADMIN
                </span>
                <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--brand-gold)', fontWeight: '600' }}>
                  OPERATIONAL SUITE
                </span>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="sidebar-close-btn"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'none',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            style={{
              padding: 'var(--space-4) var(--space-3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              flex: 1,
              overflowY: 'auto'
            }}
          >
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-input)',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--white)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--brand-purple)' : 'transparent',
                    boxShadow: isActive ? '0 2px 10px rgba(109, 40, 217, 0.3)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Icon size={18} color={isActive ? 'var(--brand-gold)' : 'var(--text-muted)'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Sidebar Info & Logout */}
          <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--gray-800)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: '8px',
                backgroundColor: 'rgba(217, 182, 111, 0.08)',
                border: '1px solid rgba(217, 182, 111, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-gold)',
                    fontWeight: '800',
                    fontSize: '0.8rem'
                  }}
                >
                  M
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--white)' }}>
                    {adminAuth?.user || 'mauldi'}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--brand-gold)', fontWeight: '600' }}>
                    Super Admin
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Keluar dari sesi Admin"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '4px'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>

            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: 'var(--surface-raised)',
                border: '1px solid var(--gray-800)',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}
            >
              <ExternalLink size={14} />
              <span>Lihat Website Publik</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Admin Top Header */}
          <header
            style={{
              height: '64px',
              backgroundColor: 'var(--surface-dark)',
              borderBottom: '1px solid var(--gray-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 var(--space-6)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setSidebarOpen(true)}
                className="admin-menu-toggle"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--white)',
                  cursor: 'pointer',
                  display: 'none',
                  padding: '6px'
                }}
              >
                <Menu size={22} />
              </button>
              <div>
                <h2 style={{ fontSize: '1.05rem', fontWeight: '700' }}>
                  Portal Administrasi KINGZ
                </h2>
                <span style={{ fontSize: '0.72rem', color: 'var(--brand-gold)' }}>
                  Akses Terautentikasi: {adminAuth?.user || 'mauldi'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: '#4ADE80',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  border: '1px solid rgba(34, 197, 94, 0.25)'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ADE80' }} />
                Toko Buka (10.00 – 21.00)
              </span>

              <button
                onClick={handleLogout}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(201, 52, 69, 0.12)',
                  color: '#F87171',
                  border: '1px solid rgba(201, 52, 69, 0.3)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </header>

          <main style={{ flex: 1, padding: 'var(--space-6)', overflowY: 'auto' }}>
            <Outlet />
          </main>
        </div>
      </div>

      <ToastContainer />

      <style>{`
        @media (max-width: 900px) {
          .sidebar {
            position: fixed !important;
            top: 0 !important;
            bottom: 0 !important;
            left: -280px;
            transition: left 0.25s ease-in-out;
            box-shadow: 10px 0 30px rgba(0,0,0,0.8);
          }
          .sidebar.sidebar-open {
            left: 0 !important;
          }
          .sidebar-close-btn {
            display: flex !important;
          }
          .admin-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
