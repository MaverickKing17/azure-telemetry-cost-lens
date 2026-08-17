import React from 'react';
import { 
  AlertOctagon, 
  CheckCircle2, 
  Flame, 
  Zap, 
  Radio, 
  Clock, 
  ChevronRight, 
  ShieldAlert,
  ArrowRight
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
    <div className="bg-[#292827] border border-[#a80000]/60 rounded-lg p-6 shadow-xl flex flex-col justify-between h-full space-y-5 text-[#f3f2f1]">
      {/* Alert Header */}
      <div className="flex items-center justify-between border-b border-[#3b3a39] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-[#a80000]/25 text-[#ff6b6b] border border-[#a80000]/50 shadow-xs">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-[#ff6b6b] tracking-tight">
                Active Anomaly Detected
              </h2>
              <span className="bg-[#a80000] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                CRITICAL
              </span>
            </div>
            <p className="text-xs text-[#a19f9d] mt-0.5">
              Live Azure Cost Anomaly Engine Alert
            </p>
          </div>
        </div>
      </div>

      {activeCritical ? (
        <div className="space-y-4">
          {/* Main Anomaly Summary Box */}
          <div className="bg-[#252423] border border-[#3b3a39] rounded-lg p-4 space-y-3 shadow-xs">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold text-[#f3f2f1]">
                {activeCritical.title}
              </span>
              <span className="text-[10px] font-mono text-[#ff6b6b] bg-[#a80000]/20 border border-[#a80000]/40 px-2 py-0.5 rounded font-medium">
                {activeCritical.gtaLocation}
              </span>
            </div>

            <p className="text-xs text-[#a19f9d] leading-relaxed">
              {activeCritical.rootCause}
            </p>

            {/* Impact Metric Highlight */}
            <div className="bg-[#a80000]/15 border border-[#a80000]/40 rounded p-3 flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-[#ff8080] uppercase block font-semibold">Estimated Cost Runaway</span>
                <span className="text-lg font-bold text-[#ff6b6b]">
                  +${activeCritical.estimatedCostImpactCad.toFixed(2)} <span className="text-xs text-[#a19f9d] font-normal">CAD / day</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#a19f9d] block">Affected Fleet Scope</span>
                <span className="text-xs font-semibold text-[#f3f2f1]">
                  {activeCritical.equipmentScope}
                </span>
              </div>
            </div>

            {/* Recommended Action */}
            <div className="text-xs bg-[#1b1a19] border border-[#3b3a39] rounded p-2.5 space-y-1">
              <div className="flex items-center gap-1.5 text-[#00ccff] font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>Recommended One-Click Azure Twin Action:</span>
              </div>
              <p className="text-[11px] text-[#a19f9d]">
                {activeCritical.recommendedAction}
              </p>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={() => onRemediate(activeCritical.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#a80000] hover:bg-[#8b0000] text-white font-semibold py-2 px-4 rounded text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Throttle Telemetry (Save $145.20/d)</span>
            </button>

            <button
              onClick={() => onAcknowledge(activeCritical.id)}
              className="flex items-center justify-center gap-1 bg-[#323130] hover:bg-[#3b3a39] text-[#f3f2f1] border border-[#484644] font-semibold py-2 px-4 rounded text-xs transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#a19f9d]" />
              <span>Acknowledge</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#252423] border border-[#107c10]/40 rounded-lg p-5 text-center space-y-2 shadow-xs">
          <div className="w-10 h-10 bg-[#107c10]/20 text-[#107c10] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-[#f3f2f1]">
            Telemetry Rate Nominal
          </h3>
          <p className="text-xs text-[#a19f9d] max-w-xs mx-auto">
            All 85 GTA IoT Edge hubs are streaming at target 15s sampling cadence. No runaway spend detected.
          </p>
        </div>
      )}

      {/* Other Logged Events / History */}
      <div className="border-t border-[#3b3a39] pt-3 space-y-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#ff8080] block font-mono">
          Recent Cloud Cost Events
        </span>
        <div className="space-y-1.5">
          {otherAnomalies.slice(0, 2).map((item) => (
            <div 
              key={item.id}
              className="bg-[#252423] border border-[#3b3a39] rounded p-2.5 flex items-center justify-between text-xs hover:border-[#605e5c] transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  item.status === 'remediated' ? 'bg-[#107c10]' : 'bg-[#ffaa00]'
                }`} />
                <span className="text-[#f3f2f1] font-medium truncate">
                  {item.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#a19f9d] bg-[#1b1a19] border border-[#3b3a39] px-2 py-0.5 rounded capitalize">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
