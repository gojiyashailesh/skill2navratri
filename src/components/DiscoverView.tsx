import React, { useState } from 'react';
import { GarbaEvent, Artist } from '../types/navratri';
import { GARBA_STYLES, RANKED_ARTISTS } from '../data/mockData';
import { Icon } from './Icon';
import { NavratriLogo } from './NavratriLogo';

interface DiscoverViewProps {
  events: GarbaEvent[];
  onSelectEvent: (event: GarbaEvent) => void;
  onNavigateToMap: (event?: GarbaEvent) => void;
  onBookTickets: (event: GarbaEvent) => void;
  savedEventIds: string[];
  onToggleSave: (eventId: string) => void;
  language: 'en' | 'gu';
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: 'tonight' | 'free' | 'mandli' | 'traditional' | 'artists' | 'all';
  onFilterChange: (filter: 'tonight' | 'free' | 'mandli' | 'traditional' | 'artists' | 'all') => void;
  onOpenAllFilters: () => void;
  onOpenParkingProtocols: () => void;
  onSelectArtist?: (artist: Artist) => void;
  followedArtistIds?: string[];
  onToggleFollowArtist?: (artistId: string) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  events,
  onSelectEvent,
  onNavigateToMap,
  onBookTickets,
  savedEventIds,
  onToggleSave,
  language,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  onOpenAllFilters,
  onOpenParkingProtocols,
  onSelectArtist,
  followedArtistIds = [],
  onToggleFollowArtist,
}) => {
  const [rankedPopoverOpen, setRankedPopoverOpen] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);

  const handleVoiceSearch = () => {
    setVoiceListening(true);
    setTimeout(() => {
      onSearchChange('Aditya Gadhvi');
      setVoiceListening(false);
    }, 1000);
  };

  const naturalPrompts = [
    { label: '✨ Aditya Gadhvi tonight', query: 'Aditya Gadhvi' },
    { label: '🪕 Free Mandli in Bodakdev', query: 'Mandli' },
    { label: '🅿️ Free Parking under ₹500', query: 'Free Parking' },
    { label: '🥁 Family Dandiya Raas', query: 'Raas' },
    { label: '🏛️ Old City Pol Heritage Garba', query: 'Old City' },
  ];

  return (
    <div className="w-full bg-[#FBF7F0] text-[#251F21] py-8 sm:py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-y-12 relative overflow-hidden">
        {/* Eight-dot ring watermark geometry (Ashtadal Lotus/Garba Circle) */}
        <div
          aria-hidden="true"
          className="absolute -top-12 -right-12 w-96 h-96 pointer-events-none opacity-[0.06] select-none text-[#7A2337]"
        >
          <svg className="w-full h-full stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="84" strokeDasharray="3 5"></circle>
            <circle cx="100" cy="100" r="56"></circle>
            <circle cx="100" cy="100" r="28" strokeDasharray="2 3"></circle>
            <circle cx="100" cy="16" fill="currentColor" r="6"></circle>
            <circle cx="159.4" cy="40.6" fill="currentColor" r="6"></circle>
            <circle cx="184" cy="100" fill="currentColor" r="6"></circle>
            <circle cx="159.4" cy="159.4" fill="currentColor" r="6"></circle>
            <circle cx="100" cy="184" fill="currentColor" r="6"></circle>
            <circle cx="40.6" cy="159.4" fill="currentColor" r="6"></circle>
            <circle cx="16" cy="100" fill="currentColor" r="6"></circle>
            <circle cx="40.6" cy="40.6" fill="currentColor" r="6"></circle>
          </svg>
        </div>

        {/* Hero Header Section with Traditional Gujarati Calligraphy & Festive Aura */}
        <section className="relative z-10 flex flex-col gap-y-6 pt-2">
          <div className="flex flex-col gap-y-3 max-w-4xl">
            {/* Navratri Auspicious Badge with Toran motif */}
            <div className="inline-flex items-center gap-x-2.5 w-fit px-3.5 py-1.5 rounded-full bg-[#F2ECE2] border border-[#DED5CC] text-[#7A2337] text-xs font-bold tracking-wide shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7A2337] animate-pulse"></span>
              <span>{language === 'gu' ? 'શરદ નવરાત્રિ મહોત્સવ ૨૦૨૬ · રાત્રિ ૭ / ૯' : 'SHARAD NAVRATRI UTSAV 2026 · NIGHT 7 OF 9'}</span>
              <span className="text-[#D97706]">✦</span>
              <span className="text-[#B45309] font-semibold">{language === 'gu' ? 'અમદાવાદ' : 'Ahmedabad'}</span>
            </div>

            {/* Primary Question with Calligraphic Gujarati Flourish */}
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#251F21] leading-tight font-serif">
                {language === 'gu' ? (
                  <span className="text-[#7A2337] drop-shadow-xs">આજે ક્યાં રમવા જવું છે?</span>
                ) : (
                  <span>
                    <span className="text-[#7A2337]">Aaje kya ramva javu che?</span>
                    <span className="block text-2xl sm:text-3xl hidden font-semibold text-[#665D60] mt-1 font-sans">
                      Where should I play Garba tonight?
                    </span>
                  </span>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#665D60] mt-1">
                {language === 'gu'
                  ? 'પ્રમાણિત પાસ, કલાકારો, મફત અને પેઇડ પાર્કિંગ, ગેટ રૂટ અને રીઅલ-ટાઇમ માર્ગદર્શન'
                  : 'Verified venues, Aditya Gadhvi live lineup, free & paid parking lots, turnstile gates & route guidance'}
              </p>
            </div>
          </div>

          {/* Search Input & Natural Language Garba Finder */}
          <div className="flex flex-col gap-y-3 w-full max-w-4xl">
            <div className="relative w-full shadow-sm rounded-xl">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#665D60]">
                <Icon name="search" size={22} />
              </span>
              <input
                className="w-full h-[54px] pl-12 pr-28 rounded-xl bg-[#FFFFFF] border-2 border-[#DED5CC] focus:border-[#7A2337] text-[#251F21] placeholder-[#665D60] text-sm sm:text-base outline-none transition-all shadow-xs"
                placeholder={
                  language === 'gu'
                    ? 'ઇવેન્ટ, કલાકાર (આદિત્ય ગઢવી), માંડલી કે વિસ્તાર શોધો...'
                    : 'Search events, artists (e.g. Aditya Gadhvi), Mandli, or area...'
                }
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <button
                onClick={handleVoiceSearch}
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-x-1.5 cursor-pointer transition-colors ${
                  voiceListening ? 'bg-[#7A2337] text-white animate-pulse' : 'bg-[#F2ECE2] text-[#7A2337] hover:bg-[#E3DACD]'
                }`}
                type="button"
                title="Voice search assistant"
              >
                <span>{voiceListening ? 'Listening...' : 'Voice'}</span>
                <Icon name="mic" size={16} />
              </button>
            </div>

            {/* AI Natural Language Preset Query Suggestions (Blueprint Section 34) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[11px] font-bold text-[#7A2337] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <span>⚡ Quick Finder:</span>
              </span>
              {naturalPrompts.map((p) => (
                <button
                  key={p.label}
                  onClick={() => onSearchChange(p.query)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-[#F2ECE2] text-[#3E3538] border border-[#DED5CC] text-[11px] font-medium shrink-0 transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Quick Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
              <button
                onClick={() => onFilterChange('tonight')}
                className={`h-9 min-h-[36px] px-3.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm transition-colors cursor-pointer ${
                  activeFilter === 'tonight'
                    ? 'bg-[#7A2337] border-[#7A2337] text-white'
                    : 'bg-[#FFFFFF] border-[#DED5CC] text-[#251F21] hover:bg-[#F2ECE2]'
                }`}
                type="button"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeFilter === 'tonight' ? 'bg-white' : 'bg-[#7A2337]'}`}></span>
                <span>{language === 'gu' ? 'આજે રાત્રે (Tonight)' : 'Tonight'}</span>
              </button>

              <button
                onClick={() => onFilterChange('free')}
                className={`h-9 min-h-[36px] px-3.5 rounded-xl border text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                  activeFilter === 'free'
                    ? 'bg-[#7A2337] border-[#7A2337] text-white'
                    : 'bg-[#FFFFFF] border-[#DED5CC] text-[#251F21] hover:bg-[#F2ECE2]'
                }`}
                type="button"
              >
                {language === 'gu' ? 'મફત પ્રવેશ (Free entry)' : 'Free entry'}
              </button>

              <button
                onClick={() => onFilterChange('mandli')}
                className={`h-9 min-h-[36px] px-3.5 rounded-xl border text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                  activeFilter === 'mandli'
                    ? 'bg-[#7A2337] border-[#7A2337] text-white'
                    : 'bg-[#FFFFFF] border-[#DED5CC] text-[#251F21] hover:bg-[#F2ECE2]'
                }`}
                type="button"
              >
                {language === 'gu' ? 'માંડલી (Mandli)' : 'Mandli'}
              </button>

              <button
                onClick={() => onFilterChange('traditional')}
                className={`h-9 min-h-[36px] px-3.5 rounded-xl border text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                  activeFilter === 'traditional'
                    ? 'bg-[#7A2337] border-[#7A2337] text-white'
                    : 'bg-[#FFFFFF] border-[#DED5CC] text-[#251F21] hover:bg-[#F2ECE2]'
                }`}
                type="button"
              >
                {language === 'gu' ? 'પરંપરાગત (Traditional)' : 'Traditional'}
              </button>

              <button
                onClick={() => onFilterChange('artists')}
                className={`h-9 min-h-[36px] px-3.5 rounded-xl border text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                  activeFilter === 'artists'
                    ? 'bg-[#7A2337] border-[#7A2337] text-white'
                    : 'bg-[#FFFFFF] border-[#DED5CC] text-[#251F21] hover:bg-[#F2ECE2]'
                }`}
                type="button"
              >
                {language === 'gu' ? 'કલાકારો (Artists)' : 'Artists'}
              </button>

              <button
                onClick={onOpenAllFilters}
                className="h-9 min-h-[36px] px-3.5 rounded-xl bg-[#FFFFFF] border border-[#DED5CC] text-[#251F21] text-xs font-semibold hover:bg-[#F2ECE2] transition-colors flex items-center gap-1.5 shrink-0 ml-auto cursor-pointer"
                type="button"
              >
                <Icon name="tune" size={16} className="text-[#665D60]" />
                <span>All Filters</span>
              </button>
            </div>
          </div>
        </section>

        {/* Primary Section: Tonight in Ahmedabad */}
        <section className="flex flex-col gap-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-y-2">
            <div>
              <div className="flex items-center gap-x-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#251F21]">
                  Tonight in Ahmedabad
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#F2ECE2] text-[#7A2337] text-xs font-bold">
                  {events.length} events
                </span>
              </div>
              <p className="text-sm text-[#665D60] mt-0.5">
                Verified venues, active gates &amp; real-time parking intelligence
              </p>
            </div>

            <button
              onClick={() => onNavigateToMap()}
              className="flex items-center justify-center gap-x-2 px-4 py-2 rounded-xl bg-[#293A63] text-[#FFFFFF] text-sm font-semibold hover:bg-[#1E2B4B] transition-colors shrink-0 shadow-sm self-start sm:self-auto cursor-pointer"
              type="button"
            >
              <Icon name="location_on" size={18} />
              <span>View map</span>
            </button>
          </div>

          {/* Prominent Event Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event) => {
              const isSaved = savedEventIds.includes(event.id);
              return (
                <article
                  key={event.id}
                  className="relative flex flex-col justify-between rounded-2xl bg-[#FFFFFF] border border-[#DED5CC] p-5 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex flex-col gap-y-4">
                    {/* Image Area with badges & bookmark */}
                    <div
                      onClick={() => onSelectEvent(event)}
                      className="relative w-full h-48 rounded-xl overflow-hidden bg-[#F2ECE2] cursor-pointer"
                    >
                      <img
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                        data-alt={event.imageAlt}
                        src={event.image}
                        alt={event.imageAlt}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm text-[#7A2337] text-[10px] uppercase font-bold tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Bookmark Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(event.id);
                        }}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer ${
                          isSaved ? 'text-[#7A2337]' : 'text-[#665D60] hover:text-[#7A2337]'
                        }`}
                        title={isSaved ? 'Remove bookmark' : 'Save event'}
                        type="button"
                      >
                        <Icon name={isSaved ? 'bookmark' : 'bookmark_border'} size={17} />
                      </button>

                      {/* Banner badge */}
                      {event.bannerBadge && (
                        <div className="absolute bottom-2 left-2 right-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-sm text-white text-[11px] font-medium ${
                              event.admissionType === 'free_walkin'
                                ? 'bg-[#226046]/95'
                                : event.admissionType === 'free_rsvp'
                                ? 'bg-[#293A63]/90'
                                : 'bg-[#7A2337]/90'
                            }`}
                          >
                            <Icon
                              name={
                                event.admissionType === 'free_walkin'
                                  ? 'verified'
                                  : event.admissionType === 'free_rsvp'
                                  ? 'confirmation_number'
                                  : 'local_fire_department'
                              }
                              size={14}
                            />
                            <span>{event.bannerBadge}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-start justify-between gap-x-2">
                        <h3
                          onClick={() => onSelectEvent(event)}
                          className="text-xl font-bold text-[#251F21] leading-tight hover:text-[#7A2337] transition-colors cursor-pointer"
                        >
                          {event.name}
                        </h3>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-[#665D60] block uppercase font-semibold">
                            Admission
                          </span>
                          <span
                            className={`text-lg font-bold tabular-nums ${
                              event.admissionType === 'free_walkin' ? 'text-[#226046]' : 'text-[#7A2337]'
                            }`}
                          >
                            {event.priceDisplay}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-1.5 text-[#7A2337] text-xs font-semibold">
                        <Icon name="mic" size={15} />
                        <span>{event.artist}</span>
                      </div>

                      <div className="flex flex-col gap-y-1 text-[#665D60] text-xs">
                        <div className="flex items-center gap-x-1.5">
                          <Icon name="schedule" size={15} className="text-[#665D60] shrink-0" />
                          <span>{event.timeRange}</span>
                        </div>
                        <div className="flex items-center gap-x-1.5">
                          <Icon name="location_on" size={15} className="text-[#665D60] shrink-0" />
                          <span>
                            {event.area} ·{' '}
                            <strong className="text-[#251F21] font-medium">{event.distanceDisplay}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Parking & Entry Wayfinding Strip */}
                    <div className="p-2.5 rounded-xl bg-[#F8F5EF] border border-[#EBE4DA] flex items-start gap-x-2 text-[#251F21] text-xs">
                      {event.parkingType === 'free' ? (
                        <Icon name="check_circle" size={16} className="text-[#226046] shrink-0 mt-0.5" />
                      ) : event.parkingType === 'paid' ? (
                        <span className="w-4 h-4 rounded bg-[#293A63] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          P
                        </span>
                      ) : (
                        <Icon name="info" size={16} className="text-[#B66C18] shrink-0 mt-0.5" />
                      )}
                      <span className="leading-snug">{event.parkingBadge}</span>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-4 mt-2 border-t border-[#E3DACD]/70 flex items-center gap-2">
                    {event.admissionType === 'paid' ? (
                      <button
                        onClick={() => onBookTickets(event)}
                        className="w-full h-11 rounded-xl bg-[#7A2337] hover:bg-[#651A2C] text-[#FFFFFF] text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        type="button"
                      >
                        <span>Choose tickets</span>
                        <Icon name="arrow_forward" size={18} />
                      </button>
                    ) : event.admissionType === 'free_walkin' ? (
                      <button
                        onClick={() => onNavigateToMap(event)}
                        className="w-full h-11 rounded-xl bg-[#FFFFFF] border-2 border-[#7A2337] hover:bg-[#F7E9ED] text-[#7A2337] text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        type="button"
                      >
                        <Icon name="directions" size={18} />
                        <span>Get directions</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onBookTickets(event)}
                        className="w-full h-11 rounded-xl bg-[#7A2337] hover:bg-[#651A2C] text-[#FFFFFF] text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        type="button"
                      >
                        <span>Reserve free entry</span>
                        <Icon name="check" size={18} />
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 3: Historical Popularity / Ranked Section */}
        <section className="flex flex-col gap-y-4 p-5 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#DED5CC] relative shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3DACD] gap-2">
            <div>
              <div className="flex items-center gap-x-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#251F21]">
                  Loved over the last 3 nights
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#F2ECE2] text-[#7A2337] text-[10px] uppercase font-bold tracking-wider">
                  Nights 4 to 6
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#665D60] mt-0.5">
                Ahmedabad attendees' highest verified attendance and entry pacing
              </p>
            </div>

            {/* Popover Explanation Trigger */}
            <div className="relative">
              <button
                onClick={() => setRankedPopoverOpen(!rankedPopoverOpen)}
                className="text-left text-xs font-semibold text-[#7A2337] hover:text-[#521322] inline-flex items-center gap-1 cursor-pointer"
                type="button"
              >
                <Icon name="info" size={15} />
                <span>How this is ranked</span>
              </button>

              {rankedPopoverOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 p-3 bg-[#251F21] text-[#FFFFFF] rounded-xl shadow-xl text-xs z-30 leading-relaxed">
                  Based on verified attendee bookings and check-ins across 13–15 Oct. Updated 16 Oct, 5:30 PM IST. Not live crowd density.
                  <button
                    onClick={() => setRankedPopoverOpen(false)}
                    className="block mt-2 text-[#F29D48] text-[11px] font-bold hover:underline"
                  >
                    Got it
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {RANKED_ARTISTS.map((artist) => {
              const isFollowed = followedArtistIds.includes(artist.id);
              return (
                <div
                  key={artist.id}
                  onClick={() => onSelectArtist ? onSelectArtist(artist) : undefined}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#EBE4DA] hover:border-[#7A2337] hover:bg-[#FBF7F0] transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="text-3xl font-black text-[#7A2337]/35 leading-none shrink-0 w-6 group-hover:text-[#7A2337] transition-colors">
                    {artist.rank}
                  </div>
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#DED5CC] bg-stone-100">
                    <img
                      className="w-full h-full object-cover"
                      src={artist.image}
                      alt={artist.altText}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-[#251F21] font-bold truncate group-hover:text-[#7A2337] transition-colors">
                        {artist.name}
                      </span>
                      {artist.verified && (
                        <Icon name="verified" size={14} className="text-[#7A2337] shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-[#665D60] truncate">{artist.performingTonightAt}</span>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[#226046] text-[10px] font-bold">
                        {artist.positiveRating.split(' ')[0]} verified
                      </span>
                      {isFollowed && (
                        <span className="text-[10px] text-[#7A2337] font-bold">★ Following</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Artists Performing Tonight */}
        <section className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#251F21]">
                Artists tonight &amp; Lineups
              </h2>
              <p className="text-xs sm:text-sm text-[#665D60]">
                Authentic folk voices &amp; devotional ensembles active across Gujarat
              </p>
            </div>
            <button
              onClick={() => onFilterChange('artists')}
              className="text-xs sm:text-sm font-semibold text-[#7A2337] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all performers</span>
              <Icon name="chevron_right" size={17} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RANKED_ARTISTS.map((artist) => {
              const matchedEvent = events.find((e) => e.id === artist.venueId);
              const isFollowed = followedArtistIds.includes(artist.id);
              return (
                <div
                  key={`card-${artist.id}`}
                  className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#DED5CC] hover:border-[#7A2337] flex flex-col justify-between shadow-xs transition-all"
                >
                  <div
                    onClick={() => onSelectArtist && onSelectArtist(artist)}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#F2ECE2] border border-[#DED5CC]">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        src={artist.image}
                        alt={artist.altText}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-sm font-bold text-[#251F21] group-hover:text-[#7A2337] transition-colors truncate">
                        {artist.name}
                      </h3>
                      {artist.nameGu && (
                        <span className="text-[10px] text-[#7A2337] font-semibold">
                          {artist.nameGu}
                        </span>
                      )}
                      <span className="text-[11px] text-[#665D60] truncate">{artist.genre}</span>
                      <span className="text-[#226046] text-[10px] font-semibold mt-0.5">
                        📍 {artist.performingTonightAt}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E3DACD]/60 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onToggleFollowArtist && onToggleFollowArtist(artist.id)}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        isFollowed
                          ? 'bg-[#EBF7F0] text-[#226046]'
                          : 'bg-[#F2ECE2] text-[#7A2337] hover:bg-[#E8DED1]'
                      }`}
                    >
                      {isFollowed ? 'Following ★' : '+ Follow'}
                    </button>

                    <button
                      onClick={() => onSelectArtist ? onSelectArtist(artist) : (matchedEvent && onSelectEvent(matchedEvent))}
                      className="text-[#7A2337] text-xs font-bold hover:underline cursor-pointer"
                    >
                      View Schedule →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Explore by Garba Style Grid */}
        <section className="flex flex-col gap-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#251F21]">
              Explore by Garba Style
            </h2>
            <p className="text-xs sm:text-sm text-[#665D60]">
              Choose your preferred ambiance, crowd pace, and ritual traditions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GARBA_STYLES.map((style) => (
              <div
                key={style.title}
                onClick={() => {
                  onSearchChange(style.title.split(' ')[0]);
                }}
                className="group p-5 rounded-2xl bg-[#FFFFFF] border border-[#DED5CC] hover:border-[#7A2337] transition-all flex flex-col justify-between gap-y-6 shadow-sm cursor-pointer"
              >
                <div className="flex flex-col gap-y-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${style.colorClass}`}>
                    <Icon name={style.icon} size={22} />
                  </div>
                  <h3 className="text-base font-bold text-[#251F21] group-hover:text-[#7A2337] transition-colors">
                    {style.title}
                  </h3>
                  <p className="text-xs text-[#665D60] leading-relaxed">
                    {style.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[#7A2337] text-xs font-semibold">
                  <span>{style.venuesCount} venues active</span>
                  <Icon
                    name="arrow_forward"
                    size={17}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Advisory Banner */}
        <section className="p-4 sm:p-5 rounded-xl bg-[#F2ECE2] border border-[#DED5CC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7A2337] text-[#FFFFFF] flex items-center justify-center shrink-0">
              <Icon name="notifications_active" size={20} className="text-white" />
            </div>
            <div>
              <span className="text-sm sm:text-base text-[#251F21] font-semibold block">
                Ahmedabad Traffic Police &amp; Emergency Route Coordination
              </span>
              <span className="text-xs text-[#665D60]">
                SG Highway and Sindhu Bhavan corridors enforce entry zoning past 10:00 PM. Check designated parking bays before departure.
              </span>
            </div>
          </div>
          <button
            onClick={onOpenParkingProtocols}
            className="shrink-0 px-4 py-2 rounded-lg bg-[#293A63] text-[#FFFFFF] text-xs sm:text-sm font-semibold hover:bg-[#1E2B4B] transition-colors cursor-pointer"
            type="button"
          >
            View Parking Protocols
          </button>
        </section>
      </div>
    </div>
  );
};
