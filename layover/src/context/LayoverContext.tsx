import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FlightContext, ItineraryStop } from '../types';

export interface SelectedTransport {
  id: string;
  name: string;
  mode: 'metro' | 'taxi' | 'careem' | 'private';
  fareAed: number;
  durationMins: number;
}

interface LayoverContextType {
  flight: FlightContext;
  updateFlight: (partial: Partial<FlightContext>) => void;
  setQuickPreset: (hours: number) => void;
  stops: ItineraryStop[];
  setStops: React.Dispatch<React.SetStateAction<ItineraryStop[]>>;
  currency: 'AED' | 'USD' | 'EUR';
  setCurrency: (c: 'AED' | 'USD' | 'EUR') => void;
  formatCurrency: (amountAed: number) => string;
  selectedTransport: SelectedTransport;
  confirmTransportPlan: (transport: SelectedTransport) => void;
}

const defaultFlight: FlightContext = {
  inboundFlight: 'EK 202',
  outboundFlight: 'EK 508',
  terminal: 'T3',
  originAirport: 'LHR (London Heathrow)',
  destinationAirport: 'SIN (Singapore Changi)',
  transitHubName: 'Dubai International (DXB Terminal 3)',
  travelDate: '2026-10-15',
  arrivalTime: '08:00',
  departureTime: '16:00', // 8h layover
  layoverDurationMinutes: 480, // 8 hours
  mandatoryBufferMinutes: 150, // 2h 30m security & gate buffer
  safeExplorationWindowMinutes: 330, // 5h 30m
};

const defaultStops: ItineraryStop[] = [
  {
    id: 'stop-origin',
    name: 'DXB Terminal 3 Arrival Concourse',
    nodeType: 'airport_origin',
    scheduledArrival: '08:00',
    scheduledDeparture: '08:30',
    legToNext: { mode: 'taxi', durationMins: 25, costAed: 48.75 },
  },
  {
    id: 'stop-1',
    attractionId: 'p1',
    name: 'Burj Khalifa & At The Top',
    nodeType: 'attraction',
    scheduledArrival: '09:00',
    scheduledDeparture: '11:00',
    legToNext: { mode: 'metro', durationMins: 15, costAed: 5.00 },
  },
  {
    id: 'stop-2',
    attractionId: 'p2',
    name: 'Dubai Mall & Fountain Boardwalk',
    nodeType: 'attraction',
    scheduledArrival: '11:15',
    scheduledDeparture: '13:00',
    legToNext: { mode: 'taxi', durationMins: 25, costAed: 48.75 },
  },
  {
    id: 'stop-dest',
    name: 'DXB Terminal 3 Departure Gates',
    nodeType: 'airport_destination',
    scheduledArrival: '13:30',
    scheduledDeparture: '16:00',
  },
];

const defaultTransport: SelectedTransport = {
  id: 'taxi',
  name: 'Official Airport Taxi (DTC)',
  mode: 'taxi',
  fareAed: 48.75,
  durationMins: 25,
};

const LayoverContext = createContext<LayoverContextType | undefined>(undefined);

export const LayoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flight, setFlight] = useState<FlightContext>(() => {
    const saved = localStorage.getItem('layover_flight_ctx');
    return saved ? JSON.parse(saved) : defaultFlight;
  });

  const [stops, setStops] = useState<ItineraryStop[]>(() => {
    const saved = localStorage.getItem('layover_stops_ctx');
    return saved ? JSON.parse(saved) : defaultStops;
  });

  const [currency, setCurrency] = useState<'AED' | 'USD' | 'EUR'>('AED');

  const [selectedTransport, setSelectedTransport] = useState<SelectedTransport>(() => {
    const saved = localStorage.getItem('layover_transport_ctx');
    return saved ? JSON.parse(saved) : defaultTransport;
  });

  useEffect(() => {
    localStorage.setItem('layover_flight_ctx', JSON.stringify(flight));
  }, [flight]);

  useEffect(() => {
    localStorage.setItem('layover_stops_ctx', JSON.stringify(stops));
  }, [stops]);

  useEffect(() => {
    localStorage.setItem('layover_transport_ctx', JSON.stringify(selectedTransport));
  }, [selectedTransport]);

  const updateFlight = (partial: Partial<FlightContext>) => {
    setFlight((prev) => {
      const updated = { ...prev, ...partial };
      if (partial.arrivalTime || partial.departureTime) {
        const [arrH, arrM] = updated.arrivalTime.split(':').map(Number);
        const [depH, depM] = updated.departureTime.split(':').map(Number);
        let durationMins = (depH * 60 + depM) - (arrH * 60 + arrM);
        if (durationMins <= 0) durationMins += 24 * 60;
        updated.layoverDurationMinutes = durationMins;
        updated.safeExplorationWindowMinutes = Math.max(0, durationMins - updated.mandatoryBufferMinutes);
      }
      return updated;
    });
  };

  const setQuickPreset = (hours: number) => {
    const arrH = 8;
    const depH = (arrH + hours) % 24;
    const arrStr = `${arrH.toString().padStart(2, '0')}:00`;
    const depStr = `${depH.toString().padStart(2, '0')}:00`;
    const layoverMins = hours * 60;
    const safeWindow = Math.max(0, layoverMins - 150);

    setFlight((prev) => ({
      ...prev,
      arrivalTime: arrStr,
      departureTime: depStr,
      layoverDurationMinutes: layoverMins,
      safeExplorationWindowMinutes: safeWindow,
    }));
  };

  const confirmTransportPlan = (transport: SelectedTransport) => {
    setSelectedTransport(transport);
    setStops((prevStops) => {
      return prevStops.map((stop, index) => {
        if (index === 0) {
          return {
            ...stop,
            legToNext: {
              mode: transport.mode,
              durationMins: transport.durationMins,
              costAed: transport.fareAed,
            },
          };
        }
        return stop;
      });
    });
  };

  const formatCurrency = (amountAed: number): string => {
    if (currency === 'USD') return `$${(amountAed * 0.27).toFixed(2)}`;
    if (currency === 'EUR') return `€${(amountAed * 0.25).toFixed(2)}`;
    return `${amountAed.toFixed(2)} AED`;
  };

  return (
    <LayoverContext.Provider
      value={{
        flight,
        updateFlight,
        setQuickPreset,
        stops,
        setStops,
        currency,
        setCurrency,
        formatCurrency,
        selectedTransport,
        confirmTransportPlan,
      }}
    >
      {children}
    </LayoverContext.Provider>
  );
};

export const useLayover = () => {
  const ctx = useContext(LayoverContext);
  if (!ctx) throw new Error('useLayover must be used within a LayoverProvider');
  return ctx;
};
