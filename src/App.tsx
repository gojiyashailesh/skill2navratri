import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DiscoverView } from './components/DiscoverView';
import { ExploreMapView } from './components/ExploreMapView';
import { MyTicketsView } from './components/MyTicketsView';
import { SavedView } from './components/SavedView';
import { EventDetailModal } from './components/EventDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FilterModal } from './components/FilterModal';
import { ParkingProtocolsModal } from './components/ParkingProtocolsModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ArtistModal } from './components/ArtistModal';
import { StaffScannerModal } from './components/StaffScannerModal';
import { OrganizerSubmitModal } from './components/OrganizerSubmitModal';
import { Footer } from './components/Footer';
import { INITIAL_EVENTS, INITIAL_TICKETS, RANKED_ARTISTS } from './data/mockData';
import { GarbaEvent, TicketBooking, FilterState, Artist } from './types/navratri';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'discover' | 'explore-map' | 'my-tickets' | 'saved'>('discover');
  const [events, setEvents] = useState<GarbaEvent[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<GarbaEvent>(INITIAL_EVENTS[0]);
  const [savedEventIds, setSavedEventIds] = useState<string[]>(['e-100', 'e-101']);
  const [tickets, setTickets] = useState<TicketBooking[]>(INITIAL_TICKETS);
  const [language, setLanguage] = useState<'en' | 'gu'>('en');
  const [selectedCity, setSelectedCity] = useState<string>('Ahmedabad');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'tonight' | 'free' | 'mandli' | 'traditional' | 'artists' | 'all'>('tonight');
  
  // Modals state
  const [detailModalEvent, setDetailModalEvent] = useState<GarbaEvent | null>(null);
  const [checkoutModalEvent, setCheckoutModalEvent] = useState<GarbaEvent | null>(null);
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [parkingProtocolsOpen, setParkingProtocolsOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [staffScannerOpen, setStaffScannerOpen] = useState<boolean>(false);
  const [organizerSubmitOpen, setOrganizerSubmitOpen] = useState<boolean>(false);
  const [followedArtistIds, setFollowedArtistIds] = useState<string[]>(['art-0']);

  const [fullFilters, setFullFilters] = useState<FilterState>({
    date: 'tonight',
    admission: 'all',
    mandliOnly: false,
    traditionalOnly: false,
    artistsOnly: false,
    styles: [],
    parkingRequired: false,
    freeParkingOnly: false,
    maxDistanceKm: 20,
    searchQuery: '',
  });

  const toggleSaveEvent = (eventId: string) => {
    setSavedEventIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const toggleFollowArtist = (artistId: string) => {
    setFollowedArtistIds((prev) =>
      prev.includes(artistId) ? prev.filter((id) => id !== artistId) : [...prev, artistId]
    );
  };

  const handleNavigateToMap = (eventToSelect?: GarbaEvent) => {
    if (eventToSelect) {
      setSelectedEvent(eventToSelect);
    }
    setCurrentTab('explore-map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSuccess = (newBooking: TicketBooking) => {
    setTickets((prev) => [newBooking, ...prev]);
  };

  const handleUpdateTicketStatus = (ticketId: string, newStatus: 'confirmed' | 'used' | 'cancelled') => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
  };

  const handleOpenArtistByName = (artistName: string) => {
    const found = RANKED_ARTISTS.find(
      (a) => a.name.toLowerCase().includes(artistName.toLowerCase()) || artistName.toLowerCase().includes(a.name.toLowerCase())
    );
    if (found) {
      setSelectedArtist(found);
    }
  };

  const handleAddOrganizerEvent = (newEvent: GarbaEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    setSelectedEvent(newEvent);
  };

  // Filtered events calculation
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ev.name.toLowerCase().includes(q);
        const matchesArtist = ev.artist.toLowerCase().includes(q);
        const matchesArea = ev.area.toLowerCase().includes(q);
        const matchesTags = ev.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesArtist && !matchesArea && !matchesTags) {
          return false;
        }
      }

      // Quick filter pill check
      if (activeFilter === 'free') {
        if (ev.admissionType !== 'free_walkin' && ev.admissionType !== 'free_rsvp') {
          return false;
        }
      } else if (activeFilter === 'mandli') {
        const isMandli = ev.tags.includes('Mandli') || ev.name.includes('Mandli');
        if (!isMandli) return false;
      } else if (activeFilter === 'traditional') {
        if (!ev.tags.includes('Traditional')) return false;
      } else if (activeFilter === 'artists') {
        if (!ev.artist || ev.artist.includes('Lineup')) return false;
      }

      // Detailed modal filters check
      if (fullFilters.admission === 'free') {
        if (ev.admissionType !== 'free_walkin' && ev.admissionType !== 'free_rsvp') return false;
      } else if (fullFilters.admission === 'paid') {
        if (ev.admissionType !== 'paid') return false;
      }

      if (fullFilters.freeParkingOnly && ev.parkingType !== 'free') {
        return false;
      }

      if (fullFilters.parkingRequired && ev.parkingType === 'unconfirmed') {
        return false;
      }

      if (ev.distanceKm > fullFilters.maxDistanceKm) {
        return false;
      }

      if (fullFilters.styles.length > 0) {
        const matchesStyle = ev.styles.some((s) => fullFilters.styles.includes(s));
        if (!matchesStyle) return false;
      }

      return true;
    });
  }, [events, searchQuery, activeFilter, fullFilters]);

  const savedEventsList = useMemo(() => {
    return events.filter((e) => savedEventIds.includes(e.id));
  }, [events, savedEventIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F8] text-[#201A1C] font-['Noto_Sans',sans-serif]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        ticketCount={tickets.length}
        savedCount={savedEventIds.length}
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'gu' : 'en'))}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenStaffScanner={() => setStaffScannerOpen(true)}
        onOpenOrganizerSubmit={() => setOrganizerSubmitOpen(true)}
      />

      {/* Main Tab View Controller */}
      <main className="flex-1 w-full pt-[var(--app-header-height)]">
        {currentTab === 'discover' && (
          <DiscoverView
            events={filteredEvents}
            onSelectEvent={(ev) => setDetailModalEvent(ev)}
            onNavigateToMap={handleNavigateToMap}
            onBookTickets={(ev) => setCheckoutModalEvent(ev)}
            savedEventIds={savedEventIds}
            onToggleSave={toggleSaveEvent}
            language={language}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onOpenAllFilters={() => setFilterModalOpen(true)}
            onOpenParkingProtocols={() => setParkingProtocolsOpen(true)}
            onSelectArtist={(artist) => setSelectedArtist(artist)}
            followedArtistIds={followedArtistIds}
            onToggleFollowArtist={toggleFollowArtist}
          />
        )}

        {currentTab === 'explore-map' && (
          <ExploreMapView
            events={events}
            selectedEvent={selectedEvent}
            onSelectEvent={setSelectedEvent}
            onBookTickets={(ev) => setCheckoutModalEvent(ev)}
            language={language}
          />
        )}

        {currentTab === 'my-tickets' && (
          <MyTicketsView
            tickets={tickets}
            onNavigateToMap={(eventId) => {
              const matched = events.find((e) => e.id === eventId);
              handleNavigateToMap(matched || selectedEvent);
            }}
            language={language}
          />
        )}

        {currentTab === 'saved' && (
          <SavedView
            savedEvents={savedEventsList}
            onSelectEvent={(ev) => setDetailModalEvent(ev)}
            onToggleSave={toggleSaveEvent}
            onNavigateToDiscover={() => setCurrentTab('discover')}
            language={language}
          />
        )}
      </main>

      {/* Footer (shown on discover, tickets, and saved) */}
      {currentTab !== 'explore-map' && (
        <Footer
          onOpenParkingProtocols={() => setParkingProtocolsOpen(true)}
          onOpenStaffScanner={() => setStaffScannerOpen(true)}
          onOpenOrganizerSubmit={() => setOrganizerSubmitOpen(true)}
        />
      )}

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        ticketCount={tickets.length}
        savedCount={savedEventIds.length}
      />

      {/* MODALS */}
      {detailModalEvent && (
        <EventDetailModal
          event={detailModalEvent}
          onClose={() => setDetailModalEvent(null)}
          onBookTickets={(ev) => setCheckoutModalEvent(ev)}
          onNavigateToMap={handleNavigateToMap}
          isSaved={savedEventIds.includes(detailModalEvent.id)}
          onToggleSave={toggleSaveEvent}
          language={language}
          onOpenArtist={handleOpenArtistByName}
        />
      )}

      {selectedArtist && (
        <ArtistModal
          artist={selectedArtist}
          onClose={() => setSelectedArtist(null)}
          onSelectEvent={(ev) => {
            setSelectedArtist(null);
            setDetailModalEvent(ev);
          }}
          events={events}
          isFollowed={followedArtistIds.includes(selectedArtist.id)}
          onToggleFollow={toggleFollowArtist}
          language={language}
        />
      )}

      {staffScannerOpen && (
        <StaffScannerModal
          isOpen={staffScannerOpen}
          onClose={() => setStaffScannerOpen(false)}
          tickets={tickets}
          onUpdateTicketStatus={handleUpdateTicketStatus}
        />
      )}

      {organizerSubmitOpen && (
        <OrganizerSubmitModal
          isOpen={organizerSubmitOpen}
          onClose={() => setOrganizerSubmitOpen(false)}
          onSubmitEvent={handleAddOrganizerEvent}
        />
      )}

      {checkoutModalEvent && (
        <CheckoutModal
          event={checkoutModalEvent}
          onClose={() => setCheckoutModalEvent(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {filterModalOpen && (
        <FilterModal
          currentFilters={fullFilters}
          onApplyFilters={setFullFilters}
          onClose={() => setFilterModalOpen(false)}
          matchingCount={filteredEvents.length}
        />
      )}

      {parkingProtocolsOpen && (
        <ParkingProtocolsModal onClose={() => setParkingProtocolsOpen(false)} />
      )}

      {profileModalOpen && (
        <UserProfileModal
          onClose={() => setProfileModalOpen(false)}
          ticketCount={tickets.length}
          onNavigateToTickets={() => {
            setProfileModalOpen(false);
            setCurrentTab('my-tickets');
          }}
          language={language}
          onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'gu' : 'en'))}
        />
      )}
    </div>
  );
}
