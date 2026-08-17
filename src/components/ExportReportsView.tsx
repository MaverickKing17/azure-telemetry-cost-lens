import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  FileText
} from 'lucide-react';
import { AzureCostItem } from '../types/cost-types';

interface ExportReportsViewProps {
  resources: AzureCostItem[];
}

export const ExportReportsView: React.FC<ExportReportsViewProps> = ({
  resources,
}) => {
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [billingMonth, setBillingMonth] = useState<string>('August 2026');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const clientList = ['all', 'Cadillac Fairview', 'Oxford Properties', 'York Region Cold Storage', 'Menkes Developments', 'CP Rail Logistics'];

  const filteredResources = resources.filter(r => 
    selectedClient === 'all' || r.clientPortfolio.toLowerCase().includes(selectedClient.toLowerCase())
  );

  const totalCost = filteredResources.reduce((s, r) => s + r.costCadMtd, 0);
  const totalUnits = filteredResources.reduce((s, r) => s + r.monitoredUnitsCount, 0);
  const avgCostUnit = totalUnits > 0 ? totalCost / totalUnits : 0;

  const handleDownloadCsv = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = ['Azure Resource', 'Meter Category', 'Plain English HVAC Purpose', 'Equipment Tag', 'GTA Zone', 'Monitored Units', 'Spend MTD (CAD)', 'Cost Per Unit (CAD)', 'Optimization Status'];
      const rows = filteredResources.map(r => [
        `"${r.resourceName}"`,
        `"${r.azureMeterCategory}"`,
        `"${r.hvacBusinessPurpose}"`,
        `"${r.equipmentTag}"`,
        `"${r.gtaZone}"`,
        r.monitoredUnitsCount,
        r.costCadMtd.toFixed(2),
        r.costPerUnitCad.toFixed(2),
        `"${r.status}"`
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `Azure_HVAC_Cost_PassThrough_${billingMonth.replace(' ', '_')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#11141C] border border-slate-800 rounded-xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Executive & Client Accounting
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
              Pass-Through Reconciliation
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1">
            Azure Telemetry Cost Allocation & Pass-Through Reports
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Generate itemized billing exhibits for GTA commercial property managers with clean business metrics.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2.5 rounded-lg bg-[#0B0F17] hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print View</span>
          </button>

          <button
            onClick={handleDownloadCsv}
            disabled={isExporting}
            className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F17] font-bold text-xs tracking-wide uppercase transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating CSV...' : 'Download CSV Report'}</span>
          </button>
        </div>
      </div>

      {/* Filter Parameters */}
      <div className="bg-[#11141C] border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          {/* Client Filter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Client Portfolio:</span>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="bg-[#0B0F17] text-cyan-400 p-2 rounded-lg border border-slate-800 focus:border-cyan-500 focus:outline-none"
            >
              {clientList.map(c => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All GTA Client Portfolios' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Billing Period */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Billing Cycle:</span>
            <select
              value={billingMonth}
              onChange={(e) => setBillingMonth(e.target.value)}
              className="bg-[#0B0F17] text-white p-2 rounded-lg border border-slate-800 focus:border-cyan-500 focus:outline-none"
            >
              <option>August 2026 (Current MTD)</option>
              <option>July 2026 (Closed Cycle)</option>
              <option>June 2026 (Closed Cycle)</option>
            </select>
          </div>
        </div>

        {/* Totals Summary */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <span className="text-slate-400">Total Units: </span>
            <strong className="text-white">{totalUnits}</strong>
          </div>
          <div className="text-right">
            <span className="text-slate-400">Billable Azure Spend: </span>
            <strong className="text-cyan-400 text-sm">${totalCost.toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD</strong>
          </div>
        </div>
      </div>

      {/* Report Table Preview */}
      <div className="bg-[#11141C] border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-2">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/20">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Itemized Pass-Through Exhibit ({billingMonth})
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Contract Schedule B-4
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-[#0B0F17]/50 border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest">
                <th className="py-3 px-6 font-semibold">Equipment Tag & Client</th>
                <th className="py-3 px-6 font-semibold">Plain-English Purpose</th>
                <th className="py-3 px-6 font-semibold">GTA Zone</th>
                <th className="py-3 px-6 text-center font-semibold">Units</th>
                <th className="py-3 px-6 text-right font-semibold">Azure Cost</th>
                <th className="py-3 px-6 text-right font-semibold">Cost / Unit</th>
                <th className="py-3 px-6 text-right font-semibold">Pass-Through ($5.50)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredResources.map((res) => {
                const passThroughRate = res.monitoredUnitsCount * 5.50;
                return (
                  <tr key={res.id} className="hover:bg-slate-800/15 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-white">
                      <div>{res.equipmentTag}</div>
                      <div className="text-[10px] text-slate-500">{res.clientPortfolio}</div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-300">
                      {res.hvacBusinessPurpose}
                    </td>
                    <td className="py-3.5 px-6 text-cyan-400">
                      📍 {res.gtaZone}
                    </td>
                    <td className="py-3.5 px-6 text-center text-white font-bold">
                      {res.monitoredUnitsCount}
                    </td>
                    <td className="py-3.5 px-6 text-right text-white">
                      ${res.costCadMtd.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-6 text-right text-cyan-400">
                      ${res.costPerUnitCad.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-6 text-right text-emerald-400 font-bold">
                      ${passThroughRate.toFixed(2)} CAD
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[#0B0F17] border-t-2 border-slate-700 text-xs font-bold font-mono">
                <td colSpan={3} className="py-3.5 px-6 text-white uppercase">
                  Consolidated Total
                </td>
                <td className="py-3.5 px-6 text-center text-white">
                  {totalUnits} Units
                </td>
                <td className="py-3.5 px-6 text-right text-white">
                  ${totalCost.toFixed(2)} CAD
                </td>
                <td className="py-3.5 px-6 text-right text-cyan-400">
                  ${avgCostUnit.toFixed(2)} CAD
                </td>
                <td className="py-3.5 px-6 text-right text-emerald-400 text-sm font-black">
                  ${(totalUnits * 5.50).toFixed(2)} CAD
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
