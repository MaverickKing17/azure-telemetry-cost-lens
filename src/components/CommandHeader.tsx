import React, { useState } from 'react';
import { 
  Cloud, 
  RefreshCw, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Building2, 
  Layers, 
  Clock, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronDown,
  Zap
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
  onQuickOptimize?: () => void;
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
  const [currencyMode, setCurrencyMode] = useState<'CAD' | 'USD'>('CAD');
  const fxRate = currencyMode === 'CAD' ? 1.0 : 0.74;
  const currencySymbol = currencyMode === 'CAD' ? 'CA$' : '$';

  const budgetPercentUsed = Math.min(100, Math.round((totalSpentCad / monthlyBudgetCad) * 100));
  const isOverProjected = projectedCloseCad > monthlyBudgetCad;
  const varianceCad = projectedCloseCad - monthlyBudgetCad;

  return (
    <header className="bg-[#11141C] border-b border-slate-800 px-6 py-4 relative z-20">
      {/* Top Banner Row: Org, Sync Status & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <Building2 className="w-5 h-5 text-[#0B0F17]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 font-mono">
                Nexus<span className="text-white">HVAC</span> • GTA Command
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/60 font-mono">
                Canada Central (Toronto DC)
              </span>
            </div>
            <h1 className="text-base font-semibold text-white tracking-tight flex items-center gap-2 mt-0.5">
              <span>Operational Cloud Cost & IoT Telemetry</span>
              <span className="text-xs text-slate-500 font-normal hidden sm:inline">
                • sub-prod-gta-telemetry-01
              </span>
            </h1>
          </div>
        </div>

        {/* Sync & Region Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Currency Toggle */}
          <div className="bg-[#0B0F17] p-1 rounded-lg border border-slate-800 flex items-center text-xs font-mono">
            <button
              onClick={() => setCurrencyMode('CAD')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                currencyMode === 'CAD'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CAD ($)
            </button>
            <button
              onClick={() => setCurrencyMode('USD')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                currencyMode === 'USD'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              USD ($)
            </button>
          </div>

          {/* GTA Zone Selector */}
          <div className="relative">
            <select
              value={selectedZone}
              onChange={(e) => onSelectZone(e.target.value)}
              className="bg-[#0B0F17] text-slate-200 text-xs font-medium pl-3 pr-8 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer hover:border-slate-700 transition-all font-mono"
            >
              {zones.map((z) => (
                <option key={z.zoneId} value={z.zoneId} className="bg-[#11141C] text-white">
                  📍 {z.name} ({z.activeHvacUnits} units)
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Sync Status Badge */}
          <div className="flex items-center gap-2 bg-[#0B0F17] px-3 py-1.5 rounded-lg border border-slate-800">
            <div className={`w-2 h-2 rounded-full ${
              isSyncing ? 'bg-amber-400 animate-ping' : 'bg-green-500 animate-pulse'
            }`} />
            <span className="text-xs text-slate-300 font-mono">
              {isSyncing ? 'Syncing to Azure...' : 'CONNECTED TO AZURE'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono hidden md:inline">
              ({lastSyncTime})
            </span>
            <button
              onClick={onTriggerSync}
              disabled={isSyncing}
              title="Force Sync Azure Cost API"
              className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>

          {/* Header Action Button */}
          {onQuickOptimize && (
            <button
              onClick={onQuickOptimize}
              className="bg-cyan-500 hover:bg-cyan-400 text-[#0B0F17] font-bold py-1.5 px-4 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)]"
            >
              <Zap className="w-3.5 h-3.5 fill-[#0B0F17]" />
              <span>Optimize Now</span>
            </button>
          )}
        </div>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {/* KPI 1: Total Monthly Azure Spend */}
        <div className="bg-[#0B0F17] rounded-xl p-4 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
              Current Month Spend
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-500/20 font-mono">
              {budgetPercentUsed}% of Cap
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-3xl font-bold text-white tracking-tight">
              {currencySymbol}{(totalSpentCad * fxRate).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {currencyMode}
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
              <span>Budget Cap: {currencySymbol}{(monthlyBudgetCad * fxRate).toLocaleString('en-CA')}</span>
              <span className={budgetPercentUsed > 90 ? 'text-red-400 font-semibold' : 'text-emerald-400'}>
                {currencySymbol}{((monthlyBudgetCad - totalSpentCad) * fxRate).toLocaleString('en-CA', { maximumFractionDigits: 0 })} left
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  budgetPercentUsed > 90 ? 'bg-amber-400' : 'bg-cyan-500'
                }`}
                style={{ width: `${budgetPercentUsed}%` }}
              />
            </div>
          </div>
        </div>

        {/* KPI 2: Projected End-of-Month Spend */}
        <div className="bg-[#0B0F17] rounded-xl p-4 border border-slate-800 relative overflow-hidden hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              Projected Spend
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
              isOverProjected 
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}>
              {isOverProjected ? `+${currencySymbol}${(varianceCad * fxRate).toFixed(0)} Delta` : 'On Target'}
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-3xl font-bold text-amber-400 tracking-tight">
              {currencySymbol}{(projectedCloseCad * fxRate).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Month-End Est.
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Forecast Mode:</span>
            <span className="text-slate-300">30d Run-Rate + IoT Burst</span>
          </div>
          <div className="mt-1 text-[10px] text-slate-500 truncate">
            {hasActiveAnomaly ? '⚠️ Alert: 48 RTU Modems inflating run-rate' : '✅ Nominal baseline telemetry'}
          </div>
        </div>

        {/* KPI 3: Operational Cost Per Monitored HVAC Unit */}
        <div className="bg-[#0B0F17] rounded-xl p-4 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Cost / Connected Unit
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
              GTA Benchmark
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-3xl font-bold text-white tracking-tight">
              {currencySymbol}{(avgCostPerUnitCad * fxRate).toFixed(2)}
            </div>
            <span className="text-xs text-slate-500 font-mono">
              / unit / mo
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Contract SLA Cap:</span>
            <span className="text-emerald-400 font-medium">$5.50 Pass-Through</span>
          </div>
          <div className="mt-1 text-[10px] text-slate-500 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
            <span>24.0% margin buffer on telemetry pass-through</span>
          </div>
        </div>

        {/* KPI 4: Active Fleet Telematics Scale */}
        <div className="bg-[#0B0F17] rounded-xl p-4 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Active GTA Telemetry
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Online
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-3xl font-bold text-white tracking-tight">
              {monitoredUnits.toLocaleString()}
            </div>
            <span className="text-xs text-slate-500 font-mono">
              HVAC Nodes
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Data Ingestion MTD:</span>
            <span className="text-cyan-400 font-medium">4.82 TB (2.1B pings)</span>
          </div>
          <div className="mt-1 text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span>Gateways:</span>
            <span className="text-slate-300">142 Commercial Sites</span>
          </div>
        </div>
      </div>
    </header>
  );
};
