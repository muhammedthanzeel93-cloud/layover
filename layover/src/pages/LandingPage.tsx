import HeroSection from '../components/HeroSection';
import GuaranteeSection from '../components/GuaranteeSection';
import ExperiencesSection from '../components/ExperiencesSection';
import RouteIntelligence from '../components/RouteIntelligence';
import StopoverCTA from '../components/StopoverCTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080D1B] text-slate-100 pt-16">
      {/* B. Hero Section & Search Panel */}
      <HeroSection />

      {/* C. The Zero-Miss Guarantee */}
      <GuaranteeSection />

      {/* D. Premium Stopover Experiences */}
      <ExperiencesSection />

      {/* E. Transit Route Intelligence */}
      <RouteIntelligence />

      {/* F. Stopover CTA Section */}
      <StopoverCTA />

      {/* G. Footer */}
      <Footer />
    </div>
  );
}
