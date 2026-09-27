import React, { useState } from 'react';
import { GarbaEvent, TicketBooking } from '../types/navratri';
import { Icon } from './Icon';

interface CheckoutModalProps {
  event: GarbaEvent;
  onClose: () => void;
  onBookingSuccess: (booking: TicketBooking) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  event,
  onClose,
  onBookingSuccess,
}) => {
  const [selectedPass, setSelectedPass] = useState<'general' | 'vip'>('general');
  const [quantity, setQuantity] = useState<number>(2);
  const [name, setName] = useState<string>('Raju Gojiya');
  const [phone, setPhone] = useState<string>('+91 98765 43210');
  const [email, setEmail] = useState<string>('gojiyaraju25@gmail.com');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<TicketBooking | null>(null);

  const unitPrice = selectedPass === 'general' ? event.basePrice : 1299;
  const isFree = event.admissionType === 'free_rsvp' || event.admissionType === 'free_walkin';
  
  const subtotal = isFree ? 0 : quantity * unitPrice;
  const convenienceFee = isFree ? 0 : 40.0;
  const gstTax = isFree ? 0 : 7.2;
  const totalAmount = isFree ? 0 : subtotal + convenienceFee + gstTax;

  const handlePay = () => {
    if (!agreedTerms) {
      setErrorMessage('Please accept the entry terms and cancellation policies');
      return;
    }
    setErrorMessage('');

    setIsProcessing(true);

    setTimeout(() => {
      const newBooking: TicketBooking = {
        id: `t-${Date.now()}`,
        bookingRef: `NM-AHM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        eventId: event.id,
        eventName: event.name,
        fixtureId: event.fixtureId,
        date: event.date,
        timeRange: event.timeRange,
        venueName: event.venueName,
        gate: event.assignedGate,
        parkingSummary: event.parkingBadge,
        guestCount: quantity,
        passType: selectedPass === 'general' ? 'General Entry Pass' : 'VIP Mandli Lounge Pass',
        totalAmount,
        bookedAt: '16 Oct 2026, 6:00 PM IST',
        holderName: name,
        holderPhone: phone,
        holderEmail: email,
        qrValue: `NAV-VERIFIED-${event.id.toUpperCase()}-${Date.now()}-QTY${quantity}`,
        status: 'confirmed',
      };

      setIsProcessing(false);
      setConfirmedBooking(newBooking);
      onBookingSuccess(newBooking);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#DED5CC] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#DED5CC] flex items-center justify-between bg-[#FBF7F0]">
          <div>
            <div className="text-[10px] font-bold text-[#7A2337] uppercase tracking-wider">
              {isFree ? 'Free Admission RSVP' : 'Ticketing & Checkout'}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#201A1C]">
              {event.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#EAE1D3] flex items-center justify-center text-[#665D60] cursor-pointer"
            type="button"
          >
            ✕
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Screen */
          <div className="p-6 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#EAF4ED] text-[#226046] flex items-center justify-center shadow-xs">
              <Icon name="check_circle" size={34} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#201A1C]">Booking Confirmed!</h3>
              <p className="text-xs text-[#665D60] mt-1">
                Your admission passes have been added to <strong>My Tickets</strong> wallet and sent to {email}.
              </p>
            </div>

            <div className="w-full p-4 rounded-xl bg-[#F8F5EF] border border-[#DED5CC] text-left text-xs flex flex-col gap-2">
              <div className="flex justify-between items-center pb-2 border-b border-[#DED5CC]">
                <span className="font-semibold text-[#665D60]">Booking Reference:</span>
                <span className="font-bold text-[#7A2337] font-mono">{confirmedBooking.bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#665D60]">Date &amp; Time:</span>
                <span className="font-semibold text-[#201A1C]">{confirmedBooking.timeRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#665D60]">Entrance Gate:</span>
                <span className="font-bold text-[#293A63]">{confirmedBooking.gate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#665D60]">Guests Admitted:</span>
                <span className="font-semibold text-[#201A1C]">{confirmedBooking.guestCount} Persons</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#DED5CC]">
                <span className="text-[#665D60]">Total Paid:</span>
                <span className="font-bold text-sm text-[#7A2337]">₹{confirmedBooking.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#7A2337] hover:bg-[#651A2C] text-white font-bold text-sm transition-colors cursor-pointer"
            >
              View in My Tickets Wallet
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-4 text-xs text-[#201A1C]">
            {/* Event Summary Pill */}
            <div className="p-3 rounded-xl bg-[#F8F5EF] border border-[#DED5CC] flex items-center justify-between">
              <div>
                <div className="font-bold text-[#201A1C] text-sm">{event.name}</div>
                <div className="text-[11px] text-[#665D60]">{event.timeRange}</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#EAE1D3] text-[#7A2337] font-bold text-[11px]">
                {event.assignedGate.split('(')[0]}
              </span>
            </div>

            {/* Pass Category Selector */}
            {!isFree && (
              <div className="flex flex-col gap-2">
                <label className="font-bold text-[#201A1C]">Select Pass Category</label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setSelectedPass('general')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedPass === 'general'
                        ? 'border-[#7A2337] bg-[#F7E9ED]'
                        : 'border-[#DED5CC] hover:bg-[#F8F5EF]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#201A1C]">General Pass</span>
                      <span className="font-bold text-[#7A2337]">₹{event.basePrice}</span>
                    </div>
                    <p className="text-[11px] text-[#665D60]">
                      Full circle access, free water booths &amp; North Lot parking
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedPass('vip')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedPass === 'vip'
                        ? 'border-[#7A2337] bg-[#F7E9ED]'
                        : 'border-[#DED5CC] hover:bg-[#F8F5EF]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#201A1C]">VIP Lounge Pass</span>
                      <span className="font-bold text-[#7A2337]">₹1,299</span>
                    </div>
                    <p className="text-[11px] text-[#665D60]">
                      Priority air-cooled gazebo, high tea &amp; reserved valet
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F5EF] border border-[#DED5CC]">
              <div>
                <span className="font-bold text-sm text-[#201A1C] block">Number of Attendees</span>
                <span className="text-[11px] text-[#665D60]">Maximum 10 passes per transaction</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-[#DED5CC] flex items-center justify-center font-bold text-base hover:bg-[#EAE1D3] cursor-pointer"
                  type="button"
                >
                  -
                </button>
                <span className="font-bold text-base w-4 text-center tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-[#DED5CC] flex items-center justify-center font-bold text-base hover:bg-[#EAE1D3] cursor-pointer"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-2.5">
              <label className="font-bold text-[#201A1C]">Ticket Holder Contact</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <span className="text-[11px] text-[#665D60] block mb-1 font-medium">Full Name (as per ID)</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DED5CC] bg-white text-xs text-[#201A1C] focus:outline-none focus:border-[#7A2337]"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-[#665D60] block mb-1 font-medium">Mobile Number</span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DED5CC] bg-white text-xs text-[#201A1C] focus:outline-none focus:border-[#7A2337]"
                  />
                </div>
              </div>
              <div>
                <span className="text-[11px] text-[#665D60] block mb-1 font-medium">Email for Digital Pass</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#DED5CC] bg-white text-xs text-[#201A1C] focus:outline-none focus:border-[#7A2337]"
                />
              </div>
            </div>

            {/* Exact Fee Breakdown */}
            {!isFree && (
              <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#DED5CC] flex flex-col gap-1.5 font-medium">
                <div className="font-bold text-[#201A1C] pb-1 border-b border-[#DED5CC] flex justify-between">
                  <span>Price Summary</span>
                  <span className="text-[#665D60] font-normal text-[11px]">INR Currency</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#665D60]">{quantity} × ₹{unitPrice} Pass Subtotal</span>
                  <span className="text-[#201A1C] tabular-nums">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#665D60]">Illustrative Booking Convenience Fee</span>
                  <span className="text-[#201A1C] tabular-nums">₹{convenienceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#665D60]">GST on Convenience Fee (18%)</span>
                  <span className="text-[#201A1C] tabular-nums">₹{gstTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#DED5CC] text-sm font-bold text-[#7A2337]">
                  <span>Total Payable Amount</span>
                  <span className="tabular-nums">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 accent-[#7A2337] w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-[11px] text-[#665D60] leading-snug">
                I understand traditional dress codes are mandatory and admission is subject to venue security checks. Gates close at 11:15 PM sharp.
              </span>
            </label>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Pay Button */}
            <div className="pt-2">
              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-[#7A2337] hover:bg-[#651A2C] disabled:bg-[#8D8080] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
                type="button"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Securing Reservation &amp; Inventory...</span>
                  </>
                ) : isFree ? (
                  <span>Confirm Free Pass Reservation</span>
                ) : (
                  <span>Pay ₹{totalAmount.toFixed(2)}</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
