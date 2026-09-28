import React from 'react';
import { Compass, Film, MessageSquare, MapPin, User, LayoutGrid } from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: any) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadCount = 1
}) => {
  const { t } = useTranslation();

  const handleTab = (tab: string) => {
    sound.tap();
    triggerHaptic(10);
    onSelectTab(tab);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-lg border-t border-[#EAE8E4] px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Discover / Find */}
        <button
          onClick={() => handleTab('discover')}
          id="mobile-nav-find"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all btn-press ${
            activeTab === 'discover' ? 'text-[#161615]' : 'text-[#8C8A85]'
          }`}
        >
          <Compass size={21} strokeWidth={activeTab === 'discover' ? 2.3 : 1.7} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">{t.navFind}</span>
        </button>

        {/* Shorts */}
        <button
          onClick={() => handleTab('shorts')}
          id="mobile-nav-shorts"
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all btn-press ${
            activeTab === 'shorts' ? 'text-[#161615]' : 'text-[#8C8A85]'
          }`}
        >
          <Film size={21} strokeWidth={activeTab === 'shorts' ? 2.3 : 1.7} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">{t.navShorts}</span>
          <span className="absolute top-1 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
        </button>

        {/* Places */}
        <button
          onClick={() => handleTab('places')}
          id="mobile-nav-places"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all btn-press ${
            activeTab === 'places' ? 'text-[#161615]' : 'text-[#8C8A85]'
          }`}
        >
          <MapPin size={21} strokeWidth={activeTab === 'places' ? 2.3 : 1.7} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">{t.navPlaces}</span>
        </button>

        {/* Messages */}
        <button
          onClick={() => handleTab('messages')}
          id="mobile-nav-messages"
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all btn-press ${
            activeTab === 'messages' ? 'text-[#161615]' : 'text-[#8C8A85]'
          }`}
        >
          <MessageSquare size={21} strokeWidth={activeTab === 'messages' ? 2.3 : 1.7} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">{t.navDirect}</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-2.5 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
          )}
        </button>

        {/* Master Desk / Profile */}
        <button
          onClick={() => handleTab('dashboard')}
          id="mobile-nav-dashboard"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all btn-press ${
            activeTab === 'dashboard' ? 'text-[#161615]' : 'text-[#8C8A85]'
          }`}
        >
          <User size={21} strokeWidth={activeTab === 'dashboard' ? 2.3 : 1.7} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">{t.navProDesk}</span>
        </button>

      </div>
    </nav>
  );
};
