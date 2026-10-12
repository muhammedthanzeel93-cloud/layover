// src/lib/routing.ts

export interface Point {
  lat: number;
  lng: number;
  isAirport?: boolean;
}

export interface Station extends Point {
  id: string;
  name: string;
  mode: string;
}

// Haversine formula to calculate distance in km
export function calculateDistance(p1: Point, p2: Point): number {
  const R = 6371; // Earth's radius in km
  const dLat = (p2.lat - p1.lat) * (Math.PI / 180);
  const dLng = (p2.lng - p1.lng) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat * (Math.PI / 180)) * Math.cos(p2.lat * (Math.PI / 180)) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find nearest station
export function findNearestStation(point: Point, stations: Station[]): Station | null {
  if (!stations.length) return null;
  let nearest = stations[0];
  let minDistance = calculateDistance(point, nearest);
  
  for (let i = 1; i < stations.length; i++) {
    const d = calculateDistance(point, stations[i]);
    if (d < minDistance) {
      minDistance = d;
      nearest = stations[i];
    }
  }
  return nearest;
}
