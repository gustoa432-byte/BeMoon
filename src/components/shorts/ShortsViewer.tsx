import React, { useState, useRef, useEffect } from 'react';
import { ShortItem, Master } from '../../types';
import { X, Play, Pause, Volume2, VolumeX, Heart, Calendar, ArrowRight, Share2, Sparkles, Check } from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface ShortsViewerProps {
  shorts: ShortItem[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onBookMaster: (masterId: string, serviceId?: string) => void;
  onOpenMasterProfile: (masterId: string) => void;
}

export const ShortsViewer: React.FC<ShortsViewerProps> = ({
  shorts,
  initialIndex = 0,
  isOpen,
  onClose,
  onBookMaster,
  onOpenMasterProfile
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const currentShort = shorts[currentIndex];

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
      setIsPlaying(true);
    }
  }, [currentIndex, isOpen]);

  if (!isOpen || !currentShort) return null;

  const handleNext = () => {
    if (currentIndex < shorts.length - 1) {
      sound.tap();
      triggerHaptic(8);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sound.tap();
      triggerHaptic(8);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
    triggerHaptic(8);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
    triggerHaptic(8);
  };

  const toggleLike = () => {
    sound.tap();
    triggerHaptic(12);
    setLikedMap((prev) => ({
      ...prev,
      [currentShort.id]: !prev[currentShort.id]
    }));
  };

  const isLiked = likedMap[currentShort.id] || currentShort.isLiked;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-[88vh] sm:max-w-sm sm:rounded-3xl overflow-hidden bg-black flex flex-col justify-between shadow-2xl animate-in fade-in duration-200"
      >
        {/* Top Controls */}
        <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-between pointer-events-auto">
          {/* Tag & Counter */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide uppercase">
              BE&MOON Shorts
            </span>
            <span className="text-white/70 text-xs font-mono">
              {currentIndex + 1} / {shorts.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center btn-press hover:bg-black/60 transition-colors"
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center btn-press hover:bg-black/60 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative w-full h-full cursor-pointer flex items-center justify-center overflow-hidden" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={currentShort.videoUrl}
            poster={currentShort.posterUrl}
            loop
            playsInline
            muted={isMuted}
            className="w-full h-full object-cover"
          />

          {/* Pause overlay icon */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center">
                <Play size={24} className="fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Navigation Tap Zones (Desktop & Mobile) */}
          <div className="absolute inset-y-0 left-0 w-1/4" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
          <div className="absolute inset-y-0 right-0 w-1/4" onClick={(e) => { e.stopPropagation(); handleNext(); }} />
        </div>

        {/* Right Floating Actions (Like, Share, etc.) */}
        <div className="absolute right-4 bottom-28 z-20 flex flex-col items-center gap-4">
          <button
            onClick={toggleLike}
            className="flex flex-col items-center gap-1 btn-press"
          >
            <div className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
              isLiked ? 'bg-rose-500 text-white' : 'bg-black/40 text-white'
            }`}>
              <Heart size={20} className={isLiked ? 'fill-white' : ''} />
            </div>
            <span className="text-white text-[11px] font-medium">
              {currentShort.likes + (isLiked ? 1 : 0)}
            </span>
          </button>

          <button
            onClick={() => {
              sound.tap();
              navigator.clipboard?.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex flex-col items-center gap-1 btn-press"
          >
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center">
              {copied ? <Check size={18} className="text-emerald-400" /> : <Share2 size={18} />}
            </div>
            <span className="text-white text-[11px] font-medium">{copied ? t.copiedLink : t.share}</span>
          </button>
        </div>

        {/* Bottom Floating Info & Master Booking CTA */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black via-black/60 to-transparent text-white pt-10">
          
          {/* Master Info */}
          <div 
            onClick={() => {
              onClose();
              onOpenMasterProfile(currentShort.masterId);
            }}
            className="flex items-center gap-2.5 cursor-pointer mb-2 group"
          >
            <img
              src={currentShort.masterAvatar}
              alt={currentShort.masterName}
              className="w-9 h-9 rounded-full object-cover border border-white/80"
            />
            <div>
              <h4 className="text-xs sm:text-sm font-semibold group-hover:underline">
                {currentShort.masterName}
              </h4>
              <p className="text-[10px] text-zinc-300">
                {currentShort.specialization}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-medium line-clamp-2 mb-3 leading-snug">
            {currentShort.title}
          </p>

          {/* 1-Tap Booking CTA directly from Short */}
          <button
            onClick={() => {
              onClose();
              onBookMaster(currentShort.masterId, currentShort.serviceId);
            }}
            id="shorts-book-cta"
            className="w-full py-2.5 px-4 bg-white hover:bg-zinc-100 text-[#161615] rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between btn-press shadow-md"
          >
            <span className="flex items-center gap-2">
              <Calendar size={15} />
              <span>{t.btnBook}: {currentShort.serviceName || t.craftWork}</span>
            </span>
            <span className="font-bold">
              {currentShort.priceFrom ? `${t.fromPrice} ₽${currentShort.priceFrom.toLocaleString()}` : t.btnChooseTime}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};
