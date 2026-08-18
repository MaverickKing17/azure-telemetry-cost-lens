import React from 'react';
import { 
  Flame, 
  Zap, 
  CheckCircle2
} from 'lucide-react';
import { AnomalyAlert } from '../types/cost-types';

interface AnomalyAlertCardProps {
  anomalies: AnomalyAlert[];
  onRemediate: (anomalyId: string) => void;
  onAcknowledge: (anomalyId: string) => void;
}

export const AnomalyAlertCard: React.FC<AnomalyAlertCardProps> = ({
  anomalies,
  onRemediate,
  onAcknowledge,
}) => {
  const activeCritical = anomalies.find(a => a.severity === 'critical' && a.status === 'active');
  const otherAnomalies = anomalies.filter(a => a.id !== activeCritical?.id);

  return (
    <div className="bg-[#1C2541] border border-[#EF4444]/50 shadow-[0_0_25px_rgba(239,68,68,0.15)] rounded-xl p-6 flex flex-col justify-between h-full space-y-5 text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif] hover:border-[#EF4444] transition-all duration-300">
      {/* Alert Header */}
      <div className="flex items-center justify-between border-b border-[#3A506B] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#2A1520] text-[#EF4444] border border-[#EF4444]/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#EF4444] tracking-tight">
                Active Anomaly Detected
              </h2>
              <span className="bg-[#EF4444] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse shadow-[0_0_8px_#EF4444]">
                CRITICAL
              </span>
            </div>
            <p className="text-xs text-[#BCF8EC] mt-0.5">
              Live Azure Cost Anomaly Engine Alert
            </p>
          </div>
        </div>
      </div>

      {activeCritical ? (
        <div className="space-y-4">
          {/* Main Anomaly Summary Box */}
          <div className="bg-[#0B132B] border border-[#EF4444]/40 rounded-xl p-4 space-y-3 shadow-inner">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-white">
                {activeCritical.title}
              </span>
              <span className="text-[10px] font-mono text-[#EF4444] bg-[#2A1520] border border-[#EF4444]/40 px-2 py-0.5 rounded font-bold">
                {activeCritical.gtaLocation}
              </span>
            </div>

            <p className="text-xs text-[#BCF8EC] leading-relaxed">
              {activeCritical.rootCause}
            </p>

            {/* Impact Metric Highlight */}
            <div className="bg-[#2A1520] border border-[#EF4444]/40 rounded-lg p-3 flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-[#EF4444] uppercase block font-bold">Estimated Cost Runaway</span>
                <span className="text-lg font-black text-[#EF4444]">
                  +${activeCritical.estimatedCostImpactCad.toFixed(2)} <span className="text-xs text-[#BCF8EC] font-normal">CAD / day</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#BCF8EC] block font-semibold">Affected Scope</span>
                <span className="text-xs font-bold text-white">
                  {activeCritical.equipmentScope}
                </span>
              </div>
            </div>

            {/* Recommended Action */}
            <div className="text-xs bg-[#1C2541] border border-[#3A506B] rounded-lg p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[#6FFFE9] font-bold">
                <Zap className="w-3.5 h-3.5 text-[#6FFFE9]" fill="currentColor" />
                <span>Recommended One-Click Azure Twin Action:</span>
              </div>
              <p className="text-xs text-[#BCF8EC]">
                {activeCritical.recommendedAction}
              </p>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={() => onRemediate(activeCritical.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold py-2.5 px-4 rounded-lg text-xs shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-white" fill="currentColor" />
              <span>Throttle Telemetry (Save $145.20/d)</span>
            </button>

            <button
              onClick={() => onAcknowledge(activeCritical.id)}
              className="flex items-center justify-center gap-1.5 bg-[#0B132B] hover:bg-[#142247] text-white border border-[#3A506B] hover:border-[#6FFFE9] font-bold py-2.5 px-4 rounded-lg text-xs transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#BCF8EC]" />
              <span>Acknowledge</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#0B132B] border border-[#22C55E]/40 rounded-xl p-6 text-center space-y-2.5 shadow-inner">
          <div className="w-12 h-12 bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">
            Telemetry Rate Nominal
          </h3>
          <p className="text-xs text-[#BCF8EC] max-w-xs mx-auto">
            All 85 GTA IoT Edge hubs are streaming at target 15s sampling cadence. Zero runaway telemetry detected.
          </p>
        </div>
      )}

      {/* Other Logged Events / History */}
      <div className="border-t border-[#3A506B] pt-3 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444] block font-mono">
          Recent Cloud Cost Events
        </span>
        <div className="space-y-1.5">
          {otherAnomalies.slice(0, 2).map((item) => (
            <div 
              key={item.id}
              className="bg-[#0B132B] border border-[#3A506B] hover:border-[#6FFFE9] rounded-lg p-2.5 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  item.status === 'remediated' ? 'bg-[#22C55E] shadow-[0_0_6px_#22C55E]' : 'bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]'
                }`} />
                <span className="text-white font-semibold truncate">
                  {item.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#6FFFE9] bg-[#1C2541] border border-[#3A506B] px-2 py-0.5 rounded capitalize">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
