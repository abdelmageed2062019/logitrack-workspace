"use client";

import { useEffect, useState } from "react";
import { fleetStream$, Truck } from "./utils/fleet-simulator";

export default function FleetPage() {
  const [activeCount, setActiveCount] = useState<number>(0);

  useEffect(() => {
    const subscription = fleetStream$.subscribe((fleet: Truck[]) => {
      console.log(`[RxJS Stream] تم استقبال بيانات ${fleet.length} شاحنة حية.`);

      const active = fleet.filter(t => t.status === 'active').length;
      setActiveCount(active);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-white" dir="rtl">
      <h1 className="text-2xl font-bold text-blue-500 mb-2">شاشة المراقبة اللحظية (Fleet Live Tracking)</h1>
      <p className="text-slate-400 mb-4">يتم الآن محاكاة استقبال الإحداثيات الحية لـ 2000 شاحنة عبر RxJS Streams.</p>
      <div className="bg-slate-950 p-4 rounded-lg inline-block">
        <span className="text-slate-500">عدد الشاحنات المتحركة حالياً: </span>
        <span className="text-green-400 font-mono font-bold text-xl">{activeCount} شاحنة</span>
      </div>
    </div>
  );
}