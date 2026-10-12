import { useState } from 'react';
import { Plane, Send, Globe, Share2, MessageSquare, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#060E20] border-t border-[#1E293B] text-[#A6B1C8] pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E293B]">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-[#FFB21A] flex items-center justify-center text-[#080D1B] font-bold shadow-lg shadow-[#FFB21A]/20">
                <Plane className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-display">LAYOVER</span>
                <span className="text-[10px] font-mono text-[#A6B1C8] tracking-widest block -mt-1">TACTICAL TRAVEL PLANNER</span>
              </div>
            </Link>

            <p className="text-xs text-[#A6B1C8] leading-relaxed max-w-sm mb-6">
              The premier stopover travel platform designed for international transit passengers at Dubai International Airport (DXB). Guarantees flight-synced return-to-gate protection.
            </p>

            <div className="flex items-center gap-3 text-[#A6B1C8]">
              <a href="#" className="w-8 h-8 rounded-lg bg-[#141D30] border border-[#1E293B] flex items-center justify-center hover:text-white hover:border-[#FFB21A] transition-colors" title="Global Platform">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#141D30] border border-[#1E293B] flex items-center justify-center hover:text-white hover:border-[#FFB21A] transition-colors" title="Share Experience">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#141D30] border border-[#1E293B] flex items-center justify-center hover:text-white hover:border-[#FFB21A] transition-colors" title="Community Chat">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-bold text-white font-display text-sm uppercase tracking-wider mb-4">Explore Sights</h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li><Link to="/explore" className="hover:text-[#FFB21A] transition-colors">Burj Khalifa Express</Link></li>
              <li><Link to="/explore" className="hover:text-[#FFB21A] transition-colors">Museum of the Future</Link></li>
              <li><Link to="/explore" className="hover:text-[#FFB21A] transition-colors">Dubai Frame & Parks</Link></li>
              <li><Link to="/explore" className="hover:text-[#FFB21A] transition-colors">Gold & Spice Souks</Link></li>
              <li><Link to="/explore" className="hover:text-[#FFB21A] transition-colors">Palm Jumeirah Boardwalk</Link></li>
            </ul>
          </div>

          {/* Travel Services */}
          <div>
            <h4 className="font-bold text-white font-display text-sm uppercase tracking-wider mb-4">Travel Services</h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li><Link to="/itinerary" className="hover:text-[#FFB21A] transition-colors">Itinerary Builder</Link></li>
              <li><Link to="/transit" className="hover:text-[#FFB21A] transition-colors">Dubai Metro Telemetry</Link></li>
              <li><Link to="/transit" className="hover:text-[#FFB21A] transition-colors">DXB Airport Taxi Fares</Link></li>
              <li><Link to="/explore" className="hover:text-[#FFB21A] transition-colors">DXB Left Luggage Tip</Link></li>
              <li><Link to="/admin" className="hover:text-[#FFB21A] transition-colors">Admin Hub</Link></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 className="font-bold text-white font-display text-sm uppercase tracking-wider mb-4">Layover Briefing</h4>
            <p className="text-xs text-[#A6B1C8] mb-3 leading-relaxed">
              Get monthly flight-synced stopover routes & visa hacks directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#141D30] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white placeholder-[#A6B1C8] focus:outline-none focus:border-[#FFB21A]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FFB21A] hover:bg-amber-400 text-[#080D1B] py-2 rounded-xl text-xs font-bold font-display transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Subscribe Briefing</span>
                <Send className="w-3.5 h-3.5" />
              </button>
              {subscribed && (
                <div className="text-[11px] font-mono text-[#24D69A] mt-1">
                  ✓ Subscribed to DXB Telemetry Briefings!
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#A6B1C8]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#24D69A]" />
            <span>Official DXB Gate Buffer Protocol Engine • Version 2.4</span>
          </div>
          <p>
            © 2026 LAYOVER Inc. All rights reserved. Built with precision for DXB Transit Travelers.
          </p>
        </div>

      </div>
    </footer>
  );
}
