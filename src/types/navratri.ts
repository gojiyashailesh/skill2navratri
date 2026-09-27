export type GarbaStyle = 
  | 'Traditional Sheri & Mandli'
  | 'Raas & Dandiya Beats'
  | 'Heritage & Temple Garba'
  | 'Modern Youth Arena';

export type TransportMode = 'car' | 'two-wheeler' | 'transit' | 'walk';

export interface ParkingOption {
  id: string;
  name: string;
  type: 'Organizer Official' | 'Overflow Lot' | 'Drop-off Lane' | 'Street Parking';
  fee: string;
  hours: string;
  walkingDistance: string;
  walkingTime: string;
  capacity?: number;
  hasSensors: boolean;
  notes: string;
}

export interface GarbaEvent {
  id: string;
  fixtureId: string;
  name: string;
  nameGu: string;
  tagline: string;
  admissionType: 'paid' | 'free_walkin' | 'free_rsvp' | 'sold_out';
  priceDisplay: string;
  basePrice: number;
  artist: string;
  artistGenre: string;
  artistImage: string;
  date: string;
  timeRange: string;
  overnight: boolean;
  venueName: string;
  area: string;
  distanceKm: number;
  distanceDisplay: string;
  image: string;
  imageAlt: string;
  tags: string[];
  bannerBadge?: string;
  parkingBadge: string;
  parkingType: 'free' | 'paid' | 'unconfirmed';
  assignedGate: string;
  assignedGateNotes: string;
  parkingOptions: ParkingOption[];
  styles: GarbaStyle[];
  description: string;
  coordinates: {
    lat: number;
    lng: number;
    svgX: number;
    svgY: number;
  };
  facilities: {
    name: string;
    icon: string;
    status: 'available' | 'not_available' | 'unconfirmed';
  }[];
  rules: string[];
}

export interface ArtistScheduleNight {
  night: string;
  date: string;
  venueName: string;
  venueArea: string;
  ticketStatus: 'available' | 'sold_out' | 'free';
  eventId?: string;
}

export interface Artist {
  id: string;
  name: string;
  nameGu?: string;
  genre: string;
  image: string;
  altText: string;
  performingTonightAt: string;
  venueId: string;
  timeSlot: string;
  bio: string;
  verified: boolean;
  checkins: string;
  positiveRating: string;
  rank?: number;
  hometown?: string;
  instagram?: string;
  spotify?: string;
  youtube?: string;
  scheduleNights?: ArtistScheduleNight[];
}

export interface StaffScanRecord {
  id: string;
  scannedAt: string;
  bookingRef: string;
  holderName: string;
  guestCount: number;
  gate: string;
  status: 'VALID' | 'ALREADY_USED' | 'INVALID_CODE' | 'WRONG_GATE' | 'WRONG_DATE';
  reason?: string;
}

export interface TicketBooking {
  id: string;
  bookingRef: string;
  eventId: string;
  eventName: string;
  fixtureId: string;
  date: string;
  timeRange: string;
  venueName: string;
  gate: string;
  parkingSummary: string;
  guestCount: number;
  passType: string;
  totalAmount: number;
  bookedAt: string;
  holderName: string;
  holderPhone: string;
  holderEmail: string;
  qrValue: string;
  status: 'confirmed' | 'used' | 'cancelled';
}

export interface FilterState {
  date: string; // 'tonight' or '2026-10-16', etc.
  admission: 'all' | 'free' | 'paid';
  mandliOnly: boolean;
  traditionalOnly: boolean;
  artistsOnly: boolean;
  styles: GarbaStyle[];
  parkingRequired: boolean;
  freeParkingOnly: boolean;
  maxDistanceKm: number;
  searchQuery: string;
}
