# ✈️ LAYOVER — Dubai Airport Transit Guide & Fare Calculator

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**LAYOVER** is a tactical airport stopover travel platform designed specifically for international transit passengers at **Dubai International Airport (DXB)**.

---

## 🌟 Key Application Features

- **DXB Live Transit Guide & Fare Telemetry (`/transit`)**: Real-time fare and duration telemetry comparing Dubai Metro Red Line, Official Airport Taxis (DTC), Careem/Uber Saloon, and Private Chauffeurs.
- **Discover Dubai & Transit Protocols (`/explore`)**: 24+ turnaround sightseeing cards, category filters, bookmarking, and essential airport protocols (Left Luggage Storage, Smart Gates Fast-Track, Nol Silver Cards).
- **Smart Itinerary Builder & Time Ledger (`/itinerary`)**: Drag-and-drop timeline builder (`@dnd-kit`) with automated 150-minute DXB gate buffer checks and real-time currency switching (AED, USD, EUR).
- **Interactive Leaflet Route Maps**: Visual route display connecting DXB T1/T2/T3 concourses to city landmarks.
- **Offline Boarding Pass & QR Generator**: Digital stopover pass with safe return window verification.
- **Admin Dashboard (`/admin`)**: Management dashboard to update fare tariffs and places data.

---

## 🚀 How to Run Locally

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

Open **[http://localhost:5174](http://localhost:5174)** in your web browser.

---

## 🐳 Docker Containerization

```bash
# Start Docker container
docker-compose up --build -d

# Stop Docker container
docker-compose down
```
