import React, { useState } from 'react';
import { SUPPORTED_CITIES } from '../data/mockData';
import { Icon } from './Icon';
import { NavratriLogo } from './NavratriLogo';

interface HeaderProps {
  currentTab: 'discover' | 'explore-map' | 'my-tickets' | 'saved';
  onTabChange: (tab: 'discover' | 'explore-map' | 'my-tickets' | 'saved') => void;
  ticketCount: number;
  savedCount: number;
  language: 'en' | 'gu';
  onToggleLanguage: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenProfile: () => void;
  onOpenStaffScanner?: () => void;
  onOpenOrganizerSubmit?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  ticketCount,
  savedCount,
  language,
  onToggleLanguage,
  selectedCity,
  onSelectCity,
  searchQuery,
  onSearchChange,
  onOpenProfile,
  onOpenStaffScanner,
  onOpenOrganizerSubmit,
}) => {
  const [cityMenuOpen, setCityMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] border-b border-[#DED5CC] select-none">
      <div className="h-[74px] max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand & City Picker */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <NavratriLogo
            size="sm"
            onClick={() => onTabChange('discover')}
            className="hover:opacity-95 transition-opacity"
          />

          <div className="h-5 w-px bg-[#DED5CC] mx-0.5 hidden sm:block"></div>

          {/* City Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCityMenuOpen(!cityMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#F2ECE2] text-[#251F21] text-xs sm:text-sm font-semibold hover:bg-[#EAE1D3] transition-colors cursor-pointer"
              type="button"
            >
              <span>{language === 'gu' ? 'અમદાવાદ' : selectedCity}</span>
              <Icon
                name={cityMenuOpen ? 'expand_less' : 'expand_more'}
                size={16}
                className="text-[#665D60]"
              />
            </button>

            {cityMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 p-1.5 rounded-xl bg-white border border-[#DED5CC] shadow-xl z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-[#665D60] uppercase tracking-wider">
                  Select Gujarat Region
                </div>
                {SUPPORTED_CITIES.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      onSelectCity(city.name);
                      setCityMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                      selectedCity === city.name
                        ? 'bg-[#F7E9ED] text-[#7A2337] font-semibold'
                        : 'text-[#251F21] hover:bg-[#FBF7F0]'
                    }`}
                  >
                    <span>{language === 'gu' ? city.nameGu : city.name}</span>
                    <span className="text-[10px] text-[#665D60]">
                      {city.active ? `${city.activeVenues} events` : 'Upcoming'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Navigation Bar (Desktop) */}
        <nav className="hidden md:flex items-center h-full gap-6">
          <button
            onClick={() => onTabChange('discover')}
            className={`h-full flex items-center font-semibold text-sm transition-colors border-b-2 pt-1 cursor-pointer ${
              currentTab === 'discover'
                ? 'text-[#7A2337] border-[#7A2337]'
                : 'text-[#665D60] border-transparent hover:text-[#251F21]'
            }`}
          >
            {language === 'gu' ? 'શોધો (Discover)' : 'Discover'}
          </button>

          <button
            onClick={() => onTabChange('explore-map')}
            className={`h-full flex items-center font-semibold text-sm transition-colors border-b-2 pt-1 cursor-pointer ${
              currentTab === 'explore-map'
                ? 'text-[#7A2337] border-[#7A2337]'
                : 'text-[#665D60] border-transparent hover:text-[#251F21]'
            }`}
          >
            {language === 'gu' ? 'નકશો (Explore Map)' : 'Explore Map'}
          </button>

          <button
            onClick={() => onTabChange('my-tickets')}
            className={`h-full flex items-center font-semibold text-sm transition-colors border-b-2 pt-1 gap-1.5 cursor-pointer ${
              currentTab === 'my-tickets'
                ? 'text-[#7A2337] border-[#7A2337]'
                : 'text-[#665D60] border-transparent hover:text-[#251F21]'
            }`}
          >
            <span>{language === 'gu' ? 'પાસ (My Tickets)' : 'My Tickets'}</span>
            {ticketCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#7A2337] text-white text-[11px] font-bold">
                {ticketCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('saved')}
            className={`h-full flex items-center font-semibold text-sm transition-colors border-b-2 pt-1 gap-1.5 cursor-pointer ${
              currentTab === 'saved'
                ? 'text-[#7A2337] border-[#7A2337]'
                : 'text-[#665D60] border-transparent hover:text-[#251F21]'
            }`}
          >
            <span>{language === 'gu' ? 'સાચવેલ (Saved)' : 'Saved'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#F2ECE2] text-[#665D60] text-[11px] font-bold">
              {savedCount}
            </span>
          </button>
        </nav>

        {/* Right side utilities */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Host / Submit Event Button */}
          {onOpenOrganizerSubmit && (
            <button
              onClick={onOpenOrganizerSubmit}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#DED5CC] text-[#7A2337] hover:bg-[#FBF7F0] text-xs font-bold transition-colors cursor-pointer"
              title="Organizers & Societies: Submit a Garba Event"
            >
              <Icon name="add" size={14} />
              <span>Host Event</span>
            </button>
          )}

          {/* Gate Staff Turnstile Scanner Portal */}
          {onOpenStaffScanner && (
            <button
              onClick={onOpenStaffScanner}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1E2B4B] hover:bg-[#293A63] text-amber-300 text-xs font-bold transition-colors cursor-pointer shadow-xs"
              title="Gate Staff & Turnstile Validator App"
            >
              <Icon name="qr_code_scanner" size={15} />
              <span className="hidden sm:inline">Gate Scanner</span>
            </button>
          )}

          {/* Language Toggle Button */}
          <button
            onClick={onToggleLanguage}
            className="text-xs font-bold px-2 sm:px-2.5 py-1.5 rounded-lg border border-[#DED5CC] hover:bg-[#FBF7F0] text-[#7A2337] transition-colors cursor-pointer"
            title="Switch Language (English / ગુજરાતી)"
          >
            {language === 'en' ? 'ગુજરાતી' : 'English'}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#7A2337] hover:bg-[#651A2C] flex items-center justify-center flex-shrink-0 cursor-pointer shadow-xs transition-transform active:scale-95"
            title="User Profile & Gate Policies"
            type="button"
          >
            <Icon name="person" size={18} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

