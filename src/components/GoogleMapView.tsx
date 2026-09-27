import React, { useEffect, useState, useRef } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from '@vis.gl/react-google-maps';
import { GarbaEvent, ParkingOption } from '../types/navratri';

declare const google: any;

interface GoogleMapViewProps {
  events: GarbaEvent[];
  selectedEvent: GarbaEvent;
  selectedParking: ParkingOption;
  onSelectEvent: (event: GarbaEvent) => void;
  zoomLevel: number;
}

const rawKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_API_KEY =
  (rawKey && typeof rawKey === 'string' && rawKey.trim() !== '' && !rawKey.includes('MY_GOOGLE'))
    ? rawKey.trim()
    : 'AIzaSyCrolr52xXFDobLb1Bi1ltx18VoxQJeNW4';

// Component that draws the driving and walking route polylines on the Google Map
function RoutePolylines({
  selectedParking,
}: {
  selectedParking: ParkingOption;
}) {
  const map = useMap();
  const polylinesRef = useRef<any[]>([]);

  useEffect(() => {
    const winGoogle = (window as any).google;
    if (!map || !winGoogle?.maps) return;

    // Clear previous polylines
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];

    // Coordinates for Leg 1: Origin to North Lot Parking
    const driveCoords = [
      { lat: 23.016, lng: 72.501 }, // Demo Origin (SG Hwy South)
      { lat: 23.021, lng: 72.503 },
      { lat: 23.025, lng: 72.5045 },
      { lat: 23.029, lng: 72.5055 },
      { lat: 23.032, lng: 72.5062 }, // North Lot Entrance
    ];

    // Coordinates for Leg 2: North Lot to Pedestrian Gate 2
    const walkCoords = [
      { lat: 23.032, lng: 72.5062 },
      { lat: 23.0328, lng: 72.5068 },
      { lat: 23.0335, lng: 72.5071 }, // Gate 2 Entrance
    ];

    // Leg 1: Solid Indigo Driving Route
    const drivePolyline = new winGoogle.maps.Polyline({
      path: driveCoords,
      geodesic: true,
      strokeColor: '#293A63',
      strokeOpacity: 1.0,
      strokeWeight: 5,
    });
    drivePolyline.setMap(map);
    polylinesRef.current.push(drivePolyline);

    // Leg 2: Dashed Walking Path using custom symbol
    const lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      strokeWeight: 4,
      scale: 3,
    };

    const walkPolyline = new winGoogle.maps.Polyline({
      path: walkCoords,
      strokeColor: '#293A63',
      strokeOpacity: 0,
      icons: [
        {
          icon: lineSymbol,
          offset: '0',
          repeat: '14px',
        },
      ],
    });
    walkPolyline.setMap(map);
    polylinesRef.current.push(walkPolyline);

    return () => {
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
    };
  }, [map, selectedParking]);

  return null;
}

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  events,
  selectedEvent,
  selectedParking,
  onSelectEvent,
  zoomLevel,
}) => {
  const [mapError, setMapError] = useState(false);

  if (mapError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#F7F3EB] p-6 text-center text-[#201A1C]">
        <span className="text-sm font-bold text-[#7A2337] mb-1">
          Google Maps SDK Notice
        </span>
        <p className="text-xs text-[#665D60] max-w-sm mb-3">
          Unable to load live Google Maps tile layers. Switching to Heritage Cartography mode.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY} onError={() => setMapError(true)}>
        <Map
          internalUsageAttributionIds={['gmp_git_agentskills_v1']}
          mapId="DEMO_MAP_ID"
          defaultCenter={{ lat: 23.0315, lng: 72.507 }}
          defaultZoom={14}
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="w-full h-full"
        >
          {/* Polylines for two-leg arrival route */}
          <RoutePolylines selectedParking={selectedParking} />

          {/* Origin Marker */}
          <AdvancedMarker
            position={{ lat: 23.016, lng: 72.501 }}
            title="Demo Starting Point"
          >
            <div className="flex flex-col items-center">
              <div className="px-2.5 py-1 rounded-md bg-[#201A1C] text-white text-[10px] font-bold shadow-md whitespace-nowrap mb-1">
                Demo Starting Point
              </div>
              <div className="w-4 h-4 rounded-full bg-[#293A63] border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>
          </AdvancedMarker>

          {/* Parking Marker */}
          <AdvancedMarker
            position={{ lat: 23.032, lng: 72.5062 }}
            title={selectedParking.name}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <div className="px-2 py-0.5 rounded-md bg-[#293A63] text-white text-[10px] font-bold shadow-md whitespace-nowrap mb-1">
                {selectedParking.name}
              </div>
              <div className="w-7 h-7 rounded-lg bg-[#293A63] text-white border-2 border-white shadow-md flex items-center justify-center font-bold text-xs">
                P
              </div>
            </div>
          </AdvancedMarker>

          {/* Gate 2 Marker */}
          <AdvancedMarker
            position={{ lat: 23.0335, lng: 72.5071 }}
            title="Pedestrian Gate 2 Entry"
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-white text-[#7A2337] border-2 border-[#7A2337] shadow-md flex items-center justify-center font-bold text-xs">
                2
              </div>
              <div className="px-2 py-0.5 rounded-md bg-[#7A2337] text-white text-[10px] font-bold shadow-md whitespace-nowrap mt-1">
                Gate 2 Entry
              </div>
            </div>
          </AdvancedMarker>

          {/* Event Venue Markers */}
          {events.map((ev) => {
            const isSelected = ev.id === selectedEvent.id;
            return (
              <AdvancedMarker
                key={ev.id}
                position={{ lat: ev.coordinates.lat, lng: ev.coordinates.lng }}
                onClick={() => onSelectEvent(ev)}
                title={ev.name}
              >
                <div
                  className={`flex flex-col items-center cursor-pointer transition-transform duration-200 ${
                    isSelected ? 'scale-110 z-50' : 'hover:scale-105'
                  }`}
                >
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-md border-2 border-white flex items-center gap-1 whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#293A63] text-white'
                        : 'bg-white text-[#201A1C]'
                    }`}
                  >
                    <span>{ev.admissionType === 'paid' ? `₹${ev.basePrice}` : 'Free'}</span>
                  </div>
                  <div className="text-[10px] font-bold text-[#201A1C] bg-white/90 px-1.5 py-0.5 rounded shadow-xs mt-0.5 whitespace-nowrap">
                    {ev.name}
                  </div>
                </div>
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>
    </div>
  );
};
