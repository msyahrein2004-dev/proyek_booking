import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { RoleSwitcher } from './RoleSwitcher';
import { Button } from '../ui/Button';
import { ToastContainer } from '../feedback/Toast';
import { Crown, Menu, X, Calendar, User, Scissors, Phone, MapPin, Clock } from 'lucide-react';

export const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Layanan', path: '/services' },
    { label: 'Barber Kami', path: '/barbers' },
    { label: 'Booking Sekarang', path: '/booking' },
    { label: 'Riwayat Booking', path: '/my-bookings' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Prototype Role Switcher */}
      <RoleSwitcher />

      {/* Main Top Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(17, 16, 20, 0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--gray-800)'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px'
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--brand-purple) 0%, #4C1D95 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-gold)',
                boxShadow: '0 2px 10px rgba(109, 40, 217, 0.4)'
              }}
            >
              <Crown size={22} strokeWidth={2.5} />
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: '1.35rem',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  color: 'var(--white)'
                }}
              >
                KINGZ
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  fontWeight: '600',
                  color: 'var(--brand-gold)',
                  letterSpacing: '0.12em',
                  marginTop: '-3px'
                }}
              >
                BARBER STUDIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '24px'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--brand-gold)' : 'var(--text-secondary)',
                    position: 'relative',
                    padding: '8px 0',
                    transition: 'color var(--transition-fast)'
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--brand-gold)',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '12px'
            }}
            className="desktop-actions"
          >
            <Link to="/profile">
              <Button variant="ghost" size="sm" icon={User}>
                Profil
              </Button>
            </Link>
            <Link to="/booking">
              <Button variant="primary" size="md" icon={Calendar}>
                Reservasi Slot
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu navigasi"
            className="mobile-toggle"
            style={{
              display: 'flex',
              background: 'none',
              border: 'none',
              color: 'var(--white)',
              padding: '8px',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: 'var(--surface-dark)',
              borderBottom: '1px solid var(--gray-800)',
              padding: 'var(--space-4) var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: '1rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--brand-gold)' : 'var(--text-primary)',
                    padding: '8px 0'
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" style={{ width: '100%' }} icon={Calendar}>
                  Reservasi Slot Sekarang
                </Button>
              </Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" style={{ width: '100%' }}>
                  Masuk / Akun
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'var(--brand-black)',
          borderTop: '1px solid var(--gray-800)',
          marginTop: 'auto',
          padding: 'var(--space-12) 0 var(--space-8)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-8)',
              marginBottom: 'var(--space-8)'
            }}
          >
            {/* Col 1: Brand Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
                <Crown size={22} color="var(--brand-gold)" />
                <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '0.05em' }}>
                  KINGZ BARBER STUDIO
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                Pengalaman grooming dan pangkas rambut modern futuristik dengan standar pelayanan kelas atas, kenyamanan maksimal, dan hasil presisi.
              </p>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(217, 182, 111, 0.1)',
                  color: 'var(--brand-gold)',
                  border: '1px solid rgba(217, 182, 111, 0.3)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}
              >
                Demonstrasi Prototipe Frontend (Mock Data)
              </span>
            </div>

            {/* Col 2: Jam Operasional */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: 'var(--space-4)', color: 'var(--white)' }}>
                Jam Operasional
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="var(--brand-gold)" />
                  <span>Senin – Minggu: 10.00 – 21.00 WIB</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color="var(--brand-gold)" />
                  <span>Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color="var(--brand-gold)" />
                  <span>+62 812-9988-7766</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Navigasi Cepat */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: 'var(--space-4)', color: 'var(--white)' }}>
                Navigasi Cepat
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
                <li><Link to="/services" style={{ color: 'var(--text-secondary)' }}>Katalog Layanan &amp; Tarif</Link></li>
                <li><Link to="/barbers" style={{ color: 'var(--text-secondary)' }}>Profil Master Barber</Link></li>
                <li><Link to="/booking" style={{ color: 'var(--text-secondary)' }}>Reservasi Online</Link></li>
                <li><Link to="/my-bookings" style={{ color: 'var(--text-secondary)' }}>Cek Riwayat Booking</Link></li>
                <li><Link to="/admin/login" style={{ color: 'var(--text-muted)' }}>Portal Khusus Admin (Login)</Link></li>
                <li><Link to="/barber" style={{ color: 'var(--text-muted)' }}>Portal Antrean Barber</Link></li>
              </ul>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid var(--gray-800)',
              paddingTop: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}
          >
            <span>&copy; 2026 KINGZ Barber Shop System. Hak Cipta Dilindungi.</span>
            <span>Dirancang sesuai PRD &amp; Pedoman UI KINGZ.</span>
          </div>
        </div>
      </footer>

      {/* Global Toast Container */}
      <ToastContainer />

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
};
