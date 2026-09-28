import React, { useState } from 'react';
import { Master, PlaceItem } from '../../types';
import { 
  Users, Star, Calendar, ShieldCheck, ArrowRight, 
  Clock, Plus, Check, MapPin, Building2, TrendingUp, Sparkles, RefreshCw, Settings 
} from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface MasterDashboardProps {
  master: Master;
  places: PlaceItem[];
  onUpdatePlace: (masterId: string, newPlaceId: string, newPlaceName: string) => void;
  onOpenProfile: (masterId: string) => void;
  onOpenSettings?: () => void;
}

export const MasterDashboard: React.FC<MasterDashboardProps> = ({
  master,
  places,
  onUpdatePlace,
  onOpenProfile,
  onOpenSettings
}) => {
  const { t } = useTranslation();
  const [selectedPlaceId, setSelectedPlaceId] = useState(master.currentPlaceId);
  const [showTransferSuccess, setShowTransferSuccess] = useState(false);

  const todaySchedule = [
    { time: '10:00', client: 'Polina V.', service: 'Airtouch / Lived-in Blonde', status: 'In progress', duration: '3h' },
    { time: '14:00', client: 'Maria K.', service: 'Architectural Haircut', status: 'Confirmed', duration: '1h' },
    { time: '16:30', client: 'Daria B.', service: 'Gloss & Organic Keratin', status: 'Confirmed', duration: '1h 15m' },
  ];

  const handlePlaceSwitch = (newPlaceId: string) => {
    sound.success();
    triggerHaptic(15);
    const targetPlace = places.find((p) => p.id === newPlaceId);
    if (!targetPlace) return;

    setSelectedPlaceId(newPlaceId);
    onUpdatePlace(master.id, targetPlace.id, targetPlace.name);
    setShowTransferSuccess(true);
    setTimeout(() => setShowTransferSuccess(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-24 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-[#E4E1DB] shadow-xs">
        <div className="flex items-center gap-4">
          <img
            src={master.avatar}
            alt={master.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#84827E]">
                {t.proDeskSpaceBadge}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                {t.proDeskActiveMaster}
              </span>
            </div>
            <h1 className="text-2xl font-display font-semibold text-[#161615]">
              My BE&MOON · {master.name}
            </h1>
            <p className="text-xs text-[#706E6A]">
              {t.proDeskSub}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="px-3.5 py-2 bg-[#FAF9F6] border border-[#DDD9D0] text-[#161615] text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#F2EFE8] transition-all btn-press flex items-center gap-1.5"
              title={t.navSettings}
            >
              <Settings size={14} />
              <span className="hidden sm:inline">{t.navSettings}</span>
            </button>
          )}
          <button
            onClick={() => onOpenProfile(master.id)}
            className="px-4 py-2 bg-[#FAF9F6] border border-[#DDD9D0] text-[#161615] text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#F2EFE8] transition-all btn-press flex items-center gap-1.5"
          >
            <span>{t.btnViewPublicProfile}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Place Transfer Notification if triggered */}
      {showTransferSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs sm:text-sm flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Check size={18} className="text-emerald-700" />
            <span>
              {t.transferSuccessMsg(master.followersCount.toLocaleString(), master.reviewCount)}
            </span>
          </div>
        </div>
      )}

      {/* Metrics Row (Section 35) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        
        {/* Profile Completeness */}
        <div className="bg-white p-4 rounded-2xl border border-[#EAE7E1]">
          <p className="text-[11px] font-medium text-[#7A7874] uppercase tracking-wider">
            {t.statCompleteness}
          </p>
          <p className="text-2xl font-display font-bold text-[#161615] mt-1">92%</p>
          <div className="w-full bg-[#EFECE6] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#161615] h-full w-[92%]" />
          </div>
        </div>

        {/* Followers */}
        <div className="bg-white p-4 rounded-2xl border border-[#EAE7E1]">
          <p className="text-[11px] font-medium text-[#7A7874] uppercase tracking-wider">
            {t.statFollowers}
          </p>
          <p className="text-2xl font-display font-bold text-[#161615] mt-1">
            {master.followersCount.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-600 font-medium">{t.statThisWeek}</span>
        </div>

        {/* Rating */}
        <div className="bg-white p-4 rounded-2xl border border-[#EAE7E1]">
          <p className="text-[11px] font-medium text-[#7A7874] uppercase tracking-wider">
            {t.statRating}
          </p>
          <p className="text-2xl font-display font-bold text-[#161615] mt-1 flex items-center gap-1">
            <span>{master.rating}</span>
            <Star size={18} className="fill-[#161615] text-[#161615]" />
          </p>
          <span className="text-[10px] text-[#7A7874] font-medium">{t.statTopPercent}</span>
        </div>

        {/* Reviews */}
        <div className="bg-white p-4 rounded-2xl border border-[#EAE7E1]">
          <p className="text-[11px] font-medium text-[#7A7874] uppercase tracking-wider">
            {t.statReviews}
          </p>
          <p className="text-2xl font-display font-bold text-[#161615] mt-1">
            {master.reviewCount}
          </p>
          <span className="text-[10px] text-[#7A7874] font-medium">{t.statVerifiedReviews}</span>
        </div>

        {/* Bookings */}
        <div className="bg-white p-4 rounded-2xl border border-[#EAE7E1] col-span-2 sm:col-span-1">
          <p className="text-[11px] font-medium text-[#7A7874] uppercase tracking-wider">
            {t.statBookings}
          </p>
          <p className="text-2xl font-display font-bold text-[#161615] mt-1">78</p>
          <span className="text-[10px] text-emerald-600 font-medium">{t.statOccupancy}</span>
        </div>

      </div>

      {/* Main Grid: Today's Schedule & Workplace Management */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Today's Schedule (Section 35) */}
        <div className="md:col-span-2 bg-white p-5 sm:p-6 rounded-3xl border border-[#E4E1DB] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg text-[#161615]">
                {t.todayScheduleTitle}
              </h3>
              <p className="text-xs text-[#7A7874]">{t.todayScheduleSub}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E8E5DF] text-xs font-semibold text-[#161615]">
              {master.currentPlaceName}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {todaySchedule.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-2xl border border-[#EAE7E1] bg-[#FAF9F6] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-14 text-center font-bold text-xs sm:text-sm text-[#161615] bg-white py-1.5 rounded-lg border border-[#E4E1DB]">
                    {item.time}
                  </span>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-[#161615]">
                      {item.client}
                    </h4>
                    <p className="text-xs text-[#706E6A]">{item.service}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    item.status === 'In progress' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.status}
                  </span>
                  <p className="text-[10px] text-[#8C8A85] mt-1">{item.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Workplace Portability (Section 29: Place ≠ Person) */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E4E1DB] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 size={18} className="text-[#161615]" />
              <h3 className="font-display font-semibold text-base text-[#161615]">
                {t.currentSalonSpaceTitle}
              </h3>
            </div>
            <p className="text-xs text-[#7A7874] leading-relaxed">
              {t.currentSalonSpaceDesc}
            </p>

            {/* Select place to simulate portability */}
            <div className="mt-4 space-y-2">
              {places.map((place) => {
                const isSelected = selectedPlaceId === place.id;
                return (
                  <div
                    key={place.id}
                    onClick={() => handlePlaceSwitch(place.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all btn-press flex items-center justify-between ${
                      isSelected
                        ? 'border-[#161615] bg-[#FAF9F6] shadow-xs'
                        : 'border-[#EAE7E1] hover:border-[#BBB8B2]'
                    }`}
                  >
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-[#161615]">
                        {place.name}
                      </h4>
                      <p className="text-[11px] text-[#787672]">{place.district}</p>
                    </div>

                    {isSelected ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {t.labelCurrentSpace}
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#8C8A85] hover:text-[#161615]">
                        {t.btnTransferHere}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAE7E1] text-[11px] text-[#888682] flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600 flex-shrink-0" />
            <span>{t.reputationPortableNote}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
