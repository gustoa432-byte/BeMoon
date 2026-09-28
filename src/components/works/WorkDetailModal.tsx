import React, { useState } from 'react';
import { WorkItem, Master } from '../../types';
import { X, Heart, Bookmark, Share2, Calendar, Sparkles, ArrowRight, User, Check } from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface WorkDetailModalProps {
  work: WorkItem | null;
  master?: Master;
  onClose: () => void;
  onBookService?: (master: Master, serviceId?: string) => void;
  onOpenMasterProfile?: (masterId: string) => void;
}

export const WorkDetailModal: React.FC<WorkDetailModalProps> = ({
  work,
  master,
  onClose,
  onBookService,
  onOpenMasterProfile
}) => {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(work?.isLiked || false);
  const [isSaved, setIsSaved] = useState(work?.isSaved || false);
  const [showBefore, setShowBefore] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!work) return null;

  const handleLike = () => {
    sound.tap();
    triggerHaptic(10);
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    sound.tap();
    triggerHaptic(10);
    setIsSaved(!isSaved);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E4E1DB] flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors btn-press"
        >
          <X size={17} />
        </button>

        {/* Media Side (Before / After toggle if applicable) */}
        <div className="relative md:w-3/5 bg-zinc-950 flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[500px]">
          <img
            src={showBefore && work.beforeMediaUrl ? work.beforeMediaUrl : work.mediaUrl}
            alt={work.title}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Before / After Switch Button */}
          {work.isBeforeAfter && work.beforeMediaUrl && (
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 p-1 bg-black/70 backdrop-blur-md rounded-full border border-white/20">
              <button
                type="button"
                onClick={() => {
                  sound.tap();
                  setShowBefore(false);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all btn-press ${
                  !showBefore ? 'bg-white text-black' : 'text-white/80 hover:text-white'
                }`}
              >
                {t.afterResult}
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.tap();
                  setShowBefore(true);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all btn-press ${
                  showBefore ? 'bg-white text-black' : 'text-white/80 hover:text-white'
                }`}
              >
                {t.before}
              </button>
            </div>
          )}
        </div>

        {/* Details & Author Side */}
        <div className="md:w-2/5 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto bg-[#FAF9F6]">
          
          <div>
            {/* Master Header */}
            {master && (
              <div 
                onClick={() => {
                  onClose();
                  onOpenMasterProfile?.(master.id);
                }}
                className="flex items-center gap-3 cursor-pointer group pb-4 border-b border-[#EAE7E1]"
              >
                <img
                  src={master.avatar}
                  alt={master.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#EAE7E1]"
                />
                <div>
                  <h4 className="font-display font-semibold text-sm text-[#161615] group-hover:underline">
                    {master.name}
                  </h4>
                  <p className="text-[11px] text-[#706E6A]">
                    {master.specialization} · {master.currentPlaceName}
                  </p>
                </div>
              </div>
            )}

            {/* Title & Caption */}
            <div className="py-4">
              <h3 className="font-display font-semibold text-base sm:text-lg text-[#161615] mb-1.5 leading-snug">
                {work.title}
              </h3>
              {work.serviceName && (
                <span className="inline-block text-xs font-medium text-zinc-600 bg-[#EFECE6] px-2.5 py-0.5 rounded-full mb-3">
                  {t.service}: {work.serviceName}
                </span>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {work.tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-[#787672] bg-white border border-[#EAE7E1] px-2 py-0.5 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-[#9E9B96]">{work.date}</p>
            </div>
          </div>

          {/* Action Row & Book Button */}
          <div className="pt-4 border-t border-[#EAE7E1] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors btn-press ${
                    isLiked ? 'bg-rose-50 text-rose-600' : 'bg-white border border-[#EAE7E1] text-[#555350]'
                  }`}
                >
                  <Heart size={16} className={isLiked ? 'fill-rose-600' : ''} />
                </button>
                <span className="text-xs font-medium text-[#706E6A]">
                  {work.likesCount + (isLiked ? 1 : 0)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors btn-press ${
                    isSaved ? 'bg-[#161615] text-white' : 'bg-white border border-[#EAE7E1] text-[#555350]'
                  }`}
                >
                  <Bookmark size={16} className={isSaved ? 'fill-white' : ''} />
                </button>

                <button
                  onClick={() => {
                    sound.tap();
                    navigator.clipboard?.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="w-9 h-9 rounded-full bg-white border border-[#EAE7E1] text-[#555350] flex items-center justify-center btn-press hover:bg-[#EFECE6]"
                >
                  {copied ? <Check size={15} className="text-emerald-600" /> : <Share2 size={15} />}
                </button>
              </div>
            </div>

            {master && (
              <button
                onClick={() => {
                  onClose();
                  onBookService?.(master, work.serviceId);
                }}
                className="w-full py-2.5 px-4 bg-[#161615] hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-xl transition-all btn-press shadow-xs flex items-center justify-center gap-2"
              >
                <Calendar size={14} />
                <span>{t.btnBookStyle(master.name.split(' ')[0])}</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
