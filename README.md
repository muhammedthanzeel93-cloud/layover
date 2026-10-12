# ✈️ LAYOVER — Dubai Airport Transit Guide & Fare Calculator

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

🌐 Live Demo: https://layover.ugsidharth.in/

**LAYOVER** is a high-precision, tactical airport stopover travel platform designed specifically for international transit passengers at **Dubai International Airport (DXB)**. It empowers travelers to maximize layovers ranging from 4 to 12 hours with guaranteed flight-synced return-to-gate protection.

---

## 🌟 Key Application Features

### 1. 🚊 DXB Live Transit Guide & Fare Comparison (`/transit`)
- **Multi-Modal Telemetry**: Real-time fare and duration comparison across 4 transit modes:
  - **Dubai Metro Red Line**: `5.00 AED` per person (0% Traffic Risk, 100% Reliable).
  - **Official Airport Taxi (DTC)**: `~48.75 AED` (Fixed 25 AED DXB flag-drop).
  - **Careem / Uber Saloon**: `~63.37 AED` (Upfront fixed app fares).
  - **Private Executive Chauffeur & Van**: `~120.00 AED` (Meet & greet at arrival hall).
- **Peak Traffic Telemetry Warning**: Sheikh Zayed Road (E11) rush-hour alerts (17:00–19:30).
- **Interactive Route Selector**: Terminal selection (`T1`, `T2`, `T3`), destination selection, and traveler count multiplier.
- **Interactive Leaflet Map**: Visual route line connecting DXB concourses to city landmarks.
- **Sortable Comparison Matrix**: Filter by Lowest Price or Fastest Duration.

### 2. 🗺️ Discover Dubai Attractions & Transit Protocols (`/explore`)
- **24+ Turnaround Sightseeing Cards**: Curated high-res destinations (Burj Khalifa, Dubai Mall, Museum of the Future, Gold Souk, Palm Jumeirah, Dubai Marina, etc.).
- **Category Filter Pills & Search**: Instant searching across `Landmark`, `Shopping`, `Viewpoint`, `Beach`, `Entertainment`, and `Culture`.
- **Turnaround Window Badges**: Displays recommended visit durations (e.g., `REC. WINDOW: 2.5h`) and nearest Metro links.
- **Interactive Bookmarking**: Save attractions directly to your layover plan with `Add to Layover Plan +`.
- **DXB Insider Travel Protocols**: 6 operational guides covering Left Luggage Storage (T1/T3), Smart Gates Biometric Clearance (<60s fast track), Nol Silver Transit Cards, and 24/7 Tourist Police support.

### 3. ⏱️ Smart Itinerary Builder & Time Budget Allocation Gauge (`/itinerary`)
- **Drag-and-Drop Reordering**: Built with `@dnd-kit` for frictionless stop reordering.
- **Automated Buffer Verification**: Evaluates total transit + sightseeing time against DXB's mandatory 150-minute (2h 30m) security & gate clearance buffer.
- **Stopover Ledger**: Real-time currency switching (**AED**, **USD**, **EUR**) and total package cost calculation (Transit + Entry Tickets + Luggage Storage).
- **Offline Boarding Pass & QR Generator**: Pass ID verification for DXB Smart Gates and Metro stewards.

### 4. ⚙️ Admin Management Dashboard (`/admin`)
- Control panel to edit telemetry tariffs, manage places data, update flight concourse presets, and inspect transit metrics.

---

## 🎨 Design System

- **Theme**: Premium Dark Travel Dashboard.
- **Color Tokens**:
  - Main Background: Deep Navy (`#080D1B`, `#081020`)
  - Card Surfaces: Dark Blue-Gray (`#141E32`, `#142238`)
  - Primary Accent: Electric Purple (`#7957FF`)
  - CTA Accent: Golden Yellow (`#FFB21A`)
  - Status Accents: Cyan (`#21C9E8`) & Emerald Green (`#28D99B`)
  - Border Accents: Subtraction Slate (`#2A3A51`, `#293950`)
- **Typography**: Space Grotesk (Headings), Geist & Inter (Body), JetBrains Mono (Telemetry/Timestamps).

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript |
| **Build Tool** | Vite v6 |
| **Styling & Design** | Tailwind CSS v4 + Vanilla CSS |
| **Routing** | React Router DOM v7 |
| **Drag & Drop** | `@dnd-kit/core`, `@dnd-kit/sortable` |
| **Mapping Engine** | `leaflet`, `react-leaflet` |
| **Icons** | `lucide-react` |
| **Containerization** | Docker & Docker Compose |

---

## 📂 Project Structure

```
layover/
├── public/                  # Static assets & icons
├── src/
│   ├── components/          # Reusable UI Components
│   │   ├── Navbar.tsx       # Sticky top navigation & DXB clock
│   │   ├── Footer.tsx       # Structured footer & newsletter briefing
│   │   ├── MapComponent.tsx # Leaflet route visualization map
│   │   ├── FlightInformation.tsx # Flight timing & gate buffer cards
│   │   └── TravelDetailsAccordion.tsx # DXB policy accordions
│   ├── context/
│   │   └── LayoverContext.tsx # Centralized state (Flight, Stops, Currency, Transport)
│   ├── data/
│   │   ├── places.json      # 25+ Dubai attractions seed data
│   │   ├── stations.json    # Dubai Metro station coordinates
│   │   └── tariffs.json     # Taxi & Metro fare configuration
│   ├── lib/
│   │   ├── fare.ts          # Fare calculation formulas (Taxi, Metro, Ride-Hail)
│   │   └── routing.ts       # Haversine distance & nearest station algorithms
│   ├── pages/
│   │   ├── LandingPage.tsx  # Hero landing page & quick route search
│   │   ├── TransitPage.tsx  # Live Transit Guide & Fare Telemetry Cards
│   │   ├── ExplorePage.tsx  # Discover Dubai Attractions & Travel Protocols
│   │   ├── ItineraryPage.tsx# Smart Itinerary Builder & Time Ledger
│   │   └── Admin.tsx        # Management dashboard
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces & types
│   ├── App.tsx              # Router & layout entry point
│   ├── main.tsx             # Application mount point
│   └── index.css            # Fonts, Tailwind v4 directives & scrollbars
├── Dockerfile               # Production container definition
├── docker-compose.yml       # Docker compose orchestration
├── package.json             # Dependencies & scripts
└── vite.config.ts           # Vite configuration
```

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### 1. Clone the Repository
```bash
git clone https://github.com/UG-SIDHARTH/otta_mind.git
cd otta_mind/layover
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5174](http://localhost:5174)** in your web browser.

---

## 🐳 Docker Deployment

To run the application inside a containerized environment:

```bash
# Build and launch containers
docker-compose up --build -d

# Stop containers
docker-compose down
```

---

## 📑 Application Routes Reference

- **Home Landing Page**: `/`
- **Live Transit Guide & Fare Telemetry**: `/transit`
- **Discover Dubai Attractions & Protocols**: `/explore`
- **Smart Itinerary Builder**: `/itinerary`
- **Admin Dashboard**: `/admin`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).


👌👌