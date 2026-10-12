import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ExperienceProps } from '../types';

export default function ExperienceCard({ exp }: { exp: ExperienceProps }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#141D30] rounded-2xl border border-[#1E293B] overflow-hidden group hover:border-[#FFB21A]/60 transition-all duration-300 shadow-2xl flex flex-col justify-between">
      <div>
        {/* Large Image Header */}
        <div className="h-56 relative overflow-hidden">
          <img
            src={exp.image}
            alt={exp.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141D30] via-transparent to-black/30"></div>

          {/* Proximity Tag */}
          <div className="absolute top-3 right-3 bg-[#080D1B]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-[#FFB21A] border border-[#FFB21A]/40 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#12C8E8]" />
            <span>{exp.proximity}</span>
          </div>

          {/* Airport Code Chip */}
          <div className="absolute top-3 left-3 bg-[#1B263C]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-white border border-[#1E293B]">
            {exp.airportCode} HUB
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold font-mono">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{exp.rating}</span>
              <span className="text-[#A6B1C8] font-normal">({exp.reviewsCount} reviews)</span>
            </div>
            <span className="text-xs font-mono text-[#24D69A] bg-[#24D69A]/10 px-2 py-0.5 rounded border border-[#24D69A]/30">
              {exp.duration} Turnaround
            </span>
          </div>

          <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-[#FFB21A] transition-colors">
            {exp.name}
          </h3>

          <p className="text-[#A6B1C8] text-xs leading-relaxed font-sans mb-4">
            {exp.description}
          </p>

          <div className="text-xs font-mono text-[#12C8E8] bg-[#12C8E8]/10 p-2.5 rounded-xl border border-[#12C8E8]/20 flex items-center gap-2 mb-4">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{exp.metroStation}</span>
          </div>
        </div>
      </div>

      {/* Card Footer Price & Action */}
      <div className="p-6 pt-0 border-t border-[#1E293B]/60 flex items-center justify-between mt-auto">
        <div>
          <span className="text-[10px] font-mono text-[#A6B1C8] uppercase block">Starting From</span>
          <span className="text-xl font-bold font-mono text-[#FFB21A]">{exp.priceAed} AED</span>
        </div>

        <button
          onClick={() => navigate('/itinerary')}
          className="bg-[#1B263C] hover:bg-[#FFB21A] hover:text-[#080D1B] text-white px-5 py-2.5 rounded-xl font-bold font-display text-xs transition-all flex items-center gap-1.5 border border-[#1E293B] group-hover:border-[#FFB21A]"
        >
          <span>View Experience</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
