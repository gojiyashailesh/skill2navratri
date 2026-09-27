import React from 'react';
import { GarbaEvent } from '../types/navratri';
import { Icon } from './Icon';

interface SavedViewProps {
  savedEvents: GarbaEvent[];
  onSelectEvent: (event: GarbaEvent) => void;
  onToggleSave: (eventId: string) => void;
  onNavigateToDiscover: () => void;
  language: 'en' | 'gu';
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedEvents,
  onSelectEvent,
  onToggleSave,
  onNavigateToDiscover,
  language,
}) => {
  return (
    <div className="w-full min-h-[calc(100dvh-var(--app-header-height))] bg-[#FBF7F0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
        <div className="pb-2 border-b border-[#DED5CC] flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#7A2337] uppercase tracking-wider">
              {language === 'gu' ? 'તમારા પસંદીદા ગરબા' : 'Personal Shortlist'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#201A1C]">
              {language === 'gu' ? 'સાચવેલ (Saved Events)' : 'Saved Events'}
            </h1>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#F2ECE2] text-[#7A2337] text-xs font-bold">
            {savedEvents.length} items
          </span>
        </div>

        {savedEvents.length === 0 ? (
          <div className="w-full py-16 bg-white rounded-2xl border border-[#DED5CC] p-8 text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F7E9ED] text-[#7A2337] flex items-center justify-center">
              <Icon name="bookmark_border" size={26} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#201A1C]">
                {language === 'gu' ? 'કોઈ સાચવેલ કાર્યક્રમો નથી' : 'Keep a few nights in mind'}
              </h3>
              <p className="text-xs text-[#665D60] mt-1 max-w-sm">
                Tap the bookmark button on any event card across Ahmedabad to save venue details and arrival routes for easy reference.
              </p>
            </div>
            <button
              onClick={onNavigateToDiscover}
              className="px-6 py-2.5 rounded-xl bg-[#7A2337] hover:bg-[#651A2C] text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
            >
              Discover Garba Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl bg-white border border-[#DED5CC] p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
              >
                <div>
                  <div
                    onClick={() => onSelectEvent(event)}
                    className="relative w-full h-40 rounded-xl overflow-hidden bg-[#F2ECE2] cursor-pointer mb-3"
                  >
                    <img
                      src={event.image}
                      alt={event.imageAlt}
                      className="w-full h-full object-cover transition-transform group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(event.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#7A2337] flex items-center justify-center cursor-pointer shadow-xs"
                      title="Remove Bookmark"
                    >
                      <Icon name="bookmark" size={17} />
                    </button>
                  </div>

                  <h3
                    onClick={() => onSelectEvent(event)}
                    className="text-base font-bold text-[#201A1C] hover:text-[#7A2337] cursor-pointer"
                  >
                    {event.name}
                  </h3>
                  <p className="text-xs text-[#665D60] mt-0.5">{event.area}</p>

                  <div className="mt-2 text-xs font-semibold text-[#7A2337] flex items-center gap-1.5">
                    <Icon name="mic" size={14} />
                    <span>{event.artist}</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#EBE4DA] flex items-center justify-between">
                  <span className="text-sm font-bold text-[#201A1C]">{event.priceDisplay}</span>
                  <button
                    onClick={() => onSelectEvent(event)}
                    className="text-xs font-bold text-[#7A2337] hover:underline cursor-pointer"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
