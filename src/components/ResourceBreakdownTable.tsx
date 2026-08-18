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
        return <Radio className="w-4 h-4 text-[#6FFFE9]" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-[#6FFFE9]" />;
      case 'Analytics':
        return <Cpu className="w-4 h-4 text-[#F59E0B]" />;
      case 'Storage':
        return <HardDrive className="w-4 h-4 text-[#22C55E]" />;
      default:
        return <Layers className="w-4 h-4 text-[#BCF8EC]" />;
    }
  };

  const getStatusBadge = (status: AzureCostItem['status']) => {
    switch (status) {
      case 'Optimal':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#142A20] text-[#22C55E] border border-[#22C55E]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_6px_#22C55E]" />
            Optimal
          </span>
        );
      case 'Spike Warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#2A1520] text-[#EF4444] border border-[#EF4444]/50 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_6px_#EF4444]" />
            Spike Warning
          </span>
        );
      case 'Over-provisioned':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#2A2010] text-[#F59E0B] border border-[#F59E0B]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]" />
            Over-provisioned
          </span>
        );
      case 'Tiering Candidate':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#0E2A3A] text-[#6FFFE9] border border-[#6FFFE9]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6FFFE9] shadow-[0_0_6px_#6FFFE9]" />
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
    <div className="bg-[#1C2541] border border-[#3A506B] shadow-[0_0_20px_rgba(111,255,233,0.06)] rounded-xl p-6 space-y-5 w-full text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif] hover:border-[#6FFFE9] transition-all duration-300">
      {/* Table Header Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#3A506B] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#0B132B] border border-[#3A506B] text-[#6FFFE9]">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Service Breakdown & Telemetry Utility Matrix
            </h2>
          </div>
          <p className="text-xs text-[#BCF8EC] mt-1">
            Itemized breakdown of Azure resources serving Toronto/GTA telemetry gateways, stream jobs, and cold storage
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#6FFFE9] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resource, tag, zone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B132B] border border-[#3A506B] text-white placeholder:text-[#BCF8EC]/60 text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-[#6FFFE9] shadow-inner transition-colors"
            />
          </div>

          {/* Service Category Pills */}
          <div className="flex items-center gap-1.5 bg-[#0B132B] p-1 rounded-lg border border-[#3A506B] overflow-x-auto">
            {serviceTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedServiceType(type)}
                className={`px-3 py-1 text-xs font-bold rounded transition-all capitalize whitespace-nowrap cursor-pointer ${
                  selectedServiceType === type
                    ? 'bg-[#6FFFE9] text-[#0B132B] shadow-[0_0_10px_rgba(111,255,233,0.3)]'
                    : 'text-[#BCF8EC] hover:text-white hover:bg-[#1C2541]'
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
        <div className="bg-[#0B132B] border border-[#6FFFE9]/40 text-[#BCF8EC] px-4 py-2.5 rounded-lg text-xs flex items-center justify-between shadow-inner">
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#6FFFE9]" />
            <span>Active Equipment Tag Filter: <strong className="text-white font-mono">{selectedTagFilter}</strong></span>
          </span>
          <span className="text-[11px] text-[#6FFFE9] font-mono font-bold">Showing matched resources</span>
        </div>
      )}

      {/* Data Table */}
      <div className="overflow-x-auto rounded-lg border border-[#3A506B] shadow-inner max-h-[500px]">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="sticky top-0 z-10 bg-[#0B132B] shadow-sm">
            <tr className="bg-[#0B132B] border-b border-[#3A506B] text-[#BCF8EC] font-bold text-xs uppercase tracking-wider font-mono">
              <th 
                className="py-3.5 px-4 cursor-pointer hover:text-[#6FFFE9] select-none"
                onClick={() => handleSort('resourceName')}
              >
                <div className="flex items-center gap-1.5">
                  <span>Azure Resource / Tier</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#6FFFE9]" />
                </div>
              </th>
              <th className="py-3.5 px-4">GTA Zone</th>
              <th className="py-3.5 px-4">Equipment Tag</th>
              <th 
                className="py-3.5 px-4 text-center cursor-pointer hover:text-[#6FFFE9] select-none"
                onClick={() => handleSort('monitoredUnitsCount')}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>Units</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#6FFFE9]" />
                </div>
              </th>
              <th 
                className="py-3.5 px-4 text-right cursor-pointer hover:text-[#6FFFE9] select-none"
                onClick={() => handleSort('costCadMtd')}
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>MTD Spend (CAD)</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#6FFFE9]" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-right">Projected Close</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#3A506B]/50 bg-[#0E172F] leading-relaxed">
            {sortedResources.length > 0 ? (
              sortedResources.map((res) => (
                <tr
                  key={res.id}
                  onClick={() => onSelectResource(res)}
                  className="hover:bg-[#1C2541] hover:outline hover:outline-1 hover:outline-[#6FFFE9]/30 transition-all cursor-pointer group"
                >
                  {/* Name & Tier */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0B132B] border border-[#3A506B] group-hover:border-[#6FFFE9]/50 shrink-0 transition-colors">
                        {getServiceIcon(res.azureMeterCategory)}
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-[#6FFFE9] transition-colors flex items-center gap-1.5">
                          <span>{res.resourceName}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#6FFFE9] transition-opacity" />
                        </div>
                        <div className="text-[11px] text-[#BCF8EC] font-mono">
                          {res.azureServiceType}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* GTA Zone */}
                  <td className="py-3.5 px-4 font-mono font-medium text-white">
                    {res.gtaZone}
                  </td>

                  {/* HVAC Tag */}
                  <td className="py-3.5 px-4">
                    <span className="bg-[#0B132B] text-[#6FFFE9] border border-[#3A506B] px-2.5 py-1 rounded text-[11px] font-mono font-bold">
                      {res.equipmentCategory}
                    </span>
                  </td>

                  {/* Monitored Units */}
                  <td className="py-3.5 px-4 font-mono text-center">
                    <div className="text-white font-bold">{res.monitoredUnitsCount} units</div>
                    <div className="text-[10px] text-[#BCF8EC]">
                      ${res.costPerUnitCad.toFixed(2)}/unit
                    </div>
                  </td>

                  {/* Spend MTD */}
                  <td className="py-3.5 px-4 text-right font-mono">
                    <div className="font-black text-[#6FFFE9] text-sm cyan-text-glow">
                      ${res.costCadMtd.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] text-[#BCF8EC]">
                      Prev: ${res.costCadLastMonth.toFixed(2)}
                    </div>
                  </td>

                  {/* Projected Close */}
                  <td className="py-3.5 px-4 text-right font-mono">
                    <div className={`font-bold text-xs ${
                      res.costCadProjected > res.costCadMtd * 1.3 ? 'text-[#EF4444]' : 'text-white'
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
                      className="text-[#6FFFE9] hover:text-white font-bold text-xs p-1.5 rounded-lg hover:bg-[#0B132B] transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-[#BCF8EC]">
                  No Azure HVAC resources found matching your current filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#BCF8EC] font-mono pt-3 border-t border-[#3A506B] gap-2">
        <span>Showing {sortedResources.length} of {resources.length} active Azure cloud services</span>
        <div className="flex items-center gap-4">
          <span>Subtotal MTD: <strong className="text-white font-bold">${sortedResources.reduce((a, b) => a + b.costCadMtd, 0).toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD</strong></span>
          <span className="text-[#22C55E] font-bold">Total Savings Potential: ${sortedResources.reduce((a, b) => a + b.savingsPotentialCad, 0).toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD</span>
        </div>
      </div>
    </div>
  );
};
