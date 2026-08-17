import React from 'react';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  HelpCircle, 
  Filter, 
  Cpu, 
  BarChart3 
} from 'lucide-react';
import { EquipmentCostSummary } from '../types/cost-types';

interface CostByEquipmentChartProps {
  equipmentData: EquipmentCostSummary[];
  onSelectTag: (tag: string) => void;
}

export const CostByEquipmentChart: React.FC<CostByEquipmentChartProps> = ({
  equipmentData,
  onSelectTag,
}) => {
  const maxCost = Math.max(...equipmentData.map(d => d.totalCostCad), 1);
  const totalEquipmentCostCad = equipmentData.reduce((sum, d) => sum + d.totalCostCad, 0);

  return (
    <div className="bg-[#111622] border border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,255,0.08)] rounded-2xl p-6 flex flex-col justify-between h-full space-y-5 text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif] hover:border-cyan-400/50 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.25)]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Cost by Equipment Tag (Sub-Fleet Breakdown)
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Real-time attribution linking Azure IoT Hub message volume & stream analytics compute to mechanical equipment classes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-300 bg-[#0B101D] border border-cyan-500/30 px-3 py-1.5 rounded-xl shadow-inner">
            Fleet Total: <strong className="text-[#00E5FF] font-bold">${totalEquipmentCostCad.toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD</strong>
          </span>
        </div>
      </div>

      {/* Visual Bar Distribution */}
      <div className="space-y-3">
        {equipmentData.map((item) => {
          const percentage = (item.totalCostCad / totalEquipmentCostCad) * 100;
          const barFillWidth = (item.totalCostCad / maxCost) * 100;
          const isHighRate = item.avgPingRateSec <= 5;

          return (
            <div 
              key={item.category}
              onClick={() => onSelectTag(item.equipmentTag)}
              className="group cursor-pointer p-3.5 rounded-xl bg-[#0B101D] hover:bg-[#151D2E] border border-slate-800 hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(0,229,255,0.12)] transition-all duration-300"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded-full truncate max-w-[180px]">
                    tag: {item.equipmentTag}
                  </span>
                  {isHighRate && (
                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/70 border border-amber-500/50 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 animate-pulse">
                      ⚠️ High Polling ({item.avgPingRateSec}s)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 font-mono">
                  <div className="text-right">
                    <span className="font-bold text-white">
                      ${item.totalCostCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[11px] text-slate-300 ml-1.5">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="flex items-center text-xs w-16 justify-end font-mono">
                    {item.deltaPercentVsLastMonth > 0 ? (
                      <span className="text-rose-400 font-bold flex items-center">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        +{item.deltaPercentVsLastMonth}%
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold flex items-center">
                        <ArrowDownRight className="w-3.5 h-3.5" />
                        {item.deltaPercentVsLastMonth}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden flex border border-slate-800">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    item.deltaPercentVsLastMonth > 20 
                      ? 'bg-rose-500 shadow-[0_0_10px_#F43F5E]' 
                      : 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                  }`}
                  style={{ width: `${barFillWidth}%` }}
                />
              </div>

              {/* Sub-detail footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-300 mt-2 font-mono">
                <span>{item.unitCount} deployed physical units</span>
                <span className="text-cyan-300 font-semibold">Avg. ${item.costPerUnitCad.toFixed(2)} CAD / unit / mo</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Tip */}
      <div className="bg-[#0B101D] border border-cyan-500/30 rounded-xl p-3.5 flex items-start gap-3 text-xs text-slate-300 shadow-inner">
        <HelpCircle className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Telemetry Sampling Impact:</strong> RTUs on 1-second telemetry push generate ~86,400 messages/unit/day into Azure IoT Hub S1 units, directly impacting ingestion and storage run rates.
        </p>
      </div>
    </div>
  );
};
