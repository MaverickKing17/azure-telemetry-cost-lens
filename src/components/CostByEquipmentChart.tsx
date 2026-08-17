import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  DollarSign, 
  Cpu, 
  HardDrive, 
  Filter, 
  Info,
  ArrowUpRight
} from 'lucide-react';
import { EquipmentCostSummary } from '../types/cost-types';

interface CostByEquipmentChartProps {
  equipmentData: EquipmentCostSummary[];
  onSelectTag?: (tag: string) => void;
}

export const CostByEquipmentChart: React.FC<CostByEquipmentChartProps> = ({
  equipmentData,
  onSelectTag,
}) => {
  const [viewMetric, setViewMetric] = useState<'totalCost' | 'costPerUnit' | 'dataVolume'>('totalCost');
  const [selectedBar, setSelectedBar] = useState<string | null>(null);

  const maxTotalCost = Math.max(...equipmentData.map(e => e.totalCostCad));
  const maxPerUnitCost = Math.max(...equipmentData.map(e => e.costPerUnitCad));
  const maxDataVol = Math.max(...equipmentData.map(e => e.monthlyTelemetryGb));

  const totalAllUnitsCost = equipmentData.reduce((acc, curr) => acc + curr.totalCostCad, 0);

  return (
    <div className="bg-[#11141C] border border-slate-800 rounded-xl p-6 flex flex-col space-y-4">
      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h3 className="text-slate-200 font-semibold text-base">
            Cost by Equipment Tag
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational equipment breakdown mapped from raw Azure telemetry meters.
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#0B0F17] p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setViewMetric('totalCost')}
            className={`px-3 py-1.5 rounded font-medium transition-all ${
              viewMetric === 'totalCost'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Total CAD ($)
          </button>
          <button
            onClick={() => setViewMetric('costPerUnit')}
            className={`px-3 py-1.5 rounded font-medium transition-all ${
              viewMetric === 'costPerUnit'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CAD / Unit ($)
          </button>
          <button
            onClick={() => setViewMetric('dataVolume')}
            className={`px-3 py-1.5 rounded font-medium transition-all ${
              viewMetric === 'dataVolume'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Data Volume (GB)
          </button>
        </div>
      </div>

      {/* Visual Vertical Chart Array (Matching Design HTML) */}
      <div className="pt-4 pb-2 bg-[#0B0F17]/50 rounded-xl p-4 border border-slate-800/80">
        <div className="flex items-end gap-3 sm:gap-6 h-[200px] pt-4">
          {equipmentData.map((item) => {
            let barPercentage = 0;
            let displayVal = '';

            if (viewMetric === 'totalCost') {
              barPercentage = Math.round((item.totalCostCad / maxTotalCost) * 100);
              displayVal = `$${item.totalCostCad.toFixed(0)}`;
            } else if (viewMetric === 'costPerUnit') {
              barPercentage = Math.round((item.costPerUnitCad / maxPerUnitCost) * 100);
              displayVal = `$${item.costPerUnitCad.toFixed(2)}`;
            } else {
              barPercentage = Math.round((item.monthlyTelemetryGb / maxDataVol) * 100);
              displayVal = `${item.monthlyTelemetryGb}GB`;
            }

            const isSelected = selectedBar === item.equipmentTag;

            return (
              <div
                key={item.equipmentTag}
                onClick={() => {
                  setSelectedBar(isSelected ? null : item.equipmentTag);
                  if (onSelectTag) onSelectTag(item.equipmentTag);
                }}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
              >
                <span className="text-[10px] font-mono text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {displayVal}
                </span>

                <div className={`w-full bg-cyan-500/15 rounded-t-lg relative h-[140px] border border-slate-800 transition-all ${
                  isSelected ? 'border-cyan-400 bg-cyan-500/30' : 'group-hover:border-cyan-500/50'
                }`}>
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ${
                      isSelected ? 'bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]' : 'bg-cyan-500 group-hover:bg-cyan-400'
                    }`}
                    style={{ height: `${Math.max(10, barPercentage)}%` }}
                  />
                </div>

                <span className="text-[10px] text-slate-400 text-center uppercase tracking-tight truncate max-w-full font-mono">
                  {item.equipmentTag.split(' ')[0]} {item.equipmentTag.split(' ')[1] || ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item List / Detailed Rows */}
      <div className="space-y-2 pt-2">
        {equipmentData.map((item) => {
          const isSelected = selectedBar === item.equipmentTag;
          return (
            <div
              key={item.equipmentTag}
              onClick={() => {
                setSelectedBar(isSelected ? null : item.equipmentTag);
                if (onSelectTag) onSelectTag(item.equipmentTag);
              }}
              className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                isSelected
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                  : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-white">
                    {item.equipmentTag}
                  </span>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {item.category} • {item.unitCount} Units • Sampling @ {item.avgPingRateSec}s
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right font-mono text-xs">
                <div>
                  <span className="text-white font-bold">${item.totalCostCad.toFixed(2)} CAD</span>
                  <div className="text-[10px] text-slate-500">${item.costPerUnitCad.toFixed(2)} / unit</div>
                </div>
                <div className="text-[11px] text-slate-400 hidden sm:block">
                  {item.monthlyTelemetryGb} GB
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Equip tags auto-synced with BACnet / Johnson Controls device registry.</span>
        </div>
        <div className="text-slate-300">
          Fleet Ingestion Total: 3,550 Nodes
        </div>
      </div>
    </div>
  );
};
