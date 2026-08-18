import React from 'react';
import { 
  RefreshCw, 
  Zap, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Cpu, 
  BarChart3,
  Server,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { GtaZoneSummary } from '../types/cost-types';

interface CommandHeaderProps {
  totalSpentCad: number;
  projectedCloseCad: number;
  monthlyBudgetCad: number;
  monitoredUnits: number;
  avgCostPerUnitCad: number;
  selectedZone: string;
  onSelectZone: (zoneId: string) => void;
  zones: GtaZoneSummary[];
  isSyncing: boolean;
  onTriggerSync: () => void;
  lastSyncTime: string;
  hasActiveAnomaly: boolean;
  onQuickOptimize: () => void;
}

export const CommandHeader: React.FC<CommandHeaderProps> = ({
  totalSpentCad,
  projectedCloseCad,
  monthlyBudgetCad,
  monitoredUnits,
  avgCostPerUnitCad,
  selectedZone,
  onSelectZone,
  zones,
  isSyncing,
  onTriggerSync,
  lastSyncTime,
  hasActiveAnomaly,
  onQuickOptimize,
}) => {
  const isOverage = projectedCloseCad > monthlyBudgetCad;
  const spendPercentage = (totalSpentCad / monthlyBudgetCad) * 100;
  const overageAmount = projectedCloseCad - monthlyBudgetCad;

  return (
    <div className="space-y-6 w-full text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif]">
      {/* Top Application Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#1C2541] border border-[#3A506B] rounded-xl p-5 shadow-[0_0_25px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9]/60 transition-all duration-300">
        {/* Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold tracking-tight text-white font-sans">
                Azure HVAC Cost Command Center
              </h1>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0B132B] text-[#6FFFE9] border border-[#6FFFE9]/40 shadow-[0_0_10px_rgba(111,255,233,0.2)]">
                <Server className="w-3.5 h-3.5" />
                <span>CANADA CENTRAL</span>
              </span>
            </div>
            <p className="text-xs text-[#BCF8EC] mt-1">
              Greater Toronto Area Multi-Facility Mechanical Fleet Telemetry & FinOps Telematics
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Zone Selector */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedZone}
              aria-label="Select GTA Regional Telemetry Zone"
              onChange={(e) => onSelectZone(e.target.value)}
              className="w-full appearance-none bg-[#0B132B] border border-[#3A506B] text-white text-xs font-medium rounded-lg pl-8 pr-8 py-2 focus:border-[#6FFFE9] focus:outline-none transition-all cursor-pointer font-sans shadow-inner"
            >
              <option value="all">GTA All Zones (Complete Fleet)</option>
              <option value="mississauga">Mississauga West / Airport</option>
              <option value="downtown">Downtown Toronto Core</option>
              <option value="markham">Markham Tech Corridor</option>
              <option value="vaughan">Vaughan Logistics Park</option>
              <option value="brampton">Brampton Industrial Belt</option>
              <option value="etobicoke">Etobicoke Lake Shore</option>
            </select>
            <MapPin className="w-3.5 h-3.5 text-[#6FFFE9] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-[#BCF8EC] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sync Button */}
          <button
            onClick={onTriggerSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#0B132B] hover:bg-[#142247] border border-[#3A506B] hover:border-[#6FFFE9] rounded-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#6FFFE9] ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Azure ARM'}</span>
          </button>

          {/* Quick Optimize Action Button */}
          <button
            onClick={onQuickOptimize}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#0B132B] bg-[#6FFFE9] hover:bg-[#5be7d1] rounded-lg transition-all shadow-[0_0_15px_rgba(111,255,233,0.4)] active:scale-95 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0B132B]" />
            <span>Optimize Now</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards (Identical on every page with exact values) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Current Month Spend */}
        <div className="bg-[#1C2541] border border-[#3A506B] rounded-xl p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9] transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#BCF8EC] uppercase font-mono tracking-wider">
              CURRENT MONTH SPEND
            </span>
            <div className="p-1.5 rounded-lg bg-[#0B132B] text-[#6FFFE9] border border-[#3A506B]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2.5">
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              ${totalSpentCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CAD
            </div>
            <div className="text-xs text-[#BCF8EC] mt-1 font-medium">
              {spendPercentage.toFixed(1)}% of ${monthlyBudgetCad.toLocaleString()} target
            </div>
          </div>
          <div className="w-full bg-[#0B132B] h-2 rounded-full overflow-hidden border border-[#3A506B]/50">
            <div 
              className="bg-[#6FFFE9] h-full rounded-full transition-all duration-500 shadow-[0_0_10px_#6FFFE9]"
              style={{ width: `${Math.min(100, spendPercentage)}%` }}
            />
          </div>
        </div>

        {/* KPI 2: Projected Month Close */}
        <div className={`rounded-xl p-5 flex flex-col justify-between transition-all duration-300 ${
          isOverage 
            ? 'bg-[#2A1520] border border-[#EF4444]/60 red-glow hover:border-[#EF4444]' 
            : 'bg-[#1C2541] border border-[#3A506B] hover:border-[#6FFFE9]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#BCF8EC] uppercase font-mono tracking-wider">
              PROJECTED MONTH CLOSE
            </span>
            <div className={`p-1.5 rounded-lg bg-[#0B132B] border ${isOverage ? 'border-[#EF4444]/50 text-[#EF4444]' : 'border-[#3A506B] text-[#6FFFE9]'}`}>
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2.5">
            <div className={`text-2xl font-black font-mono tracking-tight ${isOverage ? 'text-[#EF4444]' : 'text-white'}`}>
              ${projectedCloseCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CAD
            </div>
            <div className="flex items-center gap-1 text-xs text-[#EF4444] mt-1 font-bold">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-[#EF4444]" />
              <span>+${overageAmount.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CAD above target</span>
            </div>
          </div>
          <div className="text-[11px] text-[#BCF8EC] font-mono">
            {hasActiveAnomaly ? '42% RTU sampling spike active' : 'Run-rate normalized'}
          </div>
        </div>

        {/* KPI 3: Active HVAC Fleet Units */}
        <div className="bg-[#1C2541] border border-[#3A506B] rounded-xl p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9] transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#BCF8EC] uppercase font-mono tracking-wider">
              ACTIVE HVAC FLEET UNITS
            </span>
            <div className="p-1.5 rounded-lg bg-[#0B132B] text-[#22C55E] border border-[#3A506B]">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2.5">
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              {monitoredUnits.toLocaleString()} Units
            </div>
            <div className="text-xs text-[#BCF8EC] mt-1 font-medium">
              RTUs, Chillers, Boilers
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#22C55E] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_6px_#22C55E]" />
            <span>100% Online</span>
          </div>
        </div>

        {/* KPI 4: Avg Cloud Cost / Unit */}
        <div className="bg-[#1C2541] border border-[#3A506B] rounded-xl p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9] transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#BCF8EC] uppercase font-mono tracking-wider">
              AVG CLOUD COST / UNIT
            </span>
            <div className="p-1.5 rounded-lg bg-[#0B132B] text-[#6FFFE9] border border-[#3A506B]">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2.5">
            <div className="text-2xl font-black text-[#6FFFE9] font-mono tracking-tight cyan-text-glow">
              ${avgCostPerUnitCad.toFixed(2)} CAD/mo
            </div>
            <div className="text-xs text-[#BCF8EC] mt-1 font-medium">
              Benchmark Target: &lt; $4.50 CAD
            </div>
          </div>
          <div className="text-[11px] text-[#22C55E] font-bold font-mono">
            7.1% below GTA commercial benchmark
          </div>
        </div>
      </div>
    </div>
  );
};
