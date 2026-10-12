import { useState } from 'react'
import { Plane, Compass, Calendar, Search, MapPin, Star, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import TransitGuide from '../components/TransitGuide'
import ItineraryBuilder from '../components/ItineraryBuilder'
import HowWeMakeMoney from '../components/HowWeMakeMoney'
import BookingModal from '../components/BookingModal'
import InsiderTips from '../components/InsiderTips'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-amber-500/30">
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} totalCost={125.50} />
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-amber-500/20">
                <Plane className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                Layover
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#itinerary" className="text-slate-300 hover:text-amber-400 transition-colors">Itinerary</a>
              <a href="#transit-guide" className="text-slate-300 hover:text-amber-400 transition-colors">Transit Guide</a>
              <a href="#tips" className="text-slate-300 hover:text-amber-400 transition-colors">Travel Tips</a>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
              >
                Book Now
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm font-medium text-slate-300">New premium routes available</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Make Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Layover</span>
            <br /> An Adventure
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
            Don't just wait in the terminal. Discover curated micro-experiences, premium lounges, and express city tours tailored to your transit time.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-4xl p-2 bg-slate-800/50 backdrop-blur-md rounded-3xl border border-slate-700 shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center bg-slate-900/50 rounded-2xl px-4 py-3 border border-slate-700/50 focus-within:border-amber-500/50 transition-colors">
              <MapPin className="w-5 h-5 text-amber-500 mr-3" />
              <input 
                type="text" 
                placeholder="Transit Airport" 
                className="bg-transparent border-none outline-none w-full text-slate-200 placeholder-slate-500"
              />
            </div>
            <div className="flex-1 flex items-center bg-slate-900/50 rounded-2xl px-4 py-3 border border-slate-700/50 focus-within:border-amber-500/50 transition-colors">
              <Calendar className="w-5 h-5 text-amber-500 mr-3" />
              <input 
                type="text" 
                placeholder="Layover Duration" 
                className="bg-transparent border-none outline-none w-full text-slate-200 placeholder-slate-500"
              />
            </div>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group"
            >
              <Search className="w-5 h-5" />
              <span>Explore</span>
            </button>
          </div>
        </div>
      </div>

      <ItineraryBuilder />
      <TransitGuide />
      <InsiderTips />
      <HowWeMakeMoney />

      {/* Features Section */}
      <div className="py-24 bg-slate-800/30 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-colors group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <Compass className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Express City Tours</h3>
              <p className="text-slate-400 leading-relaxed">
                Maximize your 6+ hour layovers with guided express tours starting right from the arrivals gate.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-colors group">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <Star className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Lounges</h3>
              <p className="text-slate-400 leading-relaxed">
                Instant access to world-class lounges. Shower, dine, and relax away from the terminal crowds.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-amber-500/50 transition-colors group">
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                <Plane className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Seamless Transit</h3>
              <p className="text-slate-400 leading-relaxed">
                Guaranteed return-to-gate times. We track your boarding schedule so you never miss a connection.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-amber-500" />
            <span className="text-xl font-bold text-white">Layover</span>
          </div>
          <div className="flex gap-4 items-center">
            <Link to="/admin" className="text-slate-500 hover:text-amber-500 transition-colors text-sm">
              Admin Panel
            </Link>
            <p className="text-slate-500 text-sm">
              © 2026 Layover Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
