// Centralized Demo Data for KINGZ Barber Shop Booking System
// Strictly labeled as mock/demonstration data

export const INITIAL_SERVICES = [
  {
    id: "svc-001",
    name: "Classic Gentleman Haircut",
    category: "Haircut",
    description: "Potongan rambut klasik yang rapi dan elegan, disesuaikan dengan kontur wajah dan konsultasi gaya.",
    price: 75000,
    durationMinutes: 45,
    popular: true,
    active: true
  },
  {
    id: "svc-002",
    name: "Precision Fade & Beard Sculpting",
    category: "Combo",
    description: "Potongan taper/fade presisi tinggi dipadukan dengan perapian jenggot, razor detailing, dan hot towel.",
    price: 110000,
    durationMinutes: 60,
    popular: true,
    active: true
  },
  {
    id: "svc-003",
    name: "KINGZ Royal VIP Treatment",
    category: "Premium",
    description: "Layanan signature terlengkap: haircut premium, hair wash cooling menthol, facial massage, hot towel, dan pomade styling.",
    price: 160000,
    durationMinutes: 75,
    popular: false,
    active: true
  },
  {
    id: "svc-004",
    name: "Junior / Kids Clean Cut",
    category: "Haircut",
    description: "Potongan rambut modern dan nyaman untuk anak-anak dengan teknik sabar dan gaya terkini.",
    price: 60000,
    durationMinutes: 30,
    popular: false,
    active: true
  },
  {
    id: "svc-005",
    name: "Hair Coloring & Highlights",
    category: "Coloring",
    description: "Pewarnaan rambut atau highlight profesional dengan produk premium yang aman dan tahan lama.",
    price: 200000,
    durationMinutes: 90,
    popular: false,
    active: true
  },
  {
    id: "svc-006",
    name: "Relaxing Scalp Treatment & Wash",
    category: "Treatment",
    description: "Perawatan kulit kepala khusus anti-ketombe, relaksasi pijat leher, dan hair tonic penyegar.",
    price: 85000,
    durationMinutes: 40,
    popular: false,
    active: true
  }
];

export const INITIAL_BARBERS = [
  {
    id: "bar-001",
    name: "Raka Pratama",
    role: "Senior Barber & Stylist",
    specialties: ["Classic Cut", "Modern Fade", "Pompadour"],
    workingDays: [1, 2, 3, 4, 5, 6], // 1=Mon, 7=Sun
    workingHours: { start: "10:00", end: "21:00" },
    rating: 4.95,
    reviewCount: 148,
    bio: "Berpengalaman lebih dari 8 tahun dalam dunia classic styling dan modern skin fade.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    active: true
  },
  {
    id: "bar-002",
    name: "Doni Hermawan",
    role: "Master Barber",
    specialties: ["Beard Sculpting", "Taper Fade", "Razor Lineup"],
    workingDays: [2, 3, 4, 5, 6, 7],
    workingHours: { start: "11:00", end: "21:00" },
    rating: 4.88,
    reviewCount: 112,
    bio: "Spesialis perawatan jenggot dan kontur tajam dengan standar pangkas internasional.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    active: true
  },
  {
    id: "bar-003",
    name: "Bayu Saputra",
    role: "Creative Colorist & Stylist",
    specialties: ["Textured Crop", "Mullet", "Hair Coloring"],
    workingDays: [1, 3, 4, 5, 6, 7],
    workingHours: { start: "10:00", end: "20:00" },
    rating: 4.92,
    reviewCount: 95,
    bio: "Ahli potongan rambut kontemporer dan harmonisasi warna rambut pria.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    active: true
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: "cus-001",
    name: "Ahmad Rizky",
    email: "ahmad@gmail.com",
    phone: "081234567890",
    notes: "Lebih suka potongan rambut bagian samping sangat tipis (mid fade)",
    totalBookings: 6
  },
  {
    id: "cus-002",
    name: "Budi Santoso",
    email: "budi@yahoo.com",
    phone: "081398765432",
    notes: "Kulit kepala agak sensitif dengan air terlalu hangat",
    totalBookings: 3
  },
  {
    id: "cus-003",
    name: "Dimas Anggara",
    email: "dimas@outlook.com",
    phone: "081987654321",
    notes: "Gaya pompadour klasik dengan pomade water-based",
    totalBookings: 8
  }
];

// Helper to format today's date YYYY-MM-DD
export const getTodayDateStr = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const todayStr = getTodayDateStr();

export const INITIAL_BOOKINGS = [
  {
    id: "bkg-001",
    code: "KZ-26001",
    customerId: "cus-001",
    customerName: "Ahmad Rizky",
    customerPhone: "081234567890",
    serviceId: "svc-001",
    serviceName: "Classic Gentleman Haircut",
    barberId: "bar-001",
    barberName: "Raka Pratama",
    date: todayStr,
    startTime: "11:00",
    endTime: "11:45",
    priceSnapshot: 75000,
    status: "Sedang Dilayani",
    paymentMethod: "Tunai di tempat",
    paymentStatus: "Belum Dibayar",
    notes: "Mohon samping jangan terlalu botak.",
    createdAt: "2026-10-20T10:00:00.000Z"
  },
  {
    id: "bkg-002",
    code: "KZ-26002",
    customerId: "cus-002",
    customerName: "Budi Santoso",
    customerPhone: "081398765432",
    serviceId: "svc-002",
    serviceName: "Precision Fade & Beard Sculpting",
    barberId: "bar-001",
    barberName: "Raka Pratama",
    date: todayStr,
    startTime: "14:00",
    endTime: "15:00",
    priceSnapshot: 110000,
    status: "Dikonfirmasi",
    paymentMethod: "Transfer Bank - Verifikasi Admin",
    paymentStatus: "Lunas",
    notes: "Rapikan jenggot simetris.",
    createdAt: "2026-10-20T11:30:00.000Z"
  },
  {
    id: "bkg-003",
    code: "KZ-26003",
    customerId: "cus-003",
    customerName: "Dimas Anggara",
    customerPhone: "081987654321",
    serviceId: "svc-003",
    serviceName: "KINGZ Royal VIP Treatment",
    barberId: "bar-002",
    barberName: "Doni Hermawan",
    date: todayStr,
    startTime: "16:00",
    endTime: "17:15",
    priceSnapshot: 160000,
    status: "Menunggu Konfirmasi",
    paymentMethod: "Transfer Bank - Verifikasi Admin",
    paymentStatus: "Menunggu Verifikasi",
    notes: "Tolong siapkan pomade aroma sandalwood.",
    createdAt: "2026-10-21T07:15:00.000Z"
  },
  {
    id: "bkg-004",
    code: "KZ-26004",
    customerId: "cus-001",
    customerName: "Ahmad Rizky",
    customerPhone: "081234567890",
    serviceId: "svc-002",
    serviceName: "Precision Fade & Beard Sculpting",
    barberId: "bar-001",
    barberName: "Raka Pratama",
    date: "2026-10-15",
    startTime: "13:00",
    endTime: "14:00",
    priceSnapshot: 110000,
    status: "Selesai",
    paymentMethod: "Tunai di tempat",
    paymentStatus: "Lunas",
    notes: "Potongan rutin mingguan.",
    createdAt: "2026-10-14T09:00:00.000Z",
    review: {
      rating: 5,
      comment: "Potongan fade dari Mas Raka selalu sangat rapi dan simetris. Pelayanan mantap!",
      createdAt: "2026-10-15T15:30:00.000Z"
    }
  }
];

export const SHOP_SETTINGS = {
  name: "KINGZ Barber Shop",
  address: "Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan",
  phone: "+62 812-9988-7766",
  email: "info@kingzbarber.com",
  openingHours: {
    start: "10:00",
    end: "21:00",
    slotIntervalMinutes: 30
  },
  holidays: [
    "2026-12-25",
    "2026-01-01"
  ],
  cancellationCutoffHours: 2, // configurable placeholder
  paymentMethods: [
    { id: "cash", label: "Tunai di tempat", note: "Bayar langsung di kasir toko saat datang" },
    { id: "transfer", label: "Transfer Bank - Verifikasi Admin", note: "BCA 8820-1928-33 a/n KINGZ Studio (Upload/konfirmasi admin)" }
  ]
};
