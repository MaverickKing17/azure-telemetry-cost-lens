import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  BellRing, 
  FileSpreadsheet, 
  Zap, 
  MapPin, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
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
  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Dashboard',
      subtitle: 'Command Center & Spend KPI',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'fleet-telemetry' as ActiveTab,
      label: 'Fleet Telemetry',
      subtitle: 'RTUs, Chillers, Boilers & VRF',
      icon: Cpu,
      badge: '3,550 Units',
    },
    {
      id: 'alert-thresholds' as ActiveTab,
      label: 'Alert Thresholds',
      subtitle: 'Budget Guardrails & Alerts',
      icon: BellRing,
      badge: activeAnomalyCount > 0 ? `${activeAnomalyCount} Alerts` : null,
      badgeColor: activeAnomalyCount > 0 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : undefined,
    },
    {
      id: 'optimization' as ActiveTab,
      label: 'Cost Optimizer',
      subtitle: 'What-If Telemetry Calculator',
      icon: Zap,
      badge: 'Save $1.8k',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    },
    {
      id: 'export-reports' as ActiveTab,
      label: 'Export Reports',
      subtitle: 'Client Pass-Through & Billing',
      icon: FileSpreadsheet,
      badge: 'CSV / PDF',
    },
  ];

  return (
    <aside className="w-64 h-full flex-shrink-0 bg-[#0B0F17] border-r border-white/10 flex flex-col justify-between overflow-y-auto">
      {/* Brand & Navigation */}
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <svg className="w-5 h-5 text-[#0B0F17]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3v6h8V3h-8zm6 4h-4V5h4v2zm-6 4v6h8v-6h-8zm6 4h-4v-2h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2zM3 3v6h8V3H3zm6 4H5V5h4v2z" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight uppercase text-white">
              Nexus<span className="text-cyan-400">HVAC</span>
            </span>
            <div className="text-[10px] text-slate-500 font-mono">
              Toronto/GTA Gateway
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="text-xs font-semibold tracking-tight truncate">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                      item.badgeColor || 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Operational Territory Widget */}
        <div className="mx-4 my-2 p-3 rounded-xl bg-[#11141C] border border-white/10">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
            <span className="flex items-center gap-1 text-cyan-400">
              <MapPin className="w-3 h-3" />
              Service Territory
            </span>
            <span className="text-white uppercase font-bold text-[10px]">
              {selectedZone}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between text-slate-400">
              <span>Cellular Gateways:</span>
              <span className="text-slate-200 font-mono">142 Bell/Rogers</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>BACnet IP Tunnels:</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                68/68 Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Azure Status Footer */}
      <div className="p-4 m-4 bg-[#11141C] border border-white/10 rounded-xl space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-slate-300 font-mono">CONNECTED TO AZURE</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          Last sync: Today, 14:22 EST Toronto/GTA Instance
        </p>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            <span>TLS 1.3 Active</span>
          </span>
          <a
            href="#support"
            onClick={(e) => { e.preventDefault(); alert("Dispatching technical ticket to GTA Lead Cloud Architect on call."); }}
            className="text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Tech Escalation</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </aside>
  );
};
