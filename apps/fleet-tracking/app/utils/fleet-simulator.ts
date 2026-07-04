import { timer, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface Truck {
     id: string;
     plateNumber: string;
     driverName: string;
     latitude: number;
     longitude: number;
     speed: number;
     fuelLevel: number;
     status: 'active' | 'idle' | 'emergency';
}

const CAIRO_LAT = 30.0444;
const CAIRO_LNG = 31.2357;

const generateInitialFleet = (count: number = 2000): Truck[] => {
      const fleet: Truck[] = [];

      for (let i = 1; i <= count; i++) {
          fleet.push({
               id: `TRUCK-${String(i).padStart(4, '0')}`,
               plateNumber: `أ ج  ${1000 + i}`,
               driverName: `سائق محاكي ${i}`,
               latitude: CAIRO_LAT + (Math.random() - 0.5) * 0.5,
               longitude: CAIRO_LNG + (Math.random() - 0.5) * 0.5,
               speed: Math.floor(Math.random() * 100),
               fuelLevel: Math.floor(Math.random() * 40) + 60,
               status: Math.random() > 0.95 ? 'emergency' : Math.random() > 0.8 ? 'idle' : 'active'
          });
     }
     return fleet;
}

let currentFleetState: Truck[] = generateInitialFleet();

export const fleetStream$: Observable<Truck[]> = timer(0, 1000).pipe(
     map(() => {
          currentFleetState = currentFleetState.map(truck => {
               if (truck.status === 'idle') {
                    return truck;
               }

               const latDelta = (Math.random() - 0.5) * 0.001;
               const lngDelta = (Math.random() - 0.5) * 0.001;
               const speedDelta = (Math.random() - 0.5) * 10;
               const newSpeed = Math.max(0, truck.speed + speedDelta);
               const newFuel = Math.max(0, truck.fuelLevel - newSpeed * 0.01);

               return {
                    ...truck,
                    latitude: truck.latitude + latDelta,
                    longitude: truck.longitude + lngDelta,
                    speed: newSpeed,
                    fuelLevel: parseFloat(newFuel.toFixed(2)),
                    status: newFuel < 10 ? 'idle' : truck.status
               };
          })
          return currentFleetState;
     }),
     shareReplay(1)
);