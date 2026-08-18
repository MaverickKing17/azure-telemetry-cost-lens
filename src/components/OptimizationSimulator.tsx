import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  Zap
} from 'lucide-react';

export const OptimizationSimulator: React.FC = () => {
  const [rtuSamplingRate, setRtuSamplingRate] = useState<number>(15);
  const [cosmosTtlDays, setCosmosTtlDays] = useState<number>(90);
  const [streamAnalyticsUnits, setStreamAnalyticsUnits] = useState<number>(3);
  const [appliedFeedback, setAppliedFeedback] = useState<boolean>(false);

  // Baseline exact defaults yield $8,340.00 CAD
  const rtuCost = (15 / rtuSamplingRate) * 3240.00;
  const cosmosCost = (cosmosTtlDays / 90) * 2600.00;
  const streamCost = (streamAnalyticsUnits / 3) * 2500.00;

  const totalSimulatedCostCad = rtuCost + cosmosCost + streamCost;
  const baselineReferenceCostCad = 8340.00;
  const monthlySavingsCad = Math.max(0, baselineReferenceCostCad - totalSimulatedCostCad);
  const annualSavingsCad = monthlySavingsCad * 12;

  const handleReset = () => {
    setRtuSamplingRate(15);
    setCosmosTtlDays(90);
    setStreamAnalyticsUnits(3);
    setAppliedFeedback(false);
  };

  const handleApply = () => {
    setAppliedFeedback(true);
    setTimeout(() => {
      setAppliedFeedback(false);
    }, 4000);
  };

  return (
    <div className="space-y-6 w-full text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif]">
      {/* Header Card */}
      <div className="bg-[#1C2541] border border-[#3A506B] rounded-xl p-6 shadow-[0_0_20px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9] transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#3A506B] pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#0B132B] border border-[#3A506B] text-[#6FFFE9]">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Azure HVAC Telemetry Cost Optimization Simulator
              </h2>
            </div>
            <p className="text-xs text-[#BCF8EC] mt-1">
              Simulate trade-offs between telemetry sampling rates, Cosmos DB hot/warm retention, and Azure Stream Analytics provisioning
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#6FFFE9] bg-[#0B132B] hover:bg-[#142247] border border-[#3A506B] hover:border-[#6FFFE9] px-3.5 py-2 rounded-lg transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* Control 1: RTU Telemetry Sampling */}
            <div className="bg-[#0B132B] border border-[#3A506B] rounded-xl p-4.5 space-y-3 shadow-inner hover:border-[#6FFFE9]/50 transition-colors">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">1. RTU Edge Telemetry Ingestion Frequency</span>
                <span className="font-mono font-bold text-[#6FFFE9] bg-[#1C2541] px-2.5 py-1 rounded border border-[#3A506B]">
                  Every {rtuSamplingRate} seconds
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                step="1"
                value={rtuSamplingRate}
                aria-label="RTU Edge Telemetry Ingestion Frequency"
                onChange={(e) => setRtuSamplingRate(Number(e.target.value))}
                className="w-full accent-[#6FFFE9] cursor-pointer h-2 bg-[#1C2541] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-[#BCF8EC] font-mono">
                <span>1s (High Frequency / Surge)</span>
                <span className="text-[#6FFFE9] font-bold">15s (Default Recommended)</span>
                <span>60s (Ultra Economy)</span>
              </div>
            </div>

            {/* Control 2: Cosmos DB Hot Retention TTL */}
            <div className="bg-[#0B132B] border border-[#3A506B] rounded-xl p-4.5 space-y-3 shadow-inner hover:border-[#6FFFE9]/50 transition-colors">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">2. Cosmos DB Hot Diagnostics Retention (TTL)</span>
                <span className="font-mono font-bold text-[#6FFFE9] bg-[#1C2541] px-2.5 py-1 rounded border border-[#3A506B]">
                  {cosmosTtlDays} days
                </span>
              </div>
              <input
                type="range"
                min="14"
                max="365"
                step="7"
                value={cosmosTtlDays}
                aria-label="Cosmos DB Hot Diagnostics Retention"
                onChange={(e) => setCosmosTtlDays(Number(e.target.value))}
                className="w-full accent-[#6FFFE9] cursor-pointer h-2 bg-[#1C2541] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-[#BCF8EC] font-mono">
                <span>14 Days (Minimum)</span>
                <span className="text-[#6FFFE9] font-bold">90 Days (Default SLA)</span>
                <span>365 Days (Compliance)</span>
              </div>
            </div>

            {/* Control 3: Stream Analytics Units */}
            <div className="bg-[#0B132B] border border-[#3A506B] rounded-xl p-4.5 space-y-3 shadow-inner hover:border-[#6FFFE9]/50 transition-colors">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">3. Stream Analytics Compute Provisioning (SUs)</span>
                <span className="font-mono font-bold text-[#6FFFE9] bg-[#1C2541] px-2.5 py-1 rounded border border-[#3A506B]">
                  {streamAnalyticsUnits} Streaming Units
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={streamAnalyticsUnits}
                aria-label="Stream Analytics Compute Provisioning"
                onChange={(e) => setStreamAnalyticsUnits(Number(e.target.value))}
                className="w-full accent-[#6FFFE9] cursor-pointer h-2 bg-[#1C2541] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-[#BCF8EC] font-mono">
                <span>1 SU (Minimum)</span>
                <span className="text-[#6FFFE9] font-bold">3 SUs (Default Standard)</span>
                <span>12 SUs (Dedicated Peak)</span>
              </div>
            </div>
          </div>

          {/* Savings Projection Card */}
          <div className="lg:col-span-5 bg-[#0B132B] text-white border border-[#3A506B] rounded-xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-[#6FFFE9] text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>SIMULATED FINANCIAL IMPACT</span>
              </div>
              <h3 className="text-xl font-bold mt-2 text-white">
                GTA Fleet Run-Rate Model
              </h3>
              <p className="text-xs text-[#BCF8EC] mt-1">
                Estimated Azure Canada Central bill based on simulated parameter twin adjustments.
              </p>
            </div>

            <div className="my-6 space-y-4 font-mono">
              <div className="flex justify-between text-xs text-[#BCF8EC]">
                <span>Simulated Monthly Cloud Spend:</span>
                <span className="text-white font-bold text-base">
                  ${totalSimulatedCostCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CAD
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[#1C2541] border border-[#6FFFE9]/40 shadow-[0_0_15px_rgba(111,255,233,0.1)]">
                <span className="text-[10px] text-[#BCF8EC] block uppercase font-bold">Projected Monthly Savings</span>
                <span className="text-2xl font-black text-[#6FFFE9] cyan-text-glow">
                  +${monthlySavingsCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs text-[#BCF8EC] font-normal">CAD / mo</span>
                </span>
              </div>

              <div className="flex justify-between text-xs text-[#BCF8EC]">
                <span>Annualized Net Savings:</span>
                <span className="text-[#22C55E] font-bold">
                  +${annualSavingsCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CAD / yr
                </span>
              </div>
            </div>

            {appliedFeedback ? (
              <div className="w-full bg-[#142A20] text-[#22C55E] border border-[#22C55E]/50 font-bold py-3 px-4 rounded-lg text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Parameters Synced to 85 Device Twins!</span>
              </div>
            ) : (
              <button
                onClick={handleApply}
                className="w-full bg-[#0078D4] hover:bg-[#106EBE] text-white font-bold py-3 px-4 rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-white" />
                <span>Apply Configuration to Azure Twins</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
