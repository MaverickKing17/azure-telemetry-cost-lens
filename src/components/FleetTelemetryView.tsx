import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  RefreshCw, 
  Server
} from 'lucide-react';
import { EquipmentCostSummary } from '../types/cost-types';

interface FleetTelemetryViewProps {
  equipmentData: EquipmentCostSummary[];
}

export const FleetTelemetryView: React.FC<FleetTelemetryViewProps> = ({ equipmentData }) => {
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="space-y-6 w-full text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif]">
      {/* Overview Card */}
      <div className="bg-[#1C2541] border border-[#3A506B] rounded-xl p-6 shadow-[0_0_20px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9] transition-all duration-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#3A506B] pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#0B132B] border border-[#3A506B] text-[#6FFFE9]">
                <Activity className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Live HVAC Telemetry Streams & IoT Device Twins
              </h2>
            </div>
            <p className="text-xs text-[#BCF8EC] mt-1">
              Active BACnet/IP to Azure IoT Hub bridge gateways streaming temperature, static pressure, and compressor diagnostics
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-[#142A20] text-[#22C55E] border border-[#22C55E]/50 px-3.5 py-1.5 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.2)] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_6px_#22C55E]" />
            <span>85 Gateways Synced | 0 Packet Drops</span>
          </div>
        </div>

        {/* Telemetry Stats Grid - Exact 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#0B132B] border border-[#3A506B] rounded-xl p-5 hover:border-[#6FFFE9] hover:shadow-[0_0_15px_rgba(111,255,233,0.15)] transition-all duration-300">
            <span className="text-xs font-bold text-[#BCF8EC] uppercase font-mono">Avg Messages / Min</span>
            <div className="text-2xl font-black text-white font-mono mt-1.5">1,420 msgs</div>
            <span className="text-[11px] text-[#6FFFE9] font-semibold">Into Canada Central S1 Hub</span>
          </div>

          <div className="bg-[#0B132B] border border-[#3A506B] rounded-xl p-5 hover:border-[#6FFFE9] hover:shadow-[0_0_15px_rgba(111,255,233,0.15)] transition-all duration-300">
            <span className="text-xs font-bold text-[#BCF8EC] uppercase font-mono">Active Telemetry Tags</span>
            <div className="text-2xl font-black text-white font-mono mt-1.5">3,480 points</div>
            <span className="text-[11px] text-[#6FFFE9] font-semibold">Temperatures, VFD Hz, kW</span>
          </div>

          <div className="bg-[#0B132B] border border-[#3A506B] rounded-xl p-5 hover:border-[#6FFFE9] hover:shadow-[0_0_15px_rgba(111,255,233,0.15)] transition-all duration-300">
            <span className="text-xs font-bold text-[#BCF8EC] uppercase font-mono">Stream Analytics Rate</span>
            <div className="text-2xl font-black text-[#22C55E] font-mono mt-1.5">3.0 Streaming Units</div>
            <span className="text-[11px] text-[#BCF8EC] font-semibold">Auto-scaling enabled</span>
          </div>

          <div className="bg-[#0B132B] border border-[#3A506B] rounded-xl p-5 hover:border-[#6FFFE9] hover:shadow-[0_0_15px_rgba(111,255,233,0.15)] transition-all duration-300">
            <span className="text-xs font-bold text-[#BCF8EC] uppercase font-mono">Daily Ingestion Cost</span>
            <div className="text-2xl font-black text-[#6FFFE9] font-mono mt-1.5 cyan-text-glow">$142.80 CAD/day</div>
            <span className="text-[11px] text-[#BCF8EC] font-semibold">Normalized across fleet</span>
          </div>
        </div>
      </div>

      {/* Stream Inspect Table */}
      <div className="bg-[#1C2541] border border-[#3A506B] rounded-xl p-6 shadow-[0_0_20px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9] transition-all duration-300 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Real-Time Sample Ingestion Log (Live Feed)
          </h3>
          <span className="text-xs font-mono text-[#6FFFE9] bg-[#0B132B] px-3 py-1 rounded-full border border-[#3A506B] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#6FFFE9] animate-ping" />
            <span>Auto-refreshing every 5s (Cycle #{pulseCount})</span>
          </span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#3A506B] shadow-inner">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0B132B] border-b border-[#3A506B] text-[#BCF8EC] font-bold text-xs uppercase tracking-wider font-mono">
                <th className="py-3.5 px-4">Device Node ID / Site</th>
                <th className="py-3.5 px-4">Equipment Model</th>
                <th className="py-3.5 px-4">GTA Zone</th>
                <th className="py-3.5 px-4">Sampling Cadence</th>
                <th className="py-3.5 px-4">Latest Decoded Telemetry Payload</th>
                <th className="py-3.5 px-4 text-right">Daily Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A506B]/50 bg-[#0E172F] font-mono">
              {sampleTelemetryStreams.map((stream) => (
                <tr key={stream.id} className="hover:bg-[#1C2541] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{stream.id}</div>
                    <div className="text-[11px] text-[#BCF8EC] font-sans">{stream.name}</div>
                  </td>
                  <td className="py-3.5 px-4 text-white font-sans font-medium">{stream.type}</td>
                  <td className="py-3.5 px-4 text-[#BCF8EC] font-sans">{stream.zone}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0B132B] text-[#6FFFE9] border border-[#6FFFE9]/50 text-[11px] font-bold">
                      {stream.pingRate}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#BCF8EC] text-[11px]">
                    {stream.lastPayload}
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-[#6FFFE9] cyan-text-glow">
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
