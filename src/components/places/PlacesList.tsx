import React from 'react';
import { PlaceItem, Master } from '../../types';
import { Star, MapPin, Building2, Users, ArrowRight } from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface PlacesListProps {
  places: PlaceItem[];
  masters: Master[];
  onOpenPlace: (placeId: string) => void;
  onOpenMaster: (masterId: string) => void;
}

export const PlacesList: React.FC<PlacesListProps> = ({
  places,
  masters,
  onOpenPlace,
  onOpenMaster
}) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-24 space-y-8 animate-in fade-in duration-200">
      
      {/* Title */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFECE6] text-[#44423F] text-xs font-medium mb-3">
          <Building2 size={13} />
          <span>{t.curatedSpaces}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-semibold text-[#161615]">
          {t.placesPageTitle}
        </h1>
        <p className="text-sm text-[#6C6A66] mt-2">
          {t.placesPageSubtitle}
        </p>
      </div>

      {/* Grid of Places */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {places.map((place) => {
          const residentMasters = masters.filter((m) => place.workingMasterIds.includes(m.id));

          return (
            <div
              key={place.id}
              onClick={() => {
                sound.tap();
                triggerHaptic(8);
                onOpenPlace(place.id);
              }}
              className="group bg-white rounded-3xl border border-[#EAE7E1] overflow-hidden hover:border-[#161615] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              {/* Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                <img
                  src={place.photos[0]}
                  alt={place.name}
                  className="w-full h-full object-cover img-zoom-hover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-[#161615] flex items-center gap-1 shadow-xs">
                  <Star size={11} className="fill-[#161615]" />
                  <span>{place.rating}</span>
                  <span className="text-[#888682] font-normal">({place.reviewsCount})</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg text-[#161615] group-hover:underline">
                    {place.name}
                  </h3>
                  <p className="text-xs text-[#7A7874] flex items-center gap-1 mt-1">
                    <MapPin size={13} className="text-[#9C9A95]" />
                    {place.district} · {place.address}
                  </p>
                  <p className="text-xs text-[#555350] mt-3 line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>
                </div>

                {/* Resident Masters Footnote */}
                <div className="mt-5 pt-4 border-t border-[#F0EFEA] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {residentMasters.map((m) => (
                        <img
                          key={m.id}
                          src={m.avatar}
                          alt={m.name}
                          className="w-7 h-7 rounded-full object-cover border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-[#706E6A]">
                      {t.residentMastersCount(residentMasters.length)}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-[#161615] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>{t.viewSpace}</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
