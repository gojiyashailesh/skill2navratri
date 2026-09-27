import React, { useState } from 'react';
import { GarbaEvent, Artist } from '../types/navratri';
import { Icon } from './Icon';
import { BestParkingSelector } from './BestParkingSelector';

interface EventDetailModalProps {
  event: GarbaEvent;
  onClose: () => void;
  onBookTickets: (event: GarbaEvent) => void;
  onNavigateToMap: (event: GarbaEvent) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  language: 'en' | 'gu';
  onOpenArtist?: (artistName: string) => void;
}

const FESTIVAL_NIGHTS = [
  { day: 'Night 1', date: '10 Oct', label: 'Past' },
  { day: 'Night 2', date: '11 Oct', label: 'Past' },
  { day: 'Night 3', date: '12 Oct', label: 'Past' },
  { day: 'Night 4', date: '13 Oct', label: 'Past' },
  { day: 'Night 5', date: '14 Oct', label: 'Past' },
  { day: 'Night 6', date: '15 Oct', label: 'Past' },
  { day: 'Night 7', date: '16 Oct', label: 'Tonight' },
  { day: 'Night 8', date: '17 Oct', label: 'Available' },
  { day: 'Night 9', date: '18 Oct', label: 'Sharad Purnima' },
];

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onBookTickets,
  onNavigateToMap,
  isSaved,
  onToggleSave,
  language,
  onOpenArtist,
}) => {
  const [selectedNight, setSelectedNight] = useState<string>('Night 7');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#DED5CC] overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-[#F2ECE2] shrink-0">
          <img
            src={event.image}
            alt={event.imageAlt}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Close & Bookmark Buttons */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#7A2337] text-xs font-bold uppercase tracking-wider">
              {event.fixtureId}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(event.id)}
                className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer ${
                  isSaved ? 'text-[#7A2337]' : 'text-[#665D60] hover:text-[#7A2337]'
                }`}
                title={isSaved ? 'Remove Bookmark' : 'Save Event'}
              >
                <Icon name={isSaved ? 'bookmark' : 'bookmark_border'} size={18} />
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#201A1C] hover:bg-white transition-colors cursor-pointer"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Title Overlay in Banner */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {event.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {event.name}
            </h1>
            <p className="text-xs text-white/90 mt-0.5 flex items-center gap-1.5">
              <Icon name="location_on" size={14} className="text-white" />
              <span>{event.venueName}</span>
            </p>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-6 text-[#201A1C]">
          {/* Night Selector Carousel */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#665D60]">
                Select Festival Night
              </label>
              <span className="text-xs text-[#7A2337] font-semibold">
                {selectedNight === 'Night 7' ? 'Tonight · 16 Oct' : 'Upcoming Session'}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {FESTIVAL_NIGHTS.map((n) => (
                <button
                  key={n.day}
                  onClick={() => setSelectedNight(n.day)}
                  className={`min-w-[64px] min-h-[64px] p-2 rounded-xl flex flex-col items-center justify-center border text-xs transition-all cursor-pointer ${
                    selectedNight === n.day
                      ? 'bg-[#F7E9ED] border-2 border-[#7A2337] text-[#7A2337] font-bold shadow-xs'
                      : n.label === 'Past'
                      ? 'bg-[#EDE7DF] border-[#DED5CC] text-[#8D8080] opacity-60'
                      : 'bg-white border-[#DED5CC] text-[#251F21] hover:bg-[#F8F5EF]'
                  }`}
                  type="button"
                >
                  <span className="text-[11px] font-bold">{n.date}</span>
                  <span className="text-[10px] tracking-tight">{n.day}</span>
                  <span className={`text-[9px] uppercase font-semibold ${selectedNight === n.day ? 'text-[#7A2337]' : 'text-[#665D60]'}`}>
                    {n.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* About / Description */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-[#201A1C]">About this Gathering</h3>
            <p className="text-xs text-[#665D60] leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Featured Artist Row */}
          <div
            onClick={() => onOpenArtist && onOpenArtist(event.artist)}
            className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#DED5CC] hover:border-[#7A2337] flex items-center justify-between gap-3 cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#DED5CC] group-hover:scale-105 transition-transform">
                <img
                  src={event.artistImage}
                  alt={event.artist}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-[10px] text-[#7A2337] uppercase font-bold tracking-wider block">
                  Lead Performer Tonight · View Schedule →
                </span>
                <span className="text-sm font-bold text-[#201A1C] group-hover:text-[#7A2337] transition-colors">{event.artist}</span>
                <span className="text-xs text-[#665D60] block">{event.artistGenre}</span>
              </div>
            </div>
            <div className="text-right text-xs shrink-0">
              <span className="font-semibold text-[#665D60]">Stage Slot:</span>
              <span className="font-bold text-[#201A1C] block">8:30 PM - 1:00 AM</span>
            </div>
          </div>

          {/* Smart Best Parking For Me Component (Blueprint Section 10 & 11) */}
          <BestParkingSelector
            event={event}
            onNavigateToParking={(parking) => {
              onClose();
              onNavigateToMap(event);
            }}
          />

          {/* Facilities Checklist */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-sm font-bold text-[#201A1C]">Verified Grounds &amp; Facilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {event.facilities.map((fac) => (
                <div
                  key={fac.name}
                  className="p-2.5 rounded-xl bg-white border border-[#DED5CC] flex items-center gap-2.5 text-xs"
                >
                  <Icon
                    name={fac.icon}
                    size={18}
                    className={
                      fac.status === 'available'
                        ? 'text-[#226046]'
                        : fac.status === 'not_available'
                        ? 'text-[#A52C36]'
                        : 'text-[#80520C]'
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-[#201A1C] block truncate">{fac.name}</span>
                    <span
                      className={`text-[10px] font-semibold ${
                        fac.status === 'available'
                          ? 'text-[#226046]'
                          : fac.status === 'not_available'
                          ? 'text-[#A52C36]'
                          : 'text-[#80520C]'
                      }`}
                    >
                      {fac.status === 'available'
                        ? 'Organizer Verified'
                        : fac.status === 'not_available'
                        ? 'Not Available'
                        : 'Unconfirmed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules and Entry Policies */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-[#201A1C]">Guidelines &amp; Policies</h3>
            <ul className="flex flex-col gap-1.5 text-xs text-[#665D60]">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#7A2337] font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 border-t border-[#DED5CC] bg-[#FBF7F0] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-[#665D60] uppercase block font-semibold">
              Admission Price
            </span>
            <span className="text-xl font-bold text-[#7A2337] tabular-nums">
              {event.priceDisplay}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigateToMap(event);
              }}
              className="px-4 py-2.5 rounded-xl border border-[#293A63] text-[#293A63] font-bold text-xs hover:bg-[#EDF0F7] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Icon name="location_on" size={15} />
              <span>View Route</span>
            </button>

            {event.admissionType === 'paid' ? (
              <button
                onClick={() => {
                  onClose();
                  onBookTickets(event);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#7A2337] hover:bg-[#651A2C] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Choose tickets</span>
                <Icon name="arrow_forward" size={16} />
              </button>
            ) : event.admissionType === 'free_rsvp' ? (
              <button
                onClick={() => {
                  onClose();
                  onBookTickets(event);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#7A2337] hover:bg-[#651A2C] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Reserve Free Entry</span>
                <Icon name="check" size={16} />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToMap(event);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#7A2337] hover:bg-[#651A2C] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Get directions</span>
                <Icon name="directions" size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
