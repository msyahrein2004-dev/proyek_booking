// Mock API & Business Logic Layer for KINGZ Barber Shop Prototype
// Separated from UI components per PRD & Implementation Plan guidelines

import {
  INITIAL_SERVICES,
  INITIAL_BARBERS,
  INITIAL_CUSTOMERS,
  INITIAL_BOOKINGS,
  SHOP_SETTINGS,
  getTodayDateStr
} from '../data/demoData';

export { getTodayDateStr };

const STORAGE_KEY = 'kingz_barber_demo_store_v1';

// Load stored state or initialize with demo data
export const getStoredData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read from localStorage, using in-memory demo data:', e);
  }
  return {
    services: INITIAL_SERVICES,
    barbers: INITIAL_BARBERS,
    customers: INITIAL_CUSTOMERS,
    bookings: INITIAL_BOOKINGS,
    settings: SHOP_SETTINGS
  };
};

export const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
};

// Helper to convert "HH:MM" to minutes from midnight
export const timeToMinutes = (timeStr) => {
  const [hours, mins] = timeStr.split(':').map(Number);
  return hours * 60 + mins;
};

// Helper to convert minutes to "HH:MM"
export const minutesToTime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

// Check if two time ranges overlap: [startA, endA) and [startB, endB)
export const isTimeOverlap = (startA, endA, startB, endB) => {
  const sA = timeToMinutes(startA);
  const eA = timeToMinutes(endA);
  const sB = timeToMinutes(startB);
  const eB = timeToMinutes(endB);
  return Math.max(sA, sB) < Math.min(eA, eB);
};

// Check if barber is working on the specified date
export const isBarberWorkingOnDate = (barber, dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  // getDay: 0 is Sun, 1 is Mon ... 6 is Sat
  const dayOfWeek = d.getDay() === 0 ? 7 : d.getDay();
  return barber.workingDays.includes(dayOfWeek);
};

// Generate available slots for a barber, service duration, and date
export const generateAvailableSlots = ({ barberId, durationMinutes, dateStr, existingBookings }) => {
  const data = getStoredData();
  const barber = data.barbers.find(b => b.id === barberId);
  const settings = data.settings;

  if (!barber) {
    return { available: false, reason: 'Barber tidak ditemukan.', slots: [] };
  }

  // Check shop holiday
  if (settings.holidays.includes(dateStr)) {
    return { available: false, reason: 'Toko tutup (Hari Libur / Holiday).', slots: [] };
  }

  // Check barber working days
  if (!isBarberWorkingOnDate(barber, dateStr)) {
    return { available: false, reason: `Barber ${barber.name} libur pada hari ini.`, slots: [] };
  }

  const openMinutes = timeToMinutes(settings.openingHours.start);
  const closeMinutes = timeToMinutes(settings.openingHours.end);
  const interval = settings.openingHours.slotIntervalMinutes || 30;

  // Active bookings for this barber on this date
  const bookings = existingBookings || data.bookings;
  const activeBookings = bookings.filter(b => 
    b.barberId === barberId && 
    b.date === dateStr &&
    ['Menunggu Konfirmasi', 'Dikonfirmasi', 'Sedang Dilayani'].includes(b.status)
  );

  const slots = [];

  for (let m = openMinutes; m + durationMinutes <= closeMinutes; m += interval) {
    const startTimeStr = minutesToTime(m);
    const endTimeStr = minutesToTime(m + durationMinutes);

    // Check overlap with active bookings
    const conflictingBooking = activeBookings.find(b => 
      isTimeOverlap(startTimeStr, endTimeStr, b.startTime, b.endTime)
    );

    if (conflictingBooking) {
      slots.push({
        time: startTimeStr,
        endTime: endTimeStr,
        available: false,
        reason: 'Sudah dibooking'
      });
    } else {
      slots.push({
        time: startTimeStr,
        endTime: endTimeStr,
        available: true,
        reason: 'Tersedia'
      });
    }
  }

  return {
    available: true,
    slots
  };
};

// Validate and create booking
export const createBooking = async (bookingData) => {
  const data = getStoredData();
  const { customerId, customerName, customerPhone, serviceId, barberId, date, startTime, paymentMethod, notes } = bookingData;

  const service = data.services.find(s => s.id === serviceId);
  if (!service) throw new Error('Layanan yang dipilih tidak valid.');

  const barber = data.barbers.find(b => b.id === barberId);
  if (!barber) throw new Error('Barber yang dipilih tidak valid.');

  const durationMinutes = service.durationMinutes;
  const endMinutes = timeToMinutes(startTime) + durationMinutes;
  const endTime = minutesToTime(endMinutes);

  // Availability revalidation on submit (PRD Rule 3)
  const slotCheck = generateAvailableSlots({
    barberId,
    durationMinutes,
    dateStr: date,
    existingBookings: data.bookings
  });

  const matchingSlot = slotCheck.slots.find(s => s.time === startTime);
  if (!matchingSlot || !matchingSlot.available) {
    throw new Error('Jadwal jam yang dipilih sudah tidak tersedia atau bentrok. Silakan pilih jam lain.');
  }

  // Create new booking object with price snapshot (PRD Rule 5)
  const codeSeq = String(data.bookings.length + 1).padStart(3, '0');
  const randomSuffix = Math.floor(10 + Math.random() * 90);
  const bookingCode = `KZ-26${codeSeq}${randomSuffix}`;

  const initialPaymentStatus = paymentMethod.includes('Transfer') 
    ? 'Menunggu Verifikasi' 
    : 'Belum Dibayar';

  const newBooking = {
    id: `bkg-${Date.now()}`,
    code: bookingCode,
    customerId: customerId || 'cus-001',
    customerName: customerName || 'Ahmad Rizky',
    customerPhone: customerPhone || '081234567890',
    serviceId: service.id,
    serviceName: service.name,
    barberId: barber.id,
    barberName: barber.name,
    date,
    startTime,
    endTime,
    priceSnapshot: service.price,
    status: 'Menunggu Konfirmasi',
    paymentMethod,
    paymentStatus: initialPaymentStatus,
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  const updatedBookings = [newBooking, ...data.bookings];
  saveStoredData({ ...data, bookings: updatedBookings });

  return newBooking;
};

// Update booking status (Admin / Barber)
export const updateBookingStatus = async (bookingId, newStatus) => {
  const data = getStoredData();
  const bookingIndex = data.bookings.findIndex(b => b.id === bookingId);
  if (bookingIndex === -1) throw new Error('Booking tidak ditemukan.');

  data.bookings[bookingIndex] = {
    ...data.bookings[bookingIndex],
    status: newStatus,
    updatedAt: new Date().toISOString()
  };

  saveStoredData(data);
  return data.bookings[bookingIndex];
};

// Update payment status (Admin)
export const updatePaymentStatus = async (bookingId, newPaymentStatus) => {
  const data = getStoredData();
  const bookingIndex = data.bookings.findIndex(b => b.id === bookingId);
  if (bookingIndex === -1) throw new Error('Booking tidak ditemukan.');

  data.bookings[bookingIndex] = {
    ...data.bookings[bookingIndex],
    paymentStatus: newPaymentStatus,
    updatedAt: new Date().toISOString()
  };

  saveStoredData(data);
  return data.bookings[bookingIndex];
};

// Cancel booking (Customer / Admin)
export const cancelBooking = async (bookingId, reason = 'Dibatalkan oleh pelanggan') => {
  return updateBookingStatus(bookingId, 'Dibatalkan');
};

// Add review to completed booking
export const addBookingReview = async (bookingId, rating, comment) => {
  const data = getStoredData();
  const bookingIndex = data.bookings.findIndex(b => b.id === bookingId);
  if (bookingIndex === -1) throw new Error('Booking tidak ditemukan.');

  if (data.bookings[bookingIndex].status !== 'Selesai') {
    throw new Error('Review hanya dapat diberikan untuk layanan yang telah Selesai.');
  }

  data.bookings[bookingIndex] = {
    ...data.bookings[bookingIndex],
    review: {
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString()
    }
  };

  saveStoredData(data);
  return data.bookings[bookingIndex];
};

// Reset demo store back to initial data
export const resetDemoStore = () => {
  const initial = {
    services: INITIAL_SERVICES,
    barbers: INITIAL_BARBERS,
    customers: INITIAL_CUSTOMERS,
    bookings: INITIAL_BOOKINGS,
    settings: SHOP_SETTINGS
  };
  saveStoredData(initial);
  return initial;
};
