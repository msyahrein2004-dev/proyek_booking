import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
  Crown,
  Calendar,
  Clock,
  Scissors,
  Sparkles,
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle,
  Coffee,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkle,
  Zap,
  Award
} from 'lucide-react';

export const HomePage = () => {
  const { services, barbers, bookings } = useApp();
  const [openFaq, setOpenFaq] = useState(null);

  const featuredServices = services.slice(0, 3);
  const completedReviews = bookings
    .filter(b => b.review)
    .map(b => ({
      customerName: b.customerName,
      serviceName: b.serviceName,
      barberName: b.barberName,
      rating: b.review.rating,
      comment: b.review.comment
    }));

  // Haircut style lookbook gallery data
  const styleLookbook = [
    {
      id: 'look-1',
      title: 'Precision Taper & Mid Fade',
      category: 'Fade Modern',
      desc: 'Gradasi halus di sisi samping dengan tekstur bervolume di bagian atas. Memberi kesan rapi, tegas, dan modern.',
      image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
      suitableFor: 'Semua bentuk wajah (terutama bulat & oval)',
      serviceId: 'svc-002'
    },
    {
      id: 'look-2',
      title: 'Classic Executive Pompadour',
      category: 'Gentleman Classic',
      desc: 'Tampilan pria mapan dengan sisiran slicked berkelas dan garis razor tegas. Daya tarik abadi dan karismatik.',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
      suitableFor: 'Wajah oval, persegi, dan diamond',
      serviceId: 'svc-001'
    },
    {
      id: 'look-3',
      title: 'Beard Detailing & Lineup',
      category: 'Beard Sculpting',
      desc: 'Perapian jenggot simetris dengan hot towel dan straight razor. Menegaskan garis rahang dan karakter maskulin.',
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
      suitableFor: 'Pria dengan brewok/jenggot lebat maupun tipis',
      serviceId: 'svc-002'
    },
    {
      id: 'look-4',
      title: 'KINGZ Royal VIP Treatment',
      category: 'Layanan Signature',
      desc: 'Kombinasi haircut premium, cuci menthol dingin, facial scrub, massage bahu, dan styling pomade terbaik.',
      image: 'https://images.unsplash.com/photo-1517832606589-7629c3397143?auto=format&fit=crop&w=600&q=80',
      suitableFor: 'Relaksasi menyeluruh & persiapan acara spesial',
      serviceId: 'svc-003'
    }
  ];

  const faqs = [
    {
      q: 'Apakah saya wajib reservasi online terlebih dahulu?',
      a: 'Sangat disarankan! Dengan reservasi online di KINGZ, slot waktu Anda terkunci secara real-time. Anda tidak perlu menunggu di sofa antrean dan master barber siap melayani Anda tepat saat Anda tiba.'
    },
    {
      q: 'Bagaimana jika saya datang terlambat dari jadwal booking?',
      a: 'Kami memberikan toleransi keterlambatan maksimal 10 menit. Jika melewati batas toleransi, kami akan berkoordinasi untuk menyesuaikan dengan ketersediaan slot berikutnya demi kenyamanan pelanggan yang terjadwal setelah Anda.'
    },
    {
      q: 'Apakah saya bisa memilih master barber spesifik?',
      a: 'Ya, tentu! Anda dapat memilih barber favorit Anda (seperti Raka, Doni, atau Bayu) saat proses pemesanan sesuai dengan keahlian potongan rambut yang Anda inginkan.'
    },
    {
      q: 'Metode pembayaran apa saja yang diterima di KINGZ?',
      a: 'Kami menerima pembayaran tunai di kasir studio saat kedatangan, serta transfer bank (BCA) dengan bukti transfer yang dapat dikonfirmasi oleh admin.'
    },
    {
      q: 'Apakah ada fasilitas minuman dan konsultasi bentuk wajah?',
      a: 'Setiap pelanggan KINGZ berhak mendapatkan welcome drink (kopi arabika atau air mineral dingin) serta sesi konsultasi bentuk wajah gratis bersama barber kami sebelum pemotongan dimulai.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(var(--space-10), 7vw, var(--space-16)) 0 var(--space-12)',
          background: 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(109, 40, 217, 0.28), rgba(17, 16, 20, 0.95) 75%)',
          borderBottom: '1px solid var(--gray-800)',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Live Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(217, 182, 111, 0.1)',
              border: '1px solid rgba(217, 182, 111, 0.3)',
              marginBottom: 'var(--space-6)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <span className="pulse-dot" />
            <span style={{ color: 'var(--brand-gold)', fontSize: '0.82rem', fontWeight: '700', letterSpacing: '0.04em' }}>
              TOKO BUKA HARI INI • 10.00 – 21.00 WIB • SENOPATI, JAKSEL
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.3rem, 5.5vw, 4rem)',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              maxWidth: '960px',
              margin: '0 auto var(--space-6)',
              color: 'var(--white)'
            }}
          >
            Gaya Rambut Presisi &amp; Perawatan Mewah untuk Para <span className="gold-text-gradient">Raja Modern</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.22rem)',
              maxWidth: '720px',
              margin: '0 auto var(--space-8)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65
            }}
          >
            Tinggalkan antrean lama yang membosankan. Nikmati pengalaman pangkas rambut futuristik dengan master barber bersertifikat, suasana eksklusif, dan kepastian slot waktu 100%.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-10)'
            }}
          >
            <Link to="/booking">
              <Button
                variant="gold"
                size="lg"
                icon={Calendar}
                style={{
                  boxShadow: '0 4px 20px rgba(217, 182, 111, 0.35)',
                  fontWeight: '700',
                  padding: '14px 28px'
                }}
              >
                Reservasi Slot Sekarang
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" size="lg" icon={Scissors} style={{ padding: '14px 24px' }}>
                Katalog &amp; Tarif Layanan
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 'var(--space-4)',
              maxWidth: '900px',
              margin: '0 auto',
              padding: 'var(--space-6) var(--space-4)',
              backgroundColor: 'rgba(25, 23, 31, 0.85)',
              border: '1px solid var(--gray-800)',
              borderRadius: 'var(--radius-card)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div>
              <div className="metric-value" style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--white)' }}>
                100%
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Slot Akurat Bebas Antre
              </div>
            </div>
            <div>
              <div className="metric-value" style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--brand-gold)' }}>
                4.95 ★
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Kepuasan Pelanggan (350+ Ulasan)
              </div>
            </div>
            <div>
              <div className="metric-value" style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--brand-purple-light)' }}>
                3 Master
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Barber Tersertifikasi Nasional
              </div>
            </div>
            <div>
              <div className="metric-value" style={{ fontSize: '2rem', fontWeight: '800', color: '#4ADE80' }}>
                Buka
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Setiap Hari (10.00 – 21.00)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook / Haircut Style Inspiration Section */}
      <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--gray-800)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-8)',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <span style={{ color: 'var(--brand-gold)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
                INSPIRASI GAYA RAMBUT (LOOKBOOK)
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', marginTop: 'var(--space-2)' }}>
                Koleksi Gaya Favorit Pria Masa Kini
              </h2>
            </div>
            <Link to="/booking">
              <Button variant="ghost" icon={ArrowRight}>
                Pilih Gaya &amp; Jadwalkan
              </Button>
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            {styleLookbook.map((item) => (
              <Card
                key={item.id}
                variant="surface"
                padding="none"
                className="card-interactive"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-card)',
                  backgroundColor: 'var(--surface-dark)'
                }}
              >
                {/* Image Showcase */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(17, 16, 20, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--brand-gold)',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      border: '1px solid rgba(217, 182, 111, 0.3)'
                    }}
                  >
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: '700', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', flex: 1, lineHeight: 1.55 }}>
                    {item.desc}
                  </p>

                  <div
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'var(--surface-raised)',
                      borderRadius: '8px',
                      marginBottom: 'var(--space-4)',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <strong style={{ color: 'var(--brand-purple-light)' }}>Kecocokan:</strong> {item.suitableFor}
                  </div>

                  <Link to={`/booking?serviceId=${item.serviceId}`}>
                    <Button variant="secondary" size="sm" style={{ width: '100%' }} icon={Scissors}>
                      Reservasi Gaya Ini
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Pillars & Facilities Section */}
      <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--gray-800)', backgroundColor: 'var(--surface-dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-10)' }}>
            <span style={{ color: 'var(--brand-purple-light)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
              STANDAR PELAYANAN BINTANG LIMA
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              Mengapa Para Gentleman Memilih KINGZ?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Kami memadukan teknik gunting barber tradisional dengan teknologi sistem reservasi modern untuk kepuasan total.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            <Card variant="raised" padding="lg" className="card-interactive">
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(109, 40, 217, 0.15)',
                  border: '1px solid rgba(109, 40, 217, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand-purple-light)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <Calendar size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                Slot Terkunci Akurat
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                Waktu Anda sangat berharga. Sistem otomatis menghitung durasi layanan sehingga tidak ada waktu tunggu berlebih.
              </p>
            </Card>

            <Card variant="raised" padding="lg" className="card-interactive">
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(217, 182, 111, 0.15)',
                  border: '1px solid rgba(217, 182, 111, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand-gold)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                Sterilisasi Medis UV Box
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                Setiap mata clipper, gunting, dan sisir disterilkan menggunakan box sinar UV sebelum menyentuh rambut Anda.
              </p>
            </Card>

            <Card variant="raised" padding="lg" className="card-interactive">
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4ADE80',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <Coffee size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                Lounge &amp; Welcome Drink
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                Nikmati secangkir espresso aromatik atau cold beverage gratis di lounge dengan alunan musik lo-fi dan AC sejuk.
              </p>
            </Card>

            <Card variant="raised" padding="lg" className="card-interactive">
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(201, 52, 69, 0.15)',
                  border: '1px solid rgba(201, 52, 69, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F87171',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                Konsultasi Bentuk Wajah
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                Analisis proporsi bentuk rahang dan jenis rambut oleh master stylist sebelum eksekusi pemotongan dilakukan.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--gray-800)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-8)',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <span style={{ color: 'var(--brand-gold)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
                KATALOG POPULER
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', marginTop: 'var(--space-2)' }}>
                Layanan Terfavorit Pelanggan
              </h2>
            </div>
            <Link to="/services">
              <Button variant="ghost" icon={ArrowRight}>
                Lihat Semua ({services.length} Layanan)
              </Button>
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            {featuredServices.map((svc) => (
              <Card
                key={svc.id}
                variant="surface"
                padding="normal"
                className="card-interactive"
                style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: 'var(--brand-purple-light)',
                      backgroundColor: 'rgba(109, 40, 217, 0.15)',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {svc.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <Clock size={14} />
                    {svc.durationMinutes} Menit
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>
                  {svc.name}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', flex: 1, lineHeight: 1.6 }}>
                  {svc.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--gray-800)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Tarif Layanan</span>
                    <span className="price-display" style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--brand-gold)' }}>
                      Rp{svc.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <Link to={`/booking?serviceId=${svc.id}`}>
                    <Button variant="primary" size="sm">
                      Pilih Layanan
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Easy Steps Guide */}
      <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--gray-800)', backgroundColor: 'var(--surface-dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-10)' }}>
            <span style={{ color: 'var(--brand-gold)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
              CARA RESERVASI CEPAT
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', marginTop: 'var(--space-2)' }}>
              3 Langkah Mudah Menikmati Layanan KINGZ
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            <div
              style={{
                padding: 'var(--space-6)',
                backgroundColor: 'var(--surface-raised)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--gray-800)',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: 'var(--brand-purple-light)',
                  opacity: 0.4,
                  lineHeight: 1,
                  marginBottom: 'var(--space-3)'
                }}
              >
                01
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Pilih Layanan &amp; Barber</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Tentukan paket pangkas rambut atau combo styling yang Anda butuhkan, lalu pilih master barber pilihan Anda.
              </p>
            </div>

            <div
              style={{
                padding: 'var(--space-6)',
                backgroundColor: 'var(--surface-raised)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--gray-800)',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: 'var(--brand-gold)',
                  opacity: 0.4,
                  lineHeight: 1,
                  marginBottom: 'var(--space-3)'
                }}
              >
                02
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Tentukan Jam Bebas Bentrok</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Sistem secara otomatis menampilkan slot waktu yang tersedia. Slot langsung terkunci untuk Anda tanpa risiko bentrok.
              </p>
            </div>

            <div
              style={{
                padding: 'var(--space-6)',
                backgroundColor: 'var(--surface-raised)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--gray-800)',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#4ADE80',
                  opacity: 0.4,
                  lineHeight: 1,
                  marginBottom: 'var(--space-3)'
                }}
              >
                03
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Datang &amp; Tampil Maksimal</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Tunjukkan kode booking Anda di resepsionis. Duduk santai, nikmati welcome drink, dan rasakan pelayanan berkelas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Barber Team Preview */}
      <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--gray-800)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <span style={{ color: 'var(--brand-purple-light)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
              TIM MASTER BARBER
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', marginTop: 'var(--space-2)' }}>
              Tangan Ahli di Balik Ketajaman Gaya Anda
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            {barbers.map((b) => (
              <Card key={b.id} variant="raised" padding="normal" className="card-interactive" style={{ textAlign: 'center' }}>
                <img
                  src={b.avatar}
                  alt={b.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto var(--space-4)',
                    border: '2px solid var(--brand-gold)',
                    boxShadow: '0 4px 15px rgba(217, 182, 111, 0.2)'
                  }}
                />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{b.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--brand-gold)', fontWeight: '600', display: 'block', marginBottom: 'var(--space-3)' }}>
                  {b.role}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: 'var(--space-4)' }}>
                  <Star size={16} fill="var(--brand-gold)" color="var(--brand-gold)" />
                  <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{b.rating}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({b.reviewCount} ulasan)</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
                  {b.specialties.map((spec) => (
                    <span
                      key={spec}
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--surface-dark)',
                        border: '1px solid var(--gray-800)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <Link to={`/booking?barberId=${b.id}`}>
                  <Button variant="secondary" size="sm" style={{ width: '100%' }}>
                    Booking dengan {b.name.split(' ')[0]}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      {completedReviews.length > 0 && (
        <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--gray-800)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <span style={{ color: 'var(--brand-gold)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
                TESTIMONI NYATA
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', marginTop: 'var(--space-2)' }}>
                Pengalaman Para Pelanggan Setia KINGZ
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-6)'
              }}
            >
              {completedReviews.map((rev, idx) => (
                <Card key={idx} variant="surface" padding="normal" className="card-interactive">
                  <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--space-3)' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="var(--brand-gold)" color="var(--brand-gold)" />
                    ))}
                  </div>
                  <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
                    "{rev.comment}"
                  </p>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--brand-gold)' }}>{rev.customerName}</strong> · Layanan {rev.serviceName} bersama {rev.barberName}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Interactive Accordion */}
      <section style={{ padding: 'var(--space-12) 0', borderBottom: '1px solid var(--gray-800)', backgroundColor: 'var(--surface-dark)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span style={{ color: 'var(--brand-purple-light)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
              PERTANYAAN UMUM (FAQ)
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', marginTop: 'var(--space-2)' }}>
              Ada Pertanyaan Seputar KINGZ?
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'var(--surface-raised)',
                    borderRadius: 'var(--radius-input)',
                    border: '1px solid var(--gray-800)',
                    overflow: 'hidden',
                    transition: 'border-color var(--transition-fast)'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: 'var(--space-4) var(--space-5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      color: 'var(--white)',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--brand-gold)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 var(--space-5) var(--space-4)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.88rem',
                        lineHeight: 1.65,
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* High-Impact Bottom Call to Action */}
      <section
        style={{
          padding: 'var(--space-12) 0',
          background: 'linear-gradient(180deg, var(--brand-black) 0%, rgba(109, 40, 217, 0.15) 100%)',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '680px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--brand-purple)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-gold)',
              marginBottom: 'var(--space-4)',
              boxShadow: '0 0 20px rgba(109, 40, 217, 0.4)'
            }}
          >
            <Crown size={24} />
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '800', marginBottom: 'var(--space-3)' }}>
            Siap Tampil Beda &amp; Lebih Percaya Diri?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
            Amankan waktu potongan Anda sekarang juga. Dapatkan ketepatan waktu, hasil presisi, dan kenyamanan tanpa kompromi di KINGZ Studio.
          </p>

          <Link to="/booking">
            <Button
              variant="gold"
              size="lg"
              icon={Calendar}
              style={{
                boxShadow: '0 6px 25px rgba(217, 182, 111, 0.4)',
                fontWeight: '700',
                padding: '14px 32px'
              }}
            >
              Reservasi Slot Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
