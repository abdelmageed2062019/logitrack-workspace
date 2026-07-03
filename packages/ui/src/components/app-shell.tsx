"use client";

import React from "react";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface AppShellProps {
  children: React.ReactNode;
  currentPath: string;
}

export function AppShell({ children, currentPath }: AppShellProps) {
  const navigationItems: NavItem[] = [
    { label: "بوابة التحكم المركزية", href: "/", icon: "📊" },
    { label: "مراقبة الأساطيل (Live)", href: "/fleet", icon: "🚚" },
    { label: "إدارة شحن المخازن", href: "/warehouse", icon: "📦" },
    { label: "التحليلات والتقارير", href: "/analytics", icon: "📈" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-l border-slate-800 flex flex-col justify-between">
        <div>
          {/* Logo Section */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <span className="text-2xl">🌐</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
              LogiTrack AI
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(item.href);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* User Info Footprint */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-3 bg-slate-900/50">
          <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center font-bold text-orange-400">
            AH
          </div>
          <div>
            <h4 className="text-sm font-semibold">عبد المجيد حمدي</h4>
            <p className="text-xs text-slate-500">مدير العمليات</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-300">غرفة التحكم المركزية</h2>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              السيرفر متصل
            </span>
          </div>
        </header>

        {/* Page Content Injection */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
