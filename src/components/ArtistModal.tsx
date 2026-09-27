import React from 'react';
import { Artist, GarbaEvent } from '../types/navratri';
import { Icon } from './Icon';

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
  onSelectEvent: (event: GarbaEvent) => void;
  events: GarbaEvent[];
  isFollowed: boolean;
  onToggleFollow: (artistId: string) => void;
  language: 'en' | 'gu';
}

export const ArtistModal: React.FC<ArtistModalProps> = ({
  artist,
  onClose,
  onSelectEvent,
  events,
  isFollowed,
  onToggleFollow,
  language,
}) => {
  if (!artist) return null;

  const tonightEvent = events.find((e) => e.id === artist.venueId);

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#DED5CC] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Artist Hero Header */}
        <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-[#7A2337] via-[#991B1B] to-[#4A0E17] text-white p-5 flex flex-col justify-between shrink-0 overflow-hidden">
          {/* Subtle Decorative Mandala Background */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" fill="currentColor">
              <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <path d="M100 20 L100 180 M20 100 L180 100" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          {/* Close & Rank Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="verified" size={15} className="text-amber-300" />
              <span>Rank #{artist.rank || 1} · Gujarat Navratri 2026</span>
            </span>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* Artist Identity Bar */}
          <div className="relative z-10 flex items-end gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-lg bg-stone-800 shrink-0">
              <img
                src={artist.image}
                alt={artist.altText}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white truncate">
                  {artist.name}
                </h2>
                {artist.verified && (
                  <Icon name="verified" size={20} className="text-amber-300 shrink-0" />
                )}
              </div>
              {artist.nameGu && (
                <span className="text-sm font-semibold text-amber-200/90 block">
                  {artist.nameGu}
                </span>
              )}
              <span className="text-xs text-stone-200 block truncate mt-0.5">
                {artist.genre}
              </span>
            </div>
          </div>
        </div>

        {/* Action Strip: Follow & Stats */}
        <div className="px-5 py-3 bg-[#F8F5EF] border-b border-[#DED5CC] flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#665D60] block">Attendance</span>
              <span className="font-bold text-[#201A1C]">{artist.checkins}</span>
            </div>
            <div className="h-6 w-px bg-[#DED5CC]"></div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#665D60] block">Verification</span>
              <span className="font-bold text-[#226046]">{artist.positiveRating}</span>
            </div>
          </div>

          <button
            onClick={() => onToggleFollow(artist.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isFollowed
                ? 'bg-[#226046] text-white hover:bg-[#1B4E39]'
                : 'bg-[#7A2337] text-white hover:bg-[#651A2C]'
            }`}
          >
            <Icon name={isFollowed ? 'check' : 'favorite'} size={14} />
            <span>{isFollowed ? 'Following ★' : '+ Follow Artist'}</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-5 text-[#201A1C]">
          {/* Tonight's Performing Venue Highlight */}
          <div className="p-4 rounded-xl bg-[#F7E9ED] border border-[#E9C4CD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A2337] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#7A2337] animate-pulse"></span>
                <span>Performing Tonight (16 Oct)</span>
              </span>
              <h3 className="text-base font-bold text-[#201A1C] mt-0.5">
                {artist.performingTonightAt}
              </h3>
              <p className="text-xs text-[#665D60] mt-0.5">
                Live on stage: <strong>{artist.timeSlot}</strong>
              </p>
            </div>

            {tonightEvent && (
              <button
                onClick={() => {
                  onClose();
                  onSelectEvent(tonightEvent);
                }}
                className="px-4 py-2 rounded-xl bg-[#7A2337] hover:bg-[#651A2C] text-white text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                View Tonight's Venue →
              </button>
            )}
          </div>

          {/* Biography */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#665D60]">
              About the Artist
            </h4>
            <p className="text-xs sm:text-sm text-[#3E3538] leading-relaxed">
              {artist.bio}
            </p>
            {artist.hometown && (
              <div className="flex items-center gap-1.5 text-xs text-[#665D60] mt-1">
                <Icon name="location_on" size={14} className="text-[#7A2337]" />
                <span>Roots &amp; Heritage: <strong>{artist.hometown}</strong></span>
              </div>
            )}
          </div>

          {/* 9-Night Festival Tour Schedule */}
          {artist.scheduleNights && artist.scheduleNights.length > 0 && (
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#665D60]">
                Navratri 2026 Festival Schedule
              </h4>
              <div className="flex flex-col gap-2">
                {artist.scheduleNights.map((sch, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                      sch.ticketStatus === 'available'
                        ? 'bg-white border-[#DED5CC] hover:border-[#7A2337]'
                        : 'bg-[#F8F5EF] border-[#E5DDD2] opacity-80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#201A1C]">{sch.night}</span>
                        <span className="text-[10px] text-[#665D60]">· {sch.venueArea}</span>
                      </div>
                      <span className="text-xs text-[#7A2337] font-medium block">
                        {sch.venueName}
                      </span>
                    </div>

                    <div className="text-right">
                      {sch.ticketStatus === 'available' ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#EBF7F0] text-[#226046] text-[10px] font-bold">
                          Passes Active
                        </span>
                      ) : sch.ticketStatus === 'free' ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#EDF0F7] text-[#293A63] text-[10px] font-bold">
                          Free Entry
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-600 text-[10px] font-bold">
                          Full / Sold Out
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Channels */}
          <div className="pt-2 border-t border-[#DED5CC] flex items-center justify-between text-xs text-[#665D60]">
            <span className="font-semibold">Official Channels:</span>
            <div className="flex items-center gap-3">
              {artist.instagram && (
                <span className="text-[#7A2337] font-semibold flex items-center gap-1">
                  <span>📸</span>
                  <span>{artist.instagram}</span>
                </span>
              )}
              {artist.spotify && (
                <span className="text-[#226046] font-semibold flex items-center gap-1">
                  <span>🎵</span>
                  <span>Spotify Verified</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
