import React from 'react';
import { Icon } from './Icon';

interface UserProfileModalProps {
  onClose: () => void;
  ticketCount: number;
  onNavigateToTickets: () => void;
  language: 'en' | 'gu';
  onToggleLanguage: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  onClose,
  ticketCount,
  onNavigateToTickets,
  language,
  onToggleLanguage,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-[#DED5CC] flex flex-col overflow-hidden">
        {/* Profile Card Header */}
        <div className="p-6 bg-[#FBF7F0] border-b border-[#DED5CC] flex flex-col items-center text-center relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-[#EAE1D3] flex items-center justify-center text-[#665D60] cursor-pointer"
          >
            ✕
          </button>

          <div className="w-16 h-16 rounded-full bg-[#7A2337] text-white flex items-center justify-center text-2xl font-bold shadow-md mb-2">
            RG
          </div>
          <h3 className="text-base font-bold text-[#201A1C]">Raju Gojiya</h3>
          <p className="text-xs text-[#665D60]">gojiyaraju25@gmail.com</p>
          <span className="mt-2 px-2.5 py-0.5 rounded-full bg-[#EAF4ED] text-[#226046] text-[10px] font-bold">
            Verified Cultural Attendee
          </span>
        </div>

        {/* Menu list */}
        <div className="p-4 flex flex-col gap-1 text-xs text-[#201A1C]">
          <button
            onClick={() => {
              onClose();
              onNavigateToTickets();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F5EF] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <Icon name="confirmation_number" size={18} className="text-[#7A2337]" />
              <span className="font-semibold">My Active Passes</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#7A2337] text-white font-bold text-[10px]">
              {ticketCount}
            </span>
          </button>

          <button
            onClick={onToggleLanguage}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F5EF] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <Icon name="translate" size={18} className="text-[#293A63]" />
              <span className="font-semibold">Language Preference</span>
            </div>
            <span className="font-bold text-[#7A2337]">
              {language === 'en' ? 'English' : 'ગુજરાતી'}
            </span>
          </button>

          <div className="h-px bg-[#EBE4DA] my-1"></div>

          <div className="p-2.5 text-[11px] text-[#665D60]">
            Navratri Companion v1.0 · Ahmedabad Heritage Edition. Built for high-density Navratri night guidance.
          </div>
        </div>

        <div className="p-3 border-t border-[#DED5CC] bg-[#FBF7F0]">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-white border border-[#DED5CC] font-bold text-xs text-[#201A1C] hover:bg-[#F8F5EF] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
