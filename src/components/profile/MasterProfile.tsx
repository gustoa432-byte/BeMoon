import React, { useState } from 'react';
import { Master, ServiceItem, WorkItem, ShortItem } from '../../types';
import { 
  Star, MapPin, Check, Plus, MessageSquare, Calendar, 
  ArrowLeft, Share2, Instagram, Award, ShieldCheck, 
  Clock, Play, ExternalLink, Building2, ChevronRight 
} from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface MasterProfileProps {
  master: Master;
  onBack: () => void;
  onBook: (master: Master, service?: ServiceItem) => void;
  onMessage: (master: Master, contextService?: ServiceItem) => void;
  onToggleFollow: (masterId: string) => void;
  onOpenWork: (work: WorkItem) => void;
  onOpenShort: (short: ShortItem) => void;
  onOpenPlace: (placeId: string) => void;
}

type TabType = 'works' | 'shorts' | 'services' | 'about' | 'career' | 'reviews';

export const MasterProfile: React.FC<MasterProfileProps> = ({
  master,
  onBack,
  onBook,
  onMessage,
  onToggleFollow,
  onOpenWork,
  onOpenShort,
  onOpenPlace
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('works');
  const [copied, setCopied] = useState(false);

  const handleTabChange = (t: TabType) => {
    sound.tap();
    triggerHaptic(8);
    setActiveTab(t);
  };

  const handleShare = () => {
    sound.tap();
    if (navigator.share) {
      navigator.share({
        title: `${master.name} — BE&MOON`,
        text: `${master.name} · ${master.specialization} at ${master.currentPlaceName}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full pb-24 animate-in fade-in duration-200">
      
      {/* Top Navigation Bar with Back & Share */}
      <div className="sticky top-16 z-30 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAE8E4] px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <button
          onClick={onBack}
          id="profile-back-btn"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#484744] hover:text-[#161615] transition-colors btn-press py-1"
        >
          <ArrowLeft size={16} />
          <span>{t.btnBack}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            id="profile-share-btn"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#555350] hover:bg-[#EFECE6] transition-colors btn-press"
            title="Share profile"
          >
            <Share2 size={16} />
          </button>
          {copied && (
            <span className="text-xs bg-[#161615] text-white px-2 py-0.5 rounded-md">
              {t.copiedLink}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        
        {/* Header / Portrait Bio Block (Section 15) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pb-8 border-b border-[#EAE8E4]">
          
          {/* Portrait Photo */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-200 border-2 border-white shadow-md flex-shrink-0">
            <img
              src={master.avatar}
              alt={master.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1.5 right-1.5 p-1 bg-[#161615] text-white rounded-full" title="Verified Independent Master">
              <ShieldCheck size={13} />
            </div>
          </div>

          {/* Details & Actions */}
          <div className="flex-1 min-w-0">
            
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-[#161615]">
                {master.name}
              </h1>
              <span className="text-xs text-[#807E7A] font-medium">{master.handle}</span>
            </div>

            <p className="text-sm sm:text-base text-[#4C4B47] font-medium mb-2">
              {master.specialization}
            </p>

            {/* Metrics Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#706E6A] mb-4">
              <div className="flex items-center gap-1 font-semibold text-[#161615]">
                <Star size={14} className="fill-[#161615] text-[#161615]" />
                <span>{master.rating.toFixed(1)}</span>
                <span className="text-[#888682] font-normal">({master.reviewCount})</span>
              </div>
              <span>·</span>
              <span className="font-medium text-[#161615]">
                {master.followersCount.toLocaleString()} {t.statFollowers.toLowerCase()}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-[#8C8A85]" />
                {master.city} · {master.district}
              </span>
            </div>

            {/* Current Place Badge: "Place ≠ Person" principle */}
            <div 
              onClick={() => onOpenPlace(master.currentPlaceId)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F2EFE8] border border-[#E5E1D8] rounded-xl cursor-pointer transition-colors mb-5 group"
            >
              <Building2 size={14} className="text-[#7A7874]" />
              <div className="text-xs text-[#504E4A]">
                {t.residentAt} <span className="font-semibold text-[#161615] group-hover:underline">{master.currentPlaceName}</span>
              </div>
              <ChevronRight size={13} className="text-[#8C8A85] group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Main Action CTAs: [Book], [Message], [Follow] (Section 15) */}
            <div className="flex items-center flex-wrap gap-2.5">
              
              <button
                onClick={() => onBook(master)}
                id="profile-cta-book"
                className="px-6 py-2.5 bg-[#161615] hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-full transition-all btn-press shadow-sm flex items-center gap-2"
              >
                <Calendar size={15} />
                <span>{t.btnBookService}</span>
              </button>

              <button
                onClick={() => onMessage(master)}
                id="profile-cta-message"
                className="px-4 py-2.5 bg-white hover:bg-[#F3F1EC] text-[#161615] border border-[#DDD9D0] text-xs sm:text-sm font-medium rounded-full transition-all btn-press flex items-center gap-1.5"
              >
                <MessageSquare size={15} />
                <span>{t.btnMessage}</span>
              </button>

              <button
                onClick={() => onToggleFollow(master.id)}
                id="profile-cta-follow"
                className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-150 btn-press flex items-center gap-1.5 ${
                  master.isFollowing
                    ? 'bg-[#EAE7E0] text-[#161615]'
                    : 'bg-white border border-[#DDD9D0] text-[#444341] hover:bg-[#F3F1EC]'
                }`}
              >
                {master.isFollowing ? (
                  <>
                    <Check size={14} strokeWidth={2.5} />
                    <span>{t.btnFollowing}</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} strokeWidth={2.5} />
                    <span>{t.btnFollow}</span>
                  </>
                )}
              </button>

              {master.instagram && (
                <a
                  href={`https://instagram.com/${master.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#DDD9D0] flex items-center justify-center text-[#555350] hover:text-[#161615] hover:bg-[#F3F1EC] transition-colors btn-press"
                  title="Instagram Profile"
                >
                  <Instagram size={16} />
                </a>
              )}

            </div>

          </div>

        </div>

        {/* Section Tabs (Section 16: Works, Shorts, Services, About, Career, Reviews) */}
        <div className="mt-6 border-b border-[#EAE8E4] flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          
          <button
            onClick={() => handleTabChange('works')}
            id="tab-works-btn"
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-tight transition-all border-b-2 whitespace-nowrap btn-press ${
              activeTab === 'works'
                ? 'border-[#161615] text-[#161615]'
                : 'border-transparent text-[#787672] hover:text-[#161615]'
            }`}
          >
            {t.tabWorks} ({master.works.length})
          </button>

          <button
            onClick={() => handleTabChange('shorts')}
            id="tab-shorts-btn"
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-tight transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 btn-press ${
              activeTab === 'shorts'
                ? 'border-[#161615] text-[#161615]'
                : 'border-transparent text-[#787672] hover:text-[#161615]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            {t.tabShorts} ({master.shorts.length})
          </button>

          <button
            onClick={() => handleTabChange('services')}
            id="tab-services-btn"
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-tight transition-all border-b-2 whitespace-nowrap btn-press ${
              activeTab === 'services'
                ? 'border-[#161615] text-[#161615]'
                : 'border-transparent text-[#787672] hover:text-[#161615]'
            }`}
          >
            {t.tabServices} ({master.services.length})
          </button>

          <button
            onClick={() => handleTabChange('about')}
            id="tab-about-btn"
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-tight transition-all border-b-2 whitespace-nowrap btn-press ${
              activeTab === 'about'
                ? 'border-[#161615] text-[#161615]'
                : 'border-transparent text-[#787672] hover:text-[#161615]'
            }`}
          >
            {t.tabAbout}
          </button>

          <button
            onClick={() => handleTabChange('career')}
            id="tab-career-btn"
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-tight transition-all border-b-2 whitespace-nowrap btn-press ${
              activeTab === 'career'
                ? 'border-[#161615] text-[#161615]'
                : 'border-transparent text-[#787672] hover:text-[#161615]'
            }`}
          >
            {t.tabCareer}
          </button>

          <button
            onClick={() => handleTabChange('reviews')}
            id="tab-reviews-btn"
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-tight transition-all border-b-2 whitespace-nowrap btn-press ${
              activeTab === 'reviews'
                ? 'border-[#161615] text-[#161615]'
                : 'border-transparent text-[#787672] hover:text-[#161615]'
            }`}
          >
            {t.tabReviews} ({master.reviews.length})
          </button>

        </div>

        {/* Tab 1: Works Grid (Section 12: 3-col mobile, 4-5 col desktop, square & portrait, before/after) */}
        {activeTab === 'works' && (
          <div className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
              {master.works.map((work) => (
                <div
                  key={work.id}
                  onClick={() => onOpenWork(work)}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer bg-zinc-100 aspect-[4/5] border border-[#EAE7E1]"
                >
                  <img
                    src={work.mediaUrl}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover img-zoom-hover"
                  />

                  {work.isBeforeAfter && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[10px] font-semibold text-white">
                      {t.beforeAfterBadge}
                    </span>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                    <p className="text-xs font-medium line-clamp-1">{work.title}</p>
                    <p className="text-[10px] text-zinc-300 mt-0.5">{work.serviceName || t.craftWork}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Shorts (Section 14: 5–30s transformation videos) */}
        {activeTab === 'shorts' && (
          <div className="pt-6">
            {master.shorts.length === 0 ? (
              <div className="py-16 text-center text-[#787672]">
                <p className="text-sm">{t.noShortsYet(master.name)}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {master.shorts.map((short) => (
                  <div
                    key={short.id}
                    onClick={() => onOpenShort(short)}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer bg-black aspect-[9/16] shadow-sm border border-zinc-200"
                  >
                    <img
                      src={short.posterUrl}
                      alt={short.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#161615] group-hover:scale-110 transition-transform">
                        <Play size={18} className="fill-[#161615] ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 via-black/30 to-transparent text-white">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-xs font-medium">
                        {short.duration}s
                      </span>
                      <p className="text-xs font-medium line-clamp-2 mt-1.5 leading-snug">
                        {short.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Services (Section 17: Service items with price, duration, and Choose time CTA) */}
        {activeTab === 'services' && (
          <div className="pt-6 space-y-3.5 max-w-3xl">
            {master.services.map((svc) => (
              <div
                key={svc.id}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-[#EAE7E1] hover:border-[#161615] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-base text-[#161615]">
                      {svc.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6864] mt-1 line-clamp-2">
                    {svc.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[#84827E] mt-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {svc.durationMinutes} min
                    </span>
                    <span>·</span>
                    <span className="text-[#161615] font-semibold">
                      {t.fromPrice} ₽{svc.priceFrom.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => onMessage(master, svc)}
                    className="px-3.5 py-2 text-xs font-medium text-[#504E4A] hover:bg-[#F3F1EC] rounded-xl border border-[#E2DFD8] transition-colors btn-press"
                  >
                    {t.btnAskQuestion}
                  </button>

                  <button
                    onClick={() => onBook(master, svc)}
                    className="px-4 py-2 bg-[#161615] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all btn-press shadow-xs"
                  >
                    {t.btnChooseTime}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: About */}
        {activeTab === 'about' && (
          <div className="pt-6 max-w-2xl space-y-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE7E1]">
              <h3 className="font-display font-semibold text-base text-[#161615] mb-2">
                {t.aboutPhilosophy}
              </h3>
              <p className="text-sm text-[#504E4B] leading-relaxed">
                {master.about}
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE7E1]">
              <h3 className="font-display font-semibold text-base text-[#161615] mb-3">
                {t.aboutCurrentSpace}
              </h3>
              <div 
                onClick={() => onOpenPlace(master.currentPlaceId)}
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E5DF] cursor-pointer hover:border-[#161615] transition-colors group"
              >
                <div>
                  <h4 className="font-semibold text-sm text-[#161615] group-hover:underline">
                    {master.currentPlaceName}
                  </h4>
                  <p className="text-xs text-[#706E6A]">{master.city} · {master.district}</p>
                </div>
                <ArrowLeft size={16} className="rotate-180 text-[#888682] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Career & History (Section 30: Place ≠ Person portable history) */}
        {activeTab === 'career' && (
          <div className="pt-6 max-w-2xl">
            <div className="bg-white p-5 sm:p-7 rounded-2xl border border-[#EAE7E1]">
              <div className="mb-6">
                <h3 className="font-display font-semibold text-lg text-[#161615]">
                  {t.careerTitle}
                </h3>
                <p className="text-xs text-[#787672] mt-0.5">
                  {t.careerSubtitle}
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-[#E8E5DF] space-y-6">
                {master.careerHistory.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline dot */}
                    <div className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      step.isCurrent ? 'bg-[#161615] ring-4 ring-black/10' : 'bg-[#B0ADA8]'
                    }`} />

                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-[#161615]">{step.year}</span>
                      {step.isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                          {t.currentPlaceBadge}
                        </span>
                      )}
                    </div>

                    <h4 className="font-semibold text-sm text-[#161615] mt-0.5">
                      {step.placeName}
                    </h4>
                    <p className="text-xs text-[#5E5D59]">{step.role}</p>
                    {step.notes && (
                      <p className="text-xs text-[#807E7A] mt-1 italic">{step.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Reviews (Section 62: Reviews tied to verified actual services) */}
        {activeTab === 'reviews' && (
          <div className="pt-6 max-w-3xl space-y-4">
            {master.reviews.map((rev) => (
              <div key={rev.id} className="p-4 sm:p-5 bg-white rounded-2xl border border-[#EAE7E1]">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.authorAvatar}
                      alt={rev.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-[#EAE7E1]"
                    />
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-[#161615]">
                        {rev.authorName}
                      </h4>
                      <p className="text-[11px] text-[#787672]">
                        {t.verifiedClient} · {rev.serviceName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-xs font-semibold text-[#161615]">
                    <Star size={12} className="fill-[#161615]" />
                    <span>{rev.rating}.0</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4E4D4A] leading-relaxed pl-13">
                  "{rev.text}"
                </p>

                <div className="mt-2 text-[10px] text-[#9A9894] pl-13">
                  {rev.date}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
