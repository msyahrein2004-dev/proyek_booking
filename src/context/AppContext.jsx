import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredData,
  saveStoredData,
  createBooking as apiCreateBooking,
  updateBookingStatus as apiUpdateBookingStatus,
  updatePaymentStatus as apiUpdatePaymentStatus,
  cancelBooking as apiCancelBooking,
  addBookingReview as apiAddBookingReview,
  resetDemoStore as apiResetDemoStore
} from '../services/mockApi';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(() => getStoredData());
  const [currentRole, setCurrentRole] = useState('customer'); // 'customer' | 'admin' | 'barber'
  const [currentBarberId, setCurrentBarberId] = useState('bar-001');
  const [currentCustomerId, setCurrentCustomerId] = useState('cus-001');
  const [toasts, setToasts] = useState([]);

  // Sync to state whenever data changes
  const refreshData = () => {
    setData(getStoredData());
  };

  // Toast Notification helper
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Switch demo active role
  const switchRole = (role, extraId = null) => {
    setCurrentRole(role);
    if (role === 'barber' && extraId) {
      setCurrentBarberId(extraId);
    }
    if (role === 'customer' && extraId) {
      setCurrentCustomerId(extraId);
    }
    showToast(`Beralih ke mode demonstrasi: ${role.toUpperCase()}`, 'info');
  };

  // Booking handlers
  const handleCreateBooking = async (bookingPayload) => {
    try {
      const res = await apiCreateBooking(bookingPayload);
      refreshData();
      showToast(`Booking berhasil dibuat! Kode: ${res.code}`, 'success');
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const res = await apiUpdateBookingStatus(id, status);
      refreshData();
      showToast(`Status booking diubah menjadi: ${status}`, 'success');
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const handleUpdatePaymentStatus = async (id, paymentStatus) => {
    try {
      const res = await apiUpdatePaymentStatus(id, paymentStatus);
      refreshData();
      showToast(`Status pembayaran diperbarui: ${paymentStatus}`, 'success');
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      const res = await apiCancelBooking(id);
      refreshData();
      showToast('Booking berhasil dibatalkan.', 'info');
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const handleAddReview = async (id, rating, comment) => {
    try {
      const res = await apiAddBookingReview(id, rating, comment);
      refreshData();
      showToast('Terima kasih! Ulasan Anda berhasil disimpan.', 'success');
      return res;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  // Service CRUD (Admin)
  const handleCreateService = (serviceData) => {
    const current = getStoredData();
    const newService = {
      ...serviceData,
      id: `svc-${Date.now()}`,
      active: true
    };
    current.services.push(newService);
    saveStoredData(current);
    refreshData();
    showToast(`Layanan "${newService.name}" berhasil ditambahkan.`, 'success');
  };

  const handleUpdateService = (id, serviceData) => {
    const current = getStoredData();
    const idx = current.services.findIndex(s => s.id === id);
    if (idx !== -1) {
      current.services[idx] = { ...current.services[idx], ...serviceData };
      saveStoredData(current);
      refreshData();
      showToast('Layanan berhasil diperbarui.', 'success');
    }
  };

  const handleDeleteService = (id) => {
    const current = getStoredData();
    const filtered = current.services.filter(s => s.id !== id);
    saveStoredData({ ...current, services: filtered });
    refreshData();
    showToast('Layanan berhasil dihapus dari katalog.', 'info');
  };

  // Barber Management (Admin)
  const handleUpdateBarber = (id, barberData) => {
    const current = getStoredData();
    const idx = current.barbers.findIndex(b => b.id === id);
    if (idx !== -1) {
      current.barbers[idx] = { ...current.barbers[idx], ...barberData };
      saveStoredData(current);
      refreshData();
      showToast('Data barber berhasil diperbarui.', 'success');
    }
  };

  // Reset demo store
  const handleResetStore = () => {
    apiResetDemoStore();
    refreshData();
    showToast('Data demo berhasil direset ke kondisi awal.', 'info');
  };

  const currentCustomer = data.customers.find(c => c.id === currentCustomerId) || data.customers[0];
  const currentBarber = data.barbers.find(b => b.id === currentBarberId) || data.barbers[0];

  return (
    <AppContext.Provider
      value={{
        data,
        services: data.services,
        barbers: data.barbers,
        customers: data.customers,
        bookings: data.bookings,
        settings: data.settings,
        currentRole,
        currentCustomer,
        currentBarber,
        switchRole,
        toasts,
        showToast,
        removeToast,
        createBooking: handleCreateBooking,
        updateBookingStatus: handleUpdateBookingStatus,
        updatePaymentStatus: handleUpdatePaymentStatus,
        cancelBooking: handleCancelBooking,
        addReview: handleAddReview,
        createService: handleCreateService,
        updateService: handleUpdateService,
        deleteService: handleDeleteService,
        updateBarber: handleUpdateBarber,
        resetStore: handleResetStore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
