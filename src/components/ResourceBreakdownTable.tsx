import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  Eye, 
  Layers, 
  Sparkles
} from 'lucide-react';
import { AzureCostItem } from '../types/cost-types';

interface ResourceBreakdownTableProps {
  resources: AzureCostItem[];
  onSelectResource: (resource: AzureCostItem) => void;
  selectedTagFilter?: string | null;
}

export const ResourceBreakdownTable: React.FC<ResourceBreakdownTableProps> = ({
  resources,
  onSelectResource,
  selectedTagFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof AzureCostItem>('costCadMtd');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter and sort items
  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesSearch = 
        res.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.hvacBusinessPurpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.azureServiceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.equipmentTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.clientPortfolio.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = 
        selectedCategory === 'all' ||
        (selectedCategory === 'iot' && res.azureMeterCategory.includes('Internet of Things')) ||
        (selectedCategory === 'db' && (res.azureMeterCategory.includes('Databases') || res.azureMeterCategory.includes('Storage'))) ||
        (selectedCategory === 'compute' && (res.azureMeterCategory.includes('App Service') || res.azureMeterCategory.includes('Virtual Machines') || res.azureMeterCategory.includes('Analytics'))) ||
        (selectedCategory === 'network' && (res.azureMeterCategory.includes('Networking') || res.azureMeterCategory.includes('Integration')));

      const matchesTag = !selectedTagFilter || res.equipmentTag === selectedTagFilter;

      return matchesSearch && matchesCategory && matchesTag;
    }).sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });
  }, [resources, searchTerm, selectedCategory, sortField, sortDirection, selectedTagFilter]);

  const handleSort = (field: keyof AzureCostItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getHealthIndicator = (status: AzureCostItem['status']) => {
    switch (status) {
      case 'Optimal':
        return <span className="w-2 h-2 bg-green-500 rounded-full inline-block" title="Optimal Health" />;
      case 'Spike Warning':
        return <span className="w-2 h-2 bg-red-500 rounded-full inline-block animate-pulse" title="Spike Warning" />;
      case 'Over-provisioned':
        return <span className="w-2 h-2 bg-amber-500 rounded-full inline-block" title="Over-provisioned RU" />;
      case 'Tiering Candidate':
        return <span className="w-2 h-2 bg-cyan-400 rounded-full inline-block" title="Cool Tier Candidate" />;
    }
  };

  return (
    <div className="col-span-12 bg-[#11141C] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Table Header Banner */}
      <div className="px-6 py-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-800/20">
        <div>
          <h3 className="text-slate-200 font-semibold text-base">
            Service Breakdown & Utility
          </h3>
          <p className="text-xs text-slate-400">
            Mapping technical Azure meters to HVAC operational purpose and cost per node.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Azure resource..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B0F17] text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500 placeholder-slate-500 font-mono transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-[#0B0F17] p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedCategory === 'all' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('iot')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedCategory === 'iot' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              IoT Hub
            </button>
            <button
              onClick={() => setSelectedCategory('db')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedCategory === 'db' ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              DB & Storage
            </button>
          </div>
        </div>
      </div>

      {/* Selected Tag Filter Banner if Active */}
      {selectedTagFilter && (
        <div className="flex items-center justify-between bg-cyan-500/10 border-b border-cyan-500/20 px-6 py-2 text-xs font-mono text-cyan-400">
          <span>Filtering by Equipment: <strong>{selectedTagFilter}</strong></span>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-800 bg-[#0B0F17]/50 font-mono">
              <th className="px-6 py-3 font-semibold">
                <button
                  onClick={() => handleSort('resourceName')}
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors uppercase tracking-widest"
                >
                  <span>Azure Service</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 font-semibold">
                <button
                  onClick={() => handleSort('hvacBusinessPurpose')}
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors uppercase tracking-widest"
                >
                  <span>Business Purpose</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 font-semibold">Equipment Tag</th>
              <th className="px-6 py-3 font-semibold text-right">
                <button
                  onClick={() => handleSort('costCadMtd')}
                  className="flex items-center gap-1 ml-auto hover:text-cyan-400 transition-colors uppercase tracking-widest"
                >
                  <span>Current Cost (CAD)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 font-semibold text-right">Cost / Unit</th>
              <th className="px-6 py-3 font-semibold text-center">Health</th>
              <th className="px-4 py-3 text-center">Inspect</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredResources.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 font-mono">
                  No Azure resources match the selected criteria.
                </td>
              </tr>
            ) : (
              filteredResources.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectResource(item)}
                  className="border-b border-slate-800 hover:bg-slate-800/15 transition-colors cursor-pointer"
                >
                  {/* Azure Service */}
                  <td className="px-6 py-4 text-cyan-400 font-mono font-semibold">
                    <div>{item.resourceName}</div>
                    <div className="text-[11px] text-slate-500 font-normal truncate max-w-[180px]">
                      {item.azureServiceType}
                    </div>
                  </td>

                  {/* Plain English HVAC Purpose */}
                  <td className="px-6 py-4 text-slate-300">
                    <div className="font-medium">{item.hvacBusinessPurpose}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {item.clientPortfolio}
                    </div>
                  </td>

                  {/* Equipment Tag */}
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">
                    <span className="text-slate-200 font-medium">{item.equipmentTag}</span>
                    <div className="text-[10px] text-slate-500">📍 {item.gtaZone} • {item.monitoredUnitsCount} units</div>
                  </td>

                  {/* Current Cost */}
                  <td className="px-6 py-4 text-right font-semibold text-white font-mono">
                    ${item.costCadMtd.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Cost per unit */}
                  <td className="px-6 py-4 text-right font-mono text-xs text-cyan-400 font-semibold">
                    ${item.costPerUnitCad.toFixed(2)}
                  </td>

                  {/* Health Indicator */}
                  <td className="px-6 py-4 text-center">
                    {getHealthIndicator(item.status)}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectResource(item);
                      }}
                      className="p-1.5 rounded bg-slate-800/80 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-colors"
                      title="Inspect Azure JSON"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer info */}
      <div className="px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono bg-[#0B0F17]/30">
        <span>Showing {filteredResources.length} active Azure cloud resources</span>
        <span className="text-cyan-400 font-semibold">
          Total Current Cost: ${filteredResources.reduce((s, r) => s + r.costCadMtd, 0).toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD
        </span>
      </div>
    </div>
  );
};
