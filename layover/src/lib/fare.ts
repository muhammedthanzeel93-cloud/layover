// src/lib/fare.ts
import { calculateDistance } from './routing';
import type { Point } from './routing';

export interface Tariffs {
  taxi: { flagFall: number; airportFlagFall: number; perKm: number; minFare: number; nightSurcharge: number };
  metro: { flatRate: number };
  rideHail: { multiplier: number };
}

export function calculateTaxiFare(origin: Point, dest: Point, tariffs: Tariffs): number {
  const distance = calculateDistance(origin, dest);
  const flagFall = origin.isAirport ? tariffs.taxi.airportFlagFall : tariffs.taxi.flagFall;
  const fare = flagFall + (distance * tariffs.taxi.perKm);
  return Math.max(fare, tariffs.taxi.minFare);
}

export function calculateRideHailFare(origin: Point, dest: Point, tariffs: Tariffs): number {
  const baseTaxiFare = calculateTaxiFare(origin, dest, tariffs);
  return baseTaxiFare * tariffs.rideHail.multiplier;
}

export function calculateMetroFare(tariffs: Tariffs): number {
  return tariffs.metro.flatRate; // Using simplified flat rate as per seed data
}
