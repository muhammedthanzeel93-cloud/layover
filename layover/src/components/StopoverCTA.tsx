import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

export default function StopoverCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#080D1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-[#141D30] via-[#1B263C] to-[#141D30] border border-[#FFB21A]/30 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#FFB21A]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#12C8E8]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080D1B] border border-[#FFB21A]/40 mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-[#FFB21A]" />
              <span className="text-xs font-mono text-[#FFB21A] uppercase font-bold tracking-wider">
                TACTICAL DXB STOPOVER PLANNER
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold font-display text-white mb-6 tracking-tight leading-tight">
              Make Every Minute Of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB21A] to-amber-300">Stopover Count</span>
            </h2>

            <p className="text-base md:text-xl text-[#A6B1C8] mb-10 leading-relaxed font-sans">
              Discover unforgettable experiences between flights with guaranteed, flight-synced return-to-gate protection.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Yellow Button */}
              <button
                onClick={() => navigate('/itinerary')}
                className="w-full sm:w-auto bg-[#FFB21A] hover:bg-amber-400 text-[#080D1B] px-8 py-4 rounded-xl font-bold font-display text-base shadow-xl shadow-[#FFB21A]/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Plan Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Dark Button */}
              <button
                onClick={() => navigate('/explore')}
                className="w-full sm:w-auto bg-[#141D30] hover:bg-[#1B263C] text-white px-8 py-4 rounded-xl font-bold font-display text-base border border-[#1E293B] hover:border-[#12C8E8] transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5 text-[#12C8E8]" />
                <span>Explore Experiences</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
