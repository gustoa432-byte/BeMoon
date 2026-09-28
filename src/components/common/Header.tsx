import React, { useState } from 'react';
import { MoonLogo } from './MoonLogo';
import { sound, triggerHaptic } from '../../utils/sound';
import { Volume2, VolumeX, MessageSquare, Calendar, Sparkles, User, Settings, Globe } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: any) => void;
  onOpenCreateProfile?: () => void;
  onOpenSettings?: () => void;
  unreadCount?: number;
  bookingsCount?: number;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenCreateProfile,
  onOpenSettings,
  unreadCount = 1,
  bookingsCount = 1,
  soundEnabled,
  onToggleSound
}) => {
  const { lang, toggleLang, t } = useTranslation();
  const [internalSoundOn, setInternalSoundOn] = useState(sound.isEnabled());
  const soundOn = soundEnabled !== undefined ? soundEnabled : internalSoundOn;

  const handleToggleSound = () => {
    if (onToggleSound) {
      onToggleSound();
    } else {
      const next = !internalSoundOn;
      sound.setEnabled(next);
      setInternalSoundOn(next);
    }
    triggerHaptic(10);
    if (!soundOn) sound.tap();
  };

  const navClick = (tab: HeaderProps['activeTab']) => {
    sound.tap();
    triggerHaptic(8);
    onSelectTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAE8E4] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => navClick('discover')}
          className="cursor-pointer group flex items-center gap-3"
          id="header-logo-btn"
        >
          <MoonLogo size="md" variant="horizontal" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => navClick('discover')}
            id="nav-discover-btn"
            className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-150 btn-press ${
              activeTab === 'discover' 
                ? 'bg-[#161615] text-white shadow-sm' 
                : 'text-[#686764] hover:text-[#161615] hover:bg-[#EFECE6]'
            }`}
          >
            {t.navFind}
          </button>

          <button
            onClick={() => navClick('masters')}
            id="nav-masters-btn"
            className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-150 btn-press ${
              activeTab === 'masters' 
                ? 'bg-[#161615] text-white shadow-sm' 
                : 'text-[#686764] hover:text-[#161615] hover:bg-[#EFECE6]'
            }`}
          >
            {t.navMasters}
          </button>

          <button
            onClick={() => navClick('services')}
            id="nav-services-btn"
            className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-150 btn-press ${
              activeTab === 'services' 
                ? 'bg-[#161615] text-white shadow-sm' 
                : 'text-[#686764] hover:text-[#161615] hover:bg-[#EFECE6]'
            }`}
          >
            {t.navServices}
          </button>

          <button
            onClick={() => navClick('places')}
            id="nav-places-btn"
            className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-150 btn-press ${
              activeTab === 'places' 
                ? 'bg-[#161615] text-white shadow-sm' 
                : 'text-[#686764] hover:text-[#161615] hover:bg-[#EFECE6]'
            }`}
          >
            {t.navPlaces}
          </button>

          <button
            onClick={() => navClick('shorts')}
            id="nav-shorts-btn"
            className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-150 btn-press flex items-center gap-1.5 ${
              activeTab === 'shorts' 
                ? 'bg-[#161615] text-white shadow-sm' 
                : 'text-[#686764] hover:text-[#161615] hover:bg-[#EFECE6]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            {t.navShorts}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Quick Language Toggle Pill */}
          <button
            onClick={toggleLang}
            id="header-lang-quick-toggle"
            title={`Language: ${lang === 'ru' ? 'Русский' : 'English'} (Click to switch)`}
            aria-label="Toggle language"
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-[#FAF9F6] border border-[#DDD9D0] text-[#161615] hover:bg-[#EFECE6] transition-colors btn-press"
          >
            <Globe size={13} className="text-[#666460]" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Sound Toggle (Section 22: soft physical audio feedback) */}
          <button
            onClick={handleToggleSound}
            id="sound-toggle-btn"
            title={soundOn ? 'Sound feedback enabled' : 'Sound feedback muted'}
            aria-label="Toggle subtle UI sound"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors btn-press ${
              soundOn 
                ? 'bg-[#EAE7E0] text-[#161615]' 
                : 'text-[#9A9894] hover:bg-[#EFECE6]'
            }`}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Bookings shortcut */}
          <button
            onClick={() => navClick('bookings')}
            id="my-bookings-btn"
            title={t.myBookings}
            aria-label="View bookings"
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors btn-press ${
              activeTab === 'bookings'
                ? 'bg-[#161615] text-white'
                : 'text-[#444341] hover:bg-[#EFECE6]'
            }`}
          >
            <Calendar size={17} />
            {bookingsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#161615] rounded-full ring-2 ring-[#FAF9F6]" />
            )}
          </button>

          {/* Messages shortcut */}
          <button
            onClick={() => navClick('messages')}
            id="messages-btn"
            title={t.directMessagesTitle}
            aria-label="Open messages"
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors btn-press ${
              activeTab === 'messages'
                ? 'bg-[#161615] text-white'
                : 'text-[#444341] hover:bg-[#EFECE6]'
            }`}
          >
            <MessageSquare size={17} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-[#FAF9F6]" />
            )}
          </button>

          {/* Settings Modal Button */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              id="header-settings-btn"
              title={t.navSettings}
              aria-label="Open settings"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#555350] hover:text-[#161615] hover:bg-[#EFECE6] transition-colors btn-press"
            >
              <Settings size={16} />
            </button>
          )}

          {/* Become a Professional / Master Dashboard Switch (Section 7 & 35) */}
          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-[#EAE8E4]">
            <button
              onClick={() => navClick('dashboard')}
              id="master-dashboard-btn"
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-full transition-all btn-press ${
                activeTab === 'dashboard'
                  ? 'bg-[#161615] text-white'
                  : 'text-[#444341] hover:bg-[#EFECE6]'
              }`}
            >
              {t.navProDesk}
            </button>

            <button
              onClick={onOpenCreateProfile || (() => navClick('dashboard'))}
              id="become-pro-btn"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#161615] rounded-full hover:bg-black transition-all btn-press"
            >
              {t.navJoinPro}
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};

