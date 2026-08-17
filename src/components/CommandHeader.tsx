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
    <header className="bg-[#292827] border border-[#3b3a39] rounded-lg shadow-xl p-6 w-full space-y-6 text-[#f3f2f1]">
      {/* Top Meta Bar */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 border-b border-[#3b3a39] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0078D4]/20 border border-[#0078D4]/40 flex items-center justify-center text-[#00ccff] shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-[#f3f2f1]">
                Azure HVAC Cost Management Command
              </h1>
              <span className="bg-[#252423] text-[#00ccff] text-[11px] font-mono px-2.5 py-0.5 rounded border border-[#3b3a39] font-medium">
                CANADA CENTRAL
              </span>
            </div>
            <p className="text-xs text-[#a19f9d] mt-0.5">
              Live telemetry cost translation for 85 commercial mechanical sites across the Greater Toronto Area
            </p>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* GTA Zone Filter Dropdown */}
          <div className="flex items-center gap-2 bg-[#252423] border border-[#3b3a39] px-3 py-1.5 rounded text-xs">
            <Globe2 className="w-3.5 h-3.5 text-[#00ccff] shrink-0" />
            <span className="text-[#a19f9d] font-medium">GTA Zone:</span>
            <select
              value={selectedZone}
              onChange={(e) => onSelectZone(e.target.value)}
              aria-label="GTA Zone Filter"
              className="bg-transparent text-[#f3f2f1] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#252423] text-[#f3f2f1]">All Regions ({zones.reduce((a, b) => a + (b.clientCount || 0), 0)} sites)</option>
              {zones.filter(z => z.zoneId !== 'all').map((z) => (
                <option key={z.zoneId} value={z.shortName} className="bg-[#252423] text-[#f3f2f1]">
                  {z.shortName} ({z.clientCount} sites)
                </option>
              ))}
            </select>
          </div>

          {/* Sync Trigger Button */}
          <button
            onClick={onTriggerSync}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-[#252423] hover:bg-[#323130] text-[#f3f2f1] border border-[#3b3a39] px-3.5 py-1.5 rounded text-xs font-semibold transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#00ccff] ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Azure API'}</span>
          </button>

          {/* Quick Optimize Action */}
          <button
            onClick={onQuickOptimize}
            className="flex items-center gap-2 bg-[#0078D4] hover:bg-[#106EBE] text-white font-semibold px-4 py-1.5 rounded text-xs transition-all shadow-xs active:scale-95 ml-auto xl:ml-0 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Optimize Now</span>
          </button>
        </div>
      </div>

      {/* Hero Financial Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Current Month Spend */}
        <div className="bg-[#252423] border border-[#3b3a39] rounded-lg p-4 flex flex-col justify-between hover:border-[#605e5c] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#a19f9d] uppercase tracking-wider">Current Month Spend</span>
            <div className="w-7 h-7 rounded bg-[#0078D4]/20 text-[#00ccff] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-[#f3f2f1] font-mono tracking-tight">
              ${totalSpentCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-xs font-medium text-[#a19f9d] ml-1">CAD</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#a19f9d]">
              <span className="text-[#f3f2f1] font-semibold">{budgetUtilizationPercent}%</span>
              <span>of ${monthlyBudgetCad.toLocaleString('en-CA')} budget target</span>
            </div>
          </div>
          {/* Progress Mini Bar */}
          <div className="w-full bg-[#1b1a19] h-1.5 rounded-full overflow-hidden mt-3">
            <div 
              className={`h-full rounded-full ${
                Number(budgetUtilizationPercent) > 90 ? 'bg-[#d83b01]' : 'bg-[#00ccff]'
              }`}
              style={{ width: `${Math.min(Number(budgetUtilizationPercent), 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Projected Month Close */}
        <div className={`rounded-lg p-4 flex flex-col justify-between transition-colors border ${
          isOverBudget ? 'bg-[#a80000]/15 border-[#a80000]/50' : 'bg-[#252423] border-[#3b3a39]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#a19f9d] uppercase tracking-wider">Projected Month Close</span>
            <div className={`w-7 h-7 rounded flex items-center justify-center ${
              isOverBudget ? 'bg-[#a80000]/30 text-[#ff5555]' : 'bg-[#107c10]/20 text-[#107c10]'
            }`}>
              {isOverBudget ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            </div>
          </div>
          <div className="mt-2">
            <div className={`text-2xl font-bold font-mono tracking-tight ${isOverBudget ? 'text-[#ff6b6b]' : 'text-[#f3f2f1]'}`}>
              ${projectedCloseCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-xs font-medium text-[#a19f9d] ml-1">CAD</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              {isOverBudget ? (
                <span className="text-[#ff6b6b] font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  +${varianceCad.toFixed(2)} CAD above target
                </span>
              ) : (
                <span className="text-[#107c10] font-medium">
                  -${varianceCad.toFixed(2)} CAD under target
                </span>
              )}
            </div>
          </div>
          <div className="text-[10px] text-[#a19f9d] font-mono mt-3">
            Based on current 14-day telemetry burn rate
          </div>
        </div>

        {/* Metric 3: Total Monitored HVAC Units */}
        <div className="bg-[#252423] border border-[#3b3a39] rounded-lg p-4 flex flex-col justify-between hover:border-[#605e5c] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#a19f9d] uppercase tracking-wider">Active HVAC Fleet Units</span>
            <div className="w-7 h-7 rounded bg-[#5c2d91]/30 text-[#b180f0] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-[#f3f2f1] font-mono tracking-tight">
              {monitoredUnits.toLocaleString()}
              <span className="text-xs font-medium text-[#a19f9d] ml-1">Units</span>
            </div>
            <div className="text-xs text-[#a19f9d] mt-1 flex items-center justify-between">
              <span>RTUs, Chillers, Boilers, Pumps</span>
              <span className="text-[#107c10] font-medium font-mono">100% Online</span>
            </div>
          </div>
          <div className="text-[10px] text-[#a19f9d] font-mono mt-3">
            IoT Edge Gateway & BACnet/IP Active
          </div>
        </div>

        {/* Metric 4: Avg Cloud Cost / Unit */}
        <div className="bg-[#252423] border border-[#3b3a39] rounded-lg p-4 flex flex-col justify-between hover:border-[#605e5c] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#a19f9d] uppercase tracking-wider">Avg Cloud Cost / Unit</span>
            <div className="w-7 h-7 rounded bg-[#107c10]/20 text-[#107c10] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-[#f3f2f1] font-mono tracking-tight">
              ${avgCostPerUnitCad.toFixed(2)}
              <span className="text-xs font-medium text-[#a19f9d] ml-1">CAD/mo</span>
            </div>
            <div className="text-xs text-[#a19f9d] mt-1">
              Benchmark Target: <span className="text-[#f3f2f1] font-semibold">&lt; $4.50 CAD</span>
            </div>
          </div>
          <div className="text-[10px] text-[#107c10] font-mono mt-3 flex items-center gap-1">
            <span>● 7.1% lower than GTA commercial avg</span>
          </div>
        </div>
      </div>
    </header>
  );
};
