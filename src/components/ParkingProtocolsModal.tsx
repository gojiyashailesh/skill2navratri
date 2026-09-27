import React from 'react';
import { Icon } from './Icon';

interface ParkingProtocolsModalProps {
  onClose: () => void;
}

export const ParkingProtocolsModal: React.FC<ParkingProtocolsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#DED5CC] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#DED5CC] flex items-center justify-between bg-[#FBF7F0]">
          <div className="flex items-center gap-2">
            <Icon name="local_police" size={22} className="text-[#7A2337]" />
            <h2 className="text-base sm:text-lg font-bold text-[#201A1C]">
              Ahmedabad Traffic Police Guidelines
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#EAE1D3] flex items-center justify-center text-[#665D60] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-4 text-xs text-[#201A1C] leading-relaxed">
          <div className="p-3 bg-[#FFF2D9] border border-[#80520C]/30 rounded-xl text-[#80520C]">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Icon name="warning" size={16} />
              <span>Active SG Highway &amp; Sindhu Bhavan Notification</span>
            </div>
            Heavy commercial vehicle movement restricted between 6:00 PM and 3:00 AM. Entry to Party Plots along service roads strictly channelized through designated U-turns.
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="font-bold text-sm text-[#201A1C]">Designated Parking Enforcement</h3>
            <p className="text-[#665D60]">
              Unauthorized street parking along SG Highway corridor, Sindhu Bhavan Road, and University road is subject to immediate towing with fine. Always use verified organizer lots (e.g. North Lot) or designated municipal pay-and-park bays.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="font-bold text-sm text-[#201A1C]">Two-Wheeler Safety &amp; Helmet Checkpoints</h3>
            <p className="text-[#665D60]">
              Traffic police checkpoints active at Pakwan Cross Road, Iscon Circle, and Vastrapur junction. Triple riding strictly penalized.
            </p>
          </div>

          <div className="p-3.5 bg-[#F8F5EF] rounded-xl border border-[#DED5CC] flex flex-col gap-2">
            <h4 className="font-bold text-xs text-[#7A2337]">Emergency Helplines (24x7)</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#665D60] block text-[11px]">Traffic Police Control:</span>
                <span className="font-bold text-[#201A1C]">1095 / 079-25630100</span>
              </div>
              <div>
                <span className="text-[#665D60] block text-[11px]">Police Emergency:</span>
                <span className="font-bold text-[#201A1C]">112 / 100</span>
              </div>
              <div>
                <span className="text-[#665D60] block text-[11px]">Ambulance (GVK EMRI):</span>
                <span className="font-bold text-[#201A1C]">108</span>
              </div>
              <div>
                <span className="text-[#665D60] block text-[11px]">Women Helpline (Abhayam):</span>
                <span className="font-bold text-[#201A1C]">181</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#DED5CC] bg-[#FBF7F0] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#293A63] text-white font-bold text-xs hover:bg-[#1E2B4B] cursor-pointer"
          >
            Acknowledge &amp; Return
          </button>
        </div>
      </div>
    </div>
  );
};
