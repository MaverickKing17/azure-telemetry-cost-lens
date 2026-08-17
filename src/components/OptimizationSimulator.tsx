import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Sparkles, 
  DollarSign, 
  TrendingDown, 
  CheckCircle, 
  Layers, 
  Zap,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const OptimizationSimulator: React.FC = () => {
  const [rtuSamplingRate, setRtuSamplingRate] = useState<number>(15);
  const [cosmosTtlDays, setCosmosTtlDays] = useState<number>(90);
  const [enableStorageTiering, setEnableStorageTiering] = useState<boolean>(true);
  const [streamAnalyticsUnits, setStreamAnalyticsUnits] = useState<number>(3);
  const [appliedFeedback, setAppliedFeedback] = useState<boolean>(false);

  // Baseline monthly costs CAD
  const baseRtuCost = (60 / rtuSamplingRate) * 750;
  const baseCosmosCost = (cosmosTtlDays / 30) * 1200;
  const baseStorageCost = enableStorageTiering ? 480 : 920;
  const baseStreamCost = streamAnalyticsUnits * 420;

  const totalSimulatedCostCad = baseRtuCost + baseCosmosCost + baseStorageCost + baseStreamCost;
  const baselineReferenceCostCad = 6800.00;
  const monthlySavingsCad = Math.max(0, baselineReferenceCostCad - totalSimulatedCostCad);
  const annualSavingsCad = monthlySavingsCad * 12;

  const handleReset = () => {
    setRtuSamplingRate(15);
    setCosmosTtlDays(90);
    setEnableStorageTiering(true);
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
    <div className="space-y-6 w-full text-[#f3f2f1]">
      {/* Header */}
      <div className="bg-[#292827] border border-[#3b3a39] rounded-lg p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#3b3a39] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-[#0078D4]/20 border border-[#0078D4]/40 text-[#00ccff]">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <h2 className="text-base font-semibold text-[#f3f2f1] tracking-tight">
                Azure HVAC Telemetry Cost Optimization Simulator
              </h2>
            </div>
            <p className="text-xs text-[#a19f9d] mt-1">
              Simulate trade-offs between telemetry sampling rates, Cosmos DB hot/warm retention, and Azure Storage lifecycle tiers
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#f3f2f1] hover:text-white bg-[#252423] hover:bg-[#323130] border border-[#3b3a39] px-3 py-1.5 rounded transition-colors cursor-pointer"
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
            <div className="bg-[#252423] border border-[#3b3a39] rounded p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#f3f2f1]">RTU Edge Telemetry Ingestion Frequency</span>
                <span className="font-mono font-semibold text-[#00ccff] bg-[#0078D4]/25 px-2 py-0.5 rounded border border-[#0078D4]/40">
                  Every {rtuSamplingRate} seconds
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                step="1"
                value={rtuSamplingRate}
                onChange={(e) => setRtuSamplingRate(Number(e.target.value))}
                className="w-full accent-[#00ccff] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#a19f9d] font-mono">
                <span>1s (High Frequency / Cost Spike)</span>
                <span>15s (Standard Recommended)</span>
                <span>60s (Ultra Economy)</span>
              </div>
            </div>

            {/* Control 2: Cosmos DB Hot Retention TTL */}
            <div className="bg-[#252423] border border-[#3b3a39] rounded p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#f3f2f1]">Cosmos DB Hot Diagnostics Retention (TTL)</span>
                <span className="font-mono font-semibold text-[#00ccff] bg-[#0078D4]/25 px-2 py-0.5 rounded border border-[#0078D4]/40">
                  {cosmosTtlDays} days
                </span>
              </div>
              <input
                type="range"
                min="14"
                max="365"
                step="7"
                value={cosmosTtlDays}
                onChange={(e) => setCosmosTtlDays(Number(e.target.value))}
                className="w-full accent-[#00ccff] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#a19f9d] font-mono">
                <span>14 Days (Minimum)</span>
                <span>90 Days (Standard SLA)</span>
                <span>365 Days (Compliance)</span>
              </div>
            </div>

            {/* Control 3: Stream Analytics Units */}
            <div className="bg-[#252423] border border-[#3b3a39] rounded p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#f3f2f1]">Stream Analytics Compute Provisioning (SUs)</span>
                <span className="font-mono font-semibold text-[#00ccff] bg-[#0078D4]/25 px-2 py-0.5 rounded border border-[#0078D4]/40">
                  {streamAnalyticsUnits} Streaming Units
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={streamAnalyticsUnits}
                onChange={(e) => setStreamAnalyticsUnits(Number(e.target.value))}
                className="w-full accent-[#00ccff] cursor-pointer"
              />
            </div>
          </div>

          {/* Savings Projection Card */}
          <div className="lg:col-span-5 bg-[#1b1a19] text-[#f3f2f1] border border-[#3b3a39] rounded-lg p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-[#00ccff] text-xs font-mono font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Simulated Financial Impact</span>
              </div>
              <h3 className="text-xl font-semibold mt-2 text-[#f3f2f1]">
                GTA Fleet Run-Rate Model
              </h3>
              <p className="text-xs text-[#a19f9d] mt-1">
                Estimated Azure Canada Central bill based on simulated parameter twin adjustments.
              </p>
            </div>

            <div className="my-6 space-y-4 font-mono">
              <div className="flex justify-between text-xs text-[#a19f9d]">
                <span>Simulated Monthly Cloud Spend:</span>
                <span className="text-[#f3f2f1] font-bold text-base">
                  ${totalSimulatedCostCad.toFixed(2)} CAD
                </span>
              </div>

              <div className="p-4 rounded bg-[#0078D4]/20 border border-[#0078D4]/50">
                <span className="text-[10px] text-[#c7e0f4] block uppercase font-semibold">Projected Monthly Savings</span>
                <span className="text-2xl font-bold text-[#00ccff]">
                  +${monthlySavingsCad.toFixed(2)} <span className="text-xs text-[#a19f9d] font-normal">CAD / mo</span>
                </span>
              </div>

              <div className="flex justify-between text-xs text-[#a19f9d]">
                <span>Annualized Net Savings:</span>
                <span className="text-[#107c10] font-bold">
                  +${annualSavingsCad.toFixed(2)} CAD / yr
                </span>
              </div>
            </div>

            {appliedFeedback ? (
              <div className="w-full bg-[#107c10]/20 text-[#107c10] border border-[#107c10]/50 font-semibold py-2.5 px-4 rounded text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Parameters Synced to 85 Device Twins!</span>
              </div>
            ) : (
              <button
                onClick={handleApply}
                className="w-full bg-[#0078D4] hover:bg-[#106EBE] text-white font-semibold py-2.5 px-4 rounded text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Apply Configuration to Azure Twins</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
