import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { generateAvailableSlots, getTodayDateStr } from '../../services/mockApi';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { Stepper } from '../../components/ui/Stepper';
import { Badge } from '../../components/ui/Badge';
import {
  Scissors,
  User,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react';

export const BookingFlowPage = () => {
  const { services, barbers, bookings, currentCustomer, createBooking } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Initial params
  const preselectedServiceId = searchParams.get('serviceId');
  const preselectedBarberId = searchParams.get('barberId');

  const [currentStep, setCurrentStep] = useState(0);

  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState(preselectedServiceId || '');
  const [selectedBarberId, setSelectedBarberId] = useState(preselectedBarberId || '');
  const [selectedDate, setSelectedDate] = useState(getTodayDateStr());
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState(currentCustomer?.name || 'Ahmad Rizky');
  const [customerPhone, setCustomerPhone] = useState(currentCustomer?.phone || '081234567890');
  const [paymentMethod, setPaymentMethod] = useState('Tunai di tempat');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Selected entities
  const selectedService = services.find(s => s.id === selectedServiceId);
  const selectedBarber = barbers.find(b => b.id === selectedBarberId);

  // Jump to step 1 if service preselected
  useEffect(() => {
    if (preselectedServiceId && !selectedBarberId && currentStep === 0) {
      setCurrentStep(1);
    }
  }, [preselectedServiceId]);

  // Compute available slots whenever barber, date, or service changes
  const [slotData, setSlotData] = useState({ available: false, slots: [], reason: '' });

  useEffect(() => {
    if (selectedBarberId && selectedService && selectedDate) {
      const result = generateAvailableSlots({
        barberId: selectedBarberId,
        durationMinutes: selectedService.durationMinutes,
        dateStr: selectedDate,
        existingBookings: bookings
      });
      setSlotData(result);
      // Reset selected time if previous slot is no longer available
      if (selectedTime) {
        const slotMatch = result.slots.find(s => s.time === selectedTime && s.available);
        if (!slotMatch) setSelectedTime('');
      }
    }
  }, [selectedBarberId, selectedService, selectedDate, bookings]);

  // Handle final submit
  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) {
      setErrorMsg('Harap lengkapi semua data reservasi terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const newBooking = await createBooking({
        customerId: currentCustomer?.id || 'cus-001',
        customerName,
        customerPhone,
        serviceId: selectedService.id,
        barberId: selectedBarber.id,
        date: selectedDate,
        startTime: selectedTime,
        paymentMethod,
        notes
      });
      navigate(`/booking/confirmation/${newBooking.id}`);
    } catch (err) {
      setErrorMsg(err.message || 'Gagal membuat booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 'var(--space-8) 0 var(--space-16)' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <span style={{ color: 'var(--brand-gold)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em' }}>
            RESERVASI ONLINE RESMI
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', marginTop: '4px' }}>
            Pemesanan Slot Layanan Cukur
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Langkah mudah reservasi tanpa antre dengan kepastian jadwal terverifikasi
          </p>
        </div>

        {/* Stepper Indicator */}
        <Stepper
          steps={['Pilih Layanan', 'Pilih Barber', 'Tanggal & Jam', 'Konfirmasi']}
          currentStep={currentStep}
          onStepClick={(stepIdx) => setCurrentStep(stepIdx)}
        />

        {/* Main Content Layout: Form + Summary Sidebar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-8)',
            alignItems: 'start'
          }}
          className="booking-layout-grid"
        >
          {/* Main Step Body */}
          <div style={{ minWidth: 0 }}>
            {/* STEP 0: Pilih Layanan */}
            {currentStep === 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <h2 style={{ fontSize: '1.35rem' }}>Langkah 1: Pilih Layanan</h2>
                    <p style={{ fontSize: '0.88rem' }}>Tentukan perlakuan rambut dan grooming yang Anda inginkan</p>
                  </div>
                  {selectedService && (
                    <Button variant="primary" size="sm" onClick={() => setCurrentStep(1)} icon={ArrowRight}>
                      Lanjut ke Barber
                    </Button>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                  {services.filter(s => s.active).map((svc) => {
                    const isSelected = selectedServiceId === svc.id;
                    return (
                      <Card
                        key={svc.id}
                        variant={isSelected ? 'highlight' : 'surface'}
                        padding="normal"
                        onClick={() => setSelectedServiceId(svc.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--brand-purple-light)', fontWeight: '700' }}>
                            {svc.category}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {svc.durationMinutes} Menit
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', color: isSelected ? 'var(--brand-gold)' : 'var(--text-primary)' }}>
                          {svc.name}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
                          {svc.description}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--gray-800)' }}>
                          <span className="price-display" style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--brand-gold)' }}>
                            Rp{svc.price.toLocaleString('id-ID')}
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: isSelected ? 'var(--brand-purple-light)' : 'var(--text-muted)' }}>
                            {isSelected ? '✓ Terpilih' : 'Klik untuk Pilih'}
                          </span>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="primary"
                    disabled={!selectedServiceId}
                    onClick={() => setCurrentStep(1)}
                    icon={ArrowRight}
                  >
                    Lanjut: Pilih Barber
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 1: Pilih Barber */}
            {currentStep === 1 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <h2 style={{ fontSize: '1.35rem' }}>Langkah 2: Pilih Master Barber</h2>
                    <p style={{ fontSize: '0.88rem' }}>Pilih barber yang sesuai dengan gaya pangkas yang Anda inginkan</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(0)} icon={ArrowLeft}>
                    Ubah Layanan
                  </Button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                  {barbers.filter(b => b.active).map((b) => {
                    const isSelected = selectedBarberId === b.id;
                    return (
                      <Card
                        key={b.id}
                        variant={isSelected ? 'highlight' : 'surface'}
                        padding="normal"
                        onClick={() => setSelectedBarberId(b.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                          <img
                            src={b.avatar}
                            alt={b.name}
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '12px',
                              objectFit: 'cover',
                              border: isSelected ? '2px solid var(--brand-gold)' : '1px solid var(--gray-800)'
                            }}
                          />
                          <div>
                            <h3 style={{ fontSize: '1.1rem', color: isSelected ? 'var(--brand-gold)' : 'var(--white)' }}>
                              {b.name}
                            </h3>
                            <span style={{ fontSize: '0.8rem', color: 'var(--brand-purple-light)', fontWeight: '600', display: 'block' }}>
                              {b.role}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              ⭐ {b.rating} ({b.reviewCount} ulasan)
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                          {b.specialties.map(spec => (
                            <span
                              key={spec}
                              style={{
                                fontSize: '0.7rem',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                backgroundColor: 'var(--surface-raised)',
                                color: 'var(--text-secondary)'
                              }}
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        <div style={{ fontSize: '0.8rem', color: isSelected ? 'var(--brand-gold)' : 'var(--text-muted)', fontWeight: '700', textAlign: 'right' }}>
                          {isSelected ? '✓ Barber Terpilih' : 'Pilih Barber'}
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="secondary" onClick={() => setCurrentStep(0)} icon={ArrowLeft}>
                    Kembali
                  </Button>
                  <Button
                    variant="primary"
                    disabled={!selectedBarberId}
                    onClick={() => setCurrentStep(2)}
                    icon={ArrowRight}
                  >
                    Lanjut: Tanggal &amp; Jam
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Tanggal & Jam */}
            {currentStep === 2 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <h2 style={{ fontSize: '1.35rem' }}>Langkah 3: Tentukan Tanggal &amp; Jam</h2>
                    <p style={{ fontSize: '0.88rem' }}>Pilih tanggal kunjungan dan jam mulai yang masih tersedia</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} icon={ArrowLeft}>
                    Ubah Barber
                  </Button>
                </div>

                <Card variant="surface" padding="normal" style={{ marginBottom: 'var(--space-6)' }}>
                  <div style={{ maxWidth: '320px', marginBottom: 'var(--space-6)' }}>
                    <Input
                      label="Tanggal Kunjungan"
                      type="date"
                      min={getTodayDateStr()}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Slot Results */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                        Pilihan Jam Mulai (Durasi Layanan: {selectedService?.durationMinutes} Menit)
                      </span>
                      {selectedTime && (
                        <span style={{ fontSize: '0.82rem', color: 'var(--brand-gold)', fontWeight: '700' }}>
                          Terpilih: {selectedTime} WIB
                        </span>
                      )}
                    </div>

                    {!slotData.available ? (
                      <div
                        style={{
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-input)',
                          backgroundColor: 'rgba(201, 52, 69, 0.12)',
                          border: '1px solid rgba(201, 52, 69, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          color: '#F87171'
                        }}
                      >
                        <AlertTriangle size={18} />
                        <span style={{ fontSize: '0.88rem', fontWeight: '500' }}>{slotData.reason}</span>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                          gap: '10px'
                        }}
                      >
                        {slotData.slots.map((slot) => {
                          const isSelected = selectedTime === slot.time;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={!slot.available}
                              onClick={() => setSelectedTime(slot.time)}
                              style={{
                                padding: '12px 8px',
                                borderRadius: '10px',
                                border: isSelected
                                  ? '2px solid var(--brand-gold)'
                                  : slot.available
                                  ? '1px solid var(--gray-800)'
                                  : '1px solid rgba(255, 255, 255, 0.05)',
                                backgroundColor: isSelected
                                  ? 'var(--brand-purple)'
                                  : slot.available
                                  ? 'var(--surface-raised)'
                                  : 'rgba(25, 23, 31, 0.4)',
                                color: isSelected
                                  ? 'var(--white)'
                                  : slot.available
                                  ? 'var(--text-primary)'
                                  : 'var(--gray-600)',
                                cursor: slot.available ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '3px',
                                transition: 'all var(--transition-fast)'
                              }}
                            >
                              <span className="time-tag" style={{ fontSize: '1rem', fontWeight: '700' }}>
                                {slot.time}
                              </span>
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  fontWeight: '600',
                                  color: isSelected
                                    ? 'var(--brand-gold)'
                                    : slot.available
                                    ? '#4ADE80'
                                    : 'var(--brand-red)'
                                }}
                              >
                                {slot.available ? 'Tersedia' : 'Penuh'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Card>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="secondary" onClick={() => setCurrentStep(1)} icon={ArrowLeft}>
                    Kembali
                  </Button>
                  <Button
                    variant="primary"
                    disabled={!selectedTime || !slotData.available}
                    onClick={() => setCurrentStep(3)}
                    icon={ArrowRight}
                  >
                    Lanjut: Konfirmasi &amp; Pembayaran
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Konfirmasi */}
            {currentStep === 3 && (
              <div>
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <h2 style={{ fontSize: '1.35rem' }}>Langkah 4: Konfirmasi &amp; Metode Pembayaran</h2>
                  <p style={{ fontSize: '0.88rem' }}>Periksa kembali rincian booking Anda sebelum dikirim</p>
                </div>

                {errorMsg && (
                  <div
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'rgba(201, 52, 69, 0.15)',
                      border: '1px solid var(--brand-red)',
                      borderRadius: 'var(--radius-input)',
                      color: '#FCA5A5',
                      fontSize: '0.9rem',
                      marginBottom: 'var(--space-6)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <AlertTriangle size={18} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <Card variant="surface" padding="normal" style={{ marginBottom: 'var(--space-6)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)', color: 'var(--brand-gold)' }}>
                    Data Pemesan
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                    <Input
                      label="Nama Lengkap"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                    <Input
                      label="Nomor WhatsApp"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                    />
                  </div>
                  <Textarea
                    label="Catatan Tambahan untuk Barber (Opsional)"
                    placeholder="Contoh: Samping mohon dibuat taper low fade, bagian atas biarkan panjang..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                  />
                </Card>

                {/* Payment Selection */}
                <Card variant="surface" padding="normal" style={{ marginBottom: 'var(--space-6)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>
                    Metode Pembayaran (Sesuai PRD MVP)
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-input)',
                        border: paymentMethod === 'Tunai di tempat' ? '1px solid var(--brand-gold)' : '1px solid var(--gray-800)',
                        backgroundColor: paymentMethod === 'Tunai di tempat' ? 'var(--surface-raised)' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="Tunai di tempat"
                        checked={paymentMethod === 'Tunai di tempat'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ marginTop: '3px' }}
                      />
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--white)' }}>
                          Tunai di Tempat (Cash at Shop)
                        </strong>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          Bayar langsung di kasir toko saat layanan selesai dikerjakan.
                        </span>
                      </div>
                    </label>

                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-input)',
                        border: paymentMethod.includes('Transfer') ? '1px solid var(--brand-gold)' : '1px solid var(--gray-800)',
                        backgroundColor: paymentMethod.includes('Transfer') ? 'var(--surface-raised)' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="Transfer Bank - Verifikasi Admin"
                        checked={paymentMethod.includes('Transfer')}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ marginTop: '3px' }}
                      />
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--white)' }}>
                          Transfer Bank (Verifikasi Manual Admin)
                        </strong>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          BCA 8820-1928-33 a/n KINGZ Studio. Admin akan memverifikasi bukti transfer.
                        </span>
                      </div>
                    </label>
                  </div>
                </Card>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="secondary" onClick={() => setCurrentStep(2)} icon={ArrowLeft}>
                    Kembali
                  </Button>
                  <Button
                    variant="gold"
                    size="lg"
                    isLoading={isSubmitting}
                    onClick={handleConfirmBooking}
                    icon={CheckCircle}
                  >
                    Konfirmasi &amp; Buat Booking Sekarang
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Summary Card on Desktop */}
          <div style={{ width: '100%', maxWidth: '380px' }}>
            <Card variant="raised" padding="normal" style={{ position: 'sticky', top: '90px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--gray-800)' }}>
                <Sparkles size={18} color="var(--brand-gold)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Ringkasan Reservasi</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
                {/* Layanan */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Layanan:</span>
                  <span style={{ fontWeight: '600', color: selectedService ? 'var(--white)' : 'var(--gray-600)', textAlign: 'right' }}>
                    {selectedService ? selectedService.name : 'Belum dipilih'}
                  </span>
                </div>

                {/* Durasi */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Durasi:</span>
                  <span style={{ fontWeight: '600', color: selectedService ? 'var(--white)' : 'var(--gray-600)' }}>
                    {selectedService ? `${selectedService.durationMinutes} Menit` : '-'}
                  </span>
                </div>

                {/* Barber */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Barber:</span>
                  <span style={{ fontWeight: '600', color: selectedBarber ? 'var(--brand-gold)' : 'var(--gray-600)' }}>
                    {selectedBarber ? selectedBarber.name : 'Belum dipilih'}
                  </span>
                </div>

                {/* Tanggal */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Tanggal:</span>
                  <span style={{ fontWeight: '600', color: selectedDate ? 'var(--white)' : 'var(--gray-600)' }}>
                    {selectedDate}
                  </span>
                </div>

                {/* Jam */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Jam Kedatangan:</span>
                  <span style={{ fontWeight: '600', color: selectedTime ? '#4ADE80' : 'var(--gray-600)' }}>
                    {selectedTime ? `${selectedTime} WIB` : 'Belum dipilih'}
                  </span>
                </div>

                {/* Tarif Total (Snapshot) */}
                <div
                  style={{
                    paddingTop: 'var(--space-4)',
                    marginTop: 'var(--space-2)',
                    borderTop: '1px solid var(--gray-800)',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontSize: '0.95rem', fontWeight: '700' }}>Total Biaya:</span>
                  <span className="price-display" style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--brand-gold)' }}>
                    Rp{selectedService ? selectedService.price.toLocaleString('id-ID') : '0'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .booking-layout-grid {
            grid-template-columns: 1fr 360px !important;
          }
        }
      `}</style>
    </div>
  );
};
