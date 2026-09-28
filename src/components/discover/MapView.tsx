import React, { useState } from 'react';
import { Master, PlaceItem } from '../../types';
import { MapPin, Star, Calendar, X, Navigation, Building2 } from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface MapViewProps {
  masters: Master[];
  places: PlaceItem[];
  onOpenMaster: (masterId: string) => void;
  onBookMaster: (master: Master) => void;
  onOpenPlace: (placeId: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  masters,
  places,
  onOpenMaster,
  onBookMaster,
  onOpenPlace
}) => {
  const { t } = useTranslation();
  const [selectedMaster, setSelectedMaster] = useState<Master | null>(masters[0] || null);
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);

  const handleSelectMaster = (m: Master) => {
    sound.tap();
    triggerHaptic(8);
    setSelectedMaster(m);
    setSelectedPlace(null);
  };

  const handleSelectPlace = (p: PlaceItem) => {
    sound.tap();
    triggerHaptic(8);
    setSelectedPlace(p);
    setSelectedMaster(null);
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden border border-[#E4E1DB] bg-[#F4F2EC]">
      
      {/* Interactive Stylized Map Canvas */}
      <div className="absolute inset-0 bg-[#EFECE5] flex items-center justify-center select-none overflow-hidden">
        {/* Subtle Map Roads & River Geometry */}
        <svg className="w-full h-full opacity-60 pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          {/* Moskva River Curve */}
          <path
            d="M -50 450 C 150 480, 280 430, 400 370 C 520 310, 680 320, 850 250"
            fill="none"
            stroke="#D8E2DC"
            strokeWidth="38"
            strokeLinecap="round"
          />
          {/* Garden Ring Road */}
          <ellipse cx="400" cy="300" rx="280" ry="210" fill="none" stroke="#E2DFD8" strokeWidth="6" strokeDasharray="6 4" />
          {/* Boulevard Ring */}
          <ellipse cx="400" cy="300" rx="160" ry="120" fill="none" stroke="#DDD9D0" strokeWidth="8" />
          {/* Arterials */}
          <line x1="400" y1="40" x2="400" y2="560" stroke="#E2DFD8" strokeWidth="4" />
          <line x1="80" y1="300" x2="720" y2="300" stroke="#E2DFD8" strokeWidth="4" />
          <line x1="160" y1="120" x2="640" y2="480" stroke="#E2DFD8" strokeWidth="3" />
        </svg>

        {/* Master Pins Placed on Map */}
        <div className="absolute inset-0 pointer-events-auto">
          {masters.map((master, idx) => {
            // Distribute markers realistically around Moscow center
            const offsets = [
              { top: '38%', left: '34%' }, // Patriarch Ponds (Anna)
              { top: '22%', left: '44%' }, // Flacon / Dmitrovskaya (Marcus)
              { top: '42%', left: '37%' }, // Patriarch Ponds (Elena)
              { top: '48%', left: '56%' }, // Kitay-Gorod (Diana)
              { top: '44%', left: '59%' }, // Kitay-Gorod (Alisa)
              { top: '25%', left: '48%' }, // Flacon (Roman)
            ];
            const pos = offsets[idx % offsets.length];
            const isSelected = selectedMaster?.id === master.id;

            return (
              <button
                key={master.id}
                onClick={() => handleSelectMaster(master)}
                style={{ top: pos.top, left: pos.left }}
                aria-label={`View ${master.name} on map`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 p-1 rounded-full transition-all duration-200 shadow-md ${
                  isSelected 
                    ? 'bg-[#161615] text-white ring-4 ring-black/10 scale-110 z-30' 
                    : 'bg-white text-[#161615] hover:scale-105 z-10'
                }`}
              >
                <img
                  src={master.avatar}
                  alt={master.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-white"
                />
                <span className="hidden sm:inline text-xs font-semibold px-1.5 whitespace-nowrap">
                  ₽{(master.startingPrice / 1000).toFixed(1)}k
                </span>
              </button>
            );
          })}

          {/* Place / Salon Pins */}
          {places.map((place, idx) => {
            const placePositions = [
              { top: '35%', left: '31%' }, // Studio X
              { top: '46%', left: '62%' }, // Atelier Blanche
              { top: '18%', left: '42%' }, // The Concrete Room
            ];
            const pos = placePositions[idx % placePositions.length];
            const isSelected = selectedPlace?.id === place.id;

            return (
              <button
                key={place.id}
                onClick={() => handleSelectPlace(place)}
                style={{ top: pos.top, left: pos.left }}
                aria-label={`View ${place.name} space on map`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-200 shadow-md flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#3A3835] text-white ring-4 ring-black/10 scale-110 z-30'
                    : 'bg-[#FAF8F5] text-[#333230] hover:scale-105 z-10 border border-[#DDD9D0]'
                }`}
              >
                <Building2 size={16} />
                <span className="hidden sm:inline text-[11px] font-semibold tracking-tight">
                  {place.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Map District Labels */}
        <div className="absolute top-6 left-6 text-xs font-semibold tracking-widest uppercase text-[#9C9A95] pointer-events-none">
          Moscow Center & Patriarch Ponds
        </div>
      </div>

      {/* Floating Selected Master / Place Preview Card */}
      {selectedMaster && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:max-w-md bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#EAE7E0] shadow-xl z-30 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div 
            onClick={() => onOpenMaster(selectedMaster.id)}
            className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
          >
            <img
              src={selectedMaster.avatar}
              alt={selectedMaster.name}
              className="w-14 h-14 rounded-xl object-cover border border-[#EAE7E0] flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-display font-semibold text-sm text-[#161615] truncate">
                  {selectedMaster.name}
                </h4>
                <div className="flex items-center gap-0.5 text-xs font-semibold text-[#161615]">
                  <Star size={11} className="fill-[#161615]" />
                  <span>{selectedMaster.rating}</span>
                </div>
              </div>
              <p className="text-xs text-[#706E6A] truncate">{selectedMaster.specialization}</p>
              <p className="text-xs text-[#8C8A85] mt-0.5">
                {selectedMaster.currentPlaceName} · {selectedMaster.distanceKm} km · {t.fromPrice} ₽{selectedMaster.startingPrice.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onBookMaster(selectedMaster)}
              className="px-3.5 py-2 bg-[#161615] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all btn-press flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>{t.btnBook}</span>
            </button>
          </div>
        </div>
      )}

      {selectedPlace && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:max-w-md bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#EAE7E0] shadow-xl z-30 flex items-center justify-between gap-3">
          <div 
            onClick={() => onOpenPlace(selectedPlace.id)}
            className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
          >
            <img
              src={selectedPlace.photos[0]}
              alt={selectedPlace.name}
              className="w-14 h-14 rounded-xl object-cover border border-[#EAE7E0] flex-shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-display font-semibold text-sm text-[#161615] truncate">
                {selectedPlace.name}
              </h4>
              <p className="text-xs text-[#706E6A] truncate">{selectedPlace.address}</p>
              <p className="text-xs text-[#8C8A85] mt-0.5">
                {t.residentMastersCount(selectedPlace.workingMasterIds.length)} · ★ {selectedPlace.rating}
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenPlace(selectedPlace.id)}
            className="px-3.5 py-2 bg-[#161615] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all btn-press"
          >
            {t.viewSpace}
          </button>
        </div>
      )}

    </div>
  );
};
