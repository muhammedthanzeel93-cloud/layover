import { useState, useEffect } from 'react';
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
import placesData from '../data/places.json';
import tariffsData from '../data/tariffs.json';
import { calculateTaxiFare } from '../lib/fare';
import type { Point } from '../lib/routing';
import { GripVertical, X, Plus, Wallet } from 'lucide-react';

interface Stop {
  id: string;
  placeId: string;
}

function SortableStopItem({ stop, index, onRemove, nextStop }: { stop: Stop, index: number, onRemove: (id: string) => void, nextStop: Stop | null }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: stop.id });
  const place = placesData.find(p => p.id === stop.placeId);
  const nextPlace = nextStop ? placesData.find(p => p.id === nextStop.placeId) : null;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  let legCost = 0;
  if (place && nextPlace) {
    const origin: Point = { lat: place.lat, lng: place.lng, isAirport: place.isAirport };
    const dest: Point = { lat: nextPlace.lat, lng: nextPlace.lng, isAirport: nextPlace.isAirport };
    legCost = calculateTaxiFare(origin, dest, tariffsData);
  }

  return (
    <div ref={setNodeRef} style={style} className="mb-4 relative">
      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex items-center gap-4 group hover:border-amber-500/50 transition-colors shadow-lg">
        <div {...attributes} {...listeners} className="cursor-grab text-slate-500 hover:text-white">
          <GripVertical className="w-5 h-5" />
        </div>
        
        <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm shrink-0">
          {index + 1}
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold text-lg">{place?.name}</h4>
          <p className="text-sm text-slate-400">{place?.category}</p>
        </div>

        <button 
          onClick={() => onRemove(stop.id)}
          className="text-slate-500 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Leg connector showing cost to next stop */}
      {nextPlace && (
        <div className="absolute -bottom-4 left-10 h-4 border-l-2 border-dashed border-slate-600 pl-4 flex items-center">
          <div className="text-xs font-medium text-amber-500 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700 relative -left-[9px] -top-1">
            Taxi: ~{legCost.toFixed(2)} AED
          </div>
        </div>
      )}
    </div>
  );
}

export default function ItineraryBuilder() {
  const [stops, setStops] = useState<Stop[]>(() => {
    const saved = localStorage.getItem('layover_itinerary');
    if (saved) return JSON.parse(saved);
    // Default itinerary: Airport -> Burj Khalifa -> Dubai Mall -> Airport
    return [
      { id: '1', placeId: 'p3' },
      { id: '2', placeId: 'p1' },
      { id: '3', placeId: 'p2' },
      { id: '4', placeId: 'p3' }
    ];
  });

  const [selectedPlaceId, setSelectedPlaceId] = useState(placesData[3].id); // default to some place

  useEffect(() => {
    localStorage.setItem('layover_itinerary', JSON.stringify(stops));
  }, [stops]);

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
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addStop = () => {
    setStops([...stops, { id: Date.now().toString(), placeId: selectedPlaceId }]);
  };

  const removeStop = (id: string) => {
    setStops(stops.filter(s => s.id !== id));
  };

  // Calculate total cost
  let totalCost = 0;
  for (let i = 0; i < stops.length - 1; i++) {
    const p1 = placesData.find(p => p.id === stops[i].placeId);
    const p2 = placesData.find(p => p.id === stops[i+1].placeId);
    if (p1 && p2) {
      totalCost += calculateTaxiFare(
        { lat: p1.lat, lng: p1.lng, isAirport: p1.isAirport },
        { lat: p2.lat, lng: p2.lng, isAirport: p2.isAirport },
        tariffsData
      );
    }
  }

  return (
    <div className="py-20 bg-slate-950/50 border-y border-slate-800" id="itinerary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Itinerary Builder</h2>
          <p className="text-slate-400">Drag and drop to reorder stops. We'll automatically calculate transit fares between them.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-6 flex gap-4">
              <select 
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                value={selectedPlaceId}
                onChange={(e) => setSelectedPlaceId(e.target.value)}
              >
                {placesData.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <button 
                onClick={addStop}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-slate-700 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Stop
              </button>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={stops.map(s => s.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {stops.map((stop, index) => (
                    <SortableStopItem 
                      key={stop.id} 
                      stop={stop} 
                      index={index} 
                      onRemove={removeStop}
                      nextStop={index < stops.length - 1 ? stops[index + 1] : null}
                    />
                  ))}
                  {stops.length === 0 && (
                    <div className="text-center py-12 text-slate-500 border-2 border-dashed border-slate-700 rounded-2xl">
                      Add a stop to start building your itinerary
                    </div>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          <div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl border border-slate-700 sticky top-24 shadow-2xl">
              <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Estimated Cost</h3>
              <p className="text-slate-400 text-sm mb-6">Total calculated taxi fare for all legs in the itinerary.</p>
              
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-8">
                {totalCost.toFixed(0)} <span className="text-2xl text-slate-500">AED</span>
              </div>

              <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-amber-500/25">
                Save Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
