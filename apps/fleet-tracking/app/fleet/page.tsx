"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Truck } from "../utils/fleet-simulator";
import FleetSidebar from "./components/fleet-sidebar";

const FleetMap = dynamic(() => import("./components/fleet-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60vh] bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-400 text-sm font-medium">جاري تحميل نظام الخرائط الجغرافية والتحقق من الـ 2000 شاحنة...</p>
      </div>
    </div>
  )
});

export default function FleetPage() {
  const [trucksData, setTrucksData] = useState<Truck[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'emergency' | 'idle' | 'active'>('emergency');
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(
      new URL("./utils/fleet.worker.ts", import.meta.url),
      { type: "module" }
    );
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<Truck[]>) => {
      setTrucksData(event.data);
    };

    worker.postMessage({ type: "SET_FILTER", filter: activeFilter });
    worker.postMessage("START_SIMULATION");

    return () => {
      worker.postMessage("STOP_SIMULATION");
      worker.terminate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (filter: typeof activeFilter) => {
    setActiveFilter(filter);
    if (workerRef.current) {
      workerRef.current.postMessage({ type: "SET_FILTER", filter });
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">بوابة المراقبة الفائقة اللحظية 🌐</h1>
        <p className="text-slate-400 text-sm">تحكم كامل وتتبع لحظي مدعوم بمعالجة ثنائية الخيوط (Multi-threaded Pipeline).</p>
      </div>

      <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 w-fit gap-2">
        <button
          onClick={() => handleFilterChange('emergency')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeFilter === 'emergency' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🚨 الحالات الحرجة
        </button>
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeFilter === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🌐 كل الأسطول
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3">
          <FleetMap staticTrucks={trucksData} activeFilter={activeFilter} selectedTruck={selectedTruck} />
        </div>
        <div className="lg:col-span-1">
          <FleetSidebar trucks={trucksData} onTruckSelect={(truck) => setSelectedTruck(truck)} />
        </div>
      </div>
    </div>
  );
}
