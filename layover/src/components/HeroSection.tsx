import TravelSearch from './TravelSearch';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#1E293B] bg-gradient-to-b from-[#080D1B] via-[#080D1B] to-[#141D30]/40 py-16 lg:py-24">
      {/* Background Radar Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFB21A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Heading & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141D30] border border-[#FFB21A]/30 mb-6 shadow-lg shadow-[#FFB21A]/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#24D69A] animate-pulse"></span>
            <span className="text-xs font-mono tracking-wider text-[#FFB21A] uppercase font-semibold">
              DXB STOPOVER TELEMETRY ENGINE • ACTIVE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white mb-6 leading-tight">
            YOUR LAYOVER.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB21A] to-amber-300">
              YOUR ADVENTURE.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#A6B1C8] leading-relaxed max-w-2xl mx-auto font-sans">
            Don't just wait in the terminal. Turn boring transit hours into curated micro-experiences, premium lounges, and express city tours tailored precisely to your flight schedule.
          </p>
        </div>

        {/* Travel Search Panel */}
        <div className="max-w-4xl mx-auto">
          <TravelSearch />
        </div>

      </div>
    </section>
  );
}
