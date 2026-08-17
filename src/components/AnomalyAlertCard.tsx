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
    <div className="bg-[#111622] border border-rose-500/40 shadow-[0_0_25px_rgba(244,63,94,0.15)] rounded-2xl p-6 flex flex-col justify-between h-full space-y-5 text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif] hover:border-rose-400 transition-all duration-300">
      {/* Alert Header */}
      <div className="flex items-center justify-between border-b border-rose-500/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-rose-400 tracking-tight">
                Active Anomaly Detected
              </h2>
              <span className="bg-rose-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse shadow-[0_0_8px_#F43F5E]">
                CRITICAL
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Live Azure Cost Anomaly Engine Alert
            </p>
          </div>
        </div>
      </div>

      {activeCritical ? (
        <div className="space-y-4">
          {/* Main Anomaly Summary Box */}
          <div className="bg-[#0B101D] border border-rose-500/30 rounded-xl p-4 space-y-3 shadow-inner">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-white">
                {activeCritical.title}
              </span>
              <span className="text-[10px] font-mono text-rose-300 bg-rose-950/80 border border-rose-500/40 px-2 py-0.5 rounded-full font-bold">
                {activeCritical.gtaLocation}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeCritical.rootCause}
            </p>

            {/* Impact Metric Highlight */}
            <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-3 flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-rose-300 uppercase block font-bold">Estimated Cost Runaway</span>
                <span className="text-lg font-black text-rose-400">
                  +${activeCritical.estimatedCostImpactCad.toFixed(2)} <span className="text-xs text-slate-300 font-normal">CAD / day</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-300 block font-semibold">Affected Scope</span>
                <span className="text-xs font-bold text-white">
                  {activeCritical.equipmentScope}
                </span>
              </div>
            </div>

            {/* Recommended Action */}
            <div className="text-xs bg-[#05070B] border border-cyan-500/30 rounded-xl p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[#00E5FF] font-bold">
                <Zap className="w-3.5 h-3.5 text-[#00E5FF]" fill="currentColor" />
                <span>Recommended One-Click Azure Twin Action:</span>
              </div>
              <p className="text-xs text-slate-300">
                {activeCritical.recommendedAction}
              </p>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={() => onRemediate(activeCritical.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-white" fill="currentColor" />
              <span>Throttle Telemetry (Save $145.20/d)</span>
            </button>

            <button
              onClick={() => onAcknowledge(activeCritical.id)}
              className="flex items-center justify-center gap-1.5 bg-[#0B101D] hover:bg-slate-800 text-white border border-slate-700 hover:border-cyan-400 font-bold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" />
              <span>Acknowledge</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#0B101D] border border-emerald-500/40 rounded-xl p-6 text-center space-y-2.5 shadow-inner">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">
            Telemetry Rate Nominal
          </h3>
          <p className="text-xs text-slate-300 max-w-xs mx-auto">
            All 85 GTA IoT Edge hubs are streaming at target 15s sampling cadence. Zero runaway telemetry detected.
          </p>
        </div>
      )}

      {/* Other Logged Events / History */}
      <div className="border-t border-slate-800 pt-3 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block font-mono">
          Recent Cloud Cost Events
        </span>
        <div className="space-y-1.5">
          {otherAnomalies.slice(0, 2).map((item) => (
            <div 
              key={item.id}
              className="bg-[#0B101D] border border-slate-800 hover:border-cyan-500/40 rounded-xl p-2.5 flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  item.status === 'remediated' ? 'bg-emerald-400 shadow-[0_0_6px_#34D399]' : 'bg-amber-400 shadow-[0_0_6px_#FBBF24]'
                }`} />
                <span className="text-white font-semibold truncate">
                  {item.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded-full capitalize">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
