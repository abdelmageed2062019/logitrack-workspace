"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Truck } from "../../utils/fleet-simulator";

import "leaflet/dist/leaflet.css";

interface FleetMapProps {
  staticTrucks: Truck[];
  activeFilter: string;
  selectedTruck: Truck | null;
}

function MapViewUpdater({ selectedTruck }: { selectedTruck: Truck | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedTruck) {
      map.flyTo([selectedTruck.latitude, selectedTruck.longitude], 14, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [selectedTruck, map]);
  return null;
}

export default function FleetMap({ staticTrucks, activeFilter, selectedTruck }: FleetMapProps) {
  const preferCanvas = true;

  return (
    <div className="w-full h-[60vh] rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative">
      <MapContainer
        center={[30.0444, 31.2357]}
        zoom={11}
        className="w-full h-full bg-slate-950"
        preferCanvas={preferCanvas}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <MapViewUpdater selectedTruck={selectedTruck} />

        {activeFilter === "all" ? (
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={60}
          >
            {staticTrucks.map((truck) => (
              <RenderTruckMarker key={truck.id} truck={truck} />
            ))}
          </MarkerClusterGroup>
        ) : (
          staticTrucks.map((truck) => (
            <RenderTruckMarker key={truck.id} truck={truck} />
          ))
        )}
      </MapContainer>

      <div className="absolute bottom-4 left-4 z-[1000] bg-slate-900/90 border border-slate-800 p-3 rounded-lg text-xs space-y-1 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
          <span>شاحنة نشطة متحركة</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
          <span>شاحنة متوقفة (Idle)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          <span>🚨 حالة طوارئ حرجة</span>
        </div>
      </div>
    </div>
  );
}

function RenderTruckMarker({ truck }: { truck: Truck }) {
  const markerColor =
    truck.status === "emergency"
      ? "#EF4444"
      : truck.status === "idle"
        ? "#EAB308"
        : "#3B82F6";

  return (
    <CircleMarker
      center={[truck.latitude, truck.longitude]}
      radius={4}
      pathOptions={{
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 0.8,
        weight: 1
      }}
    >
      <Popup>
        <div className="text-right font-sans p-1 text-slate-900" dir="rtl">
          <h3 className="font-bold border-b pb-1 mb-1 text-blue-600">{truck.id}</h3>
          <p><b>رقم اللوحة:</b> {truck.plateNumber}</p>
          <p><b>السائق:</b> {truck.driverName}</p>
          <p><b>السرعة:</b> <span className="font-mono">{truck.speed}</span> كم/س</p>
          <p><b>مستوى الوقود:</b> <span className="font-mono">{truck.fuelLevel}%</span></p>
        </div>
      </Popup>
    </CircleMarker>
  );
}
