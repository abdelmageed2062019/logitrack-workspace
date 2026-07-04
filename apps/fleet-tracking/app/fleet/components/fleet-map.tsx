"use client";

import { memo, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Truck as TruckIcon } from "lucide-react";
import { Truck } from "../../utils/fleet-simulator";

import "leaflet/dist/leaflet.css";

interface FleetMapProps {
  staticTrucks: Truck[];
}

const FleetMap = memo(function FleetMap({ staticTrucks }: FleetMapProps) {
  const preferCanvas = true;

  const icons = useMemo(() => {
    const makeIcon = (color: string) =>
      divIcon({
        html: renderToStaticMarkup(
          <TruckIcon size={28} color={color} fill={`${color}33`} strokeWidth={2.5} />,
        ),
        className: "bg-transparent border-none !shadow-none",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
    return {
      active: makeIcon("#3B82F6"),
      idle: makeIcon("#EAB308"),
      emergency: makeIcon("#EF4444"),
    };
  }, []);

  const iconMap: Record<string, string> = {
    active: "active",
    idle: "idle",
    emergency: "emergency",
  };

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

        {staticTrucks.map((truck) => {
          const iconKey = iconMap[truck.status] ?? "active";

          return (
            <Marker
              key={truck.id}
              position={[truck.latitude, truck.longitude]}
              icon={icons[iconKey as keyof typeof icons]}
            >
              <Popup>
                <div className="text-right font-sans p-1 text-slate-900" dir="rtl">
                  <h3 className="font-bold border-b pb-1 mb-1 text-blue-600">{truck.id}</h3>
                  <p><b>رقم اللوحة:</b> {truck.plateNumber}</p>
                  <p><b>السائق:</b> {truck.driverName}</p>
                  <p><b>السرعة:</b> <span className="font-mono">{truck.speed}</span> كم/س</p>
                  <p><b>مستوى الوقود:</b> <span className="font-mono">{truck.fuelLevel}%</span></p>
                  <p><b>الحالة:</b> {truck.status === 'emergency' ? '🚨 طوارئ' : truck.status === 'idle' ? '⚠️ متوقف' : '✅ نشط'}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="absolute bottom-4 left-4 z-[1000] bg-slate-900/90 border border-slate-800 p-3 rounded-lg text-xs space-y-1 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <TruckIcon size={16} color="#3B82F6" fill="#3B82F633" strokeWidth={2.5} />
          <span>شاحنة نشطة متحركة</span>
        </div>
        <div className="flex items-center gap-2">
          <TruckIcon size={16} color="#EAB308" fill="#EAB30833" strokeWidth={2.5} />
          <span>شاحنة متوقفة (Idle)</span>
        </div>
        <div className="flex items-center gap-2">
          <TruckIcon size={16} color="#EF4444" fill="#EF444433" strokeWidth={2.5} />
          <span>🚨 حالة طوارئ حرجة</span>
        </div>
      </div>
    </div>
  );
});

export default FleetMap;
