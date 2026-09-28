import React from 'react';
import { Master } from '../../types';
import { Star, MapPin, Check, Plus, Calendar, Sparkles } from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface MasterCardProps {
  master: Master;
  onOpenProfile: (masterId: string) => void;
  onBook: (master: Master) => void;
  onToggleFollow: (masterId: string) => void;
}

export const MasterCard: React.FC<MasterCardProps> = ({
  master,
  onOpenProfile,
  onBook,
  onToggleFollow
}) => {
  const { t } = useTranslation();
  const hasAvailableToday = Boolean(master.availability['2026-09-22']?.length);

  const handleCardClick = () => {
    sound.tap();
    triggerHaptic(8);
    onOpenProfile(master.id);
  };

  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.tap();
    triggerHaptic(12);
    onBook(master);
  };

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.tap();
    triggerHaptic(10);
    onToggleFollow(master.id);
  };

  return (
    <article 
      onClick={handleCardClick}
      id={`master-card-${master.id}`}
      className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl border border-[#EAE7E1] overflow-hidden transition-all duration-200 hover:border-[#161615] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col"
    >
      {/* Visual media container: photo takes dominant space */}
      <div className="relative aspect-[4/4] sm:aspect-[4/4.2] w-full overflow-hidden bg-zinc-100">
        <img
          src={master.coverImage || master.avatar}
          alt={master.name}
          loading="lazy"
          className="w-full h-full object-cover img-zoom-hover"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {hasAvailableToday ? (
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-medium text-[#161615] shadow-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t.availableToday}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[11px] font-medium text-[#5E5D5A]">
              {t.nextAvailable}
            </span>
          )}

          {/* Place Tag: Person linked to Place */}
          <span className="px-2.5 py-1 rounded-full bg-[#161615]/75 backdrop-blur-sm text-[11px] font-medium text-white">
            {master.currentPlaceName}
          </span>
        </div>

        {/* Small thumbnail works row on bottom of the photo */}
        {master.works.length > 0 && (
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1.5">
            {master.works.slice(0, 3).map((work) => (
              <div 
                key={work.id} 
                className="w-8 h-8 rounded-lg overflow-hidden border border-white/80 shadow-xs flex-shrink-0 bg-zinc-200"
              >
                <img src={work.mediaUrl} alt={work.title} className="w-full h-full object-cover" />
              </div>
            ))}
            {master.works.length > 3 && (
              <div className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-xs text-white text-[10px] font-semibold flex items-center justify-center flex-shrink-0">
                +{master.works.length - 3}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Section: Quiet Typography & Clean Hierarchy */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold text-lg text-[#161615] group-hover:text-black">
              {master.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 text-xs font-semibold text-[#161615] bg-[#FAF9F6] px-2 py-0.5 rounded-md">
              <Star size={12} className="fill-[#161615] text-[#161615]" />
              <span>{master.rating.toFixed(1)}</span>
              <span className="text-[#8C8A85] font-normal">({master.reviewCount})</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#6C6A66] line-clamp-1 mb-2.5">
            {master.specialization}
          </p>

          <div className="flex items-center gap-3 text-xs text-[#82807C]">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-[#9A9894]" />
              {master.city} · {master.distanceKm} km
            </span>
            <span>·</span>
            <span className="font-medium text-[#161615]">
              {t.fromPrice} ₽{master.startingPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Minimal Action Buttons (Section 10: Book, Follow) */}
        <div className="mt-4 pt-3 border-t border-[#F0EFEA] flex items-center justify-between gap-2">
          
          <button
            onClick={handleFollow}
            id={`master-follow-btn-${master.id}`}
            aria-label={master.isFollowing ? 'Unfollow master' : 'Follow master'}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-150 btn-press flex items-center gap-1 ${
              master.isFollowing
                ? 'bg-[#EAE7E0] text-[#161615]'
                : 'text-[#585652] hover:bg-[#F3F1EC]'
            }`}
          >
            {master.isFollowing ? (
              <>
                <Check size={12} strokeWidth={2.5} />
                <span>{t.btnFollowing}</span>
              </>
            ) : (
              <>
                <Plus size={12} strokeWidth={2.5} />
                <span>{t.btnFollow}</span>
              </>
            )}
          </button>

          <button
            onClick={handleBook}
            id={`master-book-btn-${master.id}`}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#161615] hover:bg-black rounded-full transition-all btn-press shadow-xs flex items-center gap-1.5"
          >
            <Calendar size={13} />
            <span>{t.btnBook}</span>
          </button>

        </div>

      </div>
    </article>
  );
};
