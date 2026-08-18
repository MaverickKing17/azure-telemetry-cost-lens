import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  BellRing, 
  SlidersHorizontal, 
  FileSpreadsheet, 
  MapPin, 
  ShieldCheck,
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
      badge: 3, // Locked specification: show red badge with number "3"
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
    <aside className="w-[260px] flex-shrink-0 h-full flex flex-col justify-between overflow-y-auto bg-[#0B132B] text-[#FFFFFF] border-r border-[#3A506B] font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif]">
      {/* Brand & Navigation */}
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-[#3A506B] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#6FFFE9]/50 shadow-[0_0_15px_rgba(111,255,233,0.35)] shrink-0 bg-[#0B132B]">
            <img 
              src="https://i.ibb.co/cXyp2NQr/Gemini-Generated-Image-5hu38a5hu38a5hu3.jpg" 
              alt="NexusHVAC Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-[#FFFFFF] flex items-center gap-1 font-mono">
              <span>NEXUS</span>
              <span className="text-[#6FFFE9] cyan-text-glow">HVAC</span>
            </div>
            <div className="text-[10px] text-[#BCF8EC] font-mono tracking-wider font-semibold">
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
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-left transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-[#1C2541] text-[#6FFFE9] font-bold border-l-4 border-[#6FFFE9] shadow-[0_0_15px_rgba(111,255,233,0.15)]'
                    : 'text-[#BCF8EC] hover:bg-[#1C2541]/70 hover:text-white border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#6FFFE9]' : 'text-[#BCF8EC]'}`} />
                  <span className="text-xs tracking-tight truncate">
                    {item.label}
                  </span>
                </div>
                {item.badge !== undefined && (
                  <span className="flex items-center justify-center px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#EF4444] text-white shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Operational Territory Widget */}
        <div className="mx-3 my-3 p-3.5 rounded-xl bg-[#1C2541] border border-[#3A506B] shadow-[0_0_15px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9] transition-all duration-300">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="flex items-center gap-1.5 text-[#6FFFE9] font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>TERRITORY</span>
            </span>
            <span className="text-[10px] font-bold text-[#FFFFFF] bg-[#0B132B] px-2 py-0.5 rounded border border-[#3A506B] uppercase">
              {selectedZone === 'all' ? 'ALL GTA SITES' : selectedZone.toUpperCase()}
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-[#FFFFFF] font-mono">
            <div className="flex justify-between">
              <span className="text-[#BCF8EC]">Region:</span>
              <span className="text-[#FFFFFF] font-semibold">Canada Central</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#BCF8EC]">Gateways:</span>
              <span className="text-[#FFFFFF] font-semibold">85 Units Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#BCF8EC]">Currency:</span>
              <span className="text-[#6FFFE9] font-bold">CAD ($)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Azure Status Footer */}
      <div className="p-3.5 m-3 bg-[#1C2541] border border-[#3A506B] rounded-xl space-y-2 shadow-[0_0_15px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9] transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse shadow-[0_0_8px_#22C55E]" />
          <span className="text-xs font-bold text-[#FFFFFF] font-mono tracking-wider">CONNECTED TO AZURE</span>
        </div>
        <p className="text-[11px] text-[#BCF8EC] font-mono leading-relaxed">
          Sync: Realtime Canada Central (Toronto DC)
        </p>

        <div className="pt-2 border-t border-[#3A506B] flex items-center justify-between text-[10px] text-[#BCF8EC]">
          <span className="flex items-center gap-1 text-[#22C55E] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TLS 1.3 Active</span>
          </span>
          <span className="text-[#BCF8EC] font-mono">ARM API v2.4</span>
        </div>
      </div>
    </aside>
  );
};
