import React, { useState } from 'react';
import { GarbaEvent } from '../types/navratri';
import { Icon } from './Icon';

interface OrganizerSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEvent: (event: GarbaEvent) => void;
}

export const OrganizerSubmitModal: React.FC<OrganizerSubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmitEvent,
}) => {
  const [eventName, setEventName] = useState('');
  const [nameGu, setNameGu] = useState('');
  const [artist, setArtist] = useState('');
  const [venueName, setVenueName] = useState('');
  const [area, setArea] = useState('Bodakdev / SG Highway');
  const [admissionType, setAdmissionType] = useState<'free_walkin' | 'paid'>('paid');
  const [ticketPrice, setTicketPrice] = useState('499');
  const [parkingType, setParkingType] = useState<'free' | 'paid'>('free');
  const [garbaStyle, setGarbaStyle] = useState('Traditional Sheri & Mandli');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim() || !venueName.trim()) return;

    const newEvent: GarbaEvent = {
      id: `e-org-${Date.now()}`,
      fixtureId: `Fixture E-${Math.floor(100 + Math.random() * 900)}`,
      name: eventName.trim(),
      nameGu: nameGu.trim() || eventName.trim(),
      tagline: `Community Garba in ${area} celebrating Navratri 2026 traditions`,
      admissionType: admissionType === 'paid' ? 'paid' : 'free_walkin',
      priceDisplay: admissionType === 'paid' ? `From ₹${ticketPrice}` : 'Free entry',
      basePrice: admissionType === 'paid' ? Number(ticketPrice) || 399 : 0,
      artist: artist.trim() || 'Traditional Folk Troupe',
      artistGenre: 'Folk Orchestra & Prachi Garba',
      artistImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE4y57oOrhnV599K4X0ozvqNsz5tWOeKAOtdZBhLSEffaHAjr-0tY07LVIbAoBihIgv4TlAAThRSs32ss0O7ll4Lqrtf-EK0IXuAenVnmu6J-9lbIVX1Vp9-07qorxnIFrJqBzrgEUz-3bElWhe9l2ytxaapxuPoJkYHRTQ5fifuNRzXarbwziSu_s8W7j4b0x89_4lmw1n1dF1YzVzK74iV3VYsZ4WylIKkd5OTysPRd8LaJKh17o',
      date: '16 Oct 2026',
      timeRange: '16 Oct, 8:30 PM – 17 Oct, 1:30 AM',
      overnight: true,
      venueName: venueName.trim(),
      area: `${area}, Ahmedabad`,
      distanceKm: 4.5,
      distanceDisplay: '4.5 km away',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVK1kCcxb6ZcXasbcM7qtuH_z1NBwzTgvDBCaNhhpxUFFb5a6smqjBitDdtAekk6iTXyXGXDb9dcxTAhwhPZYn0wTUrgO5st_tlEDWs6AA_c1azf0ZwQfldbx-tHGFWDXbHKMzYyhDBQsrXA-hwaDO7maw2ZqdI030pfX_h2mKOBQ4Cu5ylEsECDPxPHWPJsrqSdce2oxMUR1eY8D6ZlWW5far_lgVKjo_JCYPVutyyd5UIjizMIfg',
      imageAlt: `${eventName} celebration grounds in Ahmedabad.`,
      tags: ['Traditional', admissionType === 'paid' ? 'Pass Required' : 'Free Entry', 'Mandli'],
      bannerBadge: 'New Listing · Organizer Submitted',
      parkingBadge: parkingType === 'free' ? 'Free on-site parking verified' : 'Paid parking available',
      parkingType: parkingType,
      assignedGate: 'Main Entrance (Gate 1)',
      assignedGateNotes: 'Verified gate inspection underway',
      coordinates: {
        lat: 23.045,
        lng: 72.525,
        svgX: 620,
        svgY: 420,
      },
      parkingOptions: [
        {
          id: `p-${Date.now()}`,
          name: `${venueName} On-Site Lot`,
          type: 'Organizer Official',
          fee: parkingType === 'free' ? '₹0 Free' : '₹50 Flat',
          hours: '6:00 PM – 2:00 AM',
          walkingDistance: '200 m',
          walkingTime: '3 min walk',
          hasSensors: true,
          notes: 'Guarded parking area with security personnel.',
        },
      ],
      styles: ['Traditional Sheri & Mandli'],
      description: `Newly submitted Navratri 2026 Garba gathering at ${venueName}. Featuring traditional acoustic instruments and sacred aartis.`,
      facilities: [
        { name: 'Cold Drinking Water', icon: 'water_drop', status: 'available' },
        { name: 'Clean Restrooms', icon: 'wc', status: 'available' },
        { name: 'First Aid Station', icon: 'medical_services', status: 'available' },
        { name: 'Traditional Farsan Stalls', icon: 'restaurant', status: 'available' },
      ],
      rules: [
        'Traditional attire required.',
        'Follow designated parking entry guidelines.',
      ],
    };

    onSubmitEvent(newEvent);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#DED5CC] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#7A2337] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Icon name="add" size={20} className="text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Host an Event / Mandli Portal</h3>
              <span className="text-[11px] text-amber-200 block">
                Submit your Navratri Garba for verification &amp; ticketing
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
              ✓
            </div>
            <h4 className="text-lg font-bold text-[#201A1C]">Event Submitted Successfully!</h4>
            <p className="text-xs text-[#665D60] max-w-xs">
              Your Garba gathering has been registered and added to the Ahmedabad discovery directory.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex flex-col gap-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#251F21] block mb-1">Event Name *</label>
                <input
                  required
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g. Shubh Aangan Mandli"
                  className="w-full px-3 py-2 rounded-xl border border-[#DED5CC] focus:border-[#7A2337] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#251F21] block mb-1">Name in Gujarati</label>
                <input
                  type="text"
                  value={nameGu}
                  onChange={(e) => setNameGu(e.target.value)}
                  placeholder="e.g. શુભ આંગણ માંડલી"
                  className="w-full px-3 py-2 rounded-xl border border-[#DED5CC] focus:border-[#7A2337] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#251F21] block mb-1">Lead Artist / Orchestra</label>
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="e.g. Folk Ensemble or Mandli"
                  className="w-full px-3 py-2 rounded-xl border border-[#DED5CC] focus:border-[#7A2337] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#251F21] block mb-1">Garba Style</label>
                <select
                  value={garbaStyle}
                  onChange={(e) => setGarbaStyle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DED5CC] focus:border-[#7A2337] outline-none bg-white"
                >
                  <option value="Traditional Sheri & Mandli">Traditional Sheri &amp; Mandli</option>
                  <option value="Raas & Dandiya Beats">Raas &amp; Dandiya Beats</option>
                  <option value="Heritage & Temple Garba">Heritage &amp; Temple Garba</option>
                  <option value="Modern Youth Arena">Modern Youth Arena</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-[#251F21] block mb-1">Venue / Ground Name *</label>
              <input
                required
                type="text"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="e.g. Someshwar Mahadev Lawns, Satellite"
                className="w-full px-3 py-2 rounded-xl border border-[#DED5CC] focus:border-[#7A2337] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#251F21] block mb-1">Locality in Ahmedabad</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DED5CC] focus:border-[#7A2337] outline-none bg-white"
                >
                  <option value="Bodakdev / SG Highway">Bodakdev / SG Highway</option>
                  <option value="Thaltej / Sindhu Bhavan">Thaltej / Sindhu Bhavan</option>
                  <option value="Satellite / Vastrapur">Satellite / Vastrapur</option>
                  <option value="Old City Pols / Bhadra">Old City Pols / Bhadra</option>
                  <option value="Navrangpura / University">Navrangpura / University</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#251F21] block mb-1">Parking Arrangement</label>
                <select
                  value={parkingType}
                  onChange={(e) => setParkingType(e.target.value as 'free' | 'paid')}
                  className="w-full px-3 py-2 rounded-xl border border-[#DED5CC] focus:border-[#7A2337] outline-none bg-white"
                >
                  <option value="free">Free On-Site Parking</option>
                  <option value="paid">Paid Municipal / Valet Lot</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#251F21] block mb-1">Admission Type</label>
                <select
                  value={admissionType}
                  onChange={(e) => setAdmissionType(e.target.value as 'free_walkin' | 'paid')}
                  className="w-full px-3 py-2 rounded-xl border border-[#DED5CC] focus:border-[#7A2337] outline-none bg-white"
                >
                  <option value="paid">Paid Pass / Ticketed</option>
                  <option value="free_walkin">Free Walk-in / Community</option>
                </select>
              </div>

              {admissionType === 'paid' && (
                <div>
                  <label className="font-bold text-[#251F21] block mb-1">Base Ticket Price (₹)</label>
                  <input
                    type="number"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    placeholder="499"
                    className="w-full px-3 py-2 rounded-xl border border-[#DED5CC] focus:border-[#7A2337] outline-none"
                  />
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#DED5CC] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#DED5CC] font-semibold text-[#665D60] hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#7A2337] hover:bg-[#651A2C] text-white font-bold transition-colors shadow-sm"
              >
                Submit for Verification
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
