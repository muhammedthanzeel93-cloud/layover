import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExperienceCard from './ExperienceCard';
import type { ExperienceProps } from '../types';

export default function ExperiencesSection() {
  const experiences: ExperienceProps[] = [
    {
      id: 'exp-dubai',
      name: 'Burj Khalifa & Dubai Fountain Express',
      city: 'Dubai',
      airportCode: 'DXB',
      description: 'Ascend the world\'s tallest skyscraper and experience the majestic musical fountain show right in Downtown Dubai.',
      duration: '2.5 Hours',
      proximity: '18m from DXB',
      priceAed: 185,
      rating: 4.9,
      reviewsCount: 1240,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
      metroStation: 'Direct DXB Metro Red Line Connection',
    },
    {
      id: 'exp-qatar',
      name: 'Souq Waqif & Doha Corniche Heritage Walk',
      city: 'Qatar (Doha)',
      airportCode: 'DOH',
      description: 'Wander authentic spice souqs, the Falcon market, and scenic seaside Corniche with views of Doha\'s illuminated skyline.',
      duration: '3.0 Hours',
      proximity: '15m from DOH',
      priceAed: 150,
      rating: 4.92,
      reviewsCount: 940,
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&q=80&w=800',
      metroStation: 'Doha Metro Gold Line (Souq Waqif Station)',
    },
    {
      id: 'exp-calicut',
      name: 'Calicut Beach, SM Street & Halwa Food Trail',
      city: 'Calicut (Kozhikode)',
      airportCode: 'CCJ',
      description: 'Savor legendary Kozhikodan Biryani, explore the century-old Mittai Theruvu (SM Street), and watch sunset over Calicut Beach Pier.',
      duration: '3.5 Hours',
      proximity: '28m from CCJ',
      priceAed: 85,
      rating: 4.96,
      reviewsCount: 1120,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
      metroStation: 'Direct KSRTC Fast Passenger & Airport AC Shuttle',
    },
    {
      id: 'exp-trivandrum',
      name: 'Padmanabhaswamy Temple & Kovalam Beach Express',
      city: 'Trivandrum',
      airportCode: 'TRV',
      description: 'Marvel at the ancient Dravidian architecture of Padmanabhaswamy Temple and unwind along the golden sands of Kovalam Lighthouse Beach.',
      duration: '3.0 Hours',
      proximity: '20m from TRV',
      priceAed: 95,
      rating: 4.89,
      reviewsCount: 880,
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800',
      metroStation: 'Pre-paid TRV Taxi & Rapid Highway Link',
    },
    {
      id: 'exp-singapore',
      name: 'Jewel Changi Waterfall & Gardens Tour',
      city: 'Singapore',
      airportCode: 'SIN',
      description: 'Marvel at the HSBC Rain Vortex, explore lush indoor canopy parks, and stroll through futuristic Gardens by the Bay.',
      duration: '3.0 Hours',
      proximity: '10m from SIN',
      priceAed: 140,
      rating: 4.95,
      reviewsCount: 980,
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800',
      metroStation: 'Changi Airport MRT Direct Link',
    },
    {
      id: 'exp-istanbul',
      name: 'Bosphorus Cruise & Old City Panorama',
      city: 'Istanbul',
      airportCode: 'IST',
      description: 'Cross continents between Europe and Asia on a private Bosphorus cruise with panoramic views of the Hagia Sophia.',
      duration: '3.5 Hours',
      proximity: '25m from IST',
      priceAed: 165,
      rating: 4.88,
      reviewsCount: 860,
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800',
      metroStation: 'M11 Airport Metro Connection',
    },
  ];

  return (
    <section className="py-20 bg-[#080D1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141D30] border border-[#FFB21A]/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB21A]" />
              <span className="text-xs font-mono text-[#FFB21A] uppercase font-bold tracking-wider">
                CURATED MINI STOPOVERS
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white">
              Premium Stopover Experiences
            </h2>
          </div>

          <Link
            to="/explore"
            className="text-xs font-mono text-[#FFB21A] hover:underline flex items-center gap-1 mt-3 md:mt-0 font-bold"
          >
            <span>Explore All 25+ Global Hub Experiences</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>

      </div>
    </section>
  );
}
