import React, { useState } from 'react';
import { TicketBooking, StaffScanRecord } from '../types/navratri';
import { Icon } from './Icon';

interface StaffScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: TicketBooking[];
  onUpdateTicketStatus: (ticketId: string, newStatus: 'confirmed' | 'used' | 'cancelled') => void;
}

export const StaffScannerModal: React.FC<StaffScannerModalProps> = ({
  isOpen,
  onClose,
  tickets,
  onUpdateTicketStatus,
}) => {
  const [manualInput, setManualInput] = useState('');
  const [currentGate, setCurrentGate] = useState('Gate 1 (West Royal Archway)');
  const [scanResult, setScanResult] = useState<{
    status: 'VALID' | 'ALREADY_USED' | 'INVALID' | 'WRONG_GATE';
    message: string;
    ticket?: TicketBooking;
    timestamp: string;
  } | null>(null);

  const [scanHistory, setScanHistory] = useState<StaffScanRecord[]>([
    {
      id: 'scan-1',
      scannedAt: '8:42 PM',
      bookingRef: 'NM-AHM-2026-8841',
      holderName: 'Bhavin Patel',
      guestCount: 2,
      gate: 'Gate 1',
      status: 'VALID',
    },
    {
      id: 'scan-2',
      scannedAt: '8:45 PM',
      bookingRef: 'NM-AHM-2026-8841',
      holderName: 'Bhavin Patel',
      guestCount: 2,
      gate: 'Gate 1',
      status: 'ALREADY_USED',
      reason: 'Turnstile double-entry attempted',
    },
  ]);

  if (!isOpen) return null;

  const handleProcessScan = (inputVal: string) => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Look up ticket by ref or qrValue
    const matched = tickets.find(
      (t) =>
        t.bookingRef.toLowerCase() === trimmed.toLowerCase() ||
        t.id.toLowerCase() === trimmed.toLowerCase() ||
        t.qrValue.toLowerCase() === trimmed.toLowerCase() ||
        t.holderPhone.includes(trimmed)
    );

    if (!matched) {
      setScanResult({
        status: 'INVALID',
        message: 'No record found. Counterfeit or unverified barcode.',
        timestamp: nowStr,
      });
      setScanHistory((prev) => [
        {
          id: `scan-${Date.now()}`,
          scannedAt: nowStr,
          bookingRef: trimmed,
          holderName: 'Unknown Visitor',
          guestCount: 0,
          gate: currentGate.split(' ')[0],
          status: 'INVALID_CODE',
          reason: 'Cryptographic signature mismatch',
        },
        ...prev,
      ]);
      return;
    }

    // Check if already used
    if (matched.status === 'used') {
      setScanResult({
        status: 'ALREADY_USED',
        message: `Pass ALREADY USED! Scanned previously at gate turnstile. Duplicate entry strictly barred.`,
        ticket: matched,
        timestamp: nowStr,
      });
      setScanHistory((prev) => [
        {
          id: `scan-${Date.now()}`,
          scannedAt: nowStr,
          bookingRef: matched.bookingRef,
          holderName: matched.holderName,
          guestCount: matched.guestCount,
          gate: currentGate.split(' ')[0],
          status: 'ALREADY_USED',
          reason: 'Duplicate turnstile scan',
        },
        ...prev,
      ]);
      return;
    }

    if (matched.status === 'cancelled') {
      setScanResult({
        status: 'INVALID',
        message: 'Pass was CANCELLED or refunded. Entry denied.',
        ticket: matched,
        timestamp: nowStr,
      });
      return;
    }

    // Success: Mark as used
    onUpdateTicketStatus(matched.id, 'used');
    setScanResult({
      status: 'VALID',
      message: `ENTRY GRANTED: ${matched.guestCount} Guest(s) verified for ${matched.eventName}`,
      ticket: matched,
      timestamp: nowStr,
    });

    setScanHistory((prev) => [
      {
        id: `scan-${Date.now()}`,
        scannedAt: nowStr,
        bookingRef: matched.bookingRef,
        holderName: matched.holderName,
        guestCount: matched.guestCount,
        gate: currentGate.split(' ')[0],
        status: 'VALID',
      },
      ...prev,
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#DED5CC] overflow-hidden my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Staff App Header */}
        <div className="bg-[#1E2B4B] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#293A63] border border-blue-400/40 flex items-center justify-center">
              <Icon name="qr_code_scanner" size={20} className="text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-tight">Gate Staff Turnstile Validator</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  LIVE SECURE
                </span>
              </div>
              <span className="text-[11px] text-blue-200 block">
                Official Venue Verification · Ahmedabad Police &amp; Organizer Protocol
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            title="Close Staff Portal"
          >
            ✕
          </button>
        </div>

        {/* Gate Selection Bar */}
        <div className="bg-[#F8F5EF] px-4 py-2.5 border-b border-[#DED5CC] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#665D60]">Current Gate Terminal:</span>
            <select
              value={currentGate}
              onChange={(e) => setCurrentGate(e.target.value)}
              className="bg-white border border-[#DED5CC] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#201A1C] outline-none"
            >
              <option value="Gate 1 (West Royal Archway)">Gate 1 (West Royal Archway)</option>
              <option value="Gate 2 (Pedestrian Entrance)">Gate 2 (Pedestrian Entrance)</option>
              <option value="Gate B (Amphitheatre West)">Gate B (Amphitheatre West)</option>
              <option value="VIP Gate (Express Turnstile)">VIP Gate (Express Turnstile)</option>
            </select>
          </div>

          <span className="text-[11px] text-[#226046] font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#226046] animate-ping"></span>
            Turnstiles Ready
          </span>
        </div>

        <div className="p-4 sm:p-5 flex-1 overflow-y-auto flex flex-col gap-5 text-[#201A1C]">
          {/* Simulated Scanner Viewfinder */}
          <div className="relative w-full h-44 sm:h-52 bg-stone-900 rounded-2xl overflow-hidden flex flex-col items-center justify-center border-2 border-stone-700 shadow-inner">
            {/* Viewfinder Target Graphic */}
            <div className="relative w-36 h-36 border border-emerald-400/40 rounded-xl flex items-center justify-center">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400 rounded-tl"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400 rounded-tr"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400 rounded-bl"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400 rounded-br"></div>
              
              {/* Laser scanning bar */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-bounce"></div>
              <Icon name="qr_code_scanner" size={32} className="text-emerald-400/60" />
            </div>

            <span className="text-[11px] text-stone-300 font-medium mt-3">
              Point camera at attendee digital pass or select test ticket below
            </span>

            {/* Quick Demo Test Buttons */}
            <div className="mt-2 flex flex-wrap justify-center gap-2 px-2">
              {tickets.slice(0, 3).map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setManualInput(t.bookingRef);
                    handleProcessScan(t.bookingRef);
                  }}
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-[10px] font-mono font-bold transition-colors cursor-pointer border border-stone-600"
                >
                  Test: {t.bookingRef} ({t.holderName.split(' ')[0]}) [{t.status}]
                </button>
              ))}
              <button
                onClick={() => {
                  setManualInput('INVALID-FAKE-REF');
                  handleProcessScan('INVALID-FAKE-REF');
                }}
                className="px-2.5 py-1 rounded bg-red-900/60 hover:bg-red-800 text-red-200 text-[10px] font-mono font-bold transition-colors cursor-pointer border border-red-700"
              >
                Test Invalid Fake Pass
              </button>
            </div>
          </div>

          {/* Manual Input Bar */}
          <div className="flex gap-2">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Enter Booking Ref (e.g. NM-AHM-2026-9812) or Phone..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#DED5CC] text-xs font-mono focus:border-[#293A63] focus:outline-none"
            />
            <button
              onClick={() => handleProcessScan(manualInput)}
              className="px-5 py-2.5 rounded-xl bg-[#293A63] hover:bg-[#1E2B4B] text-white text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              Verify Code
            </button>
          </div>

          {/* Validation Feedback Result Banner */}
          {scanResult && (
            <div
              className={`p-4 rounded-xl border flex flex-col gap-2 ${
                scanResult.status === 'VALID'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : scanResult.status === 'ALREADY_USED'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-xs ${
                      scanResult.status === 'VALID'
                        ? 'bg-emerald-600'
                        : scanResult.status === 'ALREADY_USED'
                        ? 'bg-amber-600'
                        : 'bg-red-600'
                    }`}
                  >
                    {scanResult.status === 'VALID' ? '✓' : '!'}
                  </span>
                  <span className="font-bold text-sm tracking-wide">
                    {scanResult.status === 'VALID'
                      ? 'PASS VALID · ADMIT VISITOR'
                      : scanResult.status === 'ALREADY_USED'
                      ? 'FRAUD ALERT · ALREADY USED'
                      : 'ENTRY REFUSED · INVALID CODE'}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold">{scanResult.timestamp}</span>
              </div>

              <p className="text-xs font-medium pl-8">{scanResult.message}</p>

              {scanResult.ticket && (
                <div className="mt-2 pl-8 pt-2 border-t border-current/20 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div>
                    <span className="text-[10px] opacity-75 block font-bold">Holder</span>
                    <span className="font-semibold">{scanResult.ticket.holderName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] opacity-75 block font-bold">Persons</span>
                    <span className="font-semibold">{scanResult.ticket.guestCount} Guest(s)</span>
                  </div>
                  <div>
                    <span className="text-[10px] opacity-75 block font-bold">Pass Type</span>
                    <span className="font-semibold">{scanResult.ticket.passType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] opacity-75 block font-bold">Assigned Gate</span>
                    <span className="font-semibold">{scanResult.ticket.gate.split('·')[0]}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Live Scan Audit Trail */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#665D60] uppercase tracking-wider">
                Live Gate Scan Log ({scanHistory.length})
              </span>
              <span className="text-[10px] text-[#665D60]">Server-authoritative database audit</span>
            </div>

            <div className="border border-[#DED5CC] rounded-xl overflow-hidden divide-y divide-[#DED5CC] bg-white text-xs">
              {scanHistory.map((scan) => (
                <div key={scan.id} className="p-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        scan.status === 'VALID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : scan.status === 'ALREADY_USED'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {scan.status}
                    </span>
                    <span className="font-mono font-semibold text-[#201A1C] truncate">
                      {scan.bookingRef}
                    </span>
                    <span className="text-[#665D60] truncate">· {scan.holderName}</span>
                  </div>

                  <div className="text-right shrink-0 text-[#665D60] text-[11px]">
                    <span className="font-medium">{scan.scannedAt}</span>
                    <span className="ml-1 text-[10px] text-[#7A2337]">[{scan.gate}]</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
