import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Layers, 
  Database, 
  Radio, 
  Cpu, 
  HardDrive, 
  ArrowUpDown,
  ChevronRight
} from 'lucide-react';
import { AzureCostItem } from '../types/cost-types';

interface ResourceBreakdownTableProps {
  resources: AzureCostItem[];
  onSelectResource: (resource: AzureCostItem) => void;
  selectedTagFilter: string | null;
}

export const ResourceBreakdownTable: React.FC<ResourceBreakdownTableProps> = ({
  resources,
  onSelectResource,
  selectedTagFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('all');
  const [sortField, setSortField] = useState<'costCadMtd' | 'monitoredUnitsCount' | 'resourceName'>('costCadMtd');
  const [sortAsc, setSortAsc] = useState(false);

  // Extract unique service types for filter tabs
  const serviceTypes = ['all', ...Array.from(new Set(resources.map(r => r.azureMeterCategory)))];

  // Filtering
  const filteredResources = resources.filter(res => {
    const matchesSearch = 
      res.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.resourceGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.equipmentTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.gtaZone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService = selectedServiceType === 'all' || res.azureMeterCategory === selectedServiceType;
    const matchesTag = !selectedTagFilter || res.equipmentTag === selectedTagFilter || res.equipmentCategory === selectedTagFilter;

    return matchesSearch && matchesService && matchesTag;
  });

  // Sorting
  const sortedResources = [...filteredResources].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'costCadMtd') {
      comparison = a.costCadMtd - b.costCadMtd;
    } else if (sortField === 'monitoredUnitsCount') {
      comparison = a.monitoredUnitsCount - b.monitoredUnitsCount;
    } else if (sortField === 'resourceName') {
      comparison = a.resourceName.localeCompare(b.resourceName);
    }
    return sortAsc ? comparison : -comparison;
  });

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'Internet of Things':
        return <Radio className="w-4 h-4 text-[#00E5FF]" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-purple-400" />;
      case 'Analytics':
        return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'Storage':
        return <HardDrive className="w-4 h-4 text-emerald-400" />;
      default:
        return <Layers className="w-4 h-4 text-slate-300" />;
    }
  };

  const getStatusBadge = (status: AzureCostItem['status']) => {
    switch (status) {
      case 'Optimal':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
            Optimal
          </span>
        );
      case 'Spike Warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-950/80 text-rose-300 border border-rose-500/50 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_6px_#F43F5E]" />
            Spike Warning
          </span>
        );
      case 'Over-provisioned':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#FBBF24]" />
            Over-provisioned
          </span>
        );
      case 'Tiering Candidate':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-950/80 text-[#00E5FF] border border-cyan-500/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
            Tiering Candidate
          </span>
        );
    }
  };

  const handleSort = (field: 'costCadMtd' | 'monitoredUnitsCount' | 'resourceName') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="bg-[#111622] border border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,255,0.08)] rounded-2xl p-6 space-y-5 w-full text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif] hover:border-cyan-400/50 transition-all duration-300">
      {/* Table Header Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-cyan-500/20 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.25)]">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Service Breakdown & Telemetry Utility Matrix
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Itemized breakdown of Azure resources serving Toronto/GTA telemetry gateways, stream jobs, and cold storage
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resource, tag, zone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B101D] border border-cyan-500/40 text-white placeholder:text-slate-400 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-[#00E5FF] shadow-inner transition-colors"
            />
          </div>

          {/* Service Category Pills */}
          <div className="flex items-center gap-1.5 bg-[#0B101D] p-1.5 rounded-xl border border-cyan-500/30 overflow-x-auto">
            {serviceTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedServiceType(type)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all capitalize whitespace-nowrap cursor-pointer ${
                  selectedServiceType === type
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Tag Indicator */}
      {selectedTagFilter && (
        <div className="bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between shadow-inner">
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#00E5FF]" />
            <span>Active Equipment Tag Filter: <strong className="text-white font-mono">{selectedTagFilter}</strong></span>
          </span>
          <span className="text-[11px] text-[#00E5FF] font-mono font-bold">Showing matched resources</span>
        </div>
      )}

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 shadow-inner">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#0B101D] border-b border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider font-mono">
              <th 
                className="py-3.5 px-4 cursor-pointer hover:text-[#00E5FF] select-none"
                onClick={() => handleSort('resourceName')}
              >
                <div className="flex items-center gap-1.5">
                  <span>Azure Resource / Tier</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </th>
              <th className="py-3.5 px-4">GTA Zone</th>
              <th className="py-3.5 px-4">Equipment Tag</th>
              <th 
                className="py-3.5 px-4 text-center cursor-pointer hover:text-[#00E5FF] select-none"
                onClick={() => handleSort('monitoredUnitsCount')}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>Units</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </th>
              <th 
                className="py-3.5 px-4 text-right cursor-pointer hover:text-[#00E5FF] select-none"
                onClick={() => handleSort('costCadMtd')}
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>MTD Spend (CAD)</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-right">Projected Close</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/80 bg-[#0E131F]">
            {sortedResources.length > 0 ? (
              sortedResources.map((res) => (
                <tr
                  key={res.id}
                  onClick={() => onSelectResource(res)}
                  className="hover:bg-[#161F32] transition-colors cursor-pointer group"
                >
                  {/* Name & Tier */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#0B101D] border border-slate-700 group-hover:border-cyan-500/50 shrink-0 transition-colors">
                        {getServiceIcon(res.azureMeterCategory)}
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                          <span>{res.resourceName}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#00E5FF] transition-opacity" />
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {res.azureServiceType}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* GTA Zone */}
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-200">
                    {res.gtaZone}
                  </td>

                  {/* HVAC Tag */}
                  <td className="py-3.5 px-4">
                    <span className="bg-[#0B101D] text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold">
                      {res.equipmentCategory}
                    </span>
                  </td>

                  {/* Monitored Units */}
                  <td className="py-3.5 px-4 font-mono text-center">
                    <div className="text-white font-bold">{res.monitoredUnitsCount} units</div>
                    <div className="text-[10px] text-slate-400">
                      ${res.costPerUnitCad.toFixed(2)}/unit
                    </div>
                  </td>

                  {/* Spend MTD */}
                  <td className="py-3.5 px-4 text-right font-mono">
                    <div className="font-black text-[#00E5FF] text-sm neon-text-glow">
                      ${res.costCadMtd.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Prev: ${res.costCadLastMonth.toFixed(2)}
                    </div>
                  </td>

                  {/* Projected Close */}
                  <td className="py-3.5 px-4 text-right font-mono">
                    <div className={`font-bold text-xs ${
                      res.costCadProjected > res.costCadMtd * 1.3 ? 'text-rose-400' : 'text-white'
                    }`}>
                      ${res.costCadProjected.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                    </div>
                  </td>

                  {/* Status Indicator */}
                  <td className="py-3.5 px-4 text-center">
                    {getStatusBadge(res.status)}
                  </td>

                  {/* Action Link */}
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectResource(res);
                      }}
                      className="text-[#00E5FF] hover:text-white font-bold text-xs p-1.5 rounded-lg hover:bg-cyan-500/20 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  No Azure HVAC resources found matching your current filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 font-mono pt-3 border-t border-cyan-500/20 gap-2">
        <span>Showing {sortedResources.length} of {resources.length} active Azure cloud services</span>
        <div className="flex items-center gap-4">
          <span>Subtotal MTD: <strong className="text-white font-bold">${sortedResources.reduce((a, b) => a + b.costCadMtd, 0).toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD</strong></span>
          <span className="text-emerald-400 font-bold">Total Savings Potential: ${sortedResources.reduce((a, b) => a + b.savingsPotentialCad, 0).toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD</span>
        </div>
      </div>
    </div>
  );
};
