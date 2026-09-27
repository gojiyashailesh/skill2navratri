import React, { useState } from 'react';
import { TicketBooking } from '../types/navratri';
import { Icon } from './Icon';
import { NavratriLogo } from './NavratriLogo';

interface MyTicketsViewProps {
  tickets: TicketBooking[];
  onNavigateToMap: (eventId?: string) => void;
  language: 'en' | 'gu';
}

export const MyTicketsView: React.FC<MyTicketsViewProps> = ({
  tickets,
  onNavigateToMap,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedTicket, setSelectedTicket] = useState<TicketBooking | null>(tickets[0] || null);
  const [offlineSavedId, setOfflineSavedId] = useState<string | null>(null);

  const upcomingTickets = tickets.filter((t) => t.status === 'confirmed');
  const pastTickets = tickets.filter((t) => t.status === 'used' || t.status === 'cancelled');

  const displayedList = activeTab === 'upcoming' ? upcomingTickets : pastTickets;

  return (
    <div className="w-full min-h-[calc(100dvh-var(--app-header-height))] bg-[#FBF7F0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#DED5CC]">
          <div>
            <div className="text-xs font-bold text-[#7A2337] uppercase tracking-wider">
              {language === 'gu' ? 'તમારા ડિજિટલ પાસ' : 'Verified Admission Wallet'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#201A1C]">
              {language === 'gu' ? 'મારા પાસ (My Tickets)' : 'My Tickets'}
            </h1>
          </div>

          {/* Upcoming / Past Tab Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-[#F2ECE2] border border-[#DED5CC] w-fit">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-white text-[#7A2337] shadow-xs'
                  : 'text-[#665D60] hover:text-[#201A1C]'
              }`}
            >
              Upcoming ({upcomingTickets.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'past'
                  ? 'bg-white text-[#7A2337] shadow-xs'
                  : 'text-[#665D60] hover:text-[#201A1C]'
              }`}
            >
              Past Sessions ({pastTickets.length})
            </button>
          </div>
        </div>

        {/* Content Area */}
        {displayedList.length === 0 ? (
          <div className="w-full py-16 bg-white rounded-2xl border border-[#DED5CC] p-8 text-center flex flex-col items-center gap-3">
            <Icon name="confirmation_number" size={36} className="text-[#8D8080]" />
            <h3 className="text-base font-bold text-[#201A1C]">
              No {activeTab} passes found
            </h3>
            <p className="text-xs text-[#665D60] max-w-sm">
              Your booked festival passes, QR wristband credentials and parking barcodes will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tickets list / selector */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {displayedList.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${
                    selectedTicket?.id === ticket.id
                      ? 'bg-white border-2 border-[#7A2337] shadow-md'
                      : 'bg-white/80 border-[#DED5CC] hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#7A2337] uppercase">
                        {ticket.fixtureId}
                      </span>
                      <h3 className="text-base font-bold text-[#201A1C]">
                        {ticket.eventName}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#EAF4ED] text-[#226046] text-[10px] font-bold">
                      Confirmed
                    </span>
                  </div>

                  <div className="text-xs text-[#665D60] flex items-center gap-1.5">
                    <Icon name="calendar_today" size={13} className="text-[#665D60]" />
                    <span>{ticket.date}</span>
                  </div>

                  <div className="text-xs text-[#201A1C] font-semibold flex items-center gap-1.5">
                    <Icon name="door_front" size={14} className="text-[#293A63]" />
                    <span>{ticket.gate}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#EBE4DA] text-[11px] text-[#665D60]">
                    <span>{ticket.guestCount} Guests Admitted</span>
                    <span className="font-bold text-[#7A2337]">₹{ticket.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Admission Ticket Stub */}
            {selectedTicket && (
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl bg-white border border-[#DED5CC] shadow-lg p-6 sm:p-8 flex flex-col gap-5 overflow-hidden">
                  {/* Watermark Eight-Dot Ring */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-8 -right-8 w-48 h-48 pointer-events-none opacity-[0.05] select-none text-[#7A2337]"
                  >
                    <svg className="w-full h-full stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="84" strokeDasharray="3 5"></circle>
                      <circle cx="100" cy="100" r="56"></circle>
                      <circle cx="100" cy="16" fill="currentColor" r="6"></circle>
                      <circle cx="184" cy="100" fill="currentColor" r="6"></circle>
                      <circle cx="100" cy="184" fill="currentColor" r="6"></circle>
                      <circle cx="16" cy="100" fill="currentColor" r="6"></circle>
                    </svg>
                  </div>

                  {/* Header Stub */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#DED5CC] gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#7A2337] text-white text-[10px] uppercase font-bold tracking-wider">
                          Official E-Pass
                        </span>
                        <span className="text-xs text-[#226046] font-bold flex items-center gap-1">
                          <Icon name="verified" size={14} />
                          Verified Access
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-[#201A1C]">{selectedTicket.eventName}</h2>
                      <p className="text-xs text-[#665D60] mt-0.5">{selectedTicket.venueName}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <NavratriLogo size="sm" showSubtitle={false} />
                      <div className="text-right border-l border-[#DED5CC] pl-3">
                        <span className="text-[10px] text-[#665D60] uppercase block font-semibold">
                          Admission Pass
                        </span>
                        <span className="text-sm font-bold text-[#7A2337]">{selectedTicket.passType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Gate & Time High-Priority Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#F8F5EF] border border-[#DED5CC] text-xs">
                    <div>
                      <span className="text-[10px] text-[#665D60] uppercase block font-semibold">
                        Assigned Gate
                      </span>
                      <span className="font-bold text-[#293A63] text-sm block">
                        Gate 2 (Pedestrian)
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#665D60] uppercase block font-semibold">
                        Date &amp; Time
                      </span>
                      <span className="font-bold text-[#201A1C] text-sm block">
                        16 Oct · 8:00 PM
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#665D60] uppercase block font-semibold">
                        Admitted Guests
                      </span>
                      <span className="font-bold text-[#201A1C] text-sm block">
                        {selectedTicket.guestCount} Persons
                      </span>
                    </div>
                  </div>

                  {/* Single Dashed Textile Divider */}
                  <div className="relative my-1">
                    <div className="border-t-2 border-dashed border-[#DED5CC] w-full"></div>
                    <div className="absolute -left-9 -top-3 w-6 h-6 rounded-full bg-[#FBF7F0] border border-[#DED5CC]"></div>
                    <div className="absolute -right-9 -top-3 w-6 h-6 rounded-full bg-[#FBF7F0] border border-[#DED5CC]"></div>
                  </div>

                  {/* High Resolution Scannable QR Code */}
                  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-[#DED5CC]">
                    <div className="p-3 bg-white border border-[#201A1C] rounded-lg shadow-xs">
                      <svg
                        className="w-44 h-44 sm:w-48 sm:h-48"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Position Markers */}
                        <rect x="10" y="10" width="50" height="50" fill="#201A1C" />
                        <rect x="18" y="18" width="34" height="34" fill="#FFFFFF" />
                        <rect x="24" y="24" width="22" height="22" fill="#201A1C" />

                        <rect x="140" y="10" width="50" height="50" fill="#201A1C" />
                        <rect x="148" y="18" width="34" height="34" fill="#FFFFFF" />
                        <rect x="154" y="24" width="22" height="22" fill="#201A1C" />

                        <rect x="10" y="140" width="50" height="50" fill="#201A1C" />
                        <rect x="18" y="148" width="34" height="34" fill="#FFFFFF" />
                        <rect x="24" y="154" width="22" height="22" fill="#201A1C" />

                        {/* Timing Lines */}
                        <g fill="#201A1C">
                          <rect x="68" y="30" width="8" height="8" />
                          <rect x="84" y="30" width="8" height="8" />
                          <rect x="100" y="30" width="8" height="8" />
                          <rect x="116" y="30" width="8" height="8" />

                          <rect x="30" y="68" width="8" height="8" />
                          <rect x="30" y="84" width="8" height="8" />
                          <rect x="30" y="100" width="8" height="8" />
                          <rect x="30" y="116" width="8" height="8" />
                        </g>

                        {/* QR Data Matrix */}
                        <g fill="#201A1C">
                          <rect x="70" y="70" width="16" height="16" />
                          <rect x="94" y="70" width="24" height="8" />
                          <rect x="126" y="70" width="16" height="16" />
                          <rect x="70" y="94" width="8" height="24" />
                          <rect x="86" y="94" width="16" height="16" />
                          <rect x="110" y="94" width="16" height="8" />
                          <rect x="134" y="94" width="12" height="24" />
                          <rect x="70" y="126" width="24" height="12" />
                          <rect x="102" y="118" width="16" height="16" />
                          <rect x="126" y="126" width="24" height="8" />
                          <rect x="70" y="146" width="16" height="16" />
                          <rect x="94" y="146" width="8" height="24" />
                          <rect x="110" y="146" width="24" height="8" />
                          <rect x="142" y="146" width="16" height="16" />
                        </g>
                      </svg>
                    </div>

                    <div className="mt-2 text-center">
                      <span className="px-2.5 py-0.5 rounded bg-[#FFF0D5] text-[#80520C] text-[10px] font-bold tracking-wider uppercase">
                        DEMO — Not valid for actual festival entry
                      </span>
                      <div className="font-mono text-xs font-bold text-[#201A1C] mt-1 tracking-wider">
                        {selectedTicket.bookingRef}
                      </div>
                    </div>
                  </div>

                  {/* Actions for this Ticket */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <button
                      onClick={() => onNavigateToMap(selectedTicket.eventId)}
                      className="flex-1 py-3 rounded-xl bg-[#293A63] hover:bg-[#1E2B4B] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Icon name="turn_right" size={17} />
                      <span>View Arrival &amp; Gate Route</span>
                    </button>

                    <button
                      onClick={() => {
                        setOfflineSavedId(selectedTicket.id);
                        setTimeout(() => setOfflineSavedId(null), 2500);
                      }}
                      className="py-3 px-4 rounded-xl border border-[#DED5CC] text-[#201A1C] text-xs font-semibold hover:bg-[#F8F5EF] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {offlineSavedId === selectedTicket.id ? (
                        <>
                          <Icon name="check" size={15} className="text-emerald-700" />
                          <span className="text-emerald-800 font-bold">Saved to Device Cache ✓</span>
                        </>
                      ) : (
                        <>
                          <Icon name="download" size={15} />
                          <span>Save for Offline</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
