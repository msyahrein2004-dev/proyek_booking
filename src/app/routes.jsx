import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { BarberLayout } from '../components/layout/BarberLayout';

// Public & Customer Pages
import { HomePage } from '../features/public/HomePage';
import { ServicesPage } from '../features/public/ServicesPage';
import { BarbersPage } from '../features/public/BarbersPage';
import { LoginPage } from '../features/public/LoginPage';
import { RegisterPage } from '../features/public/RegisterPage';
import { BookingFlowPage } from '../features/customer/BookingFlowPage';
import { BookingConfirmationPage } from '../features/customer/BookingConfirmationPage';
import { MyBookingsPage } from '../features/customer/MyBookingsPage';
import { ProfilePage } from '../features/customer/ProfilePage';

// Admin Pages
import { AdminDashboardPage } from '../features/admin/AdminDashboardPage';
import { AdminBookingsPage } from '../features/admin/AdminBookingsPage';
import { AdminServicesPage } from '../features/admin/AdminServicesPage';
import { AdminBarbersPage } from '../features/admin/AdminBarbersPage';
import { AdminSchedulesPage } from '../features/admin/AdminSchedulesPage';
import { AdminCustomersPage } from '../features/admin/AdminCustomersPage';
import { AdminPaymentsPage } from '../features/admin/AdminPaymentsPage';
import { AdminReportsPage } from '../features/admin/AdminReportsPage';

// Barber Pages
import { BarberDashboardPage } from '../features/barber/BarberDashboardPage';
import { BarberBookingDetailPage } from '../features/barber/BarberBookingDetailPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public & Customer Routes under PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/barbers" element={<BarbersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/booking" element={<BookingFlowPage />} />
        <Route path="/booking/confirmation/:id" element={<BookingConfirmationPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Admin Routes under AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="barbers" element={<AdminBarbersPage />} />
        <Route path="schedules" element={<AdminSchedulesPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
      </Route>

      {/* Barber Routes under BarberLayout */}
      <Route path="/barber" element={<BarberLayout />}>
        <Route index element={<BarberDashboardPage />} />
        <Route path="bookings/:id" element={<BarberBookingDetailPage />} />
      </Route>

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
