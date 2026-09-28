import React from 'react';
import { PlaceItem, Master } from '../../types';
import { ArrowLeft, Star, MapPin, Coffee, Wifi, Car, Shield, Sparkles, Building2, User } from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface PlaceDetailsProps {
  place: PlaceItem;
  masters: Master[];
  onBack: () => void;
  onOpenMaster: (masterId: string) => void;
  onBookMaster: (master: Master) => void;
}

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({
  place,
  masters,
  onBack,
  onOpenMaster,
  onBookMaster
}) => {
  const { t } = useTranslation();
  const residentMasters = masters.filter((m) => place.workingMasterIds.includes(m.id));

  return (
    <div className="w-full pb-24 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="sticky top-16 z-30 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAE8E4] px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#484744] hover:text-[#161615] transition-colors btn-press py-1"
        >
          <ArrowLeft size={16} />
          <span>{t.btnBack}</span>
        </button>
        <span className="text-xs font-semibold text-[#807E7A] uppercase tracking-wider">
          {t.spaceSalon}
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-10">
        
        {/* Space Hero Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden border border-[#EAE7E1] bg-white p-2">
          <div className="md:col-span-2 h-64 sm:h-96 rounded-2xl overflow-hidden bg-zinc-100">
            <img
              src={place.photos[0]}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 h-40 md:h-96">
            {place.photos.slice(1, 3).map((photo, idx) => (
              <div key={idx} className="h-full rounded-2xl overflow-hidden bg-zinc-100">
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Place Title & Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAE8E4]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-4xl font-display font-semibold text-[#161615]">
                {place.name}
              </h1>
              <div className="flex items-center gap-1 text-xs font-bold text-[#161615] bg-white border border-[#EAE7E1] px-2.5 py-1 rounded-full">
                <Star size={12} className="fill-[#161615]" />
                <span>{place.rating}</span>
                <span className="text-[#888682] font-normal">({place.reviewsCount})</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#6C6A66] flex items-center gap-1.5 mt-1">
              <MapPin size={14} className="text-[#9C9A95]" />
              {place.city} · {place.district} · {place.address}
            </p>
          </div>

          {/* Place ≠ Person Manifesto Banner (Section 29) */}
          <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EAE7E0] max-w-sm text-xs text-[#5C5A56] flex items-start gap-2.5">
            <Shield size={16} className="text-[#161615] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#161615]">{t.independentHub}</p>
              <p className="text-[11px] text-[#7A7874] mt-0.5 leading-snug">
                {t.independentHubDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Space Description & Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="font-display font-semibold text-lg text-[#161615] mb-2">
              {t.aboutSpace}
            </h3>
            <p className="text-sm text-[#555350] leading-relaxed">
              {place.description}
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-[#161615] uppercase tracking-wider mb-3">
              {t.amenitiesTitle}
            </h3>
            <ul className="space-y-2 text-xs text-[#484643]">
              {place.amenities.map((am) => (
                <li key={am} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#EAE7E1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#161615]" />
                  <span>{am}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Resident Masters (People Working Here - Section 28) */}
        <div>
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#161615]">
              {t.residentMastersTitle(residentMasters.length)}
            </h3>
            <p className="text-xs text-[#787672]">
              {t.residentMastersSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {residentMasters.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  sound.tap();
                  onOpenMaster(m.id);
                }}
                className="group p-4 bg-white rounded-2xl border border-[#EAE7E1] hover:border-[#161615] transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#EAE7E1] flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-display font-semibold text-sm text-[#161615] truncate group-hover:underline">
                      {m.name}
                    </h4>
                    <p className="text-xs text-[#706E6A] truncate">{m.specialization}</p>
                    <p className="text-[11px] text-[#9A9894] mt-0.5">
                      ★ {m.rating} · {t.fromPrice} ₽{m.startingPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.tap();
                    onBookMaster(m);
                  }}
                  className="px-3 py-1.5 bg-[#161615] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors flex-shrink-0 btn-press"
                >
                  {t.btnBook}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
