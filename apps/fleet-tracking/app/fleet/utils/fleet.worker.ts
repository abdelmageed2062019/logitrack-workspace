import { fleetStream$, Truck } from "../../utils/fleet-simulator";

let subscription: ReturnType<typeof fleetStream$.subscribe> | null = null;
let currentFilter: 'all' | 'emergency' | 'idle' | 'active' = 'emergency';

self.onmessage = (event: MessageEvent) => {
  if (event.data.type === "SET_FILTER") {
    currentFilter = event.data.filter;
    return;
  }

  if (event.data === "START_SIMULATION") {
    subscription = fleetStream$.subscribe((fleet: Truck[]) => {
      const filteredFleet = fleet.filter(truck => {
        if (currentFilter === 'all') return true;
        return truck.status === currentFilter;
      });

      self.postMessage(filteredFleet);
    });
  }

  if (event.data === "STOP_SIMULATION") {
    if (subscription) subscription.unsubscribe();
  }
};
