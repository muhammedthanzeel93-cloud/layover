export type DXBTerminal = 'T1' | 'T2' | 'T3' | 'DOH' | 'CCJ' | 'TRV' | string;

export interface FlightContext {
  inboundFlight: string;
  outboundFlight: string;
  terminal: DXBTerminal;
  originAirport?: string;
  destinationAirport?: string;
  transitHubName?: string;
  travelDate?: string;
  arrivalTime: string; // HH:mm format
  departureTime: string; // HH:mm format
  layoverDurationMinutes: number;
  mandatoryBufferMinutes: number; // Default 150 (2h 30m)
  safeExplorationWindowMinutes: number; // Layover - Buffer
}

export interface Attraction {
  id: string;
  name: string;
  category: string;
  coords: [number, number];
  durationHours: number;
  costAed: number;
  metroAccessible: boolean;
  nearestStation: string;
  image: string;
  dxbProximityMins: number;
  description: string;
  recommendedWindow: string;
}

export interface ExperienceProps {
  id: string;
  name: string;
  city: string;
  airportCode: string;
  description: string;
  duration: string;
  proximity: string;
  priceAed: number;
  rating: number;
  reviewsCount: number;
  image: string;
  metroStation: string;
}

export interface ItineraryStop {
  id: string;
  attractionId?: string;
  name: string;
  nodeType: 'airport_origin' | 'attraction' | 'airport_destination';
  scheduledArrival: string;
  scheduledDeparture: string;
  legToNext?: {
    mode: 'metro' | 'taxi' | 'walk' | 'careem' | 'private';
    durationMins: number;
    costAed: number;
  };
}

export interface TransitOption {
  mode: 'metro' | 'taxi' | 'careem';
  name: string;
  fareAed: number;
  approxUsd: number;
  durationMins: number;
  frequency: string;
  notes: string;
  tag: string;
}
