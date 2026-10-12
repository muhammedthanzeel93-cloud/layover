import { useState } from 'react';
import { ChevronDown, CheckCircle2, XCircle, Info, ShieldCheck } from 'lucide-react';

export default function TravelDetailsAccordion() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const sections = [
    {
      title: "What's Included in This Layover Plan",
      icon: CheckCircle2,
      iconColor: 'text-[#26D6A0]',
      content: (
        <ul className="space-y-2 text-xs font-mono text-[#9EACC3] list-disc list-inside">
          <li>Flight-synced safe exploration window calculation subtracting 150m DXB buffer.</li>
          <li>Detailed step-by-step Dubai Metro Red Line & DTC Taxi route telemetry.</li>
          <li>Digital QR / Apple Wallet offline boarding pass generator.</li>
          <li>24/7 WhatsApp emergency transit assistant & flight gate status updates.</li>
          <li>Nol Silver Transit Card purchasing guide with 19 AED pre-loaded credit.</li>
        </ul>
      ),
    },
    {
      title: "What's Not Included",
      icon: XCircle,
      iconColor: 'text-red-400',
      content: (
        <ul className="space-y-2 text-xs font-mono text-[#9EACC3] list-disc list-inside">
          <li>Personal shopping or souvenir expenses at Dubai Mall / Souks.</li>
          <li>Burj Khalifa At The Top observatory tickets (unless pre-booked).</li>
          <li>DXB Left Luggage Storage fee (~45 AED for 12 hours).</li>
        </ul>
      ),
    },
    {
      title: "DXB Airport & Transit Protocols",
      icon: Info,
      iconColor: 'text-[#28C8E8]',
      content: (
        <div className="space-y-2 text-xs font-mono text-[#9EACC3] leading-relaxed">
          <p>• <strong>Smart Gates:</strong> Eligible passport holders can scan through DXB biometric gates in under 60 seconds.</p>
          <p>• <strong>Luggage Storage:</strong> Terminal 1 & 3 Arrivals concourses offer left luggage services starting at 40 AED.</p>
          <p>• <strong>Return Buffer:</strong> Passengers must arrive back at DXB departure concourse 2h 30m prior to flight departure.</p>
        </div>
      ),
    },
    {
      title: "Cancellation & Flexible Change Policy",
      icon: ShieldCheck,
      iconColor: 'text-[#FFAD18]',
      content: (
        <p className="text-xs font-mono text-[#9EACC3] leading-relaxed">
          Free itinerary modification and pass re-issuance up to 2 hours before scheduled landing. If your inbound flight is delayed, our system automatically recalculates your safe exploration window.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-[#142035] rounded-2xl border border-[#293950] p-6 mb-8 shadow-2xl">
      <h3 className="text-lg font-bold font-display text-white mb-6">Important Layover & Policy Details</h3>

      <div className="space-y-3">
        {sections.map((sec, idx) => {
          const isOpen = openSection === idx;
          const Icon = sec.icon;
          return (
            <div key={idx} className="bg-[#080E1D] rounded-xl border border-[#293950] overflow-hidden">
              <button
                onClick={() => setOpenSection(isOpen ? null : idx)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[#1A2940]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${sec.iconColor}`} />
                  <span className="font-bold text-sm text-white font-display">{sec.title}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#9EACC3] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FFAD18]' : ''}`} />
              </button>

              {isOpen && (
                <div className="p-4 pt-0 border-t border-[#293950]/50 font-sans">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
