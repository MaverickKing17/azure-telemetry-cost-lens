import React from 'react';
import { MapPin, Radio } from 'lucide-react';
import { GtaZoneSummary } from '../types/cost-types';

interface GtaSiteTelemetryMapProps {
  zones: GtaZoneSummary[];
  selectedZone: string;
  onSelectZone: (zoneId: string) => void;
}

export const GtaSiteTelemetryMap: React.FC<GtaSiteTelemetryMapProps> = ({
  zones,
  selectedZone,
  onSelectZone,
}) => {
  const siteZones = zones.filter(z => z.zoneId !== 'all');

  return (
    <div className="bg-[#11141C] border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-slate-200 font-semibold text-base">
            GTA Service Zones & Telemetry Density
          </h3>
          <p className="text-xs text-slate-400">
            Real-time IoT cloud consumption mapped across 142 commercial facilities in the Greater Toronto Area.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-[#0B0F17] px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>6 Regional Hubs Active</span>
        </div>
      </div>

      {/* Grid of GTA Service Hubs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
        {siteZones.map((zone) => {
          const isSelected = selectedZone === zone.zoneId;
          const isWarning = zone.status === 'warning';

          return (
            <div
              key={zone.zoneId}
              onClick={() => onSelectZone(zone.zoneId)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{zone.name}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  isWarning ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                }`}>
                  {isWarning ? 'Spike Flag' : 'Nominal'}
                </span>
              </div>

              {/* Stats */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-[#11141C] border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Spend MTD:</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    ${zone.costCadMtd.toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD
                  </div>
                </div>
                <div className="p-2 rounded bg-[#11141C] border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Nodes:</div>
                  <div className="text-sm font-bold text-cyan-400 mt-0.5">
                    {zone.activeHvacUnits} Units
                  </div>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="truncate max-w-[160px]">{zone.topEquipmentType}</span>
                <span className="text-slate-300">{zone.sensorPingsToday} pings</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
