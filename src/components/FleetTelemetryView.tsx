import React from 'react';
import { 
  Activity, 
  Radio, 
  Server, 
  Cpu, 
  RefreshCw, 
  Layers, 
  Sliders, 
  CheckCircle2, 
  AlertCircle,
  Thermometer,
  Wind,
  Gauge
} from 'lucide-react';
import { EquipmentCostSummary } from '../types/cost-types';

interface FleetTelemetryViewProps {
  equipmentData: EquipmentCostSummary[];
}

export const FleetTelemetryView: React.FC<FleetTelemetryViewProps> = ({ equipmentData }) => {
  const sampleTelemetryStreams = [
    {
      id: 'node-rtu-042',
      name: 'Vaughan Logistics Park - RTU #04',
      type: 'Carrier WeatherMaster 25-Ton',
      zone: 'York Region (Vaughan)',
      pingRate: '15s (Nominal)',
      lastPayload: 'Supply: 14.2°C, Return: 22.8°C, Static: 1.25 in.wg, Comp: 84%',
      status: 'nominal',
      dailyCostCad: 0.14,
    },
    {
      id: 'node-rtu-019',
      name: 'Mississauga Data Corridor - RTU #12',
      type: 'Trane IntelliPak 40-Ton',
      zone: 'Peel Region (Mississauga)',
      pingRate: '15s (Nominal)',
      lastPayload: 'Supply: 13.8°C, Return: 23.1°C, Static: 1.40 in.wg, Comp: 92%',
      status: 'nominal',
      dailyCostCad: 0.14,
    },
    {
      id: 'node-chiller-002',
      name: 'Downtown Financial Tower - Centrifugal Chiller B',
      type: 'York YK Centrifugal 500-Ton',
      zone: 'Downtown Core / Bay St.',
      pingRate: '30s (Optimized)',
      lastPayload: 'Chilled Water Out: 6.1°C, Condenser In: 29.4°C, kW/Ton: 0.58',
      status: 'nominal',
      dailyCostCad: 0.08,
    },
    {
      id: 'node-boiler-007',
      name: 'North York General Hospital - Boiler Bank #2',
      type: 'Cleaver-Brooks Hydronic 4000MBH',
      zone: 'North York / Don Mills',
      pingRate: '60s (Energy Saver)',
      lastPayload: 'Supply Water: 78.5°C, Stack Temp: 112°C, O2: 3.4%, Firing: 62%',
      status: 'nominal',
      dailyCostCad: 0.04,
    },
    {
      id: 'node-rtu-088',
      name: 'Etobicoke Cold Storage - Freezer RTU #01',
      type: 'Engineered Air Multi-Zone 35-Ton',
      zone: 'Etobicoke / Lakeshore',
      pingRate: '15s (Nominal)',
      lastPayload: 'Evap Temp: -18.2°C, Defrost: Idle, Subcooling: 7.2K',
      status: 'nominal',
      dailyCostCad: 0.14,
    },
  ];

  return (
    <div className="space-y-6 w-full text-[#f3f2f1]">
      {/* Overview Card */}
      <div className="bg-[#292827] border border-[#3b3a39] rounded-lg p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#3b3a39] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-[#0078D4]/20 border border-[#0078D4]/40 text-[#00ccff]">
                <Activity className="w-4 h-4" />
              </div>
              <h2 className="text-base font-semibold text-[#f3f2f1] tracking-tight">
                Live HVAC Telemetry Streams & IoT Device Twins
              </h2>
            </div>
            <p className="text-xs text-[#a19f9d] mt-1">
              Active BACnet/IP to Azure IoT Hub bridge gateways streaming temperature, static pressure, and compressor diagnostics
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-[#107c10]/20 text-[#107c10] border border-[#107c10]/40 px-3 py-1.5 rounded">
            <span className="w-2 h-2 rounded-full bg-[#107c10] animate-pulse" />
            <span>85 Gateways Synced | 0 Packet Drops</span>
          </div>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#252423] border border-[#3b3a39] rounded p-4">
            <span className="text-[11px] font-semibold text-[#a19f9d] uppercase">Avg Messages / Min</span>
            <div className="text-2xl font-bold text-[#f3f2f1] font-mono mt-1">1,420 msgs</div>
            <span className="text-[11px] text-[#a19f9d]">Into Canada Central S1 Hub</span>
          </div>

          <div className="bg-[#252423] border border-[#3b3a39] rounded p-4">
            <span className="text-[11px] font-semibold text-[#a19f9d] uppercase">Active Telemetry Tags</span>
            <div className="text-2xl font-bold text-[#f3f2f1] font-mono mt-1">3,480 points</div>
            <span className="text-[11px] text-[#a19f9d]">Temperatures, VFD Hz, kW</span>
          </div>

          <div className="bg-[#252423] border border-[#3b3a39] rounded p-4">
            <span className="text-[11px] font-semibold text-[#a19f9d] uppercase">Stream Analytics Rate</span>
            <div className="text-2xl font-bold text-[#107c10] font-mono mt-1">3.0 Streaming Units</div>
            <span className="text-[11px] text-[#a19f9d]">Auto-scaling enabled</span>
          </div>

          <div className="bg-[#252423] border border-[#3b3a39] rounded p-4">
            <span className="text-[11px] font-semibold text-[#a19f9d] uppercase">Daily Ingestion Cost</span>
            <div className="text-2xl font-bold text-[#00ccff] font-mono mt-1">$142.80 CAD/day</div>
            <span className="text-[11px] text-[#a19f9d]">Normalized across fleet</span>
          </div>
        </div>
      </div>

      {/* Stream Inspect Table */}
      <div className="bg-[#292827] border border-[#3b3a39] rounded-lg p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#f3f2f1]">
            Real-Time Sample Ingestion Log (Live Feed)
          </h3>
          <span className="text-xs font-mono text-[#a19f9d]">
            Auto-refreshing every 5 seconds
          </span>
        </div>

        <div className="overflow-x-auto rounded border border-[#3b3a39]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#252423] border-b border-[#3b3a39] text-[#a19f9d] font-semibold text-[11px]">
                <th className="py-3 px-4">Device Node ID / Site</th>
                <th className="py-3 px-4">Equipment Model</th>
                <th className="py-3 px-4">GTA Zone</th>
                <th className="py-3 px-4">Sampling Cadence</th>
                <th className="py-3 px-4">Latest Decoded Telemetry Payload</th>
                <th className="py-3 px-4 text-right">Daily Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3b3a39] bg-[#292827] font-mono">
              {sampleTelemetryStreams.map((stream) => (
                <tr key={stream.id} className="hover:bg-[#323130] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#f3f2f1]">{stream.id}</div>
                    <div className="text-[11px] text-[#a19f9d] font-sans">{stream.name}</div>
                  </td>
                  <td className="py-3 px-4 text-[#f3f2f1] font-sans">{stream.type}</td>
                  <td className="py-3 px-4 text-[#a19f9d] font-sans">{stream.zone}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#0078D4]/25 text-[#00ccff] border border-[#0078D4]/40 text-[11px]">
                      {stream.pingRate}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#a19f9d] text-[11px]">
                    {stream.lastPayload}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-[#00ccff]">
                    ${stream.dailyCostCad.toFixed(2)} CAD
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
