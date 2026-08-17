import React from 'react';
import { MapPin, Activity, Building, Zap, ArrowUpRight } from 'lucide-react';
import { GtaZoneSummary } from '../types/cost-types';

interface GtaSiteTelemetryMapProps {
  zones: GtaZoneSummary[];
  selectedZone: string;
  onSelectZone: (zone: string) => void;
}

export const GtaSiteTelemetryMap: React.FC<GtaSiteTelemetryMapProps> = ({
  zones,
  selectedZone,
  onSelectZone,
}) => {
  return (
    <div className="bg-[#111622] border border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,255,0.08)] rounded-2xl p-6 space-y-5 w-full text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif] hover:border-cyan-400/50 transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.25)]">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Greater Toronto Area Telemetry Hubs & Zone Health
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Real-time IoT Edge connectivity, RTU count, and cloud ingestion cost attribution across GTA municipal sectors
          </p>
        </div>

        {selectedZone !== 'all' && (
          <button
            onClick={() => onSelectZone('all')}
            className="text-xs font-bold text-[#00E5FF] hover:text-white bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 px-3.5 py-1.5 rounded-xl shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-colors cursor-pointer"
          >
            Reset to All Regions
          </button>
        )}
      </div>

      {/* GTA Zone Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {zones.filter(z => z.zoneId !== 'all').map((zone) => {
          const isSelected = selectedZone.toLowerCase() === zone.shortName.toLowerCase() || selectedZone.toLowerCase() === zone.name.toLowerCase();
          const hasAnomaly = zone.status === 'warning' || zone.status === 'critical';

          return (
            <div
              key={zone.zoneId}
              onClick={() => onSelectZone(zone.shortName)}
              className={`p-4.5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-cyan-950/50 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.25)] ring-1 ring-[#00E5FF]'
                  : hasAnomaly
                  ? 'bg-rose-950/30 border-rose-500/50 hover:border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                  : 'bg-[#0B101D] border-slate-800 hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(0,229,255,0.12)]'
              }`}
            >
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white group-hover:text-[#00E5FF] transition-colors">{zone.shortName}</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                  hasAnomaly 
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                }`}>
                  {zone.status}
                </span>
              </div>

              {/* Stats */}
              <div className="mt-3.5 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Facilities:</span>
                  <span className="text-white font-semibold">{zone.clientCount} Commercial Sites</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Equipment Units:</span>
                  <span className="text-white font-semibold">{zone.activeHvacUnits} HVAC Units</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                  <span>MTD Cloud Cost:</span>
                  <span className="text-[#00E5FF] font-black text-sm neon-text-glow">
                    ${zone.costCadMtd.toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD
                  </span>
                </div>
              </div>

              {/* Sub-note */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span>Avg. ${zone.avgCostPerUnitCad.toFixed(2)}/unit</span>
                <span className="text-[#00E5FF] font-bold flex items-center group-hover:translate-x-0.5 transition-transform">
                  Filter Zone <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
