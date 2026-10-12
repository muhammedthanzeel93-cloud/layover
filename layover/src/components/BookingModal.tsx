import { X, CreditCard, Clock, Plane, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCost: number;
}

export default function BookingModal({ isOpen, onClose, totalCost }: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Secure Your Layover</h2>
              <p className="text-slate-400">Lock in your itinerary and transit passes.</p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400">Total Transit Cost</span>
              <span className="font-medium">{totalCost.toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400">Service Fee</span>
              <span className="font-medium text-emerald-400">Free*</span>
            </div>
            <div className="h-px w-full bg-slate-700 my-4"></div>
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Amount Due</span>
              <span className="text-amber-500">{totalCost.toFixed(2)} AED</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-medium text-slate-300">Payment Method</h3>
            <div className="flex gap-4">
              <div className="flex-1 border border-amber-500/50 bg-amber-500/10 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                <CreditCard className="text-amber-500 w-5 h-5" />
                <span className="font-medium">Credit Card</span>
              </div>
              <div className="flex-1 border border-slate-700 bg-slate-800/50 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-slate-600 transition-colors">
                <span className="font-medium">Apple Pay</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 mb-8 text-sm text-blue-200">
            <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
            <p>Your booking includes guaranteed return-to-airport tracking. If you miss your connection due to our transit partners, we cover your rebooking.</p>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
          >
            <Clock className="w-5 h-5" />
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
