import React from 'react';
import { NavratriLogo } from './NavratriLogo';

interface FooterProps {
  onOpenParkingProtocols: () => void;
  onOpenStaffScanner?: () => void;
  onOpenOrganizerSubmit?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenParkingProtocols,
  onOpenStaffScanner,
  onOpenOrganizerSubmit,
}) => {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#DED5CC] py-10 mt-12 mb-16 md:mb-0">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#665D60]">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <NavratriLogo size="sm" showSubtitle={false} />
          <span className="hidden sm:inline text-stone-300">|</span>
          <span className="text-[11px] text-center sm:text-left">
            Verified Heritage Ticketing, Garba Discovery &amp; Arrival Routing for Gujarat
          </span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5 font-semibold">
          {onOpenOrganizerSubmit && (
            <button
              onClick={onOpenOrganizerSubmit}
              className="hover:text-[#7A2337] transition-colors cursor-pointer text-[#7A2337]"
            >
              Host / Submit Event
            </button>
          )}
          {onOpenStaffScanner && (
            <button
              onClick={onOpenStaffScanner}
              className="hover:text-[#293A63] transition-colors cursor-pointer"
            >
              Gate Staff Turnstile Validator
            </button>
          )}
          <button
            onClick={onOpenParkingProtocols}
            className="hover:text-[#7A2337] transition-colors cursor-pointer"
          >
            Emergency &amp; Gate Protocols
          </button>
        </div>

        <div className="text-[11px] text-[#8D8080]">
          © 2026 Gujarat Navratri Utsav · Ahmedabad Edition
        </div>
      </div>
    </footer>
  );
};

