import { Train, Car, Smartphone, Footprints, Bike } from 'lucide-react';

export default function InsiderTips() {
  return (
    <div className="py-20 bg-slate-900 border-t border-slate-800" id="tips">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Insider Travel Tips</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Navigating Dubai during a layover is easy when you know how the locals do it. Here is your ultimate cheat sheet for getting around.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Metro */}
          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 mb-4">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">The Dubai Metro</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              The smartest route for solo travelers. It connects directly from Airport Terminals 1 & 3 to major hubs like the Burj Khalifa and Dubai Marina. 
            </p>
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 text-xs text-slate-300">
              <strong className="text-amber-500">Pro Tip:</strong> Buy a red or silver Nol card at the airport station. Trains run above ground offering a great scenic view!
            </div>
          </div>

          {/* Taxis */}
          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 mb-4">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Standard Taxis</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Ubiquitous, metered, and strictly regulated. Perfect if you have heavy luggage or are traveling with family. Look for the cream-colored cars.
            </p>
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 text-xs text-slate-300">
              <strong className="text-amber-500">Keep in mind:</strong> Airport pickups automatically add a 25 AED flag-fall fee.
            </div>
          </div>

          {/* Ride Hail */}
          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-500 mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Uber & Careem</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Want a premium Lexus ride or just want to pay seamlessly via app? Careem is the local giant (owned by Uber) and works flawlessly across the city.
            </p>
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 text-xs text-slate-300">
              <strong className="text-amber-500">Hack:</strong> Use the "Hala Taxi" option in the Careem app to get a standard taxi without the Uber premium markup.
            </div>
          </div>

          {/* Micro-Mobility */}
          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-colors">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-500 mb-4">
              <Bike className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">E-Scooters & Bikes</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Not for airport transfers, but amazing for exploring! Once you are in Downtown Dubai or the Marina, renting a Tier or Careem Bike is highly recommended.
            </p>
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 text-xs text-slate-300">
              <strong className="text-amber-500">Best Route:</strong> Ride around the Mohammed Bin Rashid Boulevard circling the Burj Khalifa.
            </div>
          </div>

          {/* Walking */}
          <div className="md:col-span-2 lg:col-span-2 bg-slate-800/50 p-6 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-colors flex flex-col justify-center">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-500 shrink-0">
                <Footprints className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">The Walking Hack (Burj Khalifa to Dubai Mall)</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-2xl">
                  If your itinerary includes moving from the Burj Khalifa to the Dubai Mall (or vice versa), <strong>do not take a taxi!</strong> The two landmarks are physically connected. You can walk straight out of the mall's lower ground floor directly to the Burj Khalifa entrance and the dancing fountains. Save that taxi fare for a coffee instead! ☕
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
