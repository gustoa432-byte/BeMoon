import React, { useState, useEffect } from 'react';
import { Master, ServiceItem, Booking } from '../../types';
import { X, Calendar, Clock, Check, ChevronRight, User, Phone, ArrowLeft, Sparkles, Building2 } from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  master: Master;
  preselectedService?: ServiceItem | null;
  onClose: () => void;
  onBookingConfirmed: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  master,
  preselectedService,
  onClose,
  onBookingConfirmed
}) => {
  const { t, language } = useTranslation();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    preselectedService || master.services[0] || null
  );

  // Available dates (e.g. 5 days window)
  const availableDates = Object.keys(master.availability).sort();
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0] || '2026-09-24');
  
  // Available slots for selected date
  const slots = master.availability[selectedDate] || ['11:00', '14:30', '17:00'];
  const [selectedSlot, setSelectedSlot] = useState<string>(slots[0] || '11:00');

  // Client Details
  const [clientName, setClientName] = useState('Elena Smirnova');
  const [clientPhone, setClientPhone] = useState('+7 (916) 234-56-78');
  const [clientNote, setClientNote] = useState('');
  const [calendarAdded, setCalendarAdded] = useState(false);

  // Steps: 'select' | 'confirmed'
  const [step, setStep] = useState<'select' | 'confirmed'>('select');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    // When date changes, select first slot
    if (slots.length > 0) {
      setSelectedSlot(slots[0]);
    }
  }, [selectedDate]);

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedSlot) return;

    sound.success();
    triggerHaptic(20);

    const newBooking: Booking = {
      id: `book-${Date.now().toString().slice(-4)}`,
      masterId: master.id,
      masterName: master.name,
      masterAvatar: master.avatar,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.priceFrom,
      placeName: master.currentPlaceName,
      date: selectedDate,
      time: selectedSlot,
      clientName: clientName.trim() || 'Guest Client',
      clientPhone: clientPhone.trim() || '+7 900 000-00-00',
      clientNote: clientNote.trim() || undefined,
      status: 'confirmed',
      createdAt: '2026-09-22'
    };

    setConfirmedBooking(newBooking);
    setStep('confirmed');
    onBookingConfirmed(newBooking);
  };

  const handleClose = () => {
    sound.tap();
    triggerHaptic(8);
    onClose();
  };

  const formatDateDisplay = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      const locale = language === 'ru' ? 'ru-RU' : 'en-US';
      return d.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm transition-all duration-200"
      onClick={handleClose}
    >
      {/* Modal Container: App-like responsive sheet */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E4E1DB] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#EAE7E1] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-3">
            <img
              src={master.avatar}
              alt={master.name}
              className="w-10 h-10 rounded-xl object-cover border border-[#EAE7E1]"
            />
            <div>
              <h3 className="font-display font-semibold text-sm sm:text-base text-[#161615]">
                {step === 'select' ? `${t.btnBook}: ${master.name}` : t.appointmentSecured}
              </h3>
              <p className="text-[11px] text-[#706E6A]">
                {master.specialization} · {master.currentPlaceName}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#6E6C68] hover:bg-[#EFECE6] transition-colors btn-press"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        {step === 'select' ? (
          <form onSubmit={handleConfirm} className="p-5 overflow-y-auto space-y-5">
            
            {/* 1. Service Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#787672] mb-2">
                1. {t.stepSelectService}
              </label>
              <div className="space-y-2">
                {master.services.map((svc) => {
                  const isChosen = selectedService?.id === svc.id;
                  return (
                    <div
                      key={svc.id}
                      onClick={() => {
                        sound.tap();
                        setSelectedService(svc);
                      }}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 btn-press ${
                        isChosen
                          ? 'border-[#161615] bg-[#FAF9F6] shadow-xs'
                          : 'border-[#EAE7E1] hover:border-[#B4B1AB] bg-white'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-[#161615] truncate">
                          {svc.name}
                        </p>
                        <p className="text-[11px] text-[#787672] mt-0.5">
                          {svc.durationMinutes} min · {svc.description.slice(0, 45)}...
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-[#161615]">
                          ₽{svc.priceFrom.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Date Selection (Compact availability) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#787672] mb-2">
                2. {t.stepChooseDate}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {availableDates.map((dt) => {
                  const isChosen = selectedDate === dt;
                  return (
                    <button
                      key={dt}
                      type="button"
                      onClick={() => {
                        sound.tap();
                        setSelectedDate(dt);
                      }}
                      className={`py-2 px-1 rounded-xl text-center border transition-all btn-press ${
                        isChosen
                          ? 'bg-[#161615] text-white border-[#161615] shadow-xs'
                          : 'bg-[#FAF9F6] text-[#444341] border-[#EAE7E1] hover:border-[#161615]'
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-medium opacity-80">
                        {formatDateDisplay(dt).split(',')[0]}
                      </span>
                      <span className="block text-xs font-bold mt-0.5">
                        {dt.split('-')[2]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Time Slots Selection (Section 54) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#787672]">
                  3. {t.stepAvailableSlots}
                </label>
                <span className="text-[11px] text-emerald-700 font-medium">{t.instantConfirmation}</span>
              </div>

              {slots.length === 0 ? (
                <p className="text-xs text-[#888682] py-2">{t.noSlotsDate}</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slots.map((time) => {
                    const isSelected = selectedSlot === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          sound.tap();
                          setSelectedSlot(time);
                        }}
                        className={`py-2 rounded-xl text-xs font-medium border transition-all btn-press flex items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-[#161615] text-white border-[#161615] shadow-xs'
                            : 'bg-[#FAF9F6] text-[#333230] border-[#EAE7E1] hover:border-[#161615]'
                        }`}
                      >
                        <Clock size={12} className={isSelected ? 'text-zinc-300' : 'text-[#8C8A85]'} />
                        <span>{time}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Client Contact Details */}
            <div className="pt-2 border-t border-[#F0EFEA] space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#787672]">
                4. {t.stepYourDetails}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder={t.namePlaceholder}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#EAE7E1] bg-[#FAF9F6] text-[#161615] focus:outline-none focus:border-[#161615]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder={t.phonePlaceholder}
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#EAE7E1] bg-[#FAF9F6] text-[#161615] focus:outline-none focus:border-[#161615]"
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder={t.notePlaceholder}
                value={clientNote}
                onChange={(e) => setClientNote(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#EAE7E1] bg-[#FAF9F6] text-[#161615] focus:outline-none focus:border-[#161615]"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-3 border-t border-[#F0EFEA] flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] text-[#787672]">{t.totalEstimated}</p>
                <p className="text-base sm:text-lg font-bold text-[#161615]">
                  ₽{selectedService?.priceFrom.toLocaleString()}
                </p>
              </div>

              <button
                type="submit"
                id="booking-submit-confirm"
                className="px-6 py-3 bg-[#161615] hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-2xl transition-all btn-press shadow-md flex items-center gap-2"
              >
                <span>{t.btnConfirmBooking}</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-800 mx-auto flex items-center justify-center">
              <Check size={28} strokeWidth={2.5} />
            </div>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                {t.appointmentSecured}
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-[#161615] mt-2">
                {t.bookedSuccess(master.name)}
              </h2>
              <p className="text-xs text-[#706E6A] mt-1">
                {t.bookingReference} #{confirmedBooking?.id.toUpperCase()}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#EAE7E1] text-left text-xs sm:text-sm space-y-2.5 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-[#787672]">{t.serviceLabel}:</span>
                <span className="font-semibold text-[#161615]">{confirmedBooking?.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#787672]">{t.dateTimeLabel}:</span>
                <span className="font-semibold text-[#161615]">
                  {formatDateDisplay(confirmedBooking?.date || '')} at {confirmedBooking?.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#787672]">{t.locationLabel}:</span>
                <span className="font-semibold text-[#161615]">{master.currentPlaceName}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE7E1]">
                <span className="text-[#787672]">{t.priceFromLabel}:</span>
                <span className="font-bold text-[#161615]">₽{confirmedBooking?.servicePrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#161615] text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-black transition-all btn-press"
              >
                {t.btnDone}
              </button>

              <button
                onClick={() => {
                  sound.tap();
                  setCalendarAdded(true);
                  setTimeout(() => setCalendarAdded(false), 2500);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#DDD9D0] text-[#3A3835] text-xs sm:text-sm font-medium rounded-xl hover:bg-[#F3F1EC] transition-all btn-press flex items-center justify-center gap-1.5"
              >
                {calendarAdded ? (
                  <>
                    <Check size={14} className="text-emerald-700" />
                    <span className="text-emerald-800 font-semibold">{t.calendarAdded}</span>
                  </>
                ) : (
                  <span>{t.btnAddToCalendar}</span>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

