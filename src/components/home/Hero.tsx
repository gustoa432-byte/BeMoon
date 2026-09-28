import React, { useState } from 'react';
import { Search, MapPin, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { CategoryType } from '../../types';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface HeroProps {
  onSearch: (query: string, category: CategoryType, location: string) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenMasterProfile: (masterId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  selectedCategory,
  onSelectCategory,
  onOpenMasterProfile
}) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState(t.locMoscowNear);

  const categories: { id: CategoryType; label: string; count: string }[] = [
    { id: 'all', label: t.catAll, count: '180+' },
    { id: 'hair', label: t.catHair, count: '64' },
    { id: 'nails', label: t.catNails, count: '42' },
    { id: 'barber', label: t.catBarber, count: '31' },
    { id: 'brows', label: t.catBrows, count: '28' },
    { id: 'makeup', label: t.catMakeup, count: '19' },
    { id: 'skin', label: t.catSkin, count: '24' },
    { id: 'tattoo', label: t.catTattoo, count: '15' },
  ];

  const naturalQueries = [
    t.naturalQuery1,
    t.naturalQuery2,
    t.naturalQuery3,
    t.naturalQuery4,
    t.naturalQuery5
  ];

  const handleFind = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sound.tap();
    triggerHaptic(12);
    onSearch(query, selectedCategory, location);
  };

  const handleQueryChip = (txt: string) => {
    setQuery(txt);
    sound.tap();
    triggerHaptic(8);
    onSearch(txt, selectedCategory, location);
  };

  return (
    <section className="relative w-full pt-8 pb-12 sm:pt-14 sm:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Core Tagline: "Find your people. Find your place." */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFECE6] text-[#484744] text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#161615]" />
            {t.badgeConcept}
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-[#161615] tracking-tight leading-[1.08] mb-4">
            {t.taglinePrimary}<br />
            <span className="text-[#787672]">{t.taglineSecondary}</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5A5956] max-w-xl mx-auto font-normal">
            {t.taglineSub}
          </p>
        </div>

        {/* Central Search Widget (Section 8) */}
        <div className="max-w-3xl mx-auto mb-8">
          <form 
            onSubmit={handleFind}
            className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-[#E4E1DB] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-stretch gap-2.5 transition-all focus-within:border-[#161615]"
          >
            {/* Input 1: What are you looking for? */}
            <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-[#FAF9F6] rounded-xl sm:rounded-2xl">
              <Search size={18} className="text-[#84827E] flex-shrink-0" />
              <input
                type="text"
                id="search-query-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent text-sm sm:text-base text-[#161615] placeholder:text-[#9A9894] focus:outline-none"
              />
            </div>

            {/* Input 2: Where? */}
            <div className="flex items-center gap-2.5 px-3 py-2 bg-[#FAF9F6] rounded-xl sm:rounded-2xl md:w-56">
              <MapPin size={17} className="text-[#84827E] flex-shrink-0" />
              <select
                id="search-location-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#161615] focus:outline-none cursor-pointer"
              >
                <option value={t.locMoscowNear}>{t.locMoscowNear}</option>
                <option value={t.locPatriarch}>{t.locPatriarch}</option>
                <option value={t.locKitayGorod}>{t.locKitayGorod}</option>
                <option value={t.locFlacon}>{t.locFlacon}</option>
                <option value={t.locKhamovniki}>{t.locKhamovniki}</option>
              </select>
            </div>

            {/* Find Button */}
            <button
              type="submit"
              id="search-submit-btn"
              className="px-6 py-3 bg-[#161615] hover:bg-black text-white text-sm font-semibold rounded-xl sm:rounded-2xl transition-all btn-press flex items-center justify-center gap-2"
            >
              <span>{t.btnFind}</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Natural Language Prompt Suggestions */}
          <div className="mt-3 flex items-center flex-wrap gap-1.5 text-xs text-[#7A7874] px-1">
            <span className="font-medium mr-1">{t.naturalSearch}</span>
            {naturalQueries.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleQueryChip(q)}
                className="px-2.5 py-1 rounded-full bg-[#EFECE6]/80 hover:bg-[#E4E1DB] text-[#444341] transition-colors btn-press text-[11px]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 px-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.tap();
                  triggerHaptic(8);
                  onSelectCategory(cat.id);
                }}
                id={`category-pill-${cat.id}`}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 btn-press flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#161615] text-white shadow-sm'
                    : 'bg-white text-[#555350] border border-[#E8E6E1] hover:border-[#161615] hover:text-[#161615]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] ${isSelected ? 'text-zinc-400' : 'text-[#A09D98]'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Authentic Multi-Image Composition (Section 9: Real life beauty photography) */}
        <div className="mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
          
          <div 
            onClick={() => onOpenMasterProfile('master-anna')}
            className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer bg-zinc-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=700&q=80" 
              alt="Anna Ivanova Hair Work" 
              className="w-full h-full object-cover img-zoom-hover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 p-3 flex flex-col justify-end text-white">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-300">Blonde & Airtouch</span>
              <p className="text-xs sm:text-sm font-medium line-clamp-1">Anna Ivanova · Studio X</p>
            </div>
          </div>

          <div 
            onClick={() => onOpenMasterProfile('master-marcus')}
            className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer bg-zinc-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=700&q=80" 
              alt="Marcus Barber Craft" 
              className="w-full h-full object-cover img-zoom-hover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 p-3 flex flex-col justify-end text-white">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-300">Precision Barber</span>
              <p className="text-xs sm:text-sm font-medium line-clamp-1">Marcus Chen · The Concrete Room</p>
            </div>
          </div>

          <div 
            onClick={() => onOpenMasterProfile('master-elena')}
            className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer bg-zinc-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80" 
              alt="Japanese Nail Art" 
              className="w-full h-full object-cover img-zoom-hover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 p-3 flex flex-col justify-end text-white">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-300">Japanese Mineral Nails</span>
              <p className="text-xs sm:text-sm font-medium line-clamp-1">Elena Rostova · Studio X</p>
            </div>
          </div>

          <div 
            onClick={() => onOpenMasterProfile('master-diana')}
            className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer bg-zinc-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1512290900672-1f48651f6760?auto=format&fit=crop&w=700&q=80" 
              alt="Facial Sculpting" 
              className="w-full h-full object-cover img-zoom-hover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 p-3 flex flex-col justify-end text-white">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-300">Buccal & Myofascial</span>
              <p className="text-xs sm:text-sm font-medium line-clamp-1">Diana Lee · Atelier Blanche</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

