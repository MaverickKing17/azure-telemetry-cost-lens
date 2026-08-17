import React, { useState } from 'react';
import { 
  Cpu, 
  Wifi, 
  TrendingUp, 
  Sliders, 
  ArrowUpRight
} from 'lucide-react';
import { EquipmentCostSummary } from '../types/cost-types';

interface FleetTelemetryViewProps {
  equipmentData: EquipmentCostSummary[];
}

export const FleetTelemetryView: React.FC<FleetTelemetryViewProps> = ({
  equipmentData,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(equipmentData[0]?.category || '');

  const activeEquipment = equipmentData.find(e => e.category === selectedCategory) || equipmentData[0];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-[#11141C] border border-slate-800 rounded-xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                Fleet Telemetry & Cellular Data Profiles
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
                MQTT / BACnet IP / Modbus RTU
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight mt-1">
              Field Telematics Economics & Azure Ingestion
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Breakdown of cellular edge gateway SIM data consumption (Bell & Rogers M2M) combined with Azure IoT Hub and Cosmos DB processing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 text-right font-mono">
              <div className="text-[10px] text-slate-500 uppercase">Total Pings MTD:</div>
              <div className="text-lg font-bold text-cyan-400">2.14 Billion</div>
            </div>
            <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 text-right font-mono">
              <div className="text-[10px] text-slate-500 uppercase">Data Bandwidth:</div>
              <div className="text-lg font-bold text-emerald-400">4.82 TB</div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {equipmentData.map((item) => {
          const isSelected = selectedCategory === item.category;
          return (
            <button
              key={item.category}
              onClick={() => setSelectedCategory(item.category)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                  : 'bg-[#11141C] border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-800/30'
              }`}
            >
              <div className="text-xs font-bold text-white truncate">
                {item.category}
              </div>
              <div className="text-[11px] text-cyan-400 font-mono mt-1">
                {item.unitCount} Units
              </div>
              <div className="text-xs font-mono font-bold text-slate-200 mt-2">
                ${item.totalCostCad.toFixed(0)} CAD
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                ${item.costPerUnitCad.toFixed(2)}/unit
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Equipment Deep Dive */}
      {activeEquipment && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 8 Cols: Telemetry Config & Bandwidth Profile */}
          <div className="lg:col-span-8 bg-[#11141C] border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">
                  {activeEquipment.category} Telemetry Profile
                </h3>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Business Tag: <span className="text-cyan-400">{activeEquipment.equipmentTag}</span>
                </div>
              </div>
              <div className="text-xs font-mono text-cyan-400 bg-[#0B0F17] px-3 py-1.5 rounded-lg border border-slate-800">
                Sampling Rate: 1 ping / {activeEquipment.avgPingRateSec}s
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800">
                <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                  Monthly Data Ingestion
                </div>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  {activeEquipment.monthlyTelemetryGb} GB
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  ~{((activeEquipment.monthlyTelemetryGb / activeEquipment.unitCount) * 1024).toFixed(0)} MB / unit
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800">
                <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  Primary Azure Meter
                </div>
                <div className="text-sm font-bold text-emerald-400 font-mono mt-1 truncate">
                  {activeEquipment.primaryAzureService}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  Provisioned S2 + Hot Lake
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800">
                <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  30-Day Cost Trend
                </div>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  {activeEquipment.deltaPercentVsLastMonth > 0 ? `+${activeEquipment.deltaPercentVsLastMonth}%` : `${activeEquipment.deltaPercentVsLastMonth}%`}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  vs previous billing period
                </div>
              </div>
            </div>

            {/* Diagnostic Mode Simulation Info */}
            <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  Sampling Frequencies & Financial Impact:
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#11141C] border border-slate-800">
                  <div className="text-slate-400">Standard Eco Mode (30s):</div>
                  <div className="text-emerald-400 font-bold mt-1">$2.80 CAD / unit / mo</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Basic On/Off & Setpoint Log</div>
                </div>
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <div className="text-cyan-400 font-semibold">Active Mode (15s):</div>
                  <div className="text-cyan-300 font-bold mt-1">${activeEquipment.costPerUnitCad.toFixed(2)} CAD / unit / mo</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">High Head & Subcooling Alarms</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <div className="text-amber-400 font-semibold">Burst Diagnostic (100ms):</div>
                  <div className="text-amber-300 font-bold mt-1">$18.50 CAD / unit / mo</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Vibration FFT Spectrum Mode</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Service Territory & Pass-Through Accounting */}
          <div className="lg:col-span-4 bg-[#11141C] border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">
                Client SLA Pass-Through
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Cost allocation for monthly mechanical maintenance contract invoicing.
              </p>

              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
                  <span className="text-slate-400">Contract Billed Rate:</span>
                  <span className="text-emerald-400 font-bold">$6.00 CAD / unit</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
                  <span className="text-slate-400">Actual Azure Cost:</span>
                  <span className="text-white font-bold">${activeEquipment.costPerUnitCad.toFixed(2)} CAD / unit</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
                  <span className="text-slate-400">Telemetry Margin:</span>
                  <span className="text-cyan-400 font-bold">
                    +${(6.00 - activeEquipment.costPerUnitCad).toFixed(2)} CAD / unit
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-slate-400 font-mono mb-2">Deployed Service Hubs:</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeEquipment.gtaLocations.map((loc) => (
                    <span key={loc} className="text-[11px] px-2.5 py-1 rounded bg-[#0B0F17] text-slate-300 border border-slate-800 font-mono">
                      📍 {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Generated Telemetry Pass-Through Ledger for ${activeEquipment.category}.`)}
              className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F17] font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.25)]"
            >
              <span>Export {activeEquipment.category} Ledger</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
