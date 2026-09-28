import React, { useState } from 'react';
import { ShortItem, CategoryType } from '../../types';
import { Play, Heart, Calendar, Sparkles } from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface ShortsFeedProps {
  shorts: ShortItem[];
  onOpenShort: (short: ShortItem, index: number) => void;
  onBookMaster: (masterId: string, serviceId?: string) => void;
  onOpenMasterProfile: (masterId: string) => void;
}

export const ShortsFeed: React.FC<ShortsFeedProps> = ({
  shorts,
  onOpenShort,
  onBookMaster,
  onOpenMasterProfile
}) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' 
    ? shorts 
    : shorts.filter((s) => s.category.toLowerCase() === filter);

  const categoryNames: Record<string, string> = {
    all: t.catAll,
    hair: t.catHair,
    barber: t.catBarber,
    nails: t.catNails,
    skin: t.catCosmo
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-24 space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-medium mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>{t.shortsHeaderBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-[#161615]">
            {t.shortsPageTitle}
          </h1>
          <p className="text-sm text-[#706E6A] mt-1">
            {t.shortsPageDesc}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {['all', 'hair', 'barber', 'nails', 'skin'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.tap();
                setFilter(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all btn-press ${
                filter === cat
                  ? 'bg-[#161615] text-white'
                  : 'bg-white text-[#504E4A] border border-[#EAE7E1] hover:border-[#161615]'
              }`}
            >
              {categoryNames[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => {
              sound.tap();
              triggerHaptic(8);
              onOpenShort(item, idx);
            }}
            className="group relative aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-black shadow-sm border border-zinc-200 hover:shadow-lg transition-all duration-200"
          >
            <img
              src={item.posterUrl}
              alt={item.title}
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
            />

            {/* Duration Tag */}
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-semibold text-white">
              {item.duration}s
            </span>

            {/* Play Button Indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#161615] group-hover:scale-110 transition-transform">
                <Play size={18} className="fill-[#161615] ml-0.5" />
              </div>
            </div>

            {/* Bottom Caption & Author */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/60 to-transparent text-white">
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenMasterProfile(item.masterId);
                }}
                className="flex items-center gap-2 mb-1.5 cursor-pointer hover:underline"
              >
                <img
                  src={item.masterAvatar}
                  alt={item.masterName}
                  className="w-6 h-6 rounded-full object-cover border border-white/80"
                />
                <span className="text-xs font-semibold truncate">{item.masterName}</span>
              </div>

              <p className="text-xs font-medium line-clamp-2 leading-snug">
                {item.title}
              </p>

              <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-300">
                <span className="flex items-center gap-1">
                  <Heart size={12} className="fill-rose-500 text-rose-500" />
                  {item.likes}
                </span>
                <span className="text-white font-semibold">
                  {item.priceFrom ? `₽${item.priceFrom.toLocaleString()}` : ''}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
