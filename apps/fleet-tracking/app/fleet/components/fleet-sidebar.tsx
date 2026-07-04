"use client";

import { useState } from "react";
import { List } from "react-window";
import { Truck } from "../../utils/fleet-simulator";

interface FleetSidebarProps {
  trucks: Truck[];
  onTruckSelect: (truck: Truck) => void;
}

interface RowExtraProps {
  trucks: Truck[];
  onTruckSelect: (truck: Truck) => void;
}

const Row = ({
  index,
  style,
  trucks,
  onTruckSelect,
}: { index: number; style: React.CSSProperties } & RowExtraProps) => {
  const truck = trucks[index];
  if (!truck) return null;

  const statusColors: Record<Truck["status"], string> = {
    emergency: "border-r-red-500 bg-red-950/20",
    idle: "border-r-yellow-500 bg-yellow-950/10",
    active: "border-r-blue-500 bg-blue-950/10",
  };

  return (
    <div
      style={style}
      onClick={() => onTruckSelect(truck)}
      className={`flex items-center justify-between px-4 py-2 border-r-4 border-b border-slate-800/60 cursor-pointer hover:bg-slate-800/80 transition-all ${statusColors[truck.status]}`}
    >
      <div>
        <h4 className="font-mono font-bold text-slate-200 text-sm">{truck.id}</h4>
        <p className="text-xs text-slate-400 mt-0.5">{truck.driverName}</p>
      </div>
      <div className="text-left font-sans">
        <span className="text-xs bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-300">
          {truck.plateNumber}
        </span>
        <p className="text-xs mt-1 text-slate-400">
          <span className="font-mono text-blue-400 font-semibold">{truck.speed}</span> كم/س
        </p>
      </div>
    </div>
  );
};

export default function FleetSidebar({ trucks, onTruckSelect }: FleetSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTrucks = trucks.filter(
    (truck) =>
      truck.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.plateNumber.includes(searchTerm)
  );

  return (
    <aside className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-[60vh] rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50">
        <input
          type="text"
          placeholder="ابحث برقم الشاحنة أو اللوحة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
        />
        <p className="text-xs text-slate-500 mt-2">
          نتائج البحث: <span className="font-mono font-bold text-slate-400">{filteredTrucks.length}</span> شاحنة
        </p>
      </div>

      <div className="flex-1 bg-slate-950/30">
        {filteredTrucks.length > 0 ? (
          <List<RowExtraProps>
            style={{ height: "100%" }}
            rowCount={filteredTrucks.length}
            rowHeight={65}
            rowComponent={Row}
            rowProps={{ trucks: filteredTrucks, onTruckSelect }}
          />
        ) : (
          <div className="p-8 text-center text-slate-600 text-sm">
            لا توجد شاحنات مطابقة للبحث.
          </div>
        )}
      </div>
    </aside>
  );
}
