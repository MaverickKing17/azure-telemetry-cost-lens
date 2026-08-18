import React from 'react';
import { 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight, 
  HelpCircle 
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
    <div className="bg-[#1C2541] border border-[#3A506B] shadow-[0_0_20px_rgba(111,255,233,0.06)] rounded-xl p-6 flex flex-col justify-between h-full space-y-5 text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif] hover:border-[#6FFFE9] transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#3A506B] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#0B132B] border border-[#3A506B] text-[#6FFFE9]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Cost by Equipment Tag (Sub-Fleet Breakdown)
            </h2>
          </div>
          <p className="text-xs text-[#BCF8EC] mt-1">
            Real-time attribution linking Azure IoT Hub message volume & stream analytics compute to mechanical equipment classes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#BCF8EC] bg-[#0B132B] border border-[#3A506B] px-3 py-1.5 rounded-lg shadow-inner">
            Fleet Total: <strong className="text-[#6FFFE9] font-bold">${totalEquipmentCostCad.toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD</strong>
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
              className="group cursor-pointer p-3.5 rounded-xl bg-[#0B132B] hover:bg-[#142247] border border-[#3A506B] hover:border-[#6FFFE9] hover:shadow-[0_0_15px_rgba(111,255,233,0.12)] transition-all duration-300"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-bold text-white group-hover:text-[#6FFFE9] transition-colors">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#6FFFE9] bg-[#1C2541] border border-[#3A506B] px-2 py-0.5 rounded truncate max-w-[180px]">
                    tag: {item.equipmentTag}
                  </span>
                  {isHighRate && (
                    <span className="text-[10px] font-mono font-bold text-[#F59E0B] bg-[#2A2010] border border-[#F59E0B]/50 px-2 py-0.5 rounded flex items-center gap-1 shrink-0 animate-pulse">
                      ⚠️ High Polling ({item.avgPingRateSec}s)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 font-mono">
                  <div className="text-right">
                    <span className="font-bold text-white">
                      ${item.totalCostCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[11px] text-[#BCF8EC] ml-1.5">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="flex items-center text-xs w-16 justify-end font-mono">
                    {item.deltaPercentVsLastMonth > 0 ? (
                      <span className="text-[#EF4444] font-bold flex items-center">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        +{item.deltaPercentVsLastMonth}%
                      </span>
                    ) : (
                      <span className="text-[#22C55E] font-bold flex items-center">
                        <ArrowDownRight className="w-3.5 h-3.5" />
                        {item.deltaPercentVsLastMonth}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-[#1C2541] h-2.5 rounded-full overflow-hidden flex border border-[#3A506B]/50">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    item.deltaPercentVsLastMonth > 20 
                      ? 'bg-[#EF4444] shadow-[0_0_10px_#EF4444]' 
                      : 'bg-gradient-to-r from-[#0078D4] to-[#6FFFE9] shadow-[0_0_10px_rgba(111,255,233,0.4)]'
                  }`}
                  style={{ width: `${barFillWidth}%` }}
                />
              </div>

              {/* Sub-detail footer */}
              <div className="flex items-center justify-between text-[11px] text-[#BCF8EC] mt-2 font-mono">
                <span>{item.unitCount} deployed physical units</span>
                <span className="text-[#6FFFE9] font-semibold">Avg. ${item.costPerUnitCad.toFixed(2)} CAD / unit / mo</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Tip */}
      <div className="bg-[#0B132B] border border-[#3A506B] rounded-xl p-3.5 flex items-start gap-3 text-xs text-[#BCF8EC] shadow-inner">
        <HelpCircle className="w-4 h-4 text-[#6FFFE9] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Telemetry Sampling Impact:</strong> RTUs on 1-second telemetry push generate ~86,400 messages/unit/day into Azure IoT Hub S1 units, directly impacting ingestion and storage run rates.
        </p>
      </div>
    </div>
  );
};
