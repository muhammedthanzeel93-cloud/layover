import { expect, test, describe } from 'vitest';
import { calculateDistance, findNearestStation } from './routing';
import { calculateTaxiFare, calculateRideHailFare } from './fare';

const tariffs = {
  taxi: { flagFall: 5, airportFlagFall: 25, perKm: 2.14, minFare: 12, nightSurcharge: 0 },
  metro: { flatRate: 5 },
  rideHail: { multiplier: 1.3 }
};

describe('Routing Logic', () => {
  test('calculateDistance should return distance between two points', () => {
    const p1 = { lat: 25.1972, lng: 55.2744 }; // Burj Khalifa
    const p2 = { lat: 25.2532, lng: 55.3657 }; // DXB Airport
    const distance = calculateDistance(p1, p2);
    expect(distance).toBeGreaterThan(10);
    expect(distance).toBeLessThan(15);
  });

  test('findNearestStation should find the closest station', () => {
    const p1 = { lat: 25.1972, lng: 55.2744 }; 
    const stations = [
      { id: 's1', name: 'Far Station', lat: 25.0, lng: 55.0, mode: 'metro' },
      { id: 's2', name: 'Close Station', lat: 25.20, lng: 55.27, mode: 'metro' },
    ];
    const nearest = findNearestStation(p1, stations);
    expect(nearest?.id).toBe('s2');
  });
});

describe('Fare Logic', () => {
  test('calculateTaxiFare from airport applies airport flag fall', () => {
    const airport = { lat: 25.2532, lng: 55.3657, isAirport: true };
    const dest = { lat: 25.1972, lng: 55.2744 }; // dist ~11.1km
    const fare = calculateTaxiFare(airport, dest, tariffs);
    
    const dist = calculateDistance(airport, dest);
    const expected = 25 + dist * 2.14;
    expect(fare).toBeCloseTo(expected, 2);
  });

  test('calculateTaxiFare enforces min fare', () => {
    const p1 = { lat: 25.1972, lng: 55.2744 };
    const p2 = { lat: 25.1973, lng: 55.2745 }; // very close
    const fare = calculateTaxiFare(p1, p2, tariffs);
    expect(fare).toBe(12); // minimum fare is 12
  });

  test('calculateRideHailFare applies multiplier', () => {
    const p1 = { lat: 25.1972, lng: 55.2744 };
    const p2 = { lat: 25.2532, lng: 55.3657 };
    const taxiFare = calculateTaxiFare(p1, p2, tariffs);
    const rideHailFare = calculateRideHailFare(p1, p2, tariffs);
    expect(rideHailFare).toBeCloseTo(taxiFare * 1.3, 2);
  });
});
