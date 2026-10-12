import { useState } from 'react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy, 
  useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical, 
  X, 
  Plus, 
  Wallet, 
  Clock, 
  ShieldCheck, 
  QrCode, 
  Share2, 
  AlertCircle, 
  Train, 
  Car, 
  Footprints,
  Navigation,
  CheckCircle2,
  Users,
  Calendar,
  MapPin,
  ChevronRight,
  Edit3
} from 'lucide-react';
import { useLayover } from '../context/LayoverContext';
import placesData from '../data/places.json';
import type { ItineraryStop } from '../types';
import FlightInformation from '../components/FlightInformation';
import TravelDetailsAccordion from '../components/TravelDetailsAccordion';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function SortableStop({ 
  stop, 
  index, 
  onRemove, 
  isFirst, 
  isLast 
}: { 
  stop: ItineraryStop; 
  index: number; 
  onRemove: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: stop.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative mb-6">
      <div className="bg-[#142035] p-4 md:p-5 rounded-2xl border border-[#293950] hover:border-[#FFAD18]/60 transition-all flex items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          {!isFirst && !isLast ? (
            <div {...attributes} {...listeners} className="cursor-grab text-[#9EACC3] hover:text-white p-1">
              <GripVertical className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-7"></div>
          )}

          <div className={`w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
            isFirst || isLast ? 'bg-[#FFAD18] text-[#080E1D]' : 'bg-[#1A2940] text-[#9EACC3]'
          }`}>
            {index + 1}
          </div>

          <div>
            <h4 className="font-bold text-[#F5F7FC] font-display text-base">{stop.name}</h4>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9EACC3]">
              <span>Arr: {stop.scheduledArrival}</span>
              <span>•</span>
              <span>Dep: {stop.scheduledDeparture}</span>
            </div>
          </div>
        </div>

        {!isFirst && !isLast && (
          <button
            onClick={() => onRemove(stop.id)}
            className="text-[#9EACC3] hover:text-red-400 p-2 transition-colors"
            title="Remove Stop"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Transit Leg Segment Connector */}
      {stop.legToNext && (
        <div className="ml-10 py-2 border-l-2 border-dashed border-[#293950] pl-6 flex items-center gap-3 font-mono text-xs text-[#9EACC3]">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080E1D] border border-[#293950] text-white">
            {stop.legToNext.mode === 'metro' && <Train className="w-3.5 h-3.5 text-[#26D6A0]" />}
            {stop.legToNext.mode === 'taxi' && <Car className="w-3.5 h-3.5 text-[#FFAD18]" />}
            {stop.legToNext.mode === 'careem' && <Navigation className="w-3.5 h-3.5 text-[#28C8E8]" />}
            {stop.legToNext.mode === 'private' && <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />}
            {stop.legToNext.mode === 'walk' && <Footprints className="w-3.5 h-3.5 text-[#28C8E8]" />}
            <span className="capitalize font-bold">
              {stop.legToNext.mode === 'taxi' ? 'Official Airport Taxi (DTC)' : stop.legToNext.mode}
            </span>
            <span>({stop.legToNext.durationMins}m)</span>
          </div>
          <span className="text-[#FFAD18] font-bold">{stop.legToNext.costAed.toFixed(2)} AED</span>
        </div>
      )}
    </div>
  );
}

export default function ItineraryPage() {
  const { flight, stops, setStops, currency, setCurrency, formatCurrency, selectedTransport } = useLayover();
  const [selectedPlaceId, setSelectedPlaceId] = useState('p1');
  const [passModalOpen, setPassModalOpen] = useState(false);
  const [travelersCount, setTravelersCount] = useState(1);
  const [travelDate, setTravelDate] = useState('2026-10-15');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setStops((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addStop = () => {
    const place = placesData.find((p) => p.id === selectedPlaceId);
    if (!place) return;

    const newStop: ItineraryStop = {
      id: `stop-${Date.now()}`,
      attractionId: place.id,
      name: place.name,
      nodeType: 'attraction',
      scheduledArrival: '12:00',
      scheduledDeparture: '13:30',
      legToNext: { mode: 'metro', durationMins: 20, costAed: 7.50 },
    };

    const updated = [...stops];
    updated.splice(updated.length - 1, 0, newStop);
    setStops(updated);
  };

  const removeStop = (id: string) => {
    setStops((prev) => prev.filter((s) => s.id !== id));
  };

  // Tallies & Calculation
  let totalTransitMins = 0;
  let totalTransitCostAed = 0;
  stops.forEach((s) => {
    if (s.legToNext) {
      totalTransitMins += s.legToNext.durationMins;
      totalTransitCostAed += s.legToNext.costAed;
    }
  });

  const sightseeingMins = 180;
  const totalPlannedMins = totalTransitMins + sightseeingMins;
  const safeMins = flight.safeExplorationWindowMinutes;
  const isOverBudget = totalPlannedMins > safeMins;

  // Base costs multiplied by traveler count for entry tickets
  const baseTransitAed = totalTransitCostAed;
  const baseTicketsAed = 140 * travelersCount;
  const baseLuggageAed = 45;
  const totalLayoverCostAed = baseTransitAed + baseTicketsAed + baseLuggageAed;

  return (
    <div className="min-h-screen bg-[#080E1D] text-slate-100 pt-20 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="pt-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9EACC3] mb-2">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/explore" className="hover:text-white">Explore</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#FFAD18] font-bold">Trip Details</span>
          </div>

          <div className="text-xs font-mono text-[#FFAD18] uppercase tracking-wider mb-1 font-bold">
            DXB STOP OVER WORKSPACE
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white">
            Smart Itinerary Builder & Time Ledger
          </h1>
          <p className="text-[#9EACC3] text-sm mt-1">
            Drag to reorder stops. System automatically verifies your route against DXB departure buffers.
          </p>
        </div>

        {/* Selected Transport Active Confirmation Pill */}
        <div className="bg-[#142035] border border-[#FFAD18]/40 p-3.5 rounded-2xl mb-6 flex items-center justify-between gap-3 font-mono text-xs shadow-lg">
          <div className="flex items-center gap-2 text-[#FFAD18] font-bold">
            <Car className="w-4 h-4" />
            <span>Active Confirmed Transport: <span className="text-white">{selectedTransport.name}</span></span>
          </div>
          <span className="text-[#26D6A0] font-bold font-mono text-xs">{selectedTransport.fareAed.toFixed(2)} AED ({selectedTransport.durationMins}m)</span>
        </div>

        {/* Travel Search and Trip Information Bar */}
        <div className="bg-[#142035] p-4 rounded-2xl border border-[#293950] mb-8 shadow-xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#28C8E8]" />
              <span className="text-[#9EACC3]">Route:</span>
              <span className="text-white font-bold">DXB ({flight.terminal}) ➔ Downtown ➔ DXB</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FFAD18]" />
              <span className="text-[#9EACC3]">Date:</span>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="bg-[#080E1D] border border-[#293950] rounded-lg px-2 py-1 text-white font-mono focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFAD18]" />
              <span className="text-[#9EACC3]">Layover:</span>
              <span className="text-white font-bold">{(flight.layoverDurationMinutes / 60).toFixed(1)}h ({flight.arrivalTime} - {flight.departureTime})</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#26D6A0]" />
              <span className="text-[#9EACC3]">Travelers:</span>
              <div className="flex items-center gap-1 bg-[#080E1D] border border-[#293950] rounded-lg px-2 py-1 text-white">
                <button
                  onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                  className="px-1 hover:text-[#FFAD18] font-bold"
                >
                  -
                </button>
                <span className="font-bold px-1">{travelersCount}</span>
                <button
                  onClick={() => setTravelersCount(travelersCount + 1)}
                  className="px-1 hover:text-[#FFAD18] font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <Link
            to="/transit"
            className="text-xs font-mono text-[#FFAD18] hover:underline flex items-center gap-1 font-bold"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Search</span>
          </Link>
        </div>

        {/* Time Budget Allocation Gauge */}
        <div className="bg-[#142035] p-6 rounded-2xl border border-[#293950] mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#FFAD18]" />
              <span className="font-bold text-white font-display text-base">Time Budget Allocation Gauge</span>
            </div>
            
            {isOverBudget ? (
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
                <AlertCircle className="w-4 h-4" />
                <span>EXCEEDS SAFE EXPLORATION WINDOW ({totalPlannedMins}m / {safeMins}m)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-mono text-[#26D6A0] bg-[#26D6A0]/10 px-3 py-1 rounded-full border border-[#26D6A0]/30">
                <ShieldCheck className="w-4 h-4" />
                <span>ITINERARY VERIFIED SAFE ({totalPlannedMins}m / {safeMins}m)</span>
              </div>
            )}
          </div>

          {/* Multi-segment Progress Bar */}
          <div className="w-full h-4 bg-[#080E1D] rounded-full overflow-hidden flex border border-[#293950]">
            <div 
              className="h-full bg-[#28C8E8]" 
              style={{ width: `${(totalTransitMins / flight.layoverDurationMinutes) * 100}%` }}
              title={`Transit: ${totalTransitMins} mins`}
            ></div>
            <div 
              className="h-full bg-[#FFAD18]" 
              style={{ width: `${(sightseeingMins / flight.layoverDurationMinutes) * 100}%` }}
              title={`Sightseeing: ${sightseeingMins} mins`}
            ></div>
            <div 
              className="h-full bg-[#26D6A0]" 
              style={{ width: `${(150 / flight.layoverDurationMinutes) * 100}%` }}
              title="DXB Security Buffer: 150 mins"
            ></div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-[#9EACC3] mt-3">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#28C8E8]"></span> Transit ({totalTransitMins}m)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FFAD18]"></span> Sightseeing ({sightseeingMins}m)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#26D6A0]"></span> Security & Gates Buffer (150m)</span>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (65% width approx - 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Add Stop Controls */}
            <div className="bg-[#142035] p-4 rounded-2xl border border-[#293950] flex flex-col sm:flex-row gap-3">
              <select
                value={selectedPlaceId}
                onChange={(e) => setSelectedPlaceId(e.target.value)}
                className="flex-1 bg-[#080E1D] border border-[#293950] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFAD18] text-sm"
              >
                {placesData.filter(p => !p.isAirport).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
              <button
                onClick={addStop}
                className="bg-[#1A2940] hover:bg-[#1E293B] text-white px-6 py-3 rounded-xl font-medium transition-colors border border-[#293950] flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-5 h-5 text-[#FFAD18]" />
                <span>Add Stop</span>
              </button>
            </div>

            {/* Draggable Stop Timeline */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={stops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <div>
                  {stops.map((stop, index) => (
                    <SortableStop
                      key={stop.id}
                      stop={stop}
                      index={index}
                      onRemove={removeStop}
                      isFirst={index === 0}
                      isLast={index === stops.length - 1}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* Flight & Timing Schedule Card */}
            <FlightInformation />

            {/* Expandable Travel Details Accordion */}
            <TravelDetailsAccordion />

          </div>

          {/* Right Column (35% width approx - 5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#142035] p-6 rounded-2xl border border-[#293950] sticky top-24 shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#293950] mb-6">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-[#FFAD18]" />
                  <span className="font-bold text-white font-display text-lg">Stopover Ledger</span>
                </div>

                {/* Currency Selector */}
                <div className="flex bg-[#080E1D] p-1 rounded-lg border border-[#293950] text-xs font-mono">
                  {(['AED', 'USD', 'EUR'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-2 py-1 rounded transition-colors ${currency === c ? 'bg-[#FFAD18] text-[#080E1D] font-bold' : 'text-[#9EACC3]'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expense Breakdown */}
              <div className="space-y-3 font-mono text-xs text-[#9EACC3] mb-6">
                <div className="flex justify-between">
                  <span>Transit Fares ({selectedTransport.name}):</span>
                  <span className="text-white font-bold">{formatCurrency(baseTransitAed)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Entry Tickets ({travelersCount} traveler{travelersCount > 1 ? 's' : ''}):</span>
                  <span className="text-white font-bold">{formatCurrency(baseTicketsAed)}</span>
                </div>
                <div className="flex justify-between">
                  <span>DXB Luggage Storage:</span>
                  <span className="text-white font-bold">{formatCurrency(baseLuggageAed)}</span>
                </div>

                <div className="pt-4 border-t border-[#293950] flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white font-display">Total Package Price:</span>
                  <span className="text-2xl font-extrabold font-mono text-[#FFAD18]">
                    {formatCurrency(totalLayoverCostAed)}
                  </span>
                </div>
                <span className="text-[10px] text-[#9EACC3] block text-right font-mono">Includes taxes & verified transit passes</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setPassModalOpen(true)}
                  className="w-full bg-[#FFAD18] hover:bg-amber-400 text-[#080E1D] py-4 rounded-xl font-bold font-display text-sm shadow-xl shadow-[#FFAD18]/20 transition-all flex items-center justify-center gap-2"
                >
                  <QrCode className="w-5 h-5" />
                  <span>See Itinerary & Confirm Plan</span>
                </button>

                <button
                  onClick={() => alert(`Sending itinerary summary for ${travelersCount} traveler(s) using ${selectedTransport.name} to WhatsApp...`)}
                  className="w-full bg-[#1A2940] hover:bg-[#1E293B] text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 border border-[#293950] text-xs transition-colors"
                >
                  <Share2 className="w-4 h-4 text-[#26D6A0]" />
                  <span>Send to WhatsApp / Apply Changes</span>
                </button>
              </div>

              {/* Cancellation Policy Summary */}
              <div className="mt-6 pt-4 border-t border-[#293950] flex items-center gap-2 text-[11px] font-mono text-[#26D6A0]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Free cancellation up to 2 hours before scheduled landing</span>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Offline Boarding Pass Modal */}
      {passModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#142035] border border-[#FFAD18]/50 rounded-2xl max-w-md w-full p-6 relative text-center shadow-2xl">
            <button 
              onClick={() => setPassModalOpen(false)}
              className="absolute top-4 right-4 text-[#9EACC3] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex p-3 rounded-full bg-[#FFAD18]/10 text-[#FFAD18] mb-4">
              <QrCode className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold font-display text-white mb-2">DXB Offline Stopover Pass</h3>
            <p className="text-xs text-[#9EACC3] font-mono mb-6">Scan at DXB Smart Gates or show to Metro concourse stewards.</p>

            <div className="bg-white p-4 rounded-xl inline-block mb-6 shadow-2xl">
              <div className="w-44 h-44 bg-[#080E1D] rounded flex flex-col items-center justify-center text-white font-mono text-[10px] p-2">
                <div className="w-32 h-32 border-4 border-dashed border-[#FFAD18] flex items-center justify-center text-[#FFAD18] font-bold">
                  DXB PASS QR
                </div>
                <span className="mt-2 text-[#9EACC3]">PASS ID: DXB-7821-SAFE</span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#26D6A0] bg-[#26D6A0]/10 p-3 rounded-xl border border-[#26D6A0]/30 mb-4 flex items-center gap-2 justify-center">
              <CheckCircle2 className="w-4 h-4" />
              <span>Guaranteed Safe Return Window Verified ({travelersCount} traveler{travelersCount > 1 ? 's' : ''})</span>
            </div>

            <button
              onClick={() => setPassModalOpen(false)}
              className="w-full bg-[#FFAD18] text-[#080E1D] py-3.5 rounded-xl font-bold font-display text-sm"
            >
              Save to Apple Wallet / Device
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
