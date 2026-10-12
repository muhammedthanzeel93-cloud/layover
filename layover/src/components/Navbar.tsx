import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plane, Compass, Navigation, MapPin, Clock, ShieldCheck, Menu, X, User, Sparkles } from 'lucide-react';
import { useLayover } from '../context/LayoverContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight } = useLayover();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dxbTime, setDxbTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const dxb = new Date(utc + 3600000 * 4);
      setDxbTime(dxb.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: Plane },
    { path: '/explore', label: 'Explore', icon: MapPin },
    { path: '/itinerary', label: 'Itinerary Builder', icon: Compass },
    { path: '/transit', label: 'Transit Telemetry', icon: Navigation },
  ];

  const safeHours = (flight.safeExplorationWindowMinutes / 60).toFixed(1);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080D1B]/95 backdrop-blur-md border-b border-[#1E293B] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & DXB Badge */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#FFB21A] flex items-center justify-center text-[#080D1B] font-bold shadow-lg shadow-[#FFB21A]/20 transform group-hover:rotate-12 transition-transform">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-display">LAYOVER</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#FFB21A]/20 text-[#FFB21A] border border-[#FFB21A]/30">
                  DXB {flight.terminal}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#A6B1C8] tracking-widest block -mt-1">TACTICAL TRAVEL PLANNER</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#141D30]/80 p-1.5 rounded-xl border border-[#1E293B]">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#FFB21A] text-[#080D1B] font-bold shadow-md shadow-[#FFB21A]/20'
                      : 'text-[#A6B1C8] hover:text-white hover:bg-[#1B263C]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Clock, Safe Window & Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live DXB Concourse Clock */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141D30] border border-[#1E293B] font-mono text-xs text-[#A6B1C8]">
              <Clock className="w-3.5 h-3.5 text-[#12C8E8]" />
              <span className="text-white font-semibold">{dxbTime || '02:06:47'}</span>
              <span className="text-[10px] text-[#12C8E8]">DXB GMT+4</span>
            </div>

            {/* Safe Window Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24D69A]/10 border border-[#24D69A]/30 font-mono text-xs text-[#24D69A]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safe Window: <strong>{safeHours}h</strong></span>
            </div>

            {/* Golden Yellow Action Button */}
            <button
              onClick={() => navigate('/itinerary')}
              className="bg-[#FFB21A] hover:bg-amber-400 text-[#080D1B] px-4 py-2 rounded-xl text-xs font-bold font-display shadow-lg shadow-[#FFB21A]/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan Your Adventure</span>
            </button>

            {/* Profile Avatar Icon */}
            <Link to="/admin" className="w-9 h-9 rounded-xl bg-[#141D30] border border-[#1E293B] flex items-center justify-center text-[#A6B1C8] hover:text-white hover:border-[#FFB21A] transition-colors" title="Admin Dashboard">
              <User className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#141D30] text-[#A6B1C8] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080D1B] border-b border-[#1E293B] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                  isActive ? 'bg-[#FFB21A] text-[#080D1B] font-bold' : 'text-[#A6B1C8] hover:bg-[#141D30] hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 border-t border-[#1E293B] flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); navigate('/itinerary'); }}
              className="w-full bg-[#FFB21A] text-[#080D1B] py-3 rounded-xl font-bold font-display"
            >
              Plan Your Adventure
            </button>

            <div className="flex items-center justify-between text-xs font-mono text-[#A6B1C8] bg-[#141D30] p-3 rounded-xl">
              <span>DXB Local Time:</span>
              <span className="text-[#12C8E8] font-bold">{dxbTime}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
