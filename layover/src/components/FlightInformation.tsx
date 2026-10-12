import { Plane, ShieldCheck } from 'lucide-react';
import { useLayover } from '../context/LayoverContext';

export default function FlightInformation() {
  const { flight } = useLayover();

  const totalHours = (flight.layoverDurationMinutes / 60).toFixed(1);
  const safeHours = (flight.safeExplorationWindowMinutes / 60).toFixed(1);

  return (
    <div className="bg-[#142035] p-6 rounded-2xl border border-[#293950] mb-8 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#293950] mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFAD18]/10 text-[#FFAD18] flex items-center justify-center font-bold">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-[#F5F7FC]">Flight & Timing Schedule</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-mono">
              <span className="text-[#12C8E8] font-semibold">{flight.originAirport || 'Calicut (CCJ)'}</span>
              <span className="text-slate-500">➔</span>
              <span className="text-[#FFAD18] font-bold bg-[#FFAD18]/10 px-2 py-0.5 rounded border border-[#FFAD18]/30">
                Transit: {flight.terminal}
              </span>
              <span className="text-slate-500">➔</span>
              <span className="text-[#26D6A0] font-semibold">{flight.destinationAirport || 'Dubai (DXB)'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#26D6A0]/10 border border-[#26D6A0]/30 text-xs font-mono text-[#26D6A0]">
          <ShieldCheck className="w-4 h-4" />
          <span>Flight Sync: Verified Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
        
        {/* Inbound Flight */}
        <div className="bg-[#080E1D] p-4 rounded-xl border border-[#293950]">
          <span className="text-[#9EACC3] uppercase block mb-1">Inbound Flight</span>
          <span className="text-base font-bold font-display text-white block">{flight.inboundFlight}</span>
          <span className="text-[#28C8E8] block mt-1">Landing: {flight.arrivalTime} ({flight.terminal})</span>
        </div>

        {/* Outbound Flight */}
        <div className="bg-[#080E1D] p-4 rounded-xl border border-[#293950]">
          <span className="text-[#9EACC3] uppercase block mb-1">Outbound Flight</span>
          <span className="text-base font-bold font-display text-white block">{flight.outboundFlight}</span>
          <span className="text-[#FFAD18] block mt-1">Boarding: {flight.departureTime} ({flight.terminal})</span>
        </div>

        {/* Layover Window */}
        <div className="bg-[#080E1D] p-4 rounded-xl border border-[#293950]">
          <span className="text-[#9EACC3] uppercase block mb-1">Total Layover Duration</span>
          <span className="text-base font-bold font-display text-white block">{totalHours} Hours</span>
          <span className="text-[#9EACC3] block mt-1">({flight.layoverDurationMinutes} mins total)</span>
        </div>

        {/* Mandatory Return Time */}
        <div className="bg-[#080E1D] p-4 rounded-xl border border-[#26D6A0]/30">
          <span className="text-[#26D6A0] uppercase block mb-1">Recommended Return to Gate</span>
          <span className="text-base font-bold font-display text-[#26D6A0] block">2h 30m Before Boarding</span>
          <span className="text-[#9EACC3] block mt-1">Safe Exploration: {safeHours}h</span>
        </div>

      </div>
    </div>
  );
}
