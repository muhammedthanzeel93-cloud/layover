import { useState } from 'react';
import {
  Train,
  ShieldCheck,
  CreditCard,
  Luggage,
  Zap,
  Sparkles,
  Search,
  ChevronRight,
  Heart,
  ArrowRight,
  Bookmark,
  PhoneCall,
  Globe,
  Compass,
  Star,
  BookOpen,
  CheckCircle2,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import placesData from '../data/places.json';
import Footer from '../components/Footer';

interface AttractionDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  bestTime: string;
  proximityMins: number;
  turnaroundWindow: string;
  image: string;
  nearestStation: string;
  rating: number;
  reviewsCount: number;
  costAed: number;
}

export default function ExplorePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['p1', 'p13']);
  const [selectedAttraction, setSelectedAttraction] = useState<AttractionDetail | null>(null);

  const categories = ['All', 'Landmark', 'Shopping', 'Viewpoint', 'Beach', 'Entertainment', 'Culture'];

  const imageMap: Record<string, string> = {
    p1: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    p2: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800',
    p4: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&q=80&w=800',
    p5: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=800',
    p6: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    p7: 'https://images.unsplash.com/photo-1526495124112-1056c40e0482?auto=format&fit=crop&q=80&w=800',
    p8: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=800',
    p9: 'https://images.unsplash.com/photo-1629814421183-9b6d85918731?auto=format&fit=crop&q=80&w=800',
    p10: 'https://images.unsplash.com/photo-1546412414-8035e1786b22?auto=format&fit=crop&q=80&w=800',
    p11: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&q=80&w=800',
    p12: 'https://images.unsplash.com/photo-1578895210405-907db48a7111?auto=format&fit=crop&q=80&w=800',
    p13: 'https://images.unsplash.com/photo-1629814421183-9b6d85918731?auto=format&fit=crop&q=80&w=800',
    p14: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    p15: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    p16: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    p17: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    p18: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    p19: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=800',
    p20: 'https://images.unsplash.com/photo-1578895210405-907db48a7111?auto=format&fit=crop&q=80&w=800',
    p21: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800',
    p22: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    p23: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800',
    p24: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=800',
    p25: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800',
    // Calicut (CCJ) Destinations
    p27: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800', // Calicut Beach
    p28: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&q=80&w=800', // SM Street Bazaar
    p29: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800', // Beypore Port
    // Trivandrum (TRV) Destinations
    p31: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800', // Padmanabhaswamy Temple
    p32: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800', // Kovalam Beach
    p33: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800', // Napier Museum
    // Qatar / Doha (DOH) Destinations
    p35: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&q=80&w=800', // Souq Waqif
    p36: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', // Museum of Islamic Art
    p37: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800', // Doha Corniche
  };

  const curatedSights: AttractionDetail[] = placesData
    .filter((p) => !p.isAirport)
    .map((p, idx) => ({
      ...p,
      proximityMins: 14 + ((idx * 4) % 28),
      turnaroundWindow: idx % 3 === 0 ? '1.5h' : idx % 2 === 0 ? '2.5h' : '3.5h',
      image: imageMap[p.id] || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
      nearestStation: `${p.name.split(' ')[0]} Metro Station`,
      rating: Math.round((4.7 + (idx % 3) * 0.1) * 10) / 10,
      reviewsCount: 850 + idx * 45,
      costAed: idx % 2 === 0 ? 5.00 : 7.50,
    }));

  const filteredSights = curatedSights.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const protocolCards = [
    {
      icon: Luggage,
      title: 'DXB Left Luggage Storage',
      tag: 'T1 & T3 Concourses',
      color: 'text-[#21C9E8]',
      bgColor: 'bg-[#21C9E8]/10',
      borderColor: 'border-[#21C9E8]/40 hover:border-[#21C9E8]',
      desc: 'Store heavy bags at Terminal 1 or Terminal 3 Arrivals concourses (~40–50 AED for 12 hours) to explore Dubai baggage-free.',
      linkText: 'Read Storage Guide',
    },
    {
      icon: Zap,
      title: 'Smart Gates Biometric Clearance',
      tag: '< 60s Fast-Track',
      color: 'text-[#FFB21A]',
      bgColor: 'bg-[#FFB21A]/10',
      borderColor: 'border-[#FFB21A]/40 hover:border-[#FFB21A]',
      desc: 'All eligible passport holders can scan directly through DXB biometric Smart Gates in under 60 seconds without immigration queues.',
      linkText: 'Check Eligibility',
    },
    {
      icon: ShieldCheck,
      title: '150-Min Mandatory Return Rule',
      tag: 'Safety Guarantee',
      color: 'text-[#28D99B]',
      bgColor: 'bg-[#28D99B]/10',
      borderColor: 'border-[#28D99B]/40 hover:border-[#28D99B]',
      desc: 'Always plan your return arrival at DXB concourse at least 2h 30m prior to your outbound flight to guarantee gate clearance.',
      linkText: 'View Buffer Protocol',
    },
    {
      icon: CreditCard,
      title: 'Express 24h Nol Pass Hub',
      tag: 'Nol Silver Card 25 AED',
      color: 'text-[#A855F7]',
      bgColor: 'bg-[#A855F7]/10',
      borderColor: 'border-[#A855F7]/40 hover:border-[#A855F7]',
      desc: 'Buy a Nol Silver Card at DXB Metro Station (25 AED cost includes 19 AED pre-loaded e-credit) for seamless train and bus fares.',
      linkText: 'Metro Fares & Zones',
    },
    {
      icon: Globe,
      title: 'UAE Visa & Entry Requirements',
      tag: 'Official Visa Rules',
      color: 'text-[#FFB21A]',
      bgColor: 'bg-[#FFB21A]/10',
      borderColor: 'border-[#FFB21A]/40 hover:border-[#FFB21A]',
      desc: 'Certain nationalities receive free 48h/96h transit visas on arrival. Verify official UAE entry rules prior to boarding.',
      linkText: 'Check Visa Rules',
    },
    {
      icon: PhoneCall,
      title: 'Travel Safety & Emergency Contacts',
      tag: '24/7 Support',
      color: 'text-[#EC4899]',
      bgColor: 'bg-[#EC4899]/10',
      borderColor: 'border-[#EC4899]/40 hover:border-[#EC4899]',
      desc: '24/7 Dubai Tourist Police Hotline (901) and DXB Medical Center assistance available for international transit passengers.',
      linkText: 'View Safety Contacts',
    },
  ];

  const travelTips = [
    {
      id: 'tip-1',
      title: 'Best Time to Visit Dubai on a Stopover',
      category: 'SEASONAL GUIDE',
      readTime: '4 min read',
      date: 'Updated Oct 2026',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
      desc: 'November to April offers optimal 24°C outdoor weather for strolling Downtown Dubai, beach promenades, and desert safari layovers.',
    },
    {
      id: 'tip-2',
      title: 'How to Make the Most of a 6-Hour DXB Layover',
      category: 'STOPOVER PROTOCOL',
      readTime: '6 min read',
      date: 'Updated Oct 2026',
      image: 'https://images.unsplash.com/photo-1629814421183-9b6d85918731?auto=format&fit=crop&q=80&w=800',
      desc: 'Step-by-step route map connecting Terminal 3 directly to Burj Khalifa and Museum of the Future with guaranteed 2.5-hour safety buffer.',
    },
    {
      id: 'tip-3',
      title: 'Local Experiences & Hidden Souks You Shouldn\'t Miss',
      category: 'CULTURAL INSIGHTS',
      readTime: '5 min read',
      date: 'Updated Oct 2026',
      image: 'https://images.unsplash.com/photo-1546412414-8035e1786b22?auto=format&fit=crop&q=80&w=800',
      desc: 'Navigate historic Gold & Spice Souks, cross Dubai Creek on a 1 AED traditional wooden abra boat, and sample local Karak chai.',
    }
  ];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((bId) => bId !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#080D1C] text-[#F4F7FC] pt-20 pb-16 font-sans">
      {/* Outer Purple Border Container Accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner Section */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#141E32] to-[#0D1425] border border-[#7957FF]/40 p-8 md:p-12 mb-12 shadow-2xl overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7957FF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#21C9E8]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7957FF]/20 border border-[#7957FF]/40 text-[#7957FF] text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>YOUR SMART GUIDE TO DUBAI</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white mb-4 leading-tight">
              Discover Dubai Attractions & <span className="text-[#FFB21A]">Stopover Essentials</span>
            </h1>

            <p className="text-[#A6B1C8] text-base md:text-lg mb-8 leading-relaxed">
              Explore iconic landmarks, hidden gems, local experiences, and everything you need to make the most of your Dubai International Airport stopover.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('attractions-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#7957FF] hover:bg-[#6844FF] text-white px-6 py-3.5 rounded-xl font-bold font-display text-sm transition-all shadow-lg shadow-[#7957FF]/25 flex items-center gap-2"
              >
                <span>Explore Attractions</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/itinerary')}
                className="bg-[#FFB21A] hover:bg-amber-400 text-[#080D1C] px-6 py-3.5 rounded-xl font-bold font-display text-sm transition-all shadow-lg shadow-[#FFB21A]/20 flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Plan Your Stopover</span>
              </button>
            </div>

            {/* Travel Info Strip */}
            <div className="mt-10 pt-6 border-t border-[#7957FF]/20 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs text-[#A6B1C8]">
              <div>
                <span className="text-[10px] uppercase text-[#7957FF] block mb-0.5">HUB AIRPORT</span>
                <span className="text-white font-bold">DXB Terminals 1, 2, 3</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#21C9E8] block mb-0.5">METRO ACCESS</span>
                <span className="text-white font-bold">Direct Red Line Connection</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#28D99B] block mb-0.5">SMART GATES</span>
                <span className="text-white font-bold">&lt; 60s Fast Clearance</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#FFB21A] block mb-0.5">SAFE BUFFER</span>
                <span className="text-white font-bold">150 Mins Return Protocol</span>
              </div>
            </div>
          </div>
        </div>

        {/* DXB Insider Travel Protocols Section */}
        <div className="mb-16">
          <div className="mb-8">
            <div className="text-xs font-mono text-[#7957FF] uppercase tracking-widest mb-1 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ESSENTIAL TRANSIT PROTOCOLS</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white">
              DXB Insider Travel Protocols
            </h2>
            <p className="text-sm text-[#A6B1C8] mt-1 max-w-2xl">
              Verified operational guides for luggage storage, biometric clearance, Nol transit cards, and emergency support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protocolCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className={`bg-[#141E32] p-6 rounded-2xl border ${card.borderColor} shadow-2xl flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${card.bgColor} ${card.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full ${card.bgColor} ${card.color} border border-current/20`}>
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-white font-display mb-2">{card.title}</h3>
                    <p className="text-xs text-[#A6B1C8] leading-relaxed font-sans mb-6">{card.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-[#7957FF]/20 flex items-center justify-between">
                    <button
                      onClick={() => navigate('/transit')}
                      className={`text-xs font-mono font-bold ${card.color} hover:underline flex items-center gap-1`}
                    >
                      <span>{card.linkText}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attraction Discovery Section */}
        <div id="attractions-grid" className="mb-16 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="text-xs font-mono text-[#FFB21A] uppercase tracking-widest mb-1 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5" />
                <span>TURNAROUND SIGHTSEEING</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white">
                Explore Dubai Attractions
              </h2>
            </div>

            {/* Search Field */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#A6B1C8] absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search sights or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141E32] border border-[#7957FF]/30 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-[#A6B1C8] focus:outline-none focus:border-[#7957FF] transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#7957FF] text-white shadow-md shadow-[#7957FF]/30'
                    : 'bg-[#141E32] text-[#A6B1C8] hover:text-white border border-[#7957FF]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 4-Column Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSights.map((sight) => {
              const isBookmarked = bookmarkedIds.includes(sight.id);
              return (
                <div
                  key={sight.id}
                  onClick={() => setSelectedAttraction(sight)}
                  className="bg-[#141E32] rounded-2xl border border-[#7957FF]/30 hover:border-[#7957FF] overflow-hidden group transition-all duration-300 shadow-2xl flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                >
                  <div>
                    {/* Attraction Image Header */}
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={sight.image}
                        alt={sight.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141E32] via-transparent to-black/30" />

                      {/* Bookmark Icon */}
                      <button
                        onClick={(e) => toggleBookmark(sight.id, e)}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                          isBookmarked
                            ? 'bg-[#FFB21A] text-[#080D1C]'
                            : 'bg-[#080D1C]/80 text-[#A6B1C8] hover:text-white'
                        }`}
                        title={isBookmarked ? 'Remove Bookmark' : 'Add to Layover Plan'}
                      >
                        <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-[#080D1C]' : ''}`} />
                      </button>

                      {/* Rec Window Badge */}
                      <div className="absolute top-3 left-3 bg-[#080D1C]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-[#21C9E8] border border-[#21C9E8]/30">
                        REC. WINDOW: {sight.turnaroundWindow}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#7957FF] font-bold uppercase px-2 py-0.5 rounded bg-[#7957FF]/10 border border-[#7957FF]/30">
                          {sight.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-mono text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{sight.rating}</span>
                          <span className="text-[#A6B1C8] font-normal text-[10px]">({sight.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-lg text-white font-display mb-2 group-hover:text-[#FFB21A] transition-colors">
                        {sight.name}
                      </h3>
                      <p className="text-xs text-[#A6B1C8] leading-relaxed mb-4 line-clamp-2">
                        {sight.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#28D99B] bg-[#28D99B]/10 p-2 rounded-lg border border-[#28D99B]/20">
                        <Train className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{sight.nearestStation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(sight.id, e);
                      }}
                      className={`w-full py-2.5 rounded-xl font-bold font-display text-xs transition-all flex items-center justify-center gap-1.5 border ${
                        isBookmarked
                          ? 'bg-[#28D99B]/10 border-[#28D99B] text-[#28D99B]'
                          : 'bg-[#080D1C] border-[#7957FF]/30 hover:border-[#FFB21A] text-white hover:bg-[#FFB21A] hover:text-[#080D1C]'
                      }`}
                    >
                      {isBookmarked ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Bookmarked ✓</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5 text-[#FFB21A]" />
                          <span>Add to Layover Plan +</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Travel Tips & Recommendations Section */}
        <div className="mb-16">
          <div className="mb-8">
            <div className="text-xs font-mono text-[#28D99B] uppercase tracking-widest mb-1 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>INSIDER RECOMMENDATIONS</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white">
              Travel Tips & Editorial Guides
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {travelTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-[#141E32] rounded-2xl border border-[#7957FF]/30 overflow-hidden group hover:border-[#FFB21A] transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[#080D1C]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-[#FFB21A] border border-[#FFB21A]/30">
                      {tip.readTime}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] font-mono text-[#7957FF] font-bold uppercase block mb-1">
                      {tip.category}
                    </span>
                    <h3 className="font-bold text-lg text-white font-display mb-2 group-hover:text-[#FFB21A] transition-colors">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-[#A6B1C8] leading-relaxed mb-4">
                      {tip.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#7957FF]/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A6B1C8] text-[10px]">{tip.date}</span>
                  <button
                    onClick={() => navigate('/itinerary')}
                    className="text-[#FFB21A] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#141E32] via-[#0D1425] to-[#7957FF]/20 border border-[#7957FF]/40 p-8 md:p-12 mb-16 shadow-2xl overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-extrabold font-display text-white mb-2">
              Ready for Your Dubai Stopover?
            </h2>
            <p className="text-[#A6B1C8] text-sm md:text-base">
              Turn your layover into an unforgettable Dubai experience with our curated flight-synced travel guides and fare calculators.
            </p>
          </div>

          <button
            onClick={() => navigate('/itinerary')}
            className="bg-[#FFB21A] hover:bg-amber-400 text-[#080D1C] px-8 py-4 rounded-2xl font-bold font-display text-base transition-all shadow-xl shadow-[#FFB21A]/20 shrink-0 flex items-center gap-2"
          >
            <Compass className="w-5 h-5" />
            <span>Plan Your Stopover</span>
          </button>
        </div>

      </div>

      {/* Modal Dialog for Attraction Spec */}
      {selectedAttraction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141E32] border border-[#7957FF]/50 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedAttraction(null)}
              className="absolute top-4 right-4 text-[#A6B1C8] hover:text-white p-2 rounded-xl bg-[#080D1C]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-48 rounded-2xl overflow-hidden mb-6 relative">
              <img
                src={selectedAttraction.image}
                alt={selectedAttraction.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#080D1C]/90 px-3 py-1 rounded-lg text-xs font-mono text-[#21C9E8]">
                {selectedAttraction.category}
              </div>
            </div>

            <h3 className="text-2xl font-bold font-display text-white mb-2">{selectedAttraction.name}</h3>
            <p className="text-xs text-[#A6B1C8] leading-relaxed mb-6">{selectedAttraction.description}</p>

            <div className="space-y-2.5 font-mono text-xs text-[#A6B1C8] bg-[#080D1C] p-4 rounded-xl border border-[#7957FF]/30 mb-6">
              <div className="flex justify-between">
                <span>Direct Airport Distance:</span>
                <span className="text-white font-bold">{selectedAttraction.proximityMins} mins via Metro</span>
              </div>
              <div className="flex justify-between">
                <span>Recommended Visit Window:</span>
                <span className="text-[#21C9E8] font-bold">{selectedAttraction.turnaroundWindow}</span>
              </div>
              <div className="flex justify-between">
                <span>Metro Station Link:</span>
                <span className="text-[#28D99B] font-bold">{selectedAttraction.nearestStation}</span>
              </div>
              <div className="flex justify-between">
                <span>Est. Metro Ticket Cost:</span>
                <span className="text-[#FFB21A] font-bold">{selectedAttraction.costAed} AED</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedAttraction(null)}
                className="w-1/2 bg-[#080D1C] hover:bg-[#141E32] text-white py-3 rounded-xl text-xs font-bold font-mono border border-[#7957FF]/30 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedAttraction(null);
                  navigate('/itinerary');
                }}
                className="w-1/2 bg-[#FFB21A] hover:bg-amber-400 text-[#080D1C] py-3 rounded-xl text-xs font-bold font-display transition-colors"
              >
                Add to Itinerary
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
