import { Banknote, TrendingUp, Handshake } from 'lucide-react';

export default function HowWeMakeMoney() {
  return (
    <div className="py-24 bg-slate-900 border-y border-slate-800" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Transparent Business Model</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We believe in complete transparency. Our core itinerary builder and transit guide are completely free to use. Here's how Layover sustains its business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700 hover:bg-slate-800/50 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 mb-6">
              <Banknote className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Affiliate Partnerships</h3>
            <p className="text-slate-400 leading-relaxed">
              When you book a ride-hail, transit pass, or attraction ticket through our app, we earn a small commission from the provider at no extra cost to you.
            </p>
          </div>

          <div className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700 hover:bg-slate-800/50 transition-colors">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Premium Experiences</h3>
            <p className="text-slate-400 leading-relaxed">
              We offer exclusive, curated layover packages—such as VIP lounge access and private express tours—which include a modest service fee for our coordination.
            </p>
          </div>

          <div className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700 hover:bg-slate-800/50 transition-colors">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-500 mb-6">
              <Handshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">B2B Integration</h3>
            <p className="text-slate-400 leading-relaxed">
              Airlines and travel agencies license our technology to offer better layover experiences to their own passengers, creating a steady revenue stream.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
