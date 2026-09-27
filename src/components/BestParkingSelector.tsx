import React, { useState } from 'react';
import { GarbaEvent, ParkingOption } from '../types/navratri';
import { Icon } from './Icon';

interface BestParkingSelectorProps {
  event: GarbaEvent;
  onNavigateToParking?: (parking: ParkingOption) => void;
}

export const BestParkingSelector: React.FC<BestParkingSelectorProps> = ({
  event,
  onNavigateToParking,
}) => {
  const [vehicleType, setVehicleType] = useState<'car' | 'two-wheeler' | 'accessible'>('car');
  const [preference, setPreference] = useState<'free' | 'closest' | 'valet'>('free');
  const [copiedParkingId, setCopiedParkingId] = useState<string | null>(null);

  // Compute best parking option
  const recommendedParking = React.useMemo(() => {
    if (!event.parkingOptions || event.parkingOptions.length === 0) return null;

    if (preference === 'valet') {
      const valet = event.parkingOptions.find(
        (p) => p.fee.toLowerCase().includes('valet') || p.name.toLowerCase().includes('valet')
      );
      if (valet) return valet;
    }

    if (vehicleType === 'two-wheeler') {
      const bike = event.parkingOptions.find(
        (p) =>
          p.name.toLowerCase().includes('two-wheeler') ||
          p.notes.toLowerCase().includes('scooter') ||
          p.fee.toLowerCase().includes('two-wheeler')
      );
      if (bike) return bike;
    }

    if (preference === 'free') {
      const freeOpt = event.parkingOptions.find(
        (p) => p.fee.includes('0') || p.fee.toLowerCase().includes('free')
      );
      if (freeOpt) return freeOpt;
    }

    // Default to first available option
    return event.parkingOptions[0];
  }, [event.parkingOptions, vehicleType, preference]);

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FBF7F0] to-[#F2ECE2] border border-[#DED5CC] flex flex-col gap-3 shadow-xs">
      {/* Title & Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#293A63] text-white flex items-center justify-center font-bold text-xs">
            🅿
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#201A1C]">
              Best Parking For Me
            </h4>
            <span className="text-[10px] text-[#665D60]">
              Real-time walking ETA to {event.assignedGate.split('(')[0]}
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-[#EBF7F0] text-[#226046] text-[10px] font-bold">
          Smart Matched
        </span>
      </div>

      {/* Vehicle Type Selector */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-bold text-[#665D60] uppercase">1. Select Vehicle</span>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => setVehicleType('car')}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              vehicleType === 'car'
                ? 'bg-[#7A2337] border-[#7A2337] text-white shadow-xs'
                : 'bg-white border-[#DED5CC] text-[#251F21] hover:bg-stone-50'
            }`}
          >
            <span>🚗</span>
            <span>Car / 4W</span>
          </button>

          <button
            type="button"
            onClick={() => setVehicleType('two-wheeler')}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              vehicleType === 'two-wheeler'
                ? 'bg-[#7A2337] border-[#7A2337] text-white shadow-xs'
                : 'bg-white border-[#DED5CC] text-[#251F21] hover:bg-stone-50'
            }`}
          >
            <span>🛵</span>
            <span>Bike / 2W</span>
          </button>

          <button
            type="button"
            onClick={() => setVehicleType('accessible')}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              vehicleType === 'accessible'
                ? 'bg-[#7A2337] border-[#7A2337] text-white shadow-xs'
                : 'bg-white border-[#DED5CC] text-[#251F21] hover:bg-stone-50'
            }`}
          >
            <span>♿</span>
            <span>Priority</span>
          </button>
        </div>
      </div>

      {/* Preference Filter */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-bold text-[#665D60] uppercase">2. Priority</span>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => setPreference('free')}
            className={`py-1 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
              preference === 'free'
                ? 'bg-[#226046] border-[#226046] text-white'
                : 'bg-white border-[#DED5CC] text-[#665D60]'
            }`}
          >
            🟢 100% Free
          </button>

          <button
            type="button"
            onClick={() => setPreference('closest')}
            className={`py-1 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
              preference === 'closest'
                ? 'bg-[#293A63] border-[#293A63] text-white'
                : 'bg-white border-[#DED5CC] text-[#665D60]'
            }`}
          >
            ⚡ Nearest Walk
          </button>

          <button
            type="button"
            onClick={() => setPreference('valet')}
            className={`py-1 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
              preference === 'valet'
                ? 'bg-[#7A2337] border-[#7A2337] text-white'
                : 'bg-white border-[#DED5CC] text-[#665D60]'
            }`}
          >
            🔑 Valet / VIP
          </button>
        </div>
      </div>

      {/* Best Recommendation Card */}
      {recommendedParking ? (
        <div className="p-3 bg-white rounded-xl border-2 border-[#7A2337]/30 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] text-[#226046] font-bold uppercase tracking-wider block">
                Recommended Parking Lot
              </span>
              <h5 className="font-bold text-xs sm:text-sm text-[#201A1C]">
                {recommendedParking.name}
              </h5>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#F8F5EF] text-[#7A2337] font-bold text-xs shrink-0">
              {recommendedParking.fee}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#665D60] py-1 border-y border-[#F2ECE2]">
            <div className="flex items-center gap-1">
              <Icon name="directions_walk" size={14} className="text-[#7A2337]" />
              <span>
                <strong>{recommendedParking.walkingDistance}</strong> ({recommendedParking.walkingTime})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="schedule" size={14} className="text-[#293A63]" />
              <span>Hours: {recommendedParking.hours}</span>
            </div>
          </div>

          <p className="text-[10px] text-[#665D60] leading-snug">
            {recommendedParking.notes}
          </p>

          <div className="pt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (onNavigateToParking) {
                  onNavigateToParking(recommendedParking);
                } else {
                  const query = encodeURIComponent(`${recommendedParking.name}, ${event.venueName}, Ahmedabad`);
                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
                }
              }}
              className="flex-1 py-2 rounded-xl bg-[#293A63] hover:bg-[#1E2B4B] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Icon name="directions" size={14} />
              <span>Navigate to Parking</span>
            </button>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(`${recommendedParking.name} - ${event.venueName}`);
                setCopiedParkingId(recommendedParking.id);
                setTimeout(() => setCopiedParkingId(null), 2000);
              }}
              className="py-2 px-3 rounded-xl border border-[#DED5CC] text-[#251F21] text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
              title="Copy parking address"
            >
              {copiedParkingId === recommendedParking.id ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-white rounded-xl border text-xs text-[#665D60]">
          Standard street parking advised. Metro transit recommended.
        </div>
      )}
    </div>
  );
};
