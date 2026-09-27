import React, { useState } from 'react';
import { GarbaStyle, FilterState } from '../types/navratri';
import { GARBA_STYLES } from '../data/mockData';
import { Icon } from './Icon';

interface FilterModalProps {
  currentFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  onClose: () => void;
  matchingCount: number;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  currentFilters,
  onApplyFilters,
  onClose,
  matchingCount,
}) => {
  const [draft, setDraft] = useState<FilterState>({ ...currentFilters });

  const handleToggleStyle = (style: GarbaStyle) => {
    if (draft.styles.includes(style)) {
      setDraft({ ...draft, styles: draft.styles.filter((s) => s !== style) });
    } else {
      setDraft({ ...draft, styles: [...draft.styles, style] });
    }
  };

  const handleReset = () => {
    setDraft({
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
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#DED5CC] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#DED5CC] flex items-center justify-between bg-[#FBF7F0]">
          <div className="flex items-center gap-2">
            <Icon name="tune" size={20} className="text-[#7A2337]" />
            <h2 className="text-lg font-bold text-[#201A1C]">All Festival Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#EAE1D3] flex items-center justify-center text-[#665D60] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Filter Groups */}
        <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-5 text-xs text-[#201A1C]">
          {/* Admission Type */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#201A1C] text-sm">Admission &amp; Pricing</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'All Events' },
                { id: 'free', label: 'Free Entry Only' },
                { id: 'paid', label: 'Ticketed Passes' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDraft({ ...draft, admission: opt.id as any })}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    draft.admission === opt.id
                      ? 'bg-[#F7E9ED] border-[#7A2337] text-[#7A2337]'
                      : 'border-[#DED5CC] hover:bg-[#F8F5EF]'
                  }`}
                  type="button"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Garba Dance Styles */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#201A1C] text-sm">Garba Tradition &amp; Style</label>
            <div className="flex flex-col gap-1.5">
              {GARBA_STYLES.map((st) => (
                <label
                  key={st.title}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#EBE4DA] hover:bg-[#F8F5EF] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={draft.styles.includes(st.title)}
                    onChange={() => handleToggleStyle(st.title)}
                    className="accent-[#7A2337] w-4 h-4 rounded cursor-pointer"
                  />
                  <div className="text-[#7A2337]">
                    <Icon name={st.icon} size={18} />
                  </div>
                  <span className="font-semibold text-xs text-[#201A1C] flex-1">{st.title}</span>
                  <span className="text-[10px] text-[#665D60]">{st.venuesCount} venues</span>
                </label>
              ))}
            </div>
          </div>

          {/* Parking Requirements */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#201A1C] text-sm">Parking &amp; Arrival Logistics</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.parkingRequired}
                  onChange={(e) => setDraft({ ...draft, parkingRequired: e.target.checked })}
                  className="accent-[#7A2337] w-4 h-4 rounded cursor-pointer"
                />
                <span>Must have verified parking facility</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.freeParkingOnly}
                  onChange={(e) => setDraft({ ...draft, freeParkingOnly: e.target.checked })}
                  className="accent-[#7A2337] w-4 h-4 rounded cursor-pointer"
                />
                <span>Free official parking only</span>
              </label>
            </div>
          </div>

          {/* Maximum Distance Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-[#201A1C] text-sm">Maximum Distance from Starting Point</label>
              <span className="font-bold text-[#7A2337] text-xs">{draft.maxDistanceKm} km</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              step="1"
              value={draft.maxDistanceKm}
              onChange={(e) => setDraft({ ...draft, maxDistanceKm: Number(e.target.value) })}
              className="accent-[#7A2337] cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#DED5CC] bg-[#FBF7F0] flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="text-xs font-semibold text-[#665D60] hover:text-[#201A1C] underline cursor-pointer"
            type="button"
          >
            Reset All
          </button>

          <button
            onClick={() => {
              onApplyFilters(draft);
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#7A2337] hover:bg-[#651A2C] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            type="button"
          >
            Show {matchingCount} Events
          </button>
        </div>
      </div>
    </div>
  );
};
