import React, { useState } from 'react';
import { GarbaEvent, TransportMode, ParkingOption } from '../types/navratri';
import { GoogleMapView } from './GoogleMapView';
import { Icon } from './Icon';

interface ExploreMapViewProps {
  events: GarbaEvent[];
  selectedEvent: GarbaEvent;
  onSelectEvent: (event: GarbaEvent) => void;
  onBookTickets: (event: GarbaEvent) => void;
  language: 'en' | 'gu';
}

export const ExploreMapView: React.FC<ExploreMapViewProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  onBookTickets,
  language,
}) => {
  const [mapType, setMapType] = useState<'google' | 'heritage'>('google');
  const [transportMode, setTransportMode] = useState<TransportMode>('car');
  const [parkingDrawerOpen, setParkingDrawerOpen] = useState(false);
  const [selectedParking, setSelectedParking] = useState<ParkingOption>(
    selectedEvent.parkingOptions[0] || {
      id: 'p-default',
      name: 'North Lot (Organizer Official)',
      type: 'Organizer Official',
      fee: '₹0 Free',
      hours: '6:00 PM – 2:00 AM',
      walkingDistance: '650 m',
      walkingTime: '8 min walk',
      hasSensors: false,
      notes: 'Official designated lot.',
    }
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchAreaActive, setSearchAreaActive] = useState(false);
  const [showDirectionsDialog, setShowDirectionsDialog] = useState(false);
  const [copiedGps, setCopiedGps] = useState(false);

  // Dynamic travel times based on transport mode
  const travelStats = {
    car: {
      total: '26 min',
      leg1: '18 min drive',
      leg2: `${selectedParking.walkingTime}`,
      dist: '6.2 km',
      summary: `18 min drive + ${selectedParking.walkingTime}`,
    },
    'two-wheeler': {
      total: '21 min',
      leg1: '15 min ride',
      leg2: `${selectedParking.walkingTime}`,
      dist: '6.0 km',
      summary: `15 min ride + ${selectedParking.walkingTime}`,
    },
    transit: {
      total: '42 min',
      leg1: '28 min Metro + Feeder',
      leg2: '14 min walk',
      dist: '7.8 km',
      summary: '28 min transit + 14 min walk',
    },
    walk: {
      total: '1 hr 15 min',
      leg1: '1 hr 15 min walk',
      leg2: 'Direct Gate 2 entry',
      dist: '6.2 km',
      summary: 'Pedestrian boulevard route',
    },
  }[transportMode];

  const handleRecenter = () => {
    setZoomLevel(1);
  };

  const handleSearchThisArea = () => {
    setSearchAreaActive(true);
    setTimeout(() => setSearchAreaActive(false), 900);
  };

  return (
    <div className="relative w-full h-[calc(100vh-72px)] flex flex-col lg:flex-row overflow-hidden bg-[#FBF7F0]">
      {/* LEFT PANEL: Event selection, route preview, alternate venues */}
      <aside className="w-full lg:w-[440px] xl:w-[480px] h-full flex flex-col flex-shrink-0 bg-[#FFFFFF] shadow-xl z-20 overflow-hidden border-r border-[#DED5CC]">
        {/* Search & Contextual Header */}
        <div className="p-4 flex flex-col gap-2.5 bg-[#FFFFFF] border-b border-[#EBE4DA]">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#F8F5EF] text-[#251F21]">
            <Icon name="location_on" className="text-[#7A2337]" size={20} />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[10px] text-[#665D60] uppercase tracking-wider font-semibold">
                Origin Location
              </span>
              <input
                className="bg-transparent text-xs sm:text-sm font-semibold text-[#251F21] truncate focus:outline-none placeholder:text-[#8D8080]"
                defaultValue="Demo starting point · Ahmedabad West"
                type="text"
              />
            </div>
            <button
              className="p-1.5 rounded-full text-[#665D60] hover:text-[#251F21] hover:bg-[#EAE1D3] transition-colors cursor-pointer"
              title="Locate me (GPS)"
              type="button"
            >
              <Icon name="my_location" size={17} />
            </button>
          </div>

          {/* Filter Badges / Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A2337] text-white text-xs font-semibold flex-shrink-0 shadow-sm">
              <Icon name="calendar_today" size={13} className="text-white" />
              Tonight · 16 Oct
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#293A63] text-white text-xs font-semibold flex-shrink-0 shadow-sm">
              <span className="w-3.5 h-3.5 rounded bg-white text-[#293A63] flex items-center justify-center text-[9px] font-bold">
                P
              </span>
              Parking Available
            </span>

            <button
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F2ECE2] text-[#251F21] hover:bg-[#E3DACD] text-xs font-semibold flex-shrink-0 transition-colors cursor-pointer"
              type="button"
            >
              <span>Pass Type</span>
              <Icon name="expand_more" size={14} className="text-[#665D60]" />
            </button>

            <button
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F2ECE2] text-[#251F21] hover:bg-[#E3DACD] text-xs font-semibold flex-shrink-0 transition-colors cursor-pointer"
              type="button"
            >
              <span>Crowd Gate Live</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-[#665D60] font-medium">
              Showing <strong className="text-[#251F21] font-semibold">8 Garba grounds</strong> near starting point
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#293A63] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#293A63] animate-pulse"></span>
              Live Routing Active
            </span>
          </div>
        </div>

        {/* Scrollable Main Container */}
        <div className="flex-1 overflow-y-auto p-4 pb-24 lg:pb-8 flex flex-col gap-4 bg-[#FBF7F0]">
          {/* Primary Selected Event Card */}
          <div className="rounded-xl bg-[#FFFFFF] p-4 shadow-sm border border-[#DED5CC] flex flex-col gap-3">
            {/* Card Header & Badge */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#FFD9DD] text-[#7A2337] text-[10px] tracking-wide uppercase font-bold">
                    Selected Venue
                  </span>
                  <span className="text-[11px] text-[#665D60] font-medium">
                    {selectedEvent.fixtureId}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#7A2337] tracking-tight">
                  {selectedEvent.name}
                </h2>
                <p className="text-xs text-[#665D60] flex items-center gap-1.5 mt-0.5">
                  <Icon name="festival" size={15} className="text-[#8D8080]" />
                  <span>{selectedEvent.venueName}</span>
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xl font-bold text-[#7A2337]">
                  {selectedEvent.priceDisplay}
                </span>
                <span className="block text-[10px] text-[#665D60] uppercase font-semibold">
                  Entry Pass
                </span>
              </div>
            </div>

            {/* Target Arrival Gate Tag */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#BDCEFF]/40 text-[#051941] border border-[#BDCEFF]">
              <div className="flex items-center gap-2">
                <Icon name="door_front" size={17} className="text-[#293A63]" />
                <span className="text-xs font-bold">{selectedEvent.assignedGate}</span>
              </div>
              <span className="text-[10px] bg-white text-[#293A63] px-2 py-0.5 rounded-md font-bold shadow-xs">
                Fast-Track
              </span>
            </div>

            {/* Dedicated Two-Leg Arrival Routing Card */}
            <div className="rounded-xl bg-[#F8F5EF] p-3.5 flex flex-col gap-3 shadow-xs border border-[#EBE4DA]">
              {/* Transport Mode Switcher Tabs */}
              <div className="flex items-center p-1 rounded-xl bg-[#EDE7DF] gap-1">
                {(['car', 'two-wheeler', 'transit', 'walk'] as TransportMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTransportMode(mode)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      transportMode === mode
                        ? 'bg-[#293A63] text-white shadow-xs'
                        : 'text-[#665D60] hover:text-[#251F21]'
                    }`}
                    type="button"
                  >
                    <Icon
                      name={
                        mode === 'car'
                          ? 'directions_car'
                          : mode === 'two-wheeler'
                          ? 'two_wheeler'
                          : mode === 'transit'
                          ? 'directions_bus'
                          : 'directions_walk'
                      }
                      size={15}
                    />
                    <span className="capitalize">{mode === 'two-wheeler' ? 'Bike' : mode}</span>
                  </button>
                ))}
              </div>

              {/* Route Summary Header */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xl font-bold text-[#251F21] tracking-tight">
                    {travelStats.total}
                  </span>
                  <span className="text-xs text-[#665D60] ml-1 font-medium">total arrival journey</span>
                </div>
                <span className="text-xs font-semibold text-[#293A63]">
                  {travelStats.summary}
                </span>
              </div>

              {/* Two-Leg Stepper Timeline */}
              <div className="relative pl-6 flex flex-col gap-4">
                {/* Visual Indicator Line */}
                <div className="absolute left-2.5 top-3.5 bottom-6 w-0.5 bg-[#293A63]"></div>

                {/* LEG 1: Drive to North Lot Entrance */}
                <div className="relative flex flex-col gap-1">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#293A63] flex items-center justify-center text-white shadow-xs">
                    <Icon name="directions_car" size={12} className="text-white" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#251F21]">
                      Leg 1: Drive to {selectedParking.name}
                    </span>
                    <span className="text-[10px] font-bold text-[#293A63] bg-[#DAE2FF] px-2 py-0.5 rounded-full">
                      {travelStats.dist} · ~{travelStats.leg1}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#665D60]">
                    From Demo starting point via SG Highway &amp; Outer Ring Road.
                  </p>

                  {/* Detailed Parking Specifications Box */}
                  <div className="mt-2 p-2.5 rounded-lg bg-white border border-[#DED5CC] flex flex-col gap-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#251F21] flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded bg-[#293A63] text-white flex items-center justify-center text-[10px] font-bold">
                          P
                        </span>
                        {selectedParking.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#F2ECE2] text-[#251F21] font-bold">
                        {selectedParking.fee}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-[#665D60]">
                      <div className="flex items-center gap-1.5">
                        <Icon name="schedule" size={14} className="text-[#663800]" />
                        <span>{selectedParking.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icon
                          name={selectedParking.hasSensors ? 'sensors' : 'sensors_off'}
                          size={14}
                          className="text-[#8D8080]"
                        />
                        <span>
                          {selectedParking.capacity
                            ? `Capacity ${selectedParking.capacity}`
                            : 'No sensor'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LEG 2: Walk to Pedestrian Entrance */}
                <div className="relative flex flex-col gap-1">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white text-[#293A63] border border-[#293A63] shadow-xs flex items-center justify-center">
                    <Icon name="directions_walk" size={13} className="text-[#293A63]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#251F21]">
                      Leg 2: Walk to Gate 2
                    </span>
                    <span className="text-[10px] font-semibold text-[#665D60] bg-[#EDE7DF] px-2 py-0.5 rounded-full">
                      {selectedParking.walkingDistance} · ~{selectedParking.walkingTime}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#665D60]">
                    Footpath route along well-lit paved boulevard. Verified accessible pathway with ramp access to ticket scanners.
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EDE7DF] text-[#251F21]">
                      <Icon name="verified" size={12} className="text-[#7A2337]" />
                      Security Bag-Check Ready
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EDE7DF] text-[#251F21]">
                      <Icon name="wb_incandescent" size={12} className="text-[#293A63]" />
                      Lit Zone
                    </span>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => setShowDirectionsDialog(true)}
                  className="w-full h-11 rounded-xl bg-[#293A63] hover:bg-[#1E2B4B] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  type="button"
                >
                  <Icon name="turn_right" size={17} />
                  <span>Open Driving Directions (Maps Handoff)</span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setParkingDrawerOpen(!parkingDrawerOpen)}
                    className="w-full h-10 rounded-xl bg-[#F2ECE2] hover:bg-[#EAE1D3] text-[#293A63] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    type="button"
                  >
                    <Icon name="swap_horiz" size={16} />
                    <span>Choose alternate parking / drop-off</span>
                    <Icon name={parkingDrawerOpen ? 'expand_less' : 'expand_more'} size={16} />
                  </button>

                  {/* Alternate Options Popover Drawer */}
                  {parkingDrawerOpen && (
                    <div className="mt-2 p-2 rounded-xl bg-white border border-[#DED5CC] shadow-lg flex flex-col gap-2 z-30">
                      {selectedEvent.parkingOptions.map((opt) => (
                        <div
                          key={opt.id}
                          onClick={() => {
                            setSelectedParking(opt);
                            setParkingDrawerOpen(false);
                          }}
                          className={`p-2.5 rounded-lg cursor-pointer transition-colors flex items-center justify-between border ${
                            selectedParking.id === opt.id
                              ? 'bg-[#EDF0F7] border-[#293A63]'
                              : 'bg-[#F8F5EF] border-transparent hover:bg-[#F2ECE2]'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-[#251F21]">{opt.name}</div>
                            <div className="text-[11px] text-[#665D60]">
                              {opt.walkingDistance} to Gate 2 · {opt.notes}
                            </div>
                          </div>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-white text-[#251F21] font-bold border border-[#DED5CC]">
                            {opt.fee}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mandatory Precision Disclaimers */}
              <div className="p-2.5 rounded-lg bg-[#EDE7DF] text-[#665D60] text-[11px] flex flex-col gap-1">
                <div className="flex items-start gap-1.5">
                  <Icon name="info" size={14} className="text-[#663800] mt-0.5 shrink-0" />
                  <span>
                    Estimate without live traffic. Arrival times fluctuate +15-20 min between 9:00 PM and 11:30 PM.
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-[#251F21]">
                  <Icon name="location_on" size={14} className="text-[#293A63] mt-0.5 shrink-0" />
                  <span className="font-semibold">
                    Coordinates locked to North Lot Vehicle Gate, not venue centroid.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Nearby Alternate Venues */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold text-[#251F21]">Nearby Alternate Garba Grounds</h3>
              <span className="text-[11px] text-[#665D60]">2 within 5 km</span>
            </div>

            {events
              .filter((e) => e.id !== selectedEvent.id)
              .slice(0, 2)
              .map((alt) => (
                <div
                  key={alt.id}
                  onClick={() => onSelectEvent(alt)}
                  className="p-3.5 rounded-xl bg-white hover:bg-[#F8F5EF] transition-colors border border-[#DED5CC] shadow-xs cursor-pointer flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-sm font-bold text-[#251F21]">{alt.name}</span>
                        <span className="px-2 py-0.5 rounded bg-[#EDE7DF] text-[#251F21] text-[10px] font-semibold">
                          {alt.tags[0]}
                        </span>
                      </div>
                      <p className="text-xs text-[#665D60]">
                        {alt.area} · {alt.distanceDisplay} from you
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#F2ECE2] text-[#251F21] text-xs font-bold">
                      {alt.priceDisplay}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 text-[#665D60] border-t border-[#EBE4DA]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-[#293A63] text-white flex items-center justify-center text-[9px] font-bold">
                        P
                      </span>
                      {alt.parkingBadge.split('·')[0]}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="schedule" size={13} className="text-[#7A2337]" />
                      Starts 8:00 PM
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </aside>

      {/* RIGHT PANEL: Map Container with Google Maps & Heritage View Switcher */}
      <div className="flex-1 h-full relative overflow-hidden bg-[#F7F3EB]">
        {/* Top Floating Map Controls */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
          {/* Map Mode Switcher: Google Map vs Heritage Map */}
          <div className="flex items-center p-1 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-[#DED5CC]">
            <button
              onClick={() => setMapType('google')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                mapType === 'google'
                  ? 'bg-[#293A63] text-white shadow-xs'
                  : 'text-[#665D60] hover:text-[#251F21]'
              }`}
              type="button"
            >
              <Icon name="location_on" size={14} />
              <span>Google Maps</span>
            </button>
            <button
              onClick={() => setMapType('heritage')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                mapType === 'heritage'
                  ? 'bg-[#7A2337] text-white shadow-xs'
                  : 'text-[#665D60] hover:text-[#251F21]'
              }`}
              type="button"
            >
              <Icon name="festival" size={14} />
              <span>Heritage Map</span>
            </button>
          </div>
        </div>

        {/* Center Search Area Button */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          <button
            onClick={handleSearchThisArea}
            className={`px-4 py-2 rounded-full bg-white text-[#251F21] text-xs font-semibold shadow-lg hover:bg-[#F8F5EF] transition-all flex items-center gap-2 cursor-pointer border border-[#DED5CC] ${
              searchAreaActive ? 'ring-2 ring-[#293A63] scale-105' : ''
            }`}
            type="button"
          >
            <Icon
              name="refresh"
              size={15}
              className={`text-[#293A63] ${searchAreaActive ? 'animate-spin' : ''}`}
            />
            <span>{searchAreaActive ? 'Scanning Area...' : 'Search this area'}</span>
          </button>
        </div>

        {/* Right Floating Map Controls */}
        <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
          <div className="flex flex-col rounded-xl bg-white shadow-lg border border-[#DED5CC] overflow-hidden">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
              className="w-10 h-10 flex items-center justify-center text-[#251F21] hover:bg-[#F8F5EF] transition-colors cursor-pointer"
              title="Zoom in"
              type="button"
            >
              <Icon name="add" size={18} />
            </button>
            <div className="h-px bg-[#DED5CC] w-full"></div>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.7))}
              className="w-10 h-10 flex items-center justify-center text-[#251F21] hover:bg-[#F8F5EF] transition-colors cursor-pointer"
              title="Zoom out"
              type="button"
            >
              <Icon name="remove" size={18} />
            </button>
          </div>

          <button
            onClick={handleRecenter}
            className="w-10 h-10 rounded-xl bg-white text-[#251F21] shadow-lg border border-[#DED5CC] hover:bg-[#F8F5EF] flex items-center justify-center transition-colors cursor-pointer"
            title="Recenter on Arrival Route"
            type="button"
          >
            <Icon name="near_me" size={18} className="text-[#293A63]" />
          </button>

          <button
            onClick={() => setMapType((m) => (m === 'google' ? 'heritage' : 'google'))}
            className="w-10 h-10 rounded-xl bg-white text-[#251F21] shadow-lg border border-[#DED5CC] hover:bg-[#F8F5EF] flex items-center justify-center transition-colors cursor-pointer"
            title="Switch map layer"
            type="button"
          >
            <Icon name="layers" size={18} className="text-[#665D60]" />
          </button>
        </div>

        {/* MAP RENDERING: GOOGLE MAPS OR HERITAGE SVG MAP */}
        {mapType === 'google' ? (
          <GoogleMapView
            events={events}
            selectedEvent={selectedEvent}
            selectedParking={selectedParking}
            onSelectEvent={onSelectEvent}
            zoomLevel={zoomLevel}
          />
        ) : (
          /* Dynamic Custom SVG Stylized Map Graphic */
          <div
            className="w-full h-full relative select-none transition-transform duration-300 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              className="w-full h-full object-cover"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 1200 800"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="sabarmatiWater" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#D6E4F0"></stop>
                  <stop offset="100%" stopColor="#C2D6E7"></stop>
                </linearGradient>
                <pattern height="40" id="heritageGrid" patternUnits="userSpaceOnUse" width="40">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAE3D6" strokeWidth="0.5"></path>
                </pattern>
              </defs>

              <rect fill="#F7F3EB" height="100%" width="100%"></rect>
              <rect fill="url(#heritageGrid)" height="100%" width="100%"></rect>

              {/* Natural Green Spaces */}
              <path
                d="M 80,60 C 180,50 260,110 240,240 C 220,340 120,380 60,320 C 10,270 20,90 80,60 Z"
                fill="#E8EFE6"
              ></path>
              <path
                d="M 680,120 C 790,80 880,150 920,280 C 950,380 840,480 720,440 C 620,400 600,200 680,120 Z"
                fill="#E8EFE6"
              ></path>
              <path
                d="M 380,540 C 480,520 540,600 520,720 C 500,800 400,820 320,780 C 260,730 300,560 380,540 Z"
                fill="#E8EFE6"
              ></path>

              {/* River Sabarmati Feature */}
              <path
                d="M 1080,-50 C 1040,160 980,320 990,480 C 1000,640 1060,740 1090,850 L 1250,850 L 1250,-50 Z"
                fill="url(#sabarmatiWater)"
              ></path>
              <path
                d="M 1080,-50 C 1040,160 980,320 990,480 C 1000,640 1060,740 1090,850"
                fill="none"
                stroke="#B8CFE2"
                strokeWidth="3"
              ></path>

              <text
                fill="#7397B8"
                fontFamily="Noto Sans"
                fontSize="12"
                fontWeight="600"
                letterSpacing="3"
                transform="rotate(78 1050,320)"
                x="1050"
                y="320"
              >
                SABARMATI RIVERFRONT
              </text>

              {/* Minor Road Arteries */}
              <g fill="none" stroke="#EDE7DF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12">
                <path d="M -50,180 L 1100,180"></path>
                <path d="M -50,420 L 1100,420"></path>
                <path d="M -50,660 L 1100,660"></path>
                <path d="M 220,-50 L 220,850"></path>
                <path d="M 540,-50 L 540,850"></path>
                <path d="M 820,-50 L 820,850"></path>
              </g>

              {/* Major Primary Boulevards */}
              <g fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20">
                <path d="M -20,290 C 250,290 400,270 700,310 C 900,340 1040,320 1150,320"></path>
                <path d="M 190,750 C 240,550 320,440 380,360 C 460,260 520,240 640,230 C 720,220 780,240 820,290"></path>
              </g>

              {/* Street Names & Labels */}
              <g fill="#9C9083" fontFamily="Noto Sans" fontSize="11" fontWeight="600" letterSpacing="1">
                <text x="280" y="275">SARKHEJ - GANDHINAGAR HWY</text>
                <text x="60" y="440">VASTRAPUR LAKE PARKWAY</text>
                <text x="560" y="700">UNIVERSITY ROAD</text>
                <text x="730" y="210">HERITAGE CORRIDOR</text>
              </g>

              {/* Route Overlay */}
              <path
                d="M 210,680 C 250,540 330,440 390,360 C 460,270 515,245 620,240"
                fill="none"
                stroke="#293A63"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5"
              ></path>

              <path
                d="M 620,240 C 655,238 675,250 715,275"
                fill="none"
                stroke="#293A63"
                strokeDasharray="6 6"
                strokeLinecap="round"
                strokeWidth="3.5"
              ></path>

              {/* Origin Point */}
              <g transform="translate(210, 680)">
                <circle cx="0" cy="0" fill="#293A63" fillOpacity="0.15" r="18"></circle>
                <circle cx="0" cy="0" fill="#293A63" r="9" stroke="#FFFFFF" strokeWidth="2.5"></circle>
                <rect fill="#201A1C" height="24" rx="6" width="130" x="-65" y="-36"></rect>
                <text fill="#FFFFFF" fontFamily="Noto Sans" fontSize="10" fontWeight="700" textAnchor="middle" x="0" y="-20">
                  Demo Starting Point
                </text>
              </g>

              {/* Parking Marker */}
              <g
                className="cursor-pointer"
                transform="translate(620, 240)"
                onClick={() => setParkingDrawerOpen(true)}
              >
                <rect fill="#293A63" height="28" rx="6" stroke="#FFFFFF" strokeWidth="2" width="28" x="-14" y="-14"></rect>
                <text fill="#FFFFFF" fontFamily="Noto Sans" fontSize="16" fontWeight="800" textAnchor="middle" x="0" y="6">
                  P
                </text>
                <g transform="translate(0, -22)">
                  <rect fill="#293A63" height="20" rx="4" width="110" x="-55" y="-18"></rect>
                  <text fill="#FFFFFF" fontFamily="Noto Sans" fontSize="10" fontWeight="700" textAnchor="middle" x="0" y="-4">
                    North Lot Entrance
                  </text>
                </g>
              </g>

              {/* Gate Marker */}
              <g className="cursor-pointer" transform="translate(715, 275)">
                <circle cx="0" cy="0" fill="#FFFFFF" r="16" stroke="#7A2337" strokeWidth="2.5"></circle>
                <text fill="#7A2337" fontFamily="Noto Sans" fontSize="14" fontWeight="800" textAnchor="middle" x="0" y="5">
                  2
                </text>
                <g transform="translate(0, 24)">
                  <rect fill="#7A2337" height="20" rx="4" width="84" x="-42" y="0"></rect>
                  <text fill="#FFFFFF" fontFamily="Noto Sans" fontSize="10" fontWeight="700" textAnchor="middle" x="0" y="14">
                    Gate 2 Entry
                  </text>
                </g>
              </g>

              {/* Event Price Pill */}
              <g
                className="cursor-pointer"
                transform="translate(765, 230)"
                onClick={() => {
                  const e101 = events.find((e) => e.id === 'e-101');
                  if (e101) onSelectEvent(e101);
                }}
              >
                <rect fill="#293A63" height="28" rx="14" stroke="#FFFFFF" strokeWidth="2" width="80" x="-40" y="-36"></rect>
                <text fill="#FFFFFF" fontFamily="Noto Sans" fontSize="13" fontWeight="700" textAnchor="middle" x="0" y="-18">
                  ₹499
                </text>
                <path d="M -6,-8 L 0,0 L 6,-8 Z" fill="#293A63"></path>
              </g>

              {/* Other Markers */}
              <g
                className="cursor-pointer"
                transform="translate(420, 520)"
                onClick={() => {
                  const e102 = events.find((e) => e.id === 'e-102');
                  if (e102) onSelectEvent(e102);
                }}
              >
                <rect fill="#FFFFFF" height="24" rx="12" stroke="#887274" strokeWidth="1.5" width="64" x="-32" y="-28"></rect>
                <text fill="#201A1C" fontFamily="Noto Sans" fontSize="11" fontWeight="700" textAnchor="middle" x="0" y="-12">
                  Free
                </text>
                <text fill="#554244" fontFamily="Noto Sans" fontSize="10" fontWeight="600" textAnchor="middle" x="0" y="14">
                  Sheri Garba Circle
                </text>
              </g>

              <g
                className="cursor-pointer"
                transform="translate(560, 640)"
                onClick={() => {
                  const e103 = events.find((e) => e.id === 'e-103');
                  if (e103) onSelectEvent(e103);
                }}
              >
                <rect fill="#FFFFFF" height="24" rx="12" stroke="#887274" strokeWidth="1.5" width="64" x="-32" y="-28"></rect>
                <text fill="#201A1C" fontFamily="Noto Sans" fontSize="11" fontWeight="700" textAnchor="middle" x="0" y="-12">
                  Free
                </text>
                <text fill="#554244" fontFamily="Noto Sans" fontSize="10" fontWeight="600" textAnchor="middle" x="0" y="14">
                  Raas Courtyard
                </text>
              </g>
            </svg>
          </div>
        )}

        {/* Bottom Floating Map Legend */}
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto z-30 pointer-events-none">
          <div className="pointer-events-auto p-3 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-[#DED5CC] flex flex-wrap items-center gap-4 text-[#201A1C]">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-5 h-1 rounded-full bg-[#293A63] inline-block"></span>
              <span className="font-semibold text-[#201A1C]">Driving route (6.2 km)</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="w-5 h-0.5 border-t-2 border-dashed border-[#293A63] inline-block"></span>
              <span className="font-semibold text-[#201A1C]">Walking path (650 m)</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-4 h-4 rounded bg-[#293A63] text-white flex items-center justify-center text-[10px] font-bold">
                P
              </span>
              <span className="font-semibold text-[#201A1C]">North Lot Vehicle Gate</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-4 h-4 rounded-full bg-[#7A2337] text-white flex items-center justify-center text-[9px] font-bold">
                2
              </span>
              <span className="font-semibold text-[#201A1C]">Pedestrian Gate 2</span>
            </div>

            <div className="h-3 w-px bg-[#DED5CC] hidden sm:block"></div>

            <div className="text-[11px] text-[#665D60]">
              {mapType === 'google'
                ? 'Google Maps Platform · Live Satellite / Street tiles'
                : 'Data © OpenStreetMap · Ahmedabad Police Traffic Advisory'}
            </div>
          </div>
        </div>
      </div>

      {/* External Map Handoff Dialog Modal */}
      {showDirectionsDialog && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#DED5CC] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DED5CC]">
              <div className="flex items-center gap-2">
                <Icon name="turn_right" size={22} className="text-[#293A63]" />
                <h3 className="text-base font-bold text-[#201A1C]">Navigation Handoff</h3>
              </div>
              <button
                onClick={() => setShowDirectionsDialog(false)}
                className="w-8 h-8 rounded-full hover:bg-[#F2ECE2] flex items-center justify-center text-[#665D60] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#665D60] leading-relaxed">
              Target coordinate locked to <strong>North Lot Vehicle Entrance Gate</strong> (23.0338° N, 72.5073° E), ensuring traffic route leads to the verified vehicle entrance without perimeter confusion.
            </p>

            <div className="p-3 bg-[#F8F5EF] rounded-xl text-xs flex flex-col gap-1 border border-[#DED5CC]">
              <div className="font-bold text-[#251F21]">Destination Address:</div>
              <div className="text-[#665D60]">North Lot Entry, Demo Heritage Ground, Bodakdev / Sarkhej Highway, Ahmedabad</div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href="https://maps.google.com/?q=23.0338,72.5073"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#293A63] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1E2B4B] transition-colors"
              >
                <span>Launch in Google Maps App</span>
                <Icon name="open_in_new" size={15} />
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText('23.0338, 72.5073');
                  setCopiedGps(true);
                  setTimeout(() => {
                    setCopiedGps(false);
                    setShowDirectionsDialog(false);
                  }, 1200);
                }}
                className="w-full py-2.5 rounded-xl bg-[#F2ECE2] text-[#251F21] text-xs font-semibold hover:bg-[#EAE1D3] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                type="button"
              >
                {copiedGps ? (
                  <>
                    <Icon name="check" size={14} className="text-emerald-700" />
                    <span className="text-emerald-800 font-bold">Coordinates Copied!</span>
                  </>
                ) : (
                  <span>Copy GPS Coordinates (23.0338, 72.5073)</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
