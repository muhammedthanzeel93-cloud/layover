import { ShieldCheck, Headset, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

export default function GuaranteeSection() {
  const features = [
    {
      icon: ShieldCheck,
      color: 'text-[#24D69A]',
      bgColor: 'bg-[#24D69A]/10',
      borderColor: 'border-[#24D69A]/30',
      tag: 'Zero-Miss Protection',
      title: 'Time Locked Safety',
      description:
        'Every itinerary automatically deducts a mandatory 150-minute security & TSA buffer. You get a strict, flight-synced return countdown so you never miss a connection.',
    },
    {
      icon: Headset,
      color: 'text-[#12C8E8]',
      bgColor: 'bg-[#12C8E8]/10',
      borderColor: 'border-[#12C8E8]/30',
      tag: 'Real-Time Flight Tracking',
      title: '24/7 Travel Support',
      description:
        'Live gate status tracking, concourse notifications, and 24/7 WhatsApp emergency transit support throughout your Dubai stopover.',
    },
    {
      icon: Sparkles,
      color: 'text-[#FFB21A]',
      bgColor: 'bg-[#FFB21A]/10',
      borderColor: 'border-[#FFB21A]/30',
      tag: 'Turnaround Optimized',
      title: 'Curated Mini Stopovers',
      description:
        'Handpicked micro-tours starting right from arrivals. Explore the Burj Khalifa, Dubai Mall, or Museum of the Future with guaranteed back-to-gate times.',
    },
  ];

  return (
    <section className="py-20 bg-[#080D1B] border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141D30] border border-[#FFB21A]/30 mb-4">
            <CheckCircle2 className="w-4 h-4 text-[#FFB21A]" />
            <span className="text-xs font-mono text-[#FFB21A] uppercase font-bold tracking-wider">
              GUARANTEED ON-TIME RETURN TO GATE
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white mb-4">
            The Zero-Miss Guarantee
          </h2>
          <p className="text-[#A6B1C8] text-base md:text-lg">
            Built with avionic precision for international transit passengers. Explore the city with 100% confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`bg-[#141D30] p-8 rounded-2xl border ${item.borderColor} shadow-2xl relative overflow-hidden group hover:border-[#FFB21A]/60 transition-colors flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center shadow-inner`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full ${item.bgColor} ${item.color} border border-current`}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-display text-white mb-3">{item.title}</h3>
                  <p className="text-[#A6B1C8] text-sm leading-relaxed font-sans">{item.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1E293B] flex items-center gap-2 text-xs font-mono text-[#A6B1C8]">
                  <Clock className="w-3.5 h-3.5 text-[#FFB21A]" />
                  <span>Verified DXB Protocol Compliance</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
