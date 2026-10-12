import { useState } from 'react';
import MapComponent from './MapComponent';
import placesData from '../data/places.json';
import stationsData from '../data/stations.json';
import tariffsData from '../data/tariffs.json';
import { calculateTaxiFare, calculateRideHailFare, calculateMetroFare } from '../lib/fare';
import { calculateDistance, findNearestStation } from '../lib/routing';
import type { Point } from '../lib/routing';
import { Car, Train, Navigation, Calculator } from 'lucide-react';

export default function TransitGuide() {
  const [selectedOrigin, setSelectedOrigin] = useState(placesData.find(p => p.isAirport) || placesData[0]);
  const [selectedDest, setSelectedDest] = useState(placesData.find(p => !p.isAirport) || placesData[1]);

  const originPoint: Point = { lat: selectedOrigin.lat, lng: selectedOrigin.lng, isAirport: selectedOrigin.isAirport };
  const destPoint: Point = { lat: selectedDest.lat, lng: selectedDest.lng, isAirport: selectedDest.isAirport };

  const taxiFare = calculateTaxiFare(originPoint, destPoint, tariffsData);
  const rideHailFare = calculateRideHailFare(originPoint, destPoint, tariffsData);
  const metroFare = calculateMetroFare(tariffsData);

  const nearestOriginStation = findNearestStation(originPoint, stationsData);
  const nearestDestStation = findNearestStation(destPoint, stationsData);

  const distToOriginStation = nearestOriginStation ? calculateDistance(originPoint, nearestOriginStation) : 999;
  const distToDestStation = nearestDestStation ? calculateDistance(destPoint, nearestDestStation) : 999;

  const isMetroViable = distToOriginStation < 2 && distToDestStation < 2;
  const savings = Math.max(0, taxiFare - metroFare);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="transit-guide">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Transit Guide & Quote Checker</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Calculate real-time fares and see if public transit makes sense for your layover route.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">Origin</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
              value={selectedOrigin.id}
              onChange={(e) => setSelectedOrigin(placesData.find(p => p.id === e.target.value)!)}
            >
              {placesData.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Destination</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
              value={selectedDest.id}
              onChange={(e) => setSelectedDest(placesData.find(p => p.id === e.target.value)!)}
            >
              {placesData.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>
        
        <MapComponent 
          origin={originPoint} 
          destination={destPoint} 
          stations={stationsData.map(s => ({ lat: s.lat, lng: s.lng }))} 
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Standard Taxi</h3>
              <p className="text-slate-400 text-sm">Direct route</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-white mb-2">{taxiFare.toFixed(2)} AED</div>
          <p className="text-sm text-slate-500">Minimum fare applied if short distance</p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Ride Hail (Uber/Careem)</h3>
              <p className="text-slate-400 text-sm">Premium & Direct</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-white mb-2">{rideHailFare.toFixed(2)} AED</div>
          <p className="text-sm text-slate-500">Dynamic pricing multiplier applied</p>
        </div>

        <div className={`p-6 rounded-3xl border relative overflow-hidden group ${isMetroViable ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-slate-800/50 border-slate-700 opacity-60'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isMetroViable ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-700 text-slate-500'}`}>
              <Train className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Metro</h3>
              <p className="text-sm text-slate-400">{isMetroViable ? 'Highly recommended' : 'Too far from stations'}</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-white mb-2">{metroFare.toFixed(2)} AED</div>
          {isMetroViable && (
            <div className="mt-4 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
              <Calculator className="w-4 h-4" />
              Save {savings.toFixed(2)} AED vs Taxi
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
