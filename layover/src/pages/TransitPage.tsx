import { useState } from 'react';
import {
  Train,
  Car,
  Navigation,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  ArrowUpDown,
  Luggage,
  Layers,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import placesData from '../data/places.json';
import stationsData from '../data/stations.json';
import tariffsData from '../data/tariffs.json';
import { calculateTaxiFare, calculateRideHailFare, calculateMetroFare } from '../lib/fare';
import { findNearestStation, calculateDistance } from '../lib/routing';
import type { Point } from '../lib/routing';
import { useLayover } from '../context/LayoverContext';
import Footer from '../components/Footer';

interface DetailModalState {
  isOpen: boolean;
  title: string;
  mode: string;
  details: string[];
}

export default function TransitPage() {
  const navigate = useNavigate();
  const { flight, updateFlight, formatCurrency, confirmTransportPlan } = useLayover();
  
  const [selectedOriginId, setSelectedOriginId] = useState('p3'); // DXB Airport default
  const [selectedDestId, setSelectedDestId] = useState('p1'); // Burj Khalifa default
  const [travelersCount, setTravelersCount] = useState(1);
  const [sortOption, setSortOption] = useState<'price' | 'duration'>('price');
  const [activeTab, setActiveTab] = useState<'all' | 'metro' | 'taxi' | 'ridehail'>('all');

  const [modalState, setModalState] = useState<DetailModalState>({
    isOpen: false,
    title: '',
    mode: '',
    details: [],
  });

  const originPlace = placesData.find((p) => p.id === selectedOriginId) || placesData[2];
  const destPlace = placesData.find((p) => p.id === selectedDestId) || placesData[0];

  const originPoint: Point = { lat: originPlace.lat, lng: originPlace.lng, isAirport: originPlace.isAirport };
  const destPoint: Point = { lat: destPlace.lat, lng: destPlace.lng, isAirport: destPlace.isAirport };

  const distanceKm = Math.max(2.5, Math.round(calculateDistance(originPoint, destPoint) * 10) / 10);
  
  // Single fares
  const singleTaxiFare = Math.round(calculateTaxiFare(originPoint, destPoint, tariffsData) * 100) / 100;
  const singleRideHailFare = Math.round(calculateRideHailFare(originPoint, destPoint, tariffsData) * 100) / 100;
  const singleMetroFare = calculateMetroFare(tariffsData);
  const singlePrivateFare = 120.00;

  // Group totals
  const taxiVehicles = Math.ceil(travelersCount / 4);
  const totalTaxiFare = singleTaxiFare * taxiVehicles;
  const totalRideHailFare = singleRideHailFare * taxiVehicles;
  const totalMetroFare = singleMetroFare * travelersCount;
  const totalPrivateFare = travelersCount <= 6 ? 120.00 : 240.00;

  // Estimated transit times based on calculated distance
  const estimatedMetroMins = Math.round(distanceKm * 1.6 + 8);
  const estimatedTaxiMins = Math.round(distanceKm * 1.2 + 5);

  const nearestDestStation = findNearestStation(destPoint, stationsData);

  const transportModes = [
    {
      id: 'metro',
      title: 'Dubai Metro Red Line',
      subtitle: `Air-conditioned link directly from DXB ${flight.terminal} concourse`,
      badge: 'RECOMMENDED • LOWEST COST',
      badgeBg: 'bg-[#28D99B]',
      badgeText: 'text-[#081020]',
      borderAccent: 'border-[#28D99B]/50 hover:border-[#28D99B]',
      icon: Train,
      iconColor: 'text-[#28D99B]',
      iconBg: 'bg-[#28D99B]/10',
      singleFare: singleMetroFare,
      totalFare: totalMetroFare,
      duration: `${estimatedMetroMins} mins (Direct)`,
      durationMins: estimatedMetroMins,
      priceLabel: formatCurrency(totalMetroFare),
      isPerPerson: true,
      features: [
        '0% Traffic Risk (100% Reliable)',
        'Nol Silver Pass Accepted (Zone 2 Fare)',
        `Trains depart every 4–7 mins from DXB ${flight.terminal}`
      ],
      actionLabel: 'View Metro Route',
    },
    {
      id: 'taxi',
      title: 'Official Airport Taxi (DTC)',
      subtitle: 'Cream-colored official cabs at terminal exit ranks',
      badge: 'FASTEST DOOR-TO-DOOR',
      badgeBg: 'bg-[#FFB21A]',
      badgeText: 'text-[#081020]',
      borderAccent: 'border-[#FFB21A]/50 hover:border-[#FFB21A]',
      icon: Car,
      iconColor: 'text-[#FFB21A]',
      iconBg: 'bg-[#FFB21A]/10',
      singleFare: singleTaxiFare,
      totalFare: totalTaxiFare,
      duration: `${estimatedTaxiMins}–${estimatedTaxiMins + 15} mins (Traffic Dependent)`,
      durationMins: estimatedTaxiMins,
      priceLabel: formatCurrency(totalTaxiFare),
      isPerPerson: false,
      features: [
        'Fixed 25 AED Airport Flag-Drop Fee',
        'Direct curb drop-off at hotel or landmark',
        'Credit Cards, Apple Pay & Cash accepted'
      ],
      actionLabel: 'View Taxi Details',
    },
    {
      id: 'ridehail',
      title: 'Careem / Uber Saloon',
      subtitle: 'Pre-booked ride-hail with upfront fixed fare',
      badge: 'POPULAR RIDE-HAIL',
      badgeBg: 'bg-[#21C9E8]',
      badgeText: 'text-[#081020]',
      borderAccent: 'border-[#21C9E8]/50 hover:border-[#21C9E8]',
      icon: Navigation,
      iconColor: 'text-[#21C9E8]',
      iconBg: 'bg-[#21C9E8]/10',
      singleFare: singleRideHailFare,
      totalFare: totalRideHailFare,
      duration: `${estimatedTaxiMins + 2}–${estimatedTaxiMins + 18} mins`,
      durationMins: estimatedTaxiMins + 2,
      priceLabel: formatCurrency(totalRideHailFare),
      isPerPerson: false,
      features: [
        'Premium Comfort Lexus ES / Tesla Model 3',
        'In-app automated cashless payment',
        'Pickup at designated App Zones (Level 2)'
      ],
      actionLabel: 'Compare Rides',
    },
    {
      id: 'private',
      title: 'Private Chauffeur & Executive Van',
      subtitle: 'Pre-booked luxury transfer with meet & greet',
      badge: 'PREMIUM GROUP COMFORT',
      badgeBg: 'bg-[#A855F7]',
      badgeText: 'text-white',
      borderAccent: 'border-[#A855F7]/50 hover:border-[#A855F7]',
      icon: ShieldCheck,
      iconColor: 'text-[#A855F7]',
      iconBg: 'bg-[#A855F7]/10',
      singleFare: singlePrivateFare,
      totalFare: totalPrivateFare,
      duration: `${estimatedTaxiMins} mins (Direct VIP)`,
      durationMins: estimatedTaxiMins,
      priceLabel: formatCurrency(totalPrivateFare),
      isPerPerson: false,
      features: [
        'Up to 6 Passengers + 6 Large Suitcases',
        'Personal driver waiting at Arrival Hall with sign',
        'All-inclusive fixed rate (Tolls & Parking included)'
      ],
      actionLabel: 'Explore Transfers',
    }
  ];

  const filteredModes = transportModes
    .filter((m) => activeTab === 'all' || m.id === activeTab)
    .sort((a, b) => {
      if (sortOption === 'price') return a.totalFare - b.totalFare;
      return a.durationMins - b.durationMins;
    });

  const curatedDestinations = [
    {
      id: 'p1',
      name: 'Burj Khalifa & Dubai Mall',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      metroTime: '24 mins direct',
      recommendedVisit: '3.5 Hours',
      bestMode: 'Dubai Metro Red Line',
      cost: '5.00 AED',
      description: 'Experience the world\'s tallest skyscraper, dancing fountains, and flagship retail boulevard.',
    },
    {
      id: 'p5',
      name: 'Dubai Marina & JBR Beach',
      image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
      metroTime: '45 mins Metro / 30 mins Taxi',
      recommendedVisit: '3.0 Hours',
      bestMode: 'DTC Taxi / Uber',
      cost: '7.50 AED Metro / ~75 AED Taxi',
      description: 'Stunning luxury yachts, high-rise cityscape, and vibrant beachfront dining promenades.',
    },
    {
      id: 'p13',
      name: 'Museum of the Future',
      image: 'https://images.unsplash.com/photo-1629814421183-9b6d85918731?auto=format&fit=crop&w=800&q=80',
      metroTime: '18 mins direct',
      recommendedVisit: '2.5 Hours',
      bestMode: 'Dubai Metro Red Line',
      cost: '5.00 AED',
      description: 'Architectural marvel featuring immersive exhibits on space exploration, climate, and wellness.',
    },
    {
      id: 'p10',
      name: 'Dubai Creek & Gold Souk',
      image: 'https://images.unsplash.com/photo-1546412414-8035e1786b22?auto=format&fit=crop&w=800&q=80',
      metroTime: '15 mins Green Line',
      recommendedVisit: '2.0 Hours',
      bestMode: 'Metro Green Line / Taxi',
      cost: '3.00 AED + 1 AED Abra',
      description: 'Historic spice markets, glittering gold souks, and traditional wooden abra boat crossings.',
    }
  ];

  const handleOpenModal = (modeTitle: string, modeId: string, features: string[]) => {
    setModalState({
      isOpen: true,
      title: modeTitle,
      mode: modeId,
      details: features,
    });
  };

  const handleConfirmTransport = () => {
    const modeId = modalState.mode;
    let modeType: 'metro' | 'taxi' | 'careem' | 'private' = 'metro';
    let fare = totalMetroFare;
    let duration = estimatedMetroMins;

    if (modeId === 'taxi') {
      modeType = 'taxi';
      fare = totalTaxiFare;
      duration = estimatedTaxiMins;
    } else if (modeId === 'ridehail') {
      modeType = 'careem';
      fare = totalRideHailFare;
      duration = estimatedTaxiMins + 2;
    } else if (modeId === 'private') {
      modeType = 'private';
      fare = totalPrivateFare;
      duration = estimatedTaxiMins;
    }

    confirmTransportPlan({
      id: modeId,
      name: modalState.title,
      mode: modeType,
      fareAed: fare,
      durationMins: duration,
    });

    setModalState({ ...modalState, isOpen: false });
    navigate('/itinerary');
  };

  const handleSelectDestinationCard = (destId: string) => {
    setSelectedDestId(destId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#081020] text-[#F4F7FC] pt-20 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="mb-6 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#21C9E8] uppercase tracking-widest mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>MULTI-MODAL FARE TELEMETRY</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white">
            DXB <span className="text-[#FFB21A]">Live Transit Guide</span> & <span className="text-[#21C9E8]">Fare Comparison</span>
          </h1>
          <p className="text-[#A4B2C8] text-sm md:text-base mt-2 max-w-3xl">
            Real-time telemetry comparing Dubai Metro Red Line, Official Airport Taxis (DTC), Careem/Uber, and Private Chauffeurs from Dubai International Airport.
          </p>
        </div>

        {/* E11 Traffic Rush Warning Banner */}
        <div className="bg-[#142238] border border-[#FFB21A]/40 rounded-2xl p-4 mb-8 flex items-start gap-3.5 shadow-xl">
          <div className="p-2 rounded-xl bg-[#FFB21A]/10 text-[#FFB21A] shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono">
            <span className="text-white font-bold uppercase block mb-1">
              TRAFFIC TELEMETRY WARNING: E11 SHEIKH ZAYED ROAD PEAK RUSH (17:00 – 19:30)
            </span>
            <span className="text-[#A4B2C8] leading-relaxed block">
              Taxi transit times to Downtown / Marina may increase by 25–40 minutes during peak evening hours. <strong className="text-[#28D99B]">Dubai Metro Red Line is 100% traffic-exempt and operates on schedule.</strong>
            </span>
          </div>
        </div>

        {/* Hero Dashboard Section: 2 Columns (Left: Trip Search Panel, Right: Route Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column (58% width approx) */}
          <div className="lg:col-span-7 bg-[#142238] p-6 md:p-8 rounded-2xl border border-[#2A3A51] shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2A3A51]">
                <h3 className="text-xl font-bold font-display text-white flex items-center gap-2.5">
                  <Navigation className="w-5 h-5 text-[#21C9E8]" />
                  <span>Select Transit Telemetry Route</span>
                </h3>
                
                {/* Terminal Selector Badge */}
                <div className="flex items-center gap-1 bg-[#081020] p-1 rounded-xl border border-[#2A3A51]">
                  {(['T1', 'T2', 'T3'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => updateFlight({ terminal: t })}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        flight.terminal === t
                          ? 'bg-[#FFB21A] text-[#081020]'
                          : 'text-[#A4B2C8] hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-mono text-[#A4B2C8] uppercase tracking-wider mb-2">
                    ORIGIN POINT (DXB)
                  </label>
                  <select
                    value={selectedOriginId}
                    onChange={(e) => setSelectedOriginId(e.target.value)}
                    className="w-full bg-[#081020] border border-[#2A3A51] rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-[#21C9E8] transition-colors"
                  >
                    {placesData.filter(p => p.isAirport).map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A4B2C8] uppercase tracking-wider mb-2">
                    DESTINATION POINT
                  </label>
                  <select
                    value={selectedDestId}
                    onChange={(e) => setSelectedDestId(e.target.value)}
                    className="w-full bg-[#081020] border border-[#2A3A51] rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-[#21C9E8] transition-colors"
                  >
                    {placesData.filter(p => !p.isAirport).map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Travelers Counter & Quick Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-mono text-[#A4B2C8] uppercase tracking-wider mb-2">
                    NUMBER OF TRAVELERS
                  </label>
                  <div className="flex items-center bg-[#081020] border border-[#2A3A51] rounded-xl p-1.5">
                    <button
                      onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                      className="w-9 h-9 rounded-lg bg-[#142238] text-white hover:bg-[#2A3A51] font-bold text-lg flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center font-mono font-bold text-white text-sm">
                      {travelersCount} {travelersCount === 1 ? 'Traveler' : 'Travelers'}
                    </div>
                    <button
                      onClick={() => setTravelersCount(Math.min(8, travelersCount + 1))}
                      className="w-9 h-9 rounded-lg bg-[#142238] text-white hover:bg-[#2A3A51] font-bold text-lg flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A4B2C8] uppercase tracking-wider mb-2">
                    NEAREST METRO LINK
                  </label>
                  <div className="bg-[#081020] border border-[#2A3A51] rounded-xl px-4 py-2.5 text-xs font-mono text-white flex items-center justify-between">
                    <span className="text-[#28D99B] font-semibold">{nearestDestStation ? nearestDestStation.name : 'Burj Khalifa/Dubai Mall Station'}</span>
                    <span className="text-[10px] text-[#A4B2C8] bg-[#142238] px-2 py-0.5 rounded">Red Line</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Telemetry Summary Box */}
            <div className="bg-[#081020] p-4 rounded-xl border border-[#2A3A51] font-mono text-xs text-[#A4B2C8] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#21C9E8]" /> Direct Distance:
                </span>
                <span className="text-white font-bold">{distanceKm} km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Train className="w-3.5 h-3.5 text-[#28D99B]" /> Estimated Metro Time:
                </span>
                <span className="text-[#28D99B] font-bold">{estimatedMetroMins} mins (Direct)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#FFB21A]" /> Estimated Taxi Time:
                </span>
                <span className="text-[#FFB21A] font-bold">{estimatedTaxiMins}–{estimatedTaxiMins + 15} mins (Traffic Dependent)</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#2A3A51]">
                <span className="text-white font-semibold">Calculated Group Fare ({travelersCount} pax):</span>
                <span className="text-[#21C9E8] font-bold font-mono text-sm">
                  {formatCurrency(totalMetroFare)} (Metro) / {formatCurrency(totalTaxiFare)} (Taxi)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (42% width approx) - Leaflet Route Map */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-[#142238] p-4 rounded-t-2xl border border-[#2A3A51] border-b-0 flex items-center justify-between">
              <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFB21A]" />
                <span>Airport Route Map & Telemetry</span>
              </h4>
              <span className="text-[10px] font-mono bg-[#28D99B]/10 text-[#28D99B] px-2.5 py-0.5 rounded-full border border-[#28D99B]/30">
                LIVE GEOLOCATION
              </span>
            </div>

            <div className="h-[340px] rounded-b-2xl overflow-hidden border border-[#2A3A51] shadow-2xl relative">
              <MapComponent
                origin={originPoint}
                destination={destPoint}
                stations={stationsData.map((s) => ({ lat: s.lat, lng: s.lng }))}
              />
            </div>
          </div>

        </div>

        {/* Section Heading: Transport Options & Fare Cards */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white">
              Transport Options & Fare Telemetry Cards
            </h2>
            <p className="text-xs font-mono text-[#A4B2C8] mt-1">
              Showing total fares for <span className="text-[#FFB21A] font-bold">{travelersCount} traveler(s)</span> from DXB {flight.terminal} to {destPlace.name}.
            </p>
          </div>

          {/* Sorting & Category Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-[#142238] p-1 rounded-xl border border-[#2A3A51]">
              {(['all', 'metro', 'taxi', 'ridehail'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-[#21C9E8] text-[#081020] font-bold'
                      : 'text-[#A4B2C8] hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSortOption(sortOption === 'price' ? 'duration' : 'price')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#142238] border border-[#2A3A51] text-xs font-mono text-white hover:border-[#FFB21A] transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#FFB21A]" />
              <span>Sort: {sortOption === 'price' ? 'Lowest Price' : 'Fastest Time'}</span>
            </button>
          </div>
        </div>

        {/* 4 Transport Fare Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                className={`bg-[#142238] rounded-2xl border ${mode.borderAccent} p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                {/* Badge Top Right */}
                <div className={`absolute top-0 right-0 ${mode.badgeBg} ${mode.badgeText} px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-bl-xl shadow-md`}>
                  {mode.badge}
                </div>

                <div>
                  {/* Icon Header */}
                  <div className={`w-12 h-12 rounded-xl ${mode.iconBg} ${mode.iconColor} flex items-center justify-center mb-4 mt-2`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-lg text-white font-display mb-1">{mode.title}</h3>
                  <p className="text-xs text-[#A4B2C8] font-mono mb-4 min-h-[32px]">{mode.subtitle}</p>

                  {/* Price Display */}
                  <div className="mb-4">
                    <div className="text-3xl md:text-4xl font-black font-mono text-white tracking-tight">
                      {mode.priceLabel}
                    </div>
                    <div className="text-[11px] font-mono text-[#A4B2C8] mt-1 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-[#21C9E8]" />
                      <span>{mode.duration}</span>
                      {mode.isPerPerson && <span className="text-[10px] bg-[#081020] px-1.5 py-0.5 rounded text-[#28D99B]">per person</span>}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs font-mono text-[#A4B2C8] pt-4 border-t border-[#2A3A51] mb-6">
                    {mode.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-white">
                        <CheckCircle2 className={`w-4 h-4 ${mode.iconColor} shrink-0 mt-0.5`} />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleOpenModal(mode.title, mode.id, mode.features)}
                  className="w-full bg-[#081020] hover:bg-[#1A2940] border border-[#2A3A51] hover:border-[#FFB21A] text-white py-2.5 px-4 rounded-xl text-xs font-bold font-display transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{mode.actionLabel}</span>
                  <ChevronRight className="w-4 h-4 text-[#FFB21A] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Detailed Multi-Modal Comparison Matrix Table */}
        <div className="bg-[#142238] rounded-2xl border border-[#2A3A51] p-6 md:p-8 mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-[#2A3A51]">
            <div>
              <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#FFB21A]" />
                <span>Fare Comparison Matrix</span>
              </h3>
              <p className="text-xs font-mono text-[#A4B2C8] mt-1">
                Comparative breakdown for traveling from DXB {flight.terminal} to {destPlace.name} ({distanceKm} km).
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#2A3A51] text-[#A4B2C8] uppercase text-[11px]">
                  <th className="py-3 px-4">Transport Mode</th>
                  <th className="py-3 px-4">Single Fare</th>
                  <th className="py-3 px-4">Group Total ({travelersCount} pax)</th>
                  <th className="py-3 px-4">Est. Duration</th>
                  <th className="py-3 px-4">Traffic Risk</th>
                  <th className="py-3 px-4">Best Suited For</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A3A51]/60 text-white">
                <tr className="hover:bg-[#081020]/50 transition-colors">
                  <td className="py-4 px-4 font-bold flex items-center gap-2.5">
                    <Train className="w-4 h-4 text-[#28D99B]" />
                    <span>Dubai Metro Red Line</span>
                  </td>
                  <td className="py-4 px-4 text-[#28D99B] font-bold">{formatCurrency(singleMetroFare)}</td>
                  <td className="py-4 px-4 font-bold text-white">{formatCurrency(totalMetroFare)}</td>
                  <td className="py-4 px-4">{estimatedMetroMins} mins</td>
                  <td className="py-4 px-4 text-[#28D99B] font-bold">0% (Traffic-Exempt)</td>
                  <td className="py-4 px-4 text-[#A4B2C8]">Solo & Budget Travelers</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleOpenModal('Dubai Metro Red Line', 'metro', ['Direct air-conditioned access', 'Requires Nol card'])}
                      className="text-[#28D99B] hover:underline text-xs font-bold"
                    >
                      Select
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-[#081020]/50 transition-colors">
                  <td className="py-4 px-4 font-bold flex items-center gap-2.5">
                    <Car className="w-4 h-4 text-[#FFB21A]" />
                    <span>Official Airport Taxi (DTC)</span>
                  </td>
                  <td className="py-4 px-4 text-[#FFB21A] font-bold">{formatCurrency(singleTaxiFare)}</td>
                  <td className="py-4 px-4 font-bold text-white">{formatCurrency(totalTaxiFare)}</td>
                  <td className="py-4 px-4">{estimatedTaxiMins}–{estimatedTaxiMins + 15} mins</td>
                  <td className="py-4 px-4 text-[#FFB21A]">Moderate–High (Peak Hours)</td>
                  <td className="py-4 px-4 text-[#A4B2C8]">Door-to-Door & Direct Hotel Drop</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleOpenModal('Official Airport Taxi (DTC)', 'taxi', ['Includes 25 AED flag drop', 'Accepts credit cards'])}
                      className="text-[#FFB21A] hover:underline text-xs font-bold"
                    >
                      Select
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-[#081020]/50 transition-colors">
                  <td className="py-4 px-4 font-bold flex items-center gap-2.5">
                    <Navigation className="w-4 h-4 text-[#21C9E8]" />
                    <span>Careem / Uber Saloon</span>
                  </td>
                  <td className="py-4 px-4 text-[#21C9E8] font-bold">{formatCurrency(singleRideHailFare)}</td>
                  <td className="py-4 px-4 font-bold text-white">{formatCurrency(totalRideHailFare)}</td>
                  <td className="py-4 px-4">{estimatedTaxiMins + 2}–{estimatedTaxiMins + 18} mins</td>
                  <td className="py-4 px-4 text-[#21C9E8]">Moderate</td>
                  <td className="py-4 px-4 text-[#A4B2C8]">App Cashless Comfort (Lexus/Tesla)</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleOpenModal('Careem / Uber Saloon', 'ridehail', ['App cashless payment', 'Pickup at designated app zone'])}
                      className="text-[#21C9E8] hover:underline text-xs font-bold"
                    >
                      Select
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-[#081020]/50 transition-colors">
                  <td className="py-4 px-4 font-bold flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#A855F7]" />
                    <span>Private Chauffeur Executive Van</span>
                  </td>
                  <td className="py-4 px-4 text-[#A855F7] font-bold">{formatCurrency(singlePrivateFare)}</td>
                  <td className="py-4 px-4 font-bold text-white">{formatCurrency(totalPrivateFare)}</td>
                  <td className="py-4 px-4">{estimatedTaxiMins} mins (VIP)</td>
                  <td className="py-4 px-4 text-white font-bold">Low (Priority Route)</td>
                  <td className="py-4 px-4 text-[#A4B2C8]">Large Families & Heavy Luggage</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleOpenModal('Private Chauffeur Executive Van', 'private', ['Meet & greet at arrival hall', 'Luggage assistance included'])}
                      className="text-[#A855F7] hover:underline text-xs font-bold"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Curated Destination Timelines from Terminal 3 */}
        <div className="mb-16">
          <div className="mb-8">
            <div className="text-xs font-mono text-[#FFB21A] uppercase tracking-widest mb-1 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STOPOVER DESTINATION INTELLIGENCE</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white">
              Curated Destination Timelines from Terminal 3
            </h2>
            <p className="text-sm text-[#A4B2C8] mt-1">
              Top recommended Dubai sights with verified transit schedules from DXB Terminal 3 concourse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {curatedDestinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-[#142238] rounded-2xl border border-[#2A3A51] overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#FFB21A] transition-all duration-300"
              >
                <div>
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142238] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 bg-[#081020]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#28D99B] font-bold border border-[#28D99B]/30">
                      {dest.metroTime}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg text-white font-display mb-1.5 group-hover:text-[#FFB21A] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[#A4B2C8] leading-relaxed mb-4">
                      {dest.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-[#2A3A51] font-mono text-xs">
                      <div className="flex items-center justify-between text-[#A4B2C8]">
                        <span>Rec. Visit Duration:</span>
                        <span className="text-white font-semibold">{dest.recommendedVisit}</span>
                      </div>
                      <div className="flex items-center justify-between text-[#A4B2C8]">
                        <span>Est. Transport Cost:</span>
                        <span className="text-[#21C9E8] font-bold">{dest.cost}</span>
                      </div>
                      <div className="flex items-center justify-between text-[#A4B2C8]">
                        <span>Best Transport Mode:</span>
                        <span className="text-[#28D99B] font-semibold">{dest.bestMode}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleSelectDestinationCard(dest.id)}
                    className="w-full bg-[#081020] hover:bg-[#FFB21A] text-white hover:text-[#081020] border border-[#2A3A51] hover:border-[#FFB21A] py-2.5 px-4 rounded-xl text-xs font-bold font-display transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Explore Destination</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Information Accordion & DXB Rules */}
        <div className="bg-[#142238] rounded-2xl border border-[#2A3A51] p-6 md:p-8 mb-16 shadow-2xl">
          <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#21C9E8]" />
            <span>Essential DXB Airport Transit & Luggage Guidelines</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            
            <div className="bg-[#081020] p-5 rounded-xl border border-[#2A3A51] space-y-2.5">
              <div className="flex items-center gap-2 text-[#FFB21A] font-bold">
                <Train className="w-4 h-4" />
                <span>Metro Station Concourses</span>
              </div>
              <p className="text-[#A4B2C8] leading-relaxed">
                Dubai Metro stations are located directly inside Terminal 1 and Terminal 3 Arrivals concourses. Trains operate continuously from 05:00 AM to midnight (Fridays until 01:00 AM). Nol Silver cards can be purchased at station ticket booths or automated kiosks.
              </p>
            </div>

            <div className="bg-[#081020] p-5 rounded-xl border border-[#2A3A51] space-y-2.5">
              <div className="flex items-center gap-2 text-[#28D99B] font-bold">
                <Luggage className="w-4 h-4" />
                <span>Luggage & Baggage Allowance</span>
              </div>
              <p className="text-[#A4B2C8] leading-relaxed">
                On Dubai Metro, each passenger is permitted up to 2 pieces of luggage: 1 large suitcase (max 81cm x 58cm x 30cm) and 1 handbag or cabin size bag. Left luggage facilities are available at T1 & T3 for 40–50 AED / 12 hours.
              </p>
            </div>

            <div className="bg-[#081020] p-5 rounded-xl border border-[#2A3A51] space-y-2.5">
              <div className="flex items-center gap-2 text-[#21C9E8] font-bold">
                <Car className="w-4 h-4" />
                <span>Official Taxi & Ride-Hail Ranks</span>
              </div>
              <p className="text-[#A4B2C8] leading-relaxed">
                Official DTC cream taxis feature a fixed 25 AED flag drop from DXB. Ride-hail apps (Careem & Uber) have designated pickup zones on Level 2 of Terminal 1 & 3 Arrivals car parks.
              </p>
            </div>

            <div className="bg-[#081020] p-5 rounded-xl border border-[#2A3A51] space-y-2.5">
              <div className="flex items-center gap-2 text-[#A855F7] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Return Buffer & Security Protocol</span>
              </div>
              <p className="text-[#A4B2C8] leading-relaxed">
                Always budget 2 hours and 30 minutes for returning to DXB, clearing passport control, and reaching your departure gate. Use DXB Smart Gates for rapid biometrics passport verification.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Modal Dialog for Option Details */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#142238] border border-[#2A3A51] rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <h3 className="text-xl font-bold font-display text-white mb-2">{modalState.title}</h3>
            <p className="text-xs font-mono text-[#21C9E8] mb-4 uppercase">Transport Route Telemetry Details</p>

            <ul className="space-y-3 font-mono text-xs text-[#A4B2C8] mb-6">
              {modalState.details.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#28D99B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2A3A51]">
              <button
                onClick={() => setModalState({ ...modalState, isOpen: false })}
                className="bg-[#081020] hover:bg-[#2A3A51] text-white px-4 py-2 rounded-xl text-xs font-bold font-mono transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleConfirmTransport}
                className="bg-[#FFB21A] hover:bg-amber-400 text-[#080D1B] px-4 py-2 rounded-xl text-xs font-bold font-display transition-colors"
              >
                Confirm Transport Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
