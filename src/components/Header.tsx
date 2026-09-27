import React, { useEffect, useRef, useState } from 'react';
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
  onOpenProfile,
  onOpenStaffScanner,
  onOpenOrganizerSubmit,
}) => {
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const cityPickerRef = useRef<HTMLDivElement>(null);
  const cityButtonRef = useRef<HTMLButtonElement>(null);
  const cityLabel = language === 'gu'
    ? SUPPORTED_CITIES.find((city) => city.name === selectedCity)?.nameGu ?? selectedCity
    : selectedCity;

  useEffect(() => {
    if (!cityMenuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!cityPickerRef.current?.contains(event.target as Node)) setCityMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCityMenuOpen(false);
        cityButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [cityMenuOpen]);

  const tabs = [
    { id: 'discover', label: 'Discover', labelGu: 'શોધો' },
    { id: 'explore-map', label: 'Explore Map', labelGu: 'નકશો' },
    { id: 'my-tickets', label: 'My Tickets', labelGu: 'મારા પાસ', count: ticketCount },
    { id: 'saved', label: 'Saved', labelGu: 'સાચવેલ', count: savedCount },
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--app-header-height)] border-b border-[#DED5CC] bg-white select-none">
      <div className="app-header-layout mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onTabChange('discover')}
          aria-label="Navratri home"
          className="[grid-area:brand] w-fit min-w-0 rounded-lg text-left cursor-pointer hover:opacity-95 transition-opacity"
        >
          <NavratriLogo size="sm" compact />
        </button>

        <div ref={cityPickerRef} className="relative [grid-area:city] w-fit min-w-0">
          <button
            ref={cityButtonRef}
            type="button"
            onClick={() => setCityMenuOpen((open) => !open)}
            aria-label={`Select city: ${cityLabel}`}
            aria-expanded={cityMenuOpen}
            aria-controls="header-city-options"
            className="flex h-9 items-center gap-1.5 rounded-full bg-[#F2ECE2] px-3 text-xs font-semibold whitespace-nowrap text-[#251F21] hover:bg-[#EAE1D3] transition-colors cursor-pointer"
          >
            <span>{cityLabel}</span>
            <Icon name={cityMenuOpen ? 'expand_less' : 'expand_more'} size={16} className="shrink-0 text-[#665D60]" />
          </button>

          {cityMenuOpen && (
            <div id="header-city-options" className="absolute left-0 top-full z-50 mt-2 w-56 max-w-[calc(100vw-32px)] rounded-xl border border-[#DED5CC] bg-white p-1.5 shadow-xl">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#665D60]">
                Select Gujarat Region
              </div>
              {SUPPORTED_CITIES.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  aria-pressed={selectedCity === city.name}
                  onClick={() => {
                    onSelectCity(city.name);
                    setCityMenuOpen(false);
                    cityButtonRef.current?.focus();
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
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

        <nav aria-label="Main navigation" className="[grid-area:navigation] hidden h-full min-w-0 items-center justify-center gap-5 xl:flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-current={currentTab === tab.id ? 'page' : undefined}
              className={`flex h-full items-center gap-1.5 border-b-2 pt-1 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                currentTab === tab.id
                  ? 'text-[#7A2337] border-[#7A2337]'
                  : 'text-[#665D60] border-transparent hover:text-[#251F21]'
              }`}
            >
              <span>{language === 'gu' ? tab.labelGu : tab.label}</span>
              {'count' in tab && (tab.id === 'saved' || tab.count > 0) && (
                <span className={`rounded-full px-1.5 text-[11px] font-bold ${tab.id === 'my-tickets' ? 'bg-[#7A2337] text-white' : 'bg-[#F2ECE2] text-[#665D60]'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="[grid-area:tools] flex items-center justify-end gap-2">
          {onOpenOrganizerSubmit && (
            <button
              type="button"
              onClick={onOpenOrganizerSubmit}
              aria-label="Host Event"
              title="Organizers & Societies: Submit a Garba Event"
              className="flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-lg border border-[#DED5CC] px-2.5 text-xs font-bold whitespace-nowrap text-[#7A2337] hover:bg-[#FBF7F0] transition-colors cursor-pointer"
            >
              <Icon name="add" size={16} />
              <span className="hidden min-[440px]:inline sm:hidden 2xl:inline">Host Event</span>
            </button>
          )}
          {onOpenStaffScanner && (
            <button
              type="button"
              onClick={onOpenStaffScanner}
              aria-label="Gate Scanner"
              title="Gate Staff & Turnstile Validator App"
              className="flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-lg bg-[#1E2B4B] px-2.5 text-xs font-bold whitespace-nowrap text-amber-300 hover:bg-[#293A63] transition-colors cursor-pointer shadow-xs"
            >
              <Icon name="qr_code_scanner" size={16} />
              <span className="hidden min-[440px]:inline sm:hidden 2xl:inline">Gate Scanner</span>
            </button>
          )}
        </div>

        <div className="[grid-area:utilities] flex shrink-0 items-center justify-end gap-2">
          <button
            type="button"
            onClick={onToggleLanguage}
            aria-label={language === 'en' ? 'Switch to Gujarati' : 'Switch to English'}
            title="Switch Language (English / ગુજરાતી)"
            className="h-9 rounded-lg border border-[#DED5CC] px-2 text-xs font-bold whitespace-nowrap text-[#7A2337] hover:bg-[#FBF7F0] transition-colors cursor-pointer"
          >
            {language === 'en' ? 'ગુજરાતી' : 'English'}
          </button>
          <button
            type="button"
            onClick={onOpenProfile}
            aria-label="User profile"
            title="User Profile & Gate Policies"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7A2337] hover:bg-[#651A2C] cursor-pointer shadow-xs transition-transform active:scale-95"
          >
            <Icon name="person" size={18} className="text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};
