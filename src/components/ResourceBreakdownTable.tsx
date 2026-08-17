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
        return <Radio className="w-4 h-4 text-[#00ccff]" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-[#b180f0]" />;
      case 'Analytics':
        return <Cpu className="w-4 h-4 text-[#ffaa00]" />;
      case 'Storage':
        return <HardDrive className="w-4 h-4 text-[#107c10]" />;
      default:
        return <Layers className="w-4 h-4 text-[#a19f9d]" />;
    }
  };

  const getStatusBadge = (status: AzureCostItem['status']) => {
    switch (status) {
      case 'Optimal':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#107c10]/20 text-[#107c10] border border-[#107c10]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#107c10]" />
            Optimal
          </span>
        );
      case 'Spike Warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#a80000]/25 text-[#ff6b6b] border border-[#a80000]/50 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5555]" />
            Spike Warning
          </span>
        );
      case 'Over-provisioned':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#ffaa00]/20 text-[#ffaa00] border border-[#ffaa00]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffaa00]" />
            Over-provisioned
          </span>
        );
      case 'Tiering Candidate':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#0078d4]/25 text-[#00ccff] border border-[#0078d4]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ccff]" />
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
    <div className="bg-[#292827] border border-[#3b3a39] rounded-lg p-6 shadow-xl space-y-5 w-full text-[#f3f2f1]">
      {/* Table Header Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#3b3a39] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[#0078D4]/20 border border-[#0078D4]/40 text-[#00ccff]">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-base font-semibold text-[#f3f2f1] tracking-tight">
              Service Breakdown & Telemetry Utility Matrix
            </h2>
          </div>
          <p className="text-xs text-[#a19f9d] mt-1">
            Itemized breakdown of Azure resources serving Toronto/GTA telemetry gateways, stream jobs, and cold storage
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#a19f9d] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resource, tag, zone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#252423] border border-[#3b3a39] text-[#f3f2f1] placeholder:text-[#a19f9d] text-xs rounded pl-9 pr-3 py-1.5 focus:outline-none focus:border-[#00ccff] transition-colors"
            />
          </div>

          {/* Service Category Pills */}
          <div className="flex items-center gap-1 bg-[#252423] p-1 rounded border border-[#3b3a39] overflow-x-auto">
            {serviceTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedServiceType(type)}
                className={`px-3 py-1 text-xs font-semibold rounded transition-all capitalize whitespace-nowrap cursor-pointer ${
                  selectedServiceType === type
                    ? 'bg-[#0078D4] text-white shadow-xs'
                    : 'text-[#a19f9d] hover:text-[#f3f2f1] hover:bg-[#323130]'
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
        <div className="bg-[#0078D4]/20 border border-[#0078D4]/40 text-[#c7e0f4] px-3 py-2 rounded text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#00ccff]" />
            <span>Active Equipment Tag Filter: <strong className="text-[#f3f2f1]">{selectedTagFilter}</strong></span>
          </span>
          <span className="text-[11px] text-[#00ccff] font-mono">Showing matched resources</span>
        </div>
      )}

      {/* Data Table */}
      <div className="overflow-x-auto rounded border border-[#3b3a39]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#252423] border-b border-[#3b3a39] text-[#a19f9d] font-semibold text-[11px]">
              <th 
                className="py-3 px-4 cursor-pointer hover:text-[#00ccff] select-none"
                onClick={() => handleSort('resourceName')}
              >
                <div className="flex items-center gap-1.5">
                  <span>Azure Resource / Tier</span>
                  <ArrowUpDown className="w-3 h-3 text-[#a19f9d]" />
                </div>
              </th>
              <th className="py-3 px-4">GTA Zone</th>
              <th className="py-3 px-4">Equipment Tag</th>
              <th 
                className="py-3 px-4 text-center cursor-pointer hover:text-[#00ccff] select-none"
                onClick={() => handleSort('monitoredUnitsCount')}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>Units</span>
                  <ArrowUpDown className="w-3 h-3 text-[#a19f9d]" />
                </div>
              </th>
              <th 
                className="py-3 px-4 text-right cursor-pointer hover:text-[#00ccff] select-none"
                onClick={() => handleSort('costCadMtd')}
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>MTD Spend (CAD)</span>
                  <ArrowUpDown className="w-3 h-3 text-[#a19f9d]" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Projected Close</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#3b3a39] bg-[#292827]">
            {sortedResources.length > 0 ? (
              sortedResources.map((res) => (
                <tr
                  key={res.id}
                  onClick={() => onSelectResource(res)}
                  className="hover:bg-[#323130] transition-colors cursor-pointer group"
                >
                  {/* Name & Tier */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-[#252423] border border-[#3b3a39] shrink-0">
                        {getServiceIcon(res.azureMeterCategory)}
                      </div>
                      <div>
                        <div className="font-semibold text-[#f3f2f1] group-hover:text-[#00ccff] transition-colors flex items-center gap-1.5">
                          <span>{res.resourceName}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#00ccff] transition-opacity" />
                        </div>
                        <div className="text-[11px] text-[#a19f9d] font-mono">
                          {res.azureServiceType}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* GTA Zone */}
                  <td className="py-3.5 px-4 font-mono text-[#f3f2f1]">
                    {res.gtaZone}
                  </td>

                  {/* HVAC Tag */}
                  <td className="py-3.5 px-4">
                    <span className="bg-[#252423] text-[#f3f2f1] border border-[#3b3a39] px-2 py-0.5 rounded text-[11px] font-mono">
                      {res.equipmentCategory}
                    </span>
                  </td>

                  {/* Monitored Units */}
                  <td className="py-3.5 px-4 font-mono text-[#f3f2f1] text-center">
                    <div className="text-[#f3f2f1] font-semibold">{res.monitoredUnitsCount} units</div>
                    <div className="text-[10px] text-[#a19f9d]">
                      ${res.costPerUnitCad.toFixed(2)}/unit
                    </div>
                  </td>

                  {/* Spend MTD */}
                  <td className="py-3.5 px-4 text-right font-mono">
                    <div className="font-bold text-[#00ccff] text-sm">
                      ${res.costCadMtd.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] text-[#a19f9d]">
                      Prev: ${res.costCadLastMonth.toFixed(2)}
                    </div>
                  </td>

                  {/* Projected Close */}
                  <td className="py-3.5 px-4 text-right font-mono">
                    <div className={`font-semibold text-xs ${
                      res.costCadProjected > res.costCadMtd * 1.3 ? 'text-[#ff6b6b]' : 'text-[#f3f2f1]'
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
                      className="text-[#00ccff] hover:text-white font-semibold text-xs p-1 rounded hover:bg-[#0078D4]/30 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-[#a19f9d]">
                  No Azure HVAC resources found matching your current filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#a19f9d] font-mono pt-2 border-t border-[#3b3a39] gap-2">
        <span>Showing {sortedResources.length} of {resources.length} active Azure cloud services</span>
        <div className="flex items-center gap-4">
          <span>Subtotal MTD: <strong className="text-[#f3f2f1]">${sortedResources.reduce((a, b) => a + b.costCadMtd, 0).toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD</strong></span>
          <span className="text-[#107c10] font-semibold">Total Savings Potential: ${sortedResources.reduce((a, b) => a + b.savingsPotentialCad, 0).toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD</span>
        </div>
      </div>
    </div>
  );
};
