import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LayoverProvider } from './context/LayoverContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ItineraryPage from './pages/ItineraryPage';
import TransitPage from './pages/TransitPage';
import ExplorePage from './pages/ExplorePage';
import Admin from './pages/Admin';

function App() {
  return (
    <LayoverProvider>
      <Router>
        <div className="min-h-screen bg-[#0B1326] text-slate-100 font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/transit" element={<TransitPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </LayoverProvider>
  );
}

export default App;
