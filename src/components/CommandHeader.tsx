import React from 'react';
import { 
  Building2, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Sliders, 
  Layers, 
  AlertTriangle,
  Zap,
  Globe2,
  Calendar
} from 'lucide-react';
import { GtaZoneSummary } from '../types/cost-types';

interface CommandHeaderProps {
  totalSpentCad: number;
  projectedCloseCad: number;
  monthlyBudgetCad: number;
  monitoredUnits: number;
  avgCostPerUnitCad: number;
  selectedZone: string;
  onSelectZone: (zone: string) => void;
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
  const budgetUtilizationPercent = ((totalSpentCad / monthlyBudgetCad) * 100).toFixed(1);
  const isOverBudget = projectedCloseCad > monthlyBudgetCad;
  const varianceCad = Math.abs(projectedCloseCad - monthlyBudgetCad);

  return (
    <header className="bg-[#111622] border border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,255,0.08)] rounded-2xl p-6 w-full space-y-6 text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif] hover:border-cyan-400/50 transition-all duration-300">
      {/* Top Meta Bar */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 border-b border-cyan-500/20 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/50 flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)]">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-white">
                Azure HVAC Cost Command Center
              </h1>
              <span className="bg-cyan-950/80 text-[#00E5FF] text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/50 shadow-[0_0_8px_rgba(0,229,255,0.2)]">
                CANADA CENTRAL
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Live telemetry cost translation for 85 commercial mechanical sites across the Greater Toronto Area
            </p>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* GTA Zone Filter Dropdown */}
          <div className="flex items-center gap-2 bg-[#0B101D] border border-cyan-500/40 px-3.5 py-2 rounded-xl text-xs shadow-inner">
            <Globe2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
            <span className="text-slate-300 font-semibold">GTA Zone:</span>
            <select
              value={selectedZone}
              onChange={(e) => onSelectZone(e.target.value)}
              aria-label="GTA Zone Filter"
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#0B101D] text-white">All Regions ({zones.reduce((a, b) => a + (b.clientCount || 0), 0)} sites)</option>
              {zones.filter(z => z.zoneId !== 'all').map((z) => (
                <option key={z.zoneId} value={z.shortName} className="bg-[#0B101D] text-white">
                  {z.shortName} ({z.clientCount} sites)
                </option>
              ))}
            </select>
          </div>

          {/* Sync Trigger Button */}
          <button
            onClick={onTriggerSync}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-[#0B101D] hover:bg-slate-800 text-white border border-cyan-500/40 hover:border-cyan-400 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-[0_0_10px_rgba(0,229,255,0.1)]"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#00E5FF] ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Azure ARM'}</span>
          </button>

          {/* Quick Optimize Action */}
          <button
            onClick={onQuickOptimize}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(0,229,255,0.35)] active:scale-95 ml-auto xl:ml-0 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-black" fill="currentColor" />
            <span>Optimize Now</span>
          </button>
        </div>
      </div>

      {/* Hero Financial Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Current Month Spend */}
        <div className="bg-[#0B101D] border border-cyan-500/30 rounded-xl p-5 flex flex-col justify-between hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Current Month Spend</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-[#00E5FF] flex items-center justify-center border border-cyan-500/40 group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              ${totalSpentCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-xs font-semibold text-[#00E5FF] ml-1.5 font-mono">CAD</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-300">
              <span className="text-white font-bold font-mono">{budgetUtilizationPercent}%</span>
              <span>of ${monthlyBudgetCad.toLocaleString('en-CA')} target</span>
            </div>
          </div>
          {/* Progress Mini Bar */}
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-3.5 border border-slate-800">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                Number(budgetUtilizationPercent) > 90 
                  ? 'bg-rose-500 shadow-[0_0_8px_#F43F5E]' 
                  : 'bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]'
              }`}
              style={{ width: `${Math.min(Number(budgetUtilizationPercent), 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Projected Month Close */}
        <div className={`rounded-xl p-5 flex flex-col justify-between transition-all duration-300 border group ${
          isOverBudget 
            ? 'bg-[#18090C] border-rose-500/50 hover:border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]' 
            : 'bg-[#0B101D] border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Projected Month Close</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${
              isOverBudget 
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' 
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
            }`}>
              {isOverBudget ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            </div>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-black font-mono tracking-tight ${isOverBudget ? 'text-rose-400' : 'text-white'}`}>
              ${projectedCloseCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-xs font-semibold text-[#00E5FF] ml-1.5 font-mono">CAD</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs">
              {isOverBudget ? (
                <span className="text-rose-400 font-bold flex items-center gap-1 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  +${varianceCad.toFixed(2)} CAD above target
                </span>
              ) : (
                <span className="text-emerald-400 font-bold font-mono">
                  -${varianceCad.toFixed(2)} CAD under target
                </span>
              )}
            </div>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-3">
            Based on current 14-day telemetry burn
          </div>
        </div>

        {/* Metric 3: Total Monitored HVAC Units */}
        <div className="bg-[#0B101D] border border-cyan-500/30 rounded-xl p-5 flex flex-col justify-between hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Active HVAC Fleet Units</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              {monitoredUnits.toLocaleString()}
              <span className="text-xs font-semibold text-[#00E5FF] ml-1.5 font-mono">Units</span>
            </div>
            <div className="text-xs text-slate-300 mt-1.5 flex items-center justify-between">
              <span>RTUs, Chillers, Boilers</span>
              <span className="text-emerald-400 font-bold font-mono">100% Online</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-3">
            IoT Edge Gateway & BACnet/IP Synced
          </div>
        </div>

        {/* Metric 4: Avg Cloud Cost / Unit */}
        <div className="bg-[#0B101D] border border-cyan-500/30 rounded-xl p-5 flex flex-col justify-between hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Avg Cloud Cost / Unit</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              ${avgCostPerUnitCad.toFixed(2)}
              <span className="text-xs font-semibold text-[#00E5FF] ml-1.5 font-mono">CAD/mo</span>
            </div>
            <div className="text-xs text-slate-300 mt-1.5">
              Benchmark Target: <span className="text-white font-bold font-mono">&lt; $4.50 CAD</span>
            </div>
          </div>
          <div className="text-[11px] text-emerald-400 font-mono font-semibold mt-3 flex items-center gap-1">
            <span>● 7.1% below GTA commercial benchmark</span>
          </div>
        </div>
      </div>
    </header>
  );
};
