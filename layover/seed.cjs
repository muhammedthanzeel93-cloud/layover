const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper to generate some places
const places = [
  { id: 'p1', name: 'Burj Khalifa', lat: 25.1972, lng: 55.2744, category: 'Landmark', description: 'Tallest building in the world.', bestTime: 'Sunset', isAirport: false },
  { id: 'p2', name: 'Dubai Mall', lat: 25.1975, lng: 55.2796, category: 'Shopping', description: 'Massive shopping and entertainment destination.', bestTime: 'Morning', isAirport: false },
  { id: 'p3', name: 'Dubai International Airport (DXB)', lat: 25.2532, lng: 55.3657, category: 'Airport', description: 'Main international airport of Dubai.', bestTime: 'Anytime', isAirport: true },
  { id: 'p4', name: 'Palm Jumeirah Boardwalk', lat: 25.1305, lng: 55.1171, category: 'Viewpoint', description: 'Scenic walkway on the Palm.', bestTime: 'Evening', isAirport: false },
  { id: 'p5', name: 'Dubai Marina Walk', lat: 25.0805, lng: 55.1403, category: 'Entertainment', description: 'Waterfront walkway with restaurants.', bestTime: 'Evening', isAirport: false },
  { id: 'p6', name: 'JBR Beach', lat: 25.0763, lng: 55.1325, category: 'Beach', description: 'Popular public beach with facilities.', bestTime: 'Morning', isAirport: false },
  { id: 'p7', name: 'Burj Al Arab', lat: 25.1412, lng: 55.1852, category: 'Landmark', description: 'Iconic sail-shaped luxury hotel.', bestTime: 'Afternoon', isAirport: false },
  { id: 'p8', name: 'Souk Madinat Jumeirah', lat: 25.1345, lng: 55.1855, category: 'Shopping', description: 'Traditional-style market with water canals.', bestTime: 'Evening', isAirport: false },
  { id: 'p9', name: 'Dubai Frame', lat: 25.2355, lng: 55.3003, category: 'Landmark', description: 'Giant frame offering views of old and new Dubai.', bestTime: 'Morning', isAirport: false },
  { id: 'p10', name: 'Gold Souk', lat: 25.2695, lng: 55.2974, category: 'Shopping', description: 'Traditional market famous for gold jewelry.', bestTime: 'Evening', isAirport: false },
  { id: 'p11', name: 'Spice Souk', lat: 25.2673, lng: 55.2952, category: 'Shopping', description: 'Market offering various spices and herbs.', bestTime: 'Evening', isAirport: false },
  { id: 'p12', name: 'Dubai Creek', lat: 25.2625, lng: 55.3168, category: 'Nature', description: 'Historic saltwater creek.', bestTime: 'Sunset', isAirport: false },
  { id: 'p13', name: 'Museum of the Future', lat: 25.2192, lng: 55.2819, category: 'Museum', description: 'Exhibits focused on future technologies.', bestTime: 'Morning', isAirport: false },
  { id: 'p14', name: 'Kite Beach', lat: 25.1648, lng: 55.2081, category: 'Beach', description: 'Popular spot for kitesurfing and water sports.', bestTime: 'Afternoon', isAirport: false },
  { id: 'p15', name: 'Dubai Miracle Garden', lat: 25.0597, lng: 55.2445, category: 'Nature', description: 'World\'s largest natural flower garden.', bestTime: 'Morning', isAirport: false },
  { id: 'p16', name: 'Global Village', lat: 25.0673, lng: 55.3045, category: 'Entertainment', description: 'Cultural, entertainment and shopping project.', bestTime: 'Evening', isAirport: false },
  { id: 'p17', name: 'Ski Dubai', lat: 25.1181, lng: 55.1972, category: 'Entertainment', description: 'Indoor ski resort in Mall of the Emirates.', bestTime: 'Anytime', isAirport: false },
  { id: 'p18', name: 'Atlantis The Palm', lat: 25.1304, lng: 55.1171, category: 'Resort', description: 'Ocean-themed resort on the Palm.', bestTime: 'Afternoon', isAirport: false },
  { id: 'p19', name: 'Dubai Opera', lat: 25.1971, lng: 55.2758, category: 'Culture', description: 'Performing arts centre.', bestTime: 'Evening', isAirport: false },
  { id: 'p20', name: 'Al Fahidi Historical Neighbourhood', lat: 25.2635, lng: 55.3005, category: 'Culture', description: 'Preserved historic district.', bestTime: 'Morning', isAirport: false },
  { id: 'p21', name: 'Jumeirah Mosque', lat: 25.2341, lng: 55.2657, category: 'Culture', description: 'Beautiful mosque open to non-Muslims.', bestTime: 'Morning', isAirport: false },
  { id: 'p22', name: 'La Mer', lat: 25.2268, lng: 55.2573, category: 'Beach', description: 'Beachfront dining and leisure.', bestTime: 'Afternoon', isAirport: false },
  { id: 'p23', name: 'IMG Worlds of Adventure', lat: 25.0807, lng: 55.3182, category: 'Entertainment', description: 'Indoor amusement park.', bestTime: 'Anytime', isAirport: false },
  { id: 'p24', name: 'Dubai Safari Park', lat: 25.1764, lng: 55.4485, category: 'Nature', description: 'Wildlife park housing thousands of animals.', bestTime: 'Morning', isAirport: false },
  { id: 'p25', name: 'Ain Dubai', lat: 25.0796, lng: 55.1226, category: 'Landmark', description: 'Highest observation wheel in the world.', bestTime: 'Sunset', isAirport: false },
];

const stations = [
  { id: 's1', name: 'Burj Khalifa/Dubai Mall Metro', lat: 25.2012, lng: 55.2736, mode: 'metro' },
  { id: 's2', name: 'Airport Terminal 1 Metro', lat: 25.2476, lng: 55.3414, mode: 'metro' },
  { id: 's3', name: 'Airport Terminal 3 Metro', lat: 25.2497, lng: 55.3601, mode: 'metro' },
  { id: 's4', name: 'Dubai Marina Metro', lat: 25.0782, lng: 55.1436, mode: 'metro' },
  { id: 's5', name: 'Mall of the Emirates Metro', lat: 25.1186, lng: 55.2008, mode: 'metro' },
  { id: 's6', name: 'Union Metro Station', lat: 25.2661, lng: 55.3175, mode: 'metro' },
  { id: 's7', name: 'BurJuman Metro Station', lat: 25.2538, lng: 55.3023, mode: 'metro' },
];

const tariffs = {
  taxi: {
    flagFall: 12,
    airportFlagFall: 25,
    perKm: 2.14,
    minFare: 12,
    nightSurcharge: 0 // In reality night flagfall is higher, but simplified
  },
  metro: {
    flatRate: 5 // simplified for hackathon
  },
  rideHail: {
    multiplier: 1.3
  }
};

fs.writeFileSync(path.join(dataDir, 'places.json'), JSON.stringify(places, null, 2));
fs.writeFileSync(path.join(dataDir, 'stations.json'), JSON.stringify(stations, null, 2));
fs.writeFileSync(path.join(dataDir, 'tariffs.json'), JSON.stringify(tariffs, null, 2));

console.log('Seed data generated.');
