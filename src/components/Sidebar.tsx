import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  BellRing, 
  SlidersHorizontal, 
  FileSpreadsheet, 
  MapPin, 
  ShieldCheck,
  Server,
  Zap
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
    <aside className="w-full h-full flex flex-col justify-between overflow-y-auto bg-[#080C14] text-white border-r border-cyan-500/20 font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif]">
      {/* Brand & Navigation */}
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-cyan-500/20 flex items-center gap-3 bg-[#0B0F17]/70">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_18px_rgba(0,229,255,0.4)]">
            <Zap className="w-5 h-5 text-black" fill="currentColor" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-white flex items-center gap-1 font-mono">
              <span>NEXUS</span>
              <span className="text-[#00E5FF] neon-text-glow">HVAC</span>
            </div>
            <div className="text-[10px] text-cyan-400 font-mono tracking-wider font-semibold">
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
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/25 to-blue-600/20 text-[#00E5FF] font-bold border border-cyan-400/60 shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                    : 'text-slate-300 hover:bg-[#111622] hover:text-white hover:border hover:border-cyan-500/30 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#00E5FF]' : 'text-slate-400'}`} />
                  <span className="text-xs tracking-tight truncate">
                    {item.label}
                  </span>
                </div>
                {item.badge !== undefined && (
                  <span className="flex items-center justify-center px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-rose-600 text-white shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Operational Territory Widget */}
        <div className="mx-3 my-3 p-3.5 rounded-xl bg-[#111622] border border-cyan-500/30 shadow-[0_0_15px_rgba(0,229,255,0.06)] hover:border-cyan-400 transition-all duration-300">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="flex items-center gap-1.5 text-[#00E5FF] font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>TERRITORY</span>
            </span>
            <span className="text-[10px] font-bold text-white bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40 uppercase">
              {selectedZone === 'all' ? 'All GTA Sites' : selectedZone}
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-white font-mono">
            <div className="flex justify-between">
              <span className="text-slate-300">Region:</span>
              <span className="text-white font-semibold">Canada Central</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Gateways:</span>
              <span className="text-white font-semibold">85 Units Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Currency:</span>
              <span className="text-[#00E5FF] font-bold">CAD ($)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Azure Status Footer */}
      <div className="p-3.5 m-3 bg-[#111622] border border-cyan-500/30 rounded-xl space-y-2 shadow-[0_0_15px_rgba(0,229,255,0.06)] hover:border-cyan-400 transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34D399]" />
          <span className="text-xs font-bold text-white font-mono tracking-wider">CONNECTED TO AZURE</span>
        </div>
        <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
          Sync: Realtime Canada Central (Toronto DC)
        </p>

        <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[10px] text-slate-300">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TLS 1.3 Active</span>
          </span>
          <span className="text-slate-400 font-mono">ARM API v2.4</span>
        </div>
      </div>
    </aside>
  );
};
