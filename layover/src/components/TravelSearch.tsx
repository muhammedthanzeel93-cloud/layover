import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Plane, Search, ShieldCheck } from 'lucide-react';
import { useLayover } from '../context/LayoverContext';
import type { DXBTerminal } from '../types';

export default function TravelSearch() {
  const navigate = useNavigate();
  const { flight, updateFlight, setQuickPreset } = useLayover();

  const POPULAR_LOCATIONS = [
    { code: 'CCJ', name: 'Calicut (CCJ - Kozhikode International)', city: 'Calicut', label: '🌴 Calicut (CCJ)' },
    { code: 'TRV', name: 'Trivandrum (TRV - Thiruvananthapuram)', city: 'Trivandrum', label: '🏖️ Trivandrum (TRV)' },
    { code: 'DOH', name: 'Qatar (DOH - Hamad International, Doha)', city: 'Qatar', label: '🇶🇦 Qatar (DOH)' },
    { code: 'DXB', name: 'Dubai (DXB - Dubai International)', city: 'Dubai', label: '🇦🇪 Dubai (DXB)' },
    { code: 'LHR', name: 'London (LHR - London Heathrow)', city: 'London', label: '🇬🇧 London (LHR)' },
    { code: 'SIN', name: 'Singapore (SIN - Singapore Changi)', city: 'Singapore', label: '🇸🇬 Singapore (SIN)' },
    { code: 'COK', name: 'Kochi (COK - Cochin International)', city: 'Kochi', label: '✈️ Kochi (COK)' },
    { code: 'BOM', name: 'Mumbai (BOM - Chhatrapati Shivaji Maharaj)', city: 'Mumbai', label: '🇮🇳 Mumbai (BOM)' },
    { code: 'JFK', name: 'New York (JFK - John F. Kennedy)', city: 'New York', label: '🇺🇸 New York (JFK)' },
  ];

  const TRANSIT_HUBS = [
    { value: 'T3', label: 'Dubai (DXB) - Terminal 3 (Emirates / Qantas)' },
    { value: 'T1', label: 'Dubai (DXB) - Terminal 1 (Major Carriers)' },
    { value: 'T2', label: 'Dubai (DXB) - Terminal 2 (Flydubai / Regional)' },
    { value: 'DOH', label: 'Qatar (DOH) - Hamad International Transit Hub' },
    { value: 'CCJ', label: 'Calicut (CCJ) - Calicut International Airport Hub' },
    { value: 'TRV', label: 'Trivandrum (TRV) - Thiruvananthapuram Hub' },
  ];

  const [depAirport, setDepAirport] = useState(flight.originAirport || 'Calicut (CCJ - Kozhikode International)');
  const [destAirport, setDestAirport] = useState(flight.destinationAirport || 'Dubai (DXB - Dubai International)');
  const [travelDate, setTravelDate] = useState(flight.travelDate || '2026-10-15');

  const handleTerminalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFlight({ terminal: e.target.value as DXBTerminal });
  };

  const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFlight({ arrivalTime: e.target.value });
  };

  const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFlight({ departureTime: e.target.value });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFlight({
      originAirport: depAirport,
      destinationAirport: destAirport,
      travelDate: travelDate,
    });
    navigate('/itinerary');
  };

  const totalHours = (flight.layoverDurationMinutes / 60).toFixed(1);
  const safeHours = (flight.safeExplorationWindowMinutes / 60).toFixed(1);

  const presets = [
    { label: '4h Rush', hours: 4 },
    { label: '6h Express', hours: 6 },
    { label: '8h Discovery', hours: 8 },
    { label: '12h+ Overnight', hours: 12 },
  ];

  return (
    <div className="bg-[#141D30] rounded-3xl border border-[#1E293B] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Shared Datalist for Fast Airport Autocomplete */}
      <datalist id="all-airport-locations">
        {POPULAR_LOCATIONS.map((loc) => (
          <option key={loc.code} value={loc.name} />
        ))}
      </datalist>

      {/* Badge Ribbon */}
      <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#FFB21A]/10 border-b border-l border-[#FFB21A]/40 text-[10px] font-mono text-[#FFB21A] font-bold uppercase rounded-bl-2xl flex items-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-[#24D69A]" />
        <span>Flight Time & Safe Buffer Calculator</span>
      </div>

      <form onSubmit={handleSearchSubmit}>
        {/* Row 1: Airports & Terminal Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Departure Airport / Origin Flight */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#A6B1C8] mb-1.5 flex items-center justify-between">
              <span>Origin Flight</span>
              <span className="text-[10px] text-[#12C8E8] font-normal">Pick or Type</span>
            </label>
            <div className="relative mb-2">
              <MapPin className="w-4 h-4 text-[#12C8E8] absolute left-3 top-3.5" />
              <input
                type="text"
                list="all-airport-locations"
                value={depAirport}
                onChange={(e) => setDepAirport(e.target.value)}
                placeholder="e.g. Calicut (CCJ), Qatar (DOH)..."
                className="w-full bg-[#080D1B] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB21A] transition-colors"
              />
            </div>
            {/* Quick Pick Chips */}
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_LOCATIONS.slice(0, 4).map((loc) => (
                <button
                  type="button"
                  key={loc.code}
                  onClick={() => setDepAirport(loc.name)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono border transition-all ${
                    depAirport.includes(loc.code)
                      ? 'bg-[#12C8E8]/20 border-[#12C8E8] text-[#12C8E8] font-bold'
                      : 'bg-[#080D1B]/70 border-[#1E293B] text-slate-400 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          {/* DXB Transit Terminal / Hub */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#A6B1C8] mb-1.5">
              Transit Hub Airport
            </label>
            <div className="relative">
              <Plane className="w-4 h-4 text-[#FFB21A] absolute left-3 top-3.5" />
              <select
                value={flight.terminal}
                onChange={handleTerminalChange}
                className="w-full bg-[#080D1B] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-[#FFB21A]"
              >
                {TRANSIT_HUBS.map((hub) => (
                  <option key={hub.value} value={hub.value}>
                    {hub.label}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-2 text-[10px] text-amber-400/80 font-mono">
              Hub active: {TRANSIT_HUBS.find((h) => h.value === flight.terminal)?.label.split(' - ')[0] || 'Dubai DXB'}
            </p>
          </div>

          {/* Final Destination */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#A6B1C8] mb-1.5 flex items-center justify-between">
              <span>Final Destination</span>
              <span className="text-[10px] text-[#24D69A] font-normal">Pick or Type</span>
            </label>
            <div className="relative mb-2">
              <MapPin className="w-4 h-4 text-[#24D69A] absolute left-3 top-3.5" />
              <input
                type="text"
                list="all-airport-locations"
                value={destAirport}
                onChange={(e) => setDestAirport(e.target.value)}
                placeholder="e.g. Dubai (DXB), London (LHR)..."
                className="w-full bg-[#080D1B] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB21A] transition-colors"
              />
            </div>
            {/* Quick Pick Chips */}
            <div className="flex flex-wrap gap-1.5">
              {[POPULAR_LOCATIONS[3], POPULAR_LOCATIONS[2], POPULAR_LOCATIONS[0], POPULAR_LOCATIONS[1]].map((loc) => (
                <button
                  type="button"
                  key={loc.code}
                  onClick={() => setDestAirport(loc.name)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono border transition-all ${
                    destAirport.includes(loc.code)
                      ? 'bg-[#24D69A]/20 border-[#24D69A] text-[#24D69A] font-bold'
                      : 'bg-[#080D1B]/70 border-[#1E293B] text-slate-400 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Date */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#A6B1C8] mb-1.5">
              Travel Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-[#FFB21A] absolute left-3 top-3.5" />
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-[#080D1B] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#FFB21A]"
              />
            </div>
            <p className="mt-2 text-[10px] text-slate-400 font-mono">
              Live layover synchronization
            </p>
          </div>
        </div>

        {/* Row 2: Inbound Landing & Outbound Boarding Times */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-mono uppercase text-[#A6B1C8] mb-1.5">
              Inbound Landing Time (DXB)
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-[#12C8E8] absolute left-3 top-3.5" />
              <input
                type="time"
                value={flight.arrivalTime}
                onChange={handleArrivalChange}
                className="w-full bg-[#080D1B] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#FFB21A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#A6B1C8] mb-1.5">
              Outbound Boarding Time (DXB)
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-[#FFB21A] absolute left-3 top-3.5" />
              <input
                type="time"
                value={flight.departureTime}
                onChange={handleDepartureChange}
                className="w-full bg-[#080D1B] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#FFB21A]"
              />
            </div>
          </div>
        </div>

        {/* Presets Row */}
        <div className="mb-6">
          <span className="block text-xs font-mono text-[#A6B1C8] uppercase mb-2">Layover Presets:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((p) => (
              <button
                type="button"
                key={p.hours}
                onClick={() => setQuickPreset(p.hours)}
                className={`px-3 py-2 rounded-xl text-xs font-mono transition-all border ${
                  flight.layoverDurationMinutes === p.hours * 60
                    ? 'bg-[#FFB21A]/20 border-[#FFB21A] text-white font-bold'
                    : 'bg-[#080D1B] border-[#1E293B] text-[#A6B1C8] hover:text-white'
                }`}
              >
                {p.label} ({p.hours}h)
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry Gauge Display */}
        <div className="bg-[#080D1B] p-4 rounded-2xl border border-[#1E293B] mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 font-mono text-xs">
            <div>
              <span className="text-[#A6B1C8] uppercase block">Total Layover Window:</span>
              <span className="text-white font-bold text-base font-display">{totalHours} Hours ({flight.layoverDurationMinutes}m)</span>
            </div>

            <div className="flex gap-4">
              <div className="text-right">
                <span className="text-[#24D69A] uppercase block">DXB Buffer (Mandatory):</span>
                <span className="text-[#24D69A] font-bold">2h 30m (150m)</span>
              </div>
              <div className="text-right pl-4 border-l border-[#1E293B]">
                <span className="text-[#FFB21A] uppercase block">Safe Window:</span>
                <span className="text-[#FFB21A] font-bold text-base font-display">{safeHours} Hours</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-[#141D30] rounded-full overflow-hidden flex border border-[#1E293B]">
            <div
              className="h-full bg-gradient-to-r from-[#FFB21A] to-amber-300 transition-all duration-500"
              style={{ width: `${Math.min(100, (flight.safeExplorationWindowMinutes / flight.layoverDurationMinutes) * 100)}%` }}
            ></div>
            <div
              className="h-full bg-[#24D69A] transition-all duration-500"
              style={{ width: `${(150 / flight.layoverDurationMinutes) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Action CTA */}
        <button
          type="submit"
          className="w-full bg-[#FFB21A] hover:bg-amber-400 text-[#080D1B] py-4 rounded-xl font-bold font-display text-base transition-all shadow-xl shadow-[#FFB21A]/20 flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          <span>Explore Routes for {safeHours}h Safe Window</span>
        </button>
      </form>
    </div>
  );
}
