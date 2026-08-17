import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  TrendingDown,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OptimizationSimulator: React.FC = () => {
  const [pingInterval, setPingInterval] = useState<number>(15);
  const [storageRetentionDays, setStorageRetentionDays] = useState<number>(30);
  const [nightAutoScaling, setNightAutoScaling] = useState<boolean>(true);
  const [applyReservedInstances, setApplyReservedInstances] = useState<boolean>(true);
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [appliedSuccessfully, setAppliedSuccessfully] = useState<boolean>(false);

  let pingSavings = 0;
  if (pingInterval === 5) pingSavings = -1850;
  else if (pingInterval === 15) pingSavings = 0;
  else if (pingInterval === 30) pingSavings = 1180;
  else if (pingInterval === 60) pingSavings = 2340;

  let storageSavings = storageRetentionDays === 30 ? 380 : storageRetentionDays === 60 ? 190 : 0;
  let cosmosSavings = nightAutoScaling ? 420 : 0;
  let riSavings = applyReservedInstances ? 390 : 0;

  const totalMonthlySavingsCad = Math.max(0, pingSavings + storageSavings + cosmosSavings + riSavings);
  const annualizedSavingsCad = totalMonthlySavingsCad * 12;

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setAppliedSuccessfully(true);
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#11141C] border border-slate-800 rounded-xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                What-If Telemetry Cost Optimizer
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
                Live Simulator
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight mt-1">
              Simulate Azure Cost Reductions for GTA Equipment Fleets
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Adjust edge sensor sampling intervals, cloud storage tiering automation, and off-peak database capacity to calculate instant CAD budget savings.
            </p>
          </div>

          {/* Quick Projected Savings Badge */}
          <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 text-right font-mono">
            <div className="text-xs text-slate-400 flex items-center justify-end gap-1 font-sans font-medium">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              Annualized Savings
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-0.5">
              ${annualizedSavingsCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CAD
            </div>
            <div className="text-[11px] text-slate-500">
              ${totalMonthlySavingsCad.toFixed(2)} CAD / month
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Controls */}
        <div className="lg:col-span-7 bg-[#11141C] border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Operational Parameters
            </h3>
            <span className="text-xs font-mono text-slate-500">
              Affects 3,550 GTA Edge Nodes
            </span>
          </div>

          {/* Control 1: Ingestion Frequency */}
          <div className="space-y-3 p-4 rounded-xl bg-[#0B0F17] border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white font-mono">
                  1. IoT Edge Gateway Ping Rate:
                </div>
                <div className="text-[11px] text-slate-400">
                  Frequency of RTU & Chiller pressure / vibration telemetry pushes to Azure IoT Hub.
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-[#11141C] px-2.5 py-1 rounded border border-slate-800">
                {pingInterval}s Interval
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              {[5, 15, 30, 60].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setPingInterval(val)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    pingInterval === val
                      ? 'bg-cyan-500 text-[#0B0F17] font-bold shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                      : 'bg-[#11141C] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {val}s {val === 15 ? '(Baseline)' : val === 30 ? '(Eco)' : val === 60 ? '(Max Save)' : '(High)'}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Impact: <strong className={pingSavings >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                {pingSavings >= 0 ? `+$${pingSavings} CAD/mo savings` : `-$${Math.abs(pingSavings)} CAD/mo higher spend`}
              </strong>
            </div>
          </div>

          {/* Control 2: Storage Retention & Blob Lifecycle */}
          <div className="space-y-3 p-4 rounded-xl bg-[#0B0F17] border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white font-mono">
                  2. Hot Blob Storage Data Retention:
                </div>
                <div className="text-[11px] text-slate-400">
                  Automatically move historical vibration & refrigerant logs to Cool/Archive Storage.
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-[#11141C] px-2.5 py-1 rounded border border-slate-800">
                {storageRetentionDays} Days Hot
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {[30, 60, 90].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setStorageRetentionDays(val)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    storageRetentionDays === val
                      ? 'bg-cyan-500 text-[#0B0F17] font-bold'
                      : 'bg-[#11141C] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {val} Days {val === 30 ? '(Recommended)' : val === 90 ? '(Current)' : ''}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Data Lake Savings: <strong className="text-emerald-400">+${storageSavings} CAD/mo</strong>
            </div>
          </div>

          {/* Control 3: Off-Peak Cosmos DB Autoscaling */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B0F17] border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white font-mono">
                3. Cosmos DB Off-Peak Downscale (10 PM - 5 AM EDT)
              </div>
              <div className="text-[11px] text-slate-400">
                Scales RU/s down by 60% during overnight commercial HVAC shutdown hours.
              </div>
            </div>
            <button
              onClick={() => setNightAutoScaling(!nightAutoScaling)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                nightAutoScaling
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {nightAutoScaling ? 'ENABLED (+$420/mo)' : 'DISABLED'}
            </button>
          </div>

          {/* Control 4: 1-Year Azure Reserved Instances */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B0F17] border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white font-mono">
                4. Commit to 1-Year Azure Reserved Instances
              </div>
              <div className="text-[11px] text-slate-400">
                Switch pay-as-you-go legacy bridge VMs to 1-Year RI commitment for 38% discount.
              </div>
            </div>
            <button
              onClick={() => setApplyReservedInstances(!applyReservedInstances)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                applyReservedInstances
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {applyReservedInstances ? 'COMMITTED (+$390/mo)' : 'PAY-AS-YOU-GO'}
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Financial Projection */}
        <div className="lg:col-span-5 bg-[#11141C] border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                Financial Summary
              </h3>
              <span className="text-xs font-mono text-cyan-400">
                GTA Model
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
                <span className="text-slate-400">Current Monthly Run-Rate:</span>
                <span className="text-white font-bold">$14,842.80 CAD</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
                <span className="text-slate-400">Optimized Run-Rate:</span>
                <span className="text-emerald-400 font-bold">
                  ${(14842.80 - totalMonthlySavingsCad).toFixed(2)} CAD
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-emerald-300">Monthly Net Savings:</span>
                <span className="text-emerald-400 font-bold text-sm">
                  +${totalMonthlySavingsCad.toFixed(2)} CAD / mo
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-cyan-300">Optimized Cost / Unit:</span>
                <span className="text-cyan-400 font-bold text-sm">
                  ${((14842.80 - totalMonthlySavingsCad) / 3550).toFixed(2)} CAD
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
              ℹ️ Telemetry frequency reduction from 15s to 30s satisfies 100% of Ontario TSSA & ASHRAE Guideline 36 requirements.
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800">
            {appliedSuccessfully ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Cloud Policy Script Queued for Device Twin Sync</span>
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={isApplying || totalMonthlySavingsCad === 0}
                className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F17] font-bold text-xs uppercase tracking-wide transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isApplying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#0B0F17]" />
                    <span>Deploying Edge Twin Config...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-[#0B0F17]" />
                    <span>Apply Cloud Policies (${annualizedSavingsCad.toFixed(0)} CAD/yr)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
