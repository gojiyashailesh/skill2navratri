import React from 'react';
import { Icon } from './Icon';

interface MobileBottomNavProps {
  currentTab: 'discover' | 'explore-map' | 'my-tickets' | 'saved';
  onTabChange: (tab: 'discover' | 'explore-map' | 'my-tickets' | 'saved') => void;
  ticketCount: number;
  savedCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onTabChange,
  ticketCount,
  savedCount,
}) => {
  return (
    <nav aria-label="Main navigation" className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DED5CC] px-2 py-1.5 flex items-center justify-around shadow-lg">
      <button
        onClick={() => onTabChange('discover')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'discover'
            ? 'text-[#7A2337] font-bold'
            : 'text-[#665D60] font-medium hover:text-[#251F21]'
        }`}
      >
        <Icon name="search" size={20} />
        <span className="text-[10px] tracking-tight mt-0.5">Discover</span>
      </button>

      <button
        onClick={() => onTabChange('explore-map')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'explore-map'
            ? 'text-[#7A2337] font-bold'
            : 'text-[#665D60] font-medium hover:text-[#251F21]'
        }`}
      >
        <Icon name="location_on" size={20} />
        <span className="text-[10px] tracking-tight mt-0.5">Explore Map</span>
      </button>

      <button
        onClick={() => onTabChange('my-tickets')}
        className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'my-tickets'
            ? 'text-[#7A2337] font-bold'
            : 'text-[#665D60] font-medium hover:text-[#251F21]'
        }`}
      >
        <Icon name="confirmation_number" size={20} />
        <span className="text-[10px] tracking-tight mt-0.5">Tickets</span>
        {ticketCount > 0 && (
          <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#7A2337] text-white text-[9px] font-bold flex items-center justify-center">
            {ticketCount}
          </span>
        )}
      </button>

      <button
        onClick={() => onTabChange('saved')}
        className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'saved'
            ? 'text-[#7A2337] font-bold'
            : 'text-[#665D60] font-medium hover:text-[#251F21]'
        }`}
      >
        <Icon name="bookmark" size={20} />
        <span className="text-[10px] tracking-tight mt-0.5">Saved</span>
        {savedCount > 0 && (
          <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#F2ECE2] text-[#7A2337] border border-[#7A2337] text-[9px] font-bold flex items-center justify-center">
            {savedCount}
          </span>
        )}
      </button>
    </nav>
  );
};
