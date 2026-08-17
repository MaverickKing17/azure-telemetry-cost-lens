import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  Info, 
  Check, 
  ShieldAlert, 
  Sparkles, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { AnomalyAlert } from '../types/cost-types';
import confetti from 'canvas-confetti';

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
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string>(anomalies[0]?.id || '');
  const [isApplyingFix, setIsApplyingFix] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const activeAnomaly = anomalies.find(a => a.id === selectedAnomalyId) || anomalies[0];

  if (!activeAnomaly) {
    return (
      <div className="bg-[#11141C] border border-slate-800 rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <span>All GTA Telemetry Streams Nominal</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 font-mono border border-green-500/20">
                0 Active Spikes
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              IoT Hub and Cosmos DB telemetry ingestion are tracking within normal SLA budget thresholds.
            </p>
          </div>
        </div>
        <div className="text-xs font-mono text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
          Steady State: $0.00 Anomaly Delta
        </div>
      </div>
    );
  }

  const isCritical = activeAnomaly.severity === 'critical';
  const isRemediated = activeAnomaly.status === 'remediated';

  const handleFix = () => {
    setIsApplyingFix(true);
    setTimeout(() => {
      onRemediate(activeAnomaly.id);
      setIsApplyingFix(false);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }, 1200);
  };

  return (
    <div className={`bg-[#11141C] rounded-xl p-6 relative overflow-hidden transition-all ${
      isRemediated
        ? 'border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
        : isCritical
          ? 'border-2 border-red-500/30 shadow-[0_0_25px_rgba(239,68,68,0.1)]'
          : 'border border-slate-800'
    }`}>
      {/* Background Watermark Icon */}
      <div className="absolute top-0 right-0 p-3 pointer-events-none">
        <svg className={`w-12 h-12 opacity-15 ${isRemediated ? 'text-emerald-500' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Top Bar: Anomaly Header & Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <h3 className={`font-bold uppercase tracking-wider text-xs flex items-center gap-2 ${
            isRemediated ? 'text-emerald-400' : 'text-red-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isRemediated ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <span>{isRemediated ? 'ANOMALY REMEDIATED' : 'ANOMALY DETECTED'}</span>
            <span className="text-[11px] text-slate-500 font-mono font-normal">
              • {activeAnomaly.gtaLocation}
            </span>
          </h3>
          <p className="text-slate-200 text-lg font-semibold leading-snug mt-1">
            {activeAnomaly.title}
          </p>
        </div>

        {/* Anomaly Tabs */}
        {anomalies.length > 1 && (
          <div className="flex items-center gap-1.5 bg-[#0B0F17] p-1 rounded-lg border border-slate-800 text-xs font-mono">
            {anomalies.map((anom, idx) => (
              <button
                key={anom.id}
                onClick={() => setSelectedAnomalyId(anom.id)}
                className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                  selectedAnomalyId === anom.id
                    ? anom.status === 'remediated'
                      ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                      : 'bg-red-500/20 text-red-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Alert #{idx + 1}</span>
                {anom.status === 'remediated' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid: Description & Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        <div className="lg:col-span-8 space-y-3">
          <p className="text-slate-400 text-sm leading-relaxed">
            {activeAnomaly.rootCause}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded bg-[#0B0F17] border border-slate-800 text-cyan-400">
              Scope: {activeAnomaly.equipmentScope}
            </span>
            <span className="px-2.5 py-1 rounded bg-[#0B0F17] border border-slate-800 text-slate-300">
              Service: {activeAnomaly.affectedService}
            </span>
            <span className="text-slate-500">
              Detected: {activeAnomaly.detectedAt}
            </span>
          </div>

          <div>
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="text-[11px] text-cyan-400 hover:underline font-mono pt-1 inline-block cursor-pointer"
            >
              {showTechnicalDetails ? '▼ Hide Technical Diagnostic Dump' : '▶ Show Technical Diagnostic Dump'}
            </button>

            {showTechnicalDetails && (
              <div className="mt-2 p-3 rounded-lg bg-[#0B0F17] border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div className="text-slate-500">// Diagnostic Log Analysis</div>
                <div>{activeAnomaly.technicalDetails}</div>
                <div className="text-slate-400 pt-1">
                  Target Patch: {activeAnomaly.recommendedAction}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 4 Cols: Impact & Fix Action */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
              Estimated Financial Impact
            </p>
            <p className={`text-2xl font-bold mt-1 font-mono ${
              isRemediated ? 'text-emerald-400 line-through' : 'text-red-500'
            }`}>
              ${activeAnomaly.estimatedCostImpactCad.toFixed(2)}{' '}
              <span className="text-xs font-normal text-slate-400">CAD / day</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              30-Day Potential Drain: <strong className="text-slate-200">${(activeAnomaly.estimatedCostImpactCad * 30).toFixed(0)} CAD</strong>
            </p>
          </div>

          <div className="space-y-2">
            {isRemediated ? (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Device Twin Patched (15s Telemetry Rate)</span>
              </div>
            ) : (
              <button
                onClick={handleFix}
                disabled={isApplyingFix}
                className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F17] font-bold text-xs uppercase tracking-wide transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isApplyingFix ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#0B0F17]" />
                    <span>Applying Cloud Twin Patch...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-[#0B0F17]" />
                    <span>⚡ Auto-Remediate (15s Sampling)</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => onAcknowledge(activeAnomaly.id)}
              className="w-full text-xs font-bold text-slate-500 hover:text-slate-300 uppercase tracking-tighter text-center py-1 transition-colors"
            >
              {activeAnomaly.status === 'acknowledged' ? 'Acknowledged' : 'Dismiss Alert'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
