import { useState } from 'react';
import { Navigation, Train, Clock } from 'lucide-react';
import MapComponent from './MapComponent';
import stationsData from '../data/stations.json';

export default function RouteIntelligence() {
  const [selectedRouteId, setSelectedRouteId] = useState('r1');

  const routes = [
    {
      id: 'r1',
      title: 'DXB T3 ➔ Downtown Burj Khalifa Express',
      origin: 'DXB Terminal 3',
      destination: 'Burj Khalifa / Dubai Mall',
      duration: '24 mins',
      transferType: 'Metro Red Line Direct',
      cost: '7.50 AED',
      status: 'VERIFIED OPTIMAL',
      statusColor: 'text-[#24D69A] bg-[#24D69A]/10 border-[#24D69A]/30',
      originCoords: { lat: 25.2532, lng: 55.3657, isAirport: true },
      destCoords: { lat: 25.1972, lng: 55.2744, isAirport: false },
    },
    {
      id: 'r2',
      title: 'DXB T3 ➔ Museum of the Future Corridor',
      origin: 'DXB Terminal 3',
      destination: 'Museum of the Future',
      duration: '18 mins',
      transferType: 'Metro Red Line Direct',
      cost: '7.50 AED',
      status: 'VERIFIED OPTIMAL',
      statusColor: 'text-[#24D69A] bg-[#24D69A]/10 border-[#24D69A]/30',
      originCoords: { lat: 25.2532, lng: 55.3657, isAirport: true },
      destCoords: { lat: 25.2192, lng: 55.2819, isAirport: false },
    },
    {
      id: 'r3',
      title: 'DXB T1 ➔ Dubai Frame & Zabeel Park',
      origin: 'DXB Terminal 1',
      destination: 'Dubai Frame',
      duration: '15 mins',
      transferType: 'Official DTC Taxi',
      cost: '38.00 AED',
      status: 'E11 PEAK TRAFFIC WARN',
      statusColor: 'text-[#FFB21A] bg-[#FFB21A]/10 border-[#FFB21A]/30',
      originCoords: { lat: 25.2532, lng: 55.3657, isAirport: true },
      destCoords: { lat: 25.2355, lng: 55.3003, isAirport: false },
    },
    {
      id: 'r4',
      title: 'DXB T3 ➔ Old Dubai Gold & Spice Souks',
      origin: 'DXB Terminal 3',
      destination: 'Gold Souk & Deira Creek',
      duration: '22 mins',
      transferType: 'Metro Green Line Transfer',
      cost: '7.50 AED',
      status: 'VERIFIED OPTIMAL',
      statusColor: 'text-[#24D69A] bg-[#24D69A]/10 border-[#24D69A]/30',
      originCoords: { lat: 25.2532, lng: 55.3657, isAirport: true },
      destCoords: { lat: 25.2695, lng: 55.2974, isAirport: false },
    },
  ];

  const currentRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  return (
    <section className="py-20 bg-[#080D1B] border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141D30] border border-[#12C8E8]/30 mb-3">
            <Navigation className="w-3.5 h-3.5 text-[#12C8E8]" />
            <span className="text-xs font-mono text-[#12C8E8] uppercase font-bold tracking-wider">
              REAL-TIME FARE & ROUTE DASHBOARD
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white">
            Transit Route Intelligence
          </h2>
          <p className="text-[#A6B1C8] text-sm mt-1 max-w-2xl">
            Live telemetry comparing transfer times, fares, and traffic risk scores between DXB concourses and major city hubs.
          </p>
        </div>

        {/* Dashboard Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Route Selector List */}
          <div className="lg:col-span-5 space-y-4">
            {routes.map((route) => {
              const isSelected = route.id === selectedRouteId;
              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-xl ${
                    isSelected
                      ? 'bg-[#141D30] border-[#FFB21A] ring-1 ring-[#FFB21A]/50'
                      : 'bg-[#141D30]/60 border-[#1E293B] hover:border-slate-600 hover:bg-[#141D30]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${route.statusColor}`}>
                      {route.status}
                    </span>
                    <span className="text-xs font-mono text-[#FFB21A] font-bold">{route.cost}</span>
                  </div>

                  <h4 className="text-base font-bold font-display text-white mb-2">{route.title}</h4>

                  <div className="flex items-center justify-between text-xs font-mono text-[#A6B1C8] pt-3 border-t border-[#1E293B]">
                    <span className="flex items-center gap-1.5">
                      <Train className="w-3.5 h-3.5 text-[#12C8E8]" />
                      {route.transferType}
                    </span>
                    <span className="flex items-center gap-1 text-white">
                      <Clock className="w-3.5 h-3.5 text-[#FFB21A]" />
                      {route.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Map & Live Details Panel */}
          <div className="lg:col-span-7 bg-[#141D30] p-6 rounded-2xl border border-[#1E293B] flex flex-col justify-between shadow-2xl">
            
            {/* Map Container */}
            <div className="h-[360px] rounded-xl overflow-hidden border border-[#1E293B] mb-6 shadow-inner relative">
              <MapComponent
                origin={currentRoute.originCoords}
                destination={currentRoute.destCoords}
                stations={stationsData.map((s) => ({ lat: s.lat, lng: s.lng }))}
              />
            </div>

            {/* Selected Route Telemetry Summary */}
            <div className="bg-[#080D1B] p-4 rounded-xl border border-[#1E293B] font-mono text-xs text-[#A6B1C8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#12C8E8] uppercase block mb-1">Selected Trajectory</span>
                <span className="text-white font-bold text-sm font-display block">{currentRoute.title}</span>
                <span className="text-[#A6B1C8] text-[11px]">{currentRoute.transferType} • Est. Fare {currentRoute.cost}</span>
              </div>

              <button
                onClick={() => alert(`Selected Route: ${currentRoute.title}`)}
                className="bg-[#FFB21A] hover:bg-amber-400 text-[#080D1B] px-4 py-2 rounded-xl font-bold font-display text-xs transition-all shadow-md shadow-[#FFB21A]/20 shrink-0"
              >
                Select This Route
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
