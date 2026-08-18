import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
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
    <div className="bg-[#1C2541] border border-[#3A506B] shadow-[0_0_20px_rgba(111,255,233,0.06)] rounded-xl p-6 space-y-5 w-full text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif] hover:border-[#6FFFE9] transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#3A506B] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#0B132B] border border-[#3A506B] text-[#6FFFE9]">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Greater Toronto Area Telemetry Hubs & Zone Health
            </h2>
          </div>
          <p className="text-xs text-[#BCF8EC] mt-1">
            Real-time IoT Edge connectivity, RTU count, and cloud ingestion cost attribution across GTA municipal sectors
          </p>
        </div>

        {selectedZone !== 'all' && (
          <button
            onClick={() => onSelectZone('all')}
            className="text-xs font-bold text-[#6FFFE9] hover:text-white bg-[#0B132B] hover:bg-[#142247] border border-[#3A506B] hover:border-[#6FFFE9] px-3.5 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Reset to All Regions
          </button>
        )}
      </div>

      {/* GTA Zone Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {zones.filter(z => z.zoneId !== 'all').map((zone) => {
          const isSelected = selectedZone.toLowerCase() === zone.shortName.toLowerCase() || selectedZone.toLowerCase() === zone.name.toLowerCase();
          const hasAnomaly = zone.status === 'warning' || zone.status === 'critical';

          return (
            <div
              key={zone.zoneId}
              onClick={() => onSelectZone(zone.shortName)}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#142247] border-[#6FFFE9] shadow-[0_0_20px_rgba(111,255,233,0.25)] ring-1 ring-[#6FFFE9]'
                  : hasAnomaly
                  ? 'bg-[#2A2010] border-[#F59E0B]/50 hover:border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'bg-[#0B132B] border-[#3A506B] hover:border-[#6FFFE9] hover:shadow-[0_0_15px_rgba(111,255,233,0.12)]'
              }`}
            >
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white group-hover:text-[#6FFFE9] transition-colors">{zone.shortName}</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                  hasAnomaly 
                    ? 'bg-[#2A2010] text-[#F59E0B] border border-[#F59E0B]/50'
                    : 'bg-[#142A20] text-[#22C55E] border border-[#22C55E]/50'
                }`}>
                  {zone.status}
                </span>
              </div>

              {/* Stats */}
              <div className="mt-3.5 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-[#BCF8EC]">
                  <span>Facilities:</span>
                  <span className="text-white font-semibold">{zone.clientCount} Sites</span>
                </div>
                <div className="flex justify-between text-[#BCF8EC]">
                  <span>Units:</span>
                  <span className="text-white font-semibold">{zone.activeHvacUnits} Units</span>
                </div>
                <div className="flex justify-between text-[#BCF8EC] pt-2 border-t border-[#3A506B]">
                  <span>MTD Cost:</span>
                  <span className="text-[#6FFFE9] font-black text-xs cyan-text-glow">
                    ${zone.costCadMtd.toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD
                  </span>
                </div>
              </div>

              {/* Sub-note */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-[#BCF8EC]/70">
                <span>Avg. ${zone.avgCostPerUnitCad.toFixed(2)}/unit</span>
                <span className="text-[#6FFFE9] font-bold flex items-center group-hover:translate-x-0.5 transition-transform">
                  Filter <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
