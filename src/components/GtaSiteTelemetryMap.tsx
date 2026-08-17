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
    <div className="bg-[#292827] border border-[#3b3a39] rounded-lg p-6 shadow-xl space-y-5 w-full text-[#f3f2f1]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#3b3a39] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[#0078D4]/20 border border-[#0078D4]/40 text-[#00ccff]">
              <MapPin className="w-4 h-4" />
            </div>
            <h2 className="text-base font-semibold text-[#f3f2f1] tracking-tight">
              Greater Toronto Area Telemetry Hubs & Zone Health
            </h2>
          </div>
          <p className="text-xs text-[#a19f9d] mt-1">
            Real-time IoT Edge connectivity, RTU count, and cloud ingestion cost attribution across GTA municipal sectors
          </p>
        </div>

        {selectedZone !== 'all' && (
          <button
            onClick={() => onSelectZone('all')}
            className="text-xs font-semibold text-[#00ccff] hover:text-white bg-[#0078D4]/20 hover:bg-[#0078D4]/40 border border-[#0078D4]/50 px-3 py-1 rounded transition-colors cursor-pointer"
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
              className={`p-4 rounded border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-[#0078D4]/20 border-[#00ccff] ring-2 ring-[#00ccff]/30 shadow-md'
                  : hasAnomaly
                  ? 'bg-[#a80000]/15 border-[#a80000]/50 hover:border-[#ff6b6b]'
                  : 'bg-[#252423] border-[#3b3a39] hover:border-[#605e5c] hover:bg-[#323130]'
              }`}
            >
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#f3f2f1]">{zone.shortName}</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                  hasAnomaly 
                    ? 'bg-[#ffaa00]/20 text-[#ffaa00] border border-[#ffaa00]/40'
                    : 'bg-[#107c10]/20 text-[#107c10] border border-[#107c10]/40'
                }`}>
                  {zone.status}
                </span>
              </div>

              {/* Stats */}
              <div className="mt-3 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[#a19f9d]">
                  <span>Facilities:</span>
                  <span className="text-[#f3f2f1] font-medium">{zone.clientCount} Commercial Sites</span>
                </div>
                <div className="flex justify-between text-[#a19f9d]">
                  <span>Equipment Units:</span>
                  <span className="text-[#f3f2f1] font-medium">{zone.activeHvacUnits} HVAC Units</span>
                </div>
                <div className="flex justify-between text-[#a19f9d] pt-2 border-t border-[#3b3a39]">
                  <span>MTD Cloud Cost:</span>
                  <span className="text-[#00ccff] font-bold text-sm">
                    ${zone.costCadMtd.toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD
                  </span>
                </div>
              </div>

              {/* Sub-note */}
              <div className="mt-2.5 flex items-center justify-between text-[10px] text-[#a19f9d]">
                <span>Avg. ${zone.avgCostPerUnitCad.toFixed(2)}/unit</span>
                <span className="text-[#00ccff] font-semibold flex items-center">
                  Filter Zone <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
