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
    <div className="bg-[#292827] border border-[#3b3a39] rounded-lg p-6 shadow-xl flex flex-col justify-between h-full space-y-5 text-[#f3f2f1]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#3b3a39] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[#0078D4]/20 border border-[#0078D4]/40 text-[#00ccff]">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h2 className="text-base font-semibold text-[#f3f2f1] tracking-tight">
              Cost by Equipment Tag (Sub-Fleet Breakdown)
            </h2>
          </div>
          <p className="text-xs text-[#a19f9d] mt-1">
            Real-time attribution linking Azure IoT Hub message volume & stream analytics compute to mechanical equipment classes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#a19f9d] bg-[#252423] border border-[#3b3a39] px-2.5 py-1 rounded">
            Fleet Total: <strong className="text-[#00ccff] font-bold">${totalEquipmentCostCad.toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD</strong>
          </span>
        </div>
      </div>

      {/* Visual Bar Distribution */}
      <div className="space-y-3.5">
        {equipmentData.map((item) => {
          const percentage = (item.totalCostCad / totalEquipmentCostCad) * 100;
          const barFillWidth = (item.totalCostCad / maxCost) * 100;
          const isHighRate = item.avgPingRateSec <= 5;

          return (
            <div 
              key={item.category}
              onClick={() => onSelectTag(item.equipmentTag)}
              className="group cursor-pointer p-3 rounded hover:bg-[#323130] border border-transparent hover:border-[#3b3a39] transition-all"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-[#f3f2f1] group-hover:text-[#00ccff] transition-colors">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#a19f9d] bg-[#252423] border border-[#3b3a39] px-2 py-0.5 rounded truncate max-w-[180px]">
                    tag: {item.equipmentTag}
                  </span>
                  {isHighRate && (
                    <span className="text-[10px] font-mono text-[#ffaa00] bg-[#ffaa00]/15 border border-[#ffaa00]/40 px-1.5 py-0.2 rounded flex items-center gap-1 shrink-0 font-medium">
                      ⚠️ High Polling ({item.avgPingRateSec}s)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 font-mono">
                  <div className="text-right">
                    <span className="font-bold text-[#f3f2f1]">
                      ${item.totalCostCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[11px] text-[#a19f9d] ml-1.5">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="flex items-center text-[11px] w-16 justify-end">
                    {item.deltaPercentVsLastMonth > 0 ? (
                      <span className="text-[#ff6b6b] font-semibold flex items-center">
                        <ArrowUpRight className="w-3 h-3" />
                        +{item.deltaPercentVsLastMonth}%
                      </span>
                    ) : (
                      <span className="text-[#107c10] font-semibold flex items-center">
                        <ArrowDownRight className="w-3 h-3" />
                        {item.deltaPercentVsLastMonth}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-[#1b1a19] h-2.5 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    item.deltaPercentVsLastMonth > 20 
                      ? 'bg-[#d83b01]' 
                      : 'bg-[#00ccff]'
                  }`}
                  style={{ width: `${barFillWidth}%` }}
                />
              </div>

              {/* Sub-detail footer */}
              <div className="flex items-center justify-between text-[11px] text-[#a19f9d] mt-1.5 font-mono">
                <span>{item.unitCount} deployed physical units</span>
                <span>Avg. ${item.costPerUnitCad.toFixed(2)} CAD / unit / mo</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Tip */}
      <div className="bg-[#252423] border border-[#3b3a39] rounded p-3 flex items-start gap-2.5 text-xs text-[#a19f9d]">
        <HelpCircle className="w-4 h-4 text-[#00ccff] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#f3f2f1]">Telemetry Sampling Impact:</strong> RTUs on 1-second telemetry push generate ~86,400 messages/unit/day into Azure IoT Hub S1 units, directly impacting ingestion and storage run rates.
        </p>
      </div>
    </div>
  );
};
