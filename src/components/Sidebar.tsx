import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  BellRing, 
  SlidersHorizontal, 
  FileSpreadsheet, 
  MapPin, 
  ShieldCheck,
  Server
} from 'lucide-react';

export type ActiveTab = 'dashboard' | 'fleet-telemetry' | 'alert-thresholds' | 'optimization' | 'export-reports';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  activeAnomalyCount: number;
  selectedZone: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  activeAnomalyCount,
  selectedZone,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ElementType; badge?: number }[] = [
    {
      id: 'dashboard',
      label: 'Cost Command Center',
      icon: LayoutDashboard,
    },
    {
      id: 'fleet-telemetry',
      label: 'HVAC Fleet Telemetry',
      icon: Activity,
    },
    {
      id: 'alert-thresholds',
      label: 'Budget Thresholds',
      icon: BellRing,
      badge: activeAnomalyCount > 0 ? activeAnomalyCount : undefined,
    },
    {
      id: 'optimization',
      label: 'Efficiency Simulator',
      icon: SlidersHorizontal,
    },
    {
      id: 'export-reports',
      label: 'Reports & Export',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <aside className="w-full h-full flex flex-col justify-between overflow-y-auto bg-[#252423] text-[#f3f2f1]">
      {/* Brand & Navigation */}
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#3b3a39] flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0078D4] rounded flex items-center justify-center shadow-md">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3v6h8V3h-8zm6 4h-4V5h4v2zm-6 4v6h8v-6h-8zm6 4h-4v-2h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2zM3 3v6h8V3H3zm6 4H5V5h4v2z" />
            </svg>
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-[#f3f2f1] flex items-center gap-1 font-mono">
              <span>NEXUS</span>
              <span className="text-[#00ccff]">HVAC</span>
            </div>
            <div className="text-[10px] text-[#a19f9d] font-mono tracking-wider">
              AZURE CLOUD FIN-OPS
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0078D4] text-white font-semibold shadow-xs'
                    : 'text-[#a19f9d] hover:bg-[#323130] hover:text-[#f3f2f1]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#a19f9d]'}`} />
                  <span className="text-xs tracking-tight truncate">
                    {item.label}
                  </span>
                </div>
                {item.badge !== undefined && (
                  <span className="flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#a80000] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Operational Territory Widget */}
        <div className="mx-3 my-3 p-3 rounded bg-[#292827] border border-[#3b3a39]">
          <div className="flex items-center justify-between text-[11px] font-mono mb-2">
            <span className="flex items-center gap-1.5 text-[#00ccff] font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>TERRITORY</span>
            </span>
            <span className="text-[10px] text-[#a19f9d] uppercase">
              {selectedZone === 'all' ? 'All GTA Sites' : selectedZone}
            </span>
          </div>
          <div className="space-y-1.5 text-[11px] text-[#f3f2f1] font-mono">
            <div className="flex justify-between">
              <span className="text-[#a19f9d]">Primary Region:</span>
              <span className="text-[#f3f2f1] font-medium">Canada Central</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a19f9d]">Sub-Stations:</span>
              <span className="text-[#f3f2f1] font-medium">85 Units Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a19f9d]">Currency:</span>
              <span className="text-[#00ccff] font-bold">CAD ($)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Azure Status Footer */}
      <div className="p-3.5 m-3 bg-[#292827] border border-[#3b3a39] rounded space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#107c10] rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-[#f3f2f1] font-mono">CONNECTED TO AZURE</span>
        </div>
        <p className="text-[11px] text-[#a19f9d] font-mono leading-relaxed">
          Sync: Today, 14:22 EST Toronto/GTA Instance
        </p>

        <div className="pt-2 border-t border-[#3b3a39] flex items-center justify-between text-[10px] text-[#a19f9d]">
          <span className="flex items-center gap-1 text-[#107c10]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TLS 1.3 Active</span>
          </span>
          <span className="text-[#a19f9d]">Azure RM API v2.4</span>
        </div>
      </div>
    </aside>
  );
};
