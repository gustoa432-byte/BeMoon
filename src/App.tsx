import React, { useState, useMemo } from 'react';
import { 
  Master, PlaceItem, ServiceItem, WorkItem, ShortItem, 
  Booking, CategoryType 
} from './types';
import { initialMasters, initialPlaces, allShorts } from './data/mockData';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { Hero } from './components/home/Hero';
import { MasterCard } from './components/discover/MasterCard';
import { MapView } from './components/discover/MapView';
import { MasterProfile } from './components/profile/MasterProfile';
import { BookingModal } from './components/booking/BookingModal';
import { ShortsViewer } from './components/shorts/ShortsViewer';
import { ShortsFeed } from './components/shorts/ShortsFeed';
import { WorkDetailModal } from './components/works/WorkDetailModal';
import { PlaceDetails } from './components/places/PlaceDetails';
import { PlacesList } from './components/places/PlacesList';
import { MessagesView } from './components/chat/MessagesView';
import { MasterDashboard } from './components/dashboard/MasterDashboard';
import { SettingsModal } from './components/common/SettingsModal';
import { sound, triggerHaptic } from './utils/sound';
import { useTranslation } from './context/LanguageContext';
import { List, Map as MapIcon, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function App() {
  const { t } = useTranslation();

  // Navigation & Screen View State
  const [activeTab, setActiveTab] = useState<'discover' | 'shorts' | 'places' | 'messages' | 'dashboard'>('discover');
  const [activeMasterId, setActiveMasterId] = useState<string | null>(null);
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Interactive Data State
  const [masters, setMasters] = useState<Master[]>(initialMasters);
  const [places, setPlaces] = useState<PlaceItem[]>(initialPlaces);
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedLocation, setSelectedLocation] = useState('Moscow · Near me');

  // Modals & Overlays State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    master: Master | null;
    service?: ServiceItem | null;
  }>({
    isOpen: false,
    master: null,
    service: null
  });

  const [shortsViewer, setShortsViewer] = useState<{
    isOpen: boolean;
    initialIndex: number;
  }>({
    isOpen: false,
    initialIndex: 0
  });

  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [chatMasterId, setChatMasterId] = useState<string | null>(null);
  const [chatContextService, setChatContextService] = useState<ServiceItem | null>(null);

  // Sound Settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sound.isEnabled());

  const handleToggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  // Follow Toggle (Optimistic UI)
  const handleToggleFollow = (masterId: string) => {
    setMasters((prev) =>
      prev.map((m) => {
        if (m.id === masterId) {
          const isFollowing = !m.isFollowing;
          return {
            ...m,
            isFollowing,
            followersCount: m.followersCount + (isFollowing ? 1 : -1)
          };
        }
        return m;
      })
    );
  };

  // Switch Workplace (Place ≠ Person verification)
  const handleUpdateMasterPlace = (masterId: string, newPlaceId: string, newPlaceName: string) => {
    setMasters((prev) =>
      prev.map((m) => {
        if (m.id === masterId) {
          return {
            ...m,
            currentPlaceId: newPlaceId,
            currentPlaceName: newPlaceName,
            careerHistory: [
              {
                year: '2026',
                placeName: newPlaceName,
                role: `${m.specialization} (Current)`,
                isCurrent: true
              },
              ...m.careerHistory.map((ch) => ({ ...ch, isCurrent: false }))
            ]
          };
        }
        return m;
      })
    );
  };

  // Booking Flow Triggers
  const handleOpenBooking = (master: Master, service?: ServiceItem | null) => {
    sound.tap();
    triggerHaptic(12);
    setBookingModal({
      isOpen: true,
      master,
      service: service || null
    });
  };

  const handleBookingConfirmed = (booking: Booking) => {
    setConfirmedBookings((prev) => [booking, ...prev]);
  };

  // Message Flow Trigger
  const handleOpenMessage = (master: Master, contextService?: ServiceItem) => {
    sound.tap();
    triggerHaptic(8);
    setChatMasterId(master.id);
    setChatContextService(contextService || null);
    setActiveTab('messages');
    setActiveMasterId(null);
    setActivePlaceId(null);
  };

  // Profile View
  const handleOpenMasterProfile = (masterId: string) => {
    sound.tap();
    triggerHaptic(8);
    setActiveMasterId(masterId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Place View
  const handleOpenPlaceDetails = (placeId: string) => {
    sound.tap();
    triggerHaptic(8);
    setActivePlaceId(placeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Shorts Triggers
  const handleOpenShort = (short: ShortItem, index?: number) => {
    const idx = index !== undefined ? index : allShorts.findIndex((s: ShortItem) => s.id === short.id);
    setShortsViewer({
      isOpen: true,
      initialIndex: idx >= 0 ? idx : 0
    });
  };

  // Search filter logic (with Natural Language understanding)
  const filteredMasters = useMemo(() => {
    let result = [...masters];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((m) => m.category === selectedCategory);
    }

    // Filter by query (handles words like 'блонд', 'маникюр', 'барбер', 'до 7000', etc.)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();

      // Check for price constraint like "до 7000" or "under 5000"
      const priceMatch = q.match(/(?:до|under|less than|<)\s*(\d+)/i);
      const maxPrice = priceMatch ? parseInt(priceMatch[1], 10) : null;

      result = result.filter((m) => {
        const matchesText = 
          m.name.toLowerCase().includes(q) ||
          m.specialization.toLowerCase().includes(q) ||
          m.city.toLowerCase().includes(q) ||
          m.district.toLowerCase().includes(q) ||
          m.currentPlaceName.toLowerCase().includes(q) ||
          m.services.some((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) ||
          m.works.some((w) => w.title.toLowerCase().includes(q) || w.tags.some((t) => t.toLowerCase().includes(q)));

        if (maxPrice !== null) {
          return m.startingPrice <= maxPrice;
        }

        // Natural language keywords matching
        if (q.includes('блонд') && (m.category === 'hair' || m.specialization.toLowerCase().includes('blonde'))) return true;
        if (q.includes('маникюр') && m.category === 'nails') return true;
        if (q.includes('барбер') && m.category === 'barber') return true;
        if (q.includes('брови') && m.category === 'brows') return true;
        if (q.includes('рядом') || q.includes('near')) return m.distanceKm <= 2.5;

        return matchesText;
      });
    }

    return result;
  }, [masters, selectedCategory, searchQuery]);

  const activeMaster = masters.find((m) => m.id === activeMasterId);
  const activePlace = places.find((p) => p.id === activePlaceId);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#161615] flex flex-col font-sans selection:bg-[#161615] selection:text-white">
      
      {/* Global Quiet Header (Section 6) */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab: any) => {
          if (tab === 'masters' || tab === 'services' || tab === 'bookings') {
            setActiveTab('discover');
          } else {
            setActiveTab(tab);
          }
          setActiveMasterId(null);
          setActivePlaceId(null);
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        unreadCount={1}
        bookingsCount={confirmedBookings.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        
        {/* VIEW 1: Master Profile (if opened) */}
        {activeMasterId && activeMaster ? (
          <MasterProfile
            master={activeMaster}
            onBack={() => setActiveMasterId(null)}
            onBook={(m, svc) => handleOpenBooking(m, svc)}
            onMessage={(m, svc) => handleOpenMessage(m, svc)}
            onToggleFollow={handleToggleFollow}
            onOpenWork={(work) => setSelectedWork(work)}
            onOpenShort={(short) => handleOpenShort(short)}
            onOpenPlace={(placeId) => {
              setActiveMasterId(null);
              handleOpenPlaceDetails(placeId);
            }}
          />
        ) : activePlaceId && activePlace ? (
          /* VIEW 2: Place / Space Details (if opened) */
          <PlaceDetails
            place={activePlace}
            masters={masters}
            onBack={() => setActivePlaceId(null)}
            onOpenMaster={handleOpenMasterProfile}
            onBookMaster={(m) => handleOpenBooking(m)}
          />
        ) : (
          /* VIEW 3: Main Tabs Navigation */
          <>
            {/* TAB: DISCOVER / FIND */}
            {activeTab === 'discover' && (
              <div>
                {/* Hero Search Section (Section 8 & 9) */}
                <Hero
                  onSearch={(q, cat, loc) => {
                    setSearchQuery(q);
                    setSelectedCategory(cat);
                    setSelectedLocation(loc);
                  }}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => setSelectedCategory(cat)}
                  onOpenMasterProfile={handleOpenMasterProfile}
                />

                {/* Section Header: List / Map Toggle (Section 26) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-display font-semibold text-[#161615]">
                      {searchQuery ? `${t.resultsFor} "${searchQuery}"` : t.topMastersTitle}
                    </h2>
                    <p className="text-xs text-[#787672]">
                      {t.showingMasters(filteredMasters.length)}
                    </p>
                  </div>

                  {/* List / Map Switcher */}
                  <div className="flex items-center gap-1 p-1 bg-[#EFECE6] rounded-xl border border-[#E2DFD8]">
                    <button
                      onClick={() => {
                        sound.tap();
                        setViewMode('list');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all btn-press ${
                        viewMode === 'list'
                          ? 'bg-white text-[#161615] shadow-xs'
                          : 'text-[#6A6864] hover:text-[#161615]'
                      }`}
                    >
                      <List size={14} />
                      <span className="hidden sm:inline">{t.viewModeList}</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.tap();
                        setViewMode('map');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all btn-press ${
                        viewMode === 'map'
                          ? 'bg-white text-[#161615] shadow-xs'
                          : 'text-[#6A6864] hover:text-[#161615]'
                      }`}
                    >
                      <MapIcon size={14} />
                      <span className="hidden sm:inline">{t.viewModeMap}</span>
                    </button>
                  </div>
                </div>

                {/* Content: List or Interactive Map */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
                  {viewMode === 'list' ? (
                    filteredMasters.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
                        {filteredMasters.map((master) => (
                          <MasterCard
                            key={master.id}
                            master={master}
                            onOpenProfile={handleOpenMasterProfile}
                            onBook={(m) => handleOpenBooking(m)}
                            onToggleFollow={handleToggleFollow}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center text-[#7A7874] bg-white rounded-3xl border border-[#EAE7E1] p-8">
                        <p className="font-display font-medium text-lg text-[#161615]">
                          {t.noMastersFound}
                        </p>
                        <p className="text-xs text-[#807E7A] mt-1 mb-4">
                          {t.noMastersHint}
                        </p>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                          }}
                          className="px-4 py-2 bg-[#161615] text-white text-xs font-semibold rounded-xl btn-press"
                        >
                          {t.btnResetFilters}
                        </button>
                      </div>
                    )
                  ) : (
                    <MapView
                      masters={filteredMasters}
                      places={places}
                      onOpenMaster={handleOpenMasterProfile}
                      onBookMaster={(m) => handleOpenBooking(m)}
                      onOpenPlace={handleOpenPlaceDetails}
                    />
                  )}
                </div>
              </div>
            )}

            {/* TAB: SHORTS (Section 14) */}
            {activeTab === 'shorts' && (
              <ShortsFeed
                shorts={allShorts}
                onOpenShort={(short, idx) => handleOpenShort(short, idx)}
                onBookMaster={(masterId, svcId) => {
                  const m = masters.find((mast) => mast.id === masterId);
                  if (m) {
                    const svc = m.services.find((s) => s.id === svcId);
                    handleOpenBooking(m, svc);
                  }
                }}
                onOpenMasterProfile={handleOpenMasterProfile}
              />
            )}

            {/* TAB: PLACES / STUDIOS (Section 28) */}
            {activeTab === 'places' && (
              <PlacesList
                places={places}
                masters={masters}
                onOpenPlace={handleOpenPlaceDetails}
                onOpenMaster={handleOpenMasterProfile}
              />
            )}

            {/* TAB: DIRECT MESSAGES (Section 32 & 33) */}
            {activeTab === 'messages' && (
              <MessagesView
                masters={masters}
                selectedMasterId={chatMasterId || undefined}
                onSelectMaster={(mid) => setChatMasterId(mid)}
                onBookMaster={(m, svc) => handleOpenBooking(m, svc)}
                onOpenMasterProfile={handleOpenMasterProfile}
                initialContextService={chatContextService}
              />
            )}

            {/* TAB: MASTER PRO DASHBOARD (Section 35) */}
            {activeTab === 'dashboard' && (
              <MasterDashboard
                master={masters[0]} // Anna Ivanova as default logged-in pro demo
                places={places}
                onUpdatePlace={handleUpdateMasterPlace}
                onOpenProfile={handleOpenMasterProfile}
                onOpenSettings={() => setIsSettingsOpen(true)}
              />
            )}
          </>
        )}

      </main>

      {/* Global Booking Modal (Section 18 & 19) */}
      {bookingModal.isOpen && bookingModal.master && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          master={bookingModal.master}
          preselectedService={bookingModal.service}
          onClose={() => setBookingModal({ isOpen: false, master: null })}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {/* Global Shorts Fullscreen Viewer (Section 14) */}
      {shortsViewer.isOpen && (
        <ShortsViewer
          shorts={allShorts}
          initialIndex={shortsViewer.initialIndex}
          isOpen={shortsViewer.isOpen}
          onClose={() => setShortsViewer({ isOpen: false, initialIndex: 0 })}
          onBookMaster={(masterId, svcId) => {
            const m = masters.find((mast) => mast.id === masterId);
            if (m) {
              const svc = m.services.find((s) => s.id === svcId);
              handleOpenBooking(m, svc);
            }
          }}
          onOpenMasterProfile={handleOpenMasterProfile}
        />
      )}

      {/* Work Detail / Lightbox Modal (Section 12 & 13) */}
      {selectedWork && (
        <WorkDetailModal
          work={selectedWork}
          master={masters.find((m) => m.id === selectedWork.masterId)}
          onClose={() => setSelectedWork(null)}
          onBookService={(m, svcId) => {
            const svc = m.services.find((s) => s.id === svcId);
            handleOpenBooking(m, svc);
          }}
          onOpenMasterProfile={handleOpenMasterProfile}
        />
      )}

      {/* Global Settings & Language Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Mobile Bottom Navigation Bar (Section 7) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setActiveMasterId(null);
          setActivePlaceId(null);
        }}
        unreadCount={1}
      />

    </div>
  );
}
