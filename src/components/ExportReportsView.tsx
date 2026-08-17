import React from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  FileCheck, 
  ExternalLink, 
  ShieldCheck, 
  Building 
} from 'lucide-react';
import { AzureCostItem } from '../types/cost-types';

interface ExportReportsViewProps {
  resources: AzureCostItem[];
}

export const ExportReportsView: React.FC<ExportReportsViewProps> = ({ resources }) => {
  const handleExportCsv = () => {
    const headers = ['Resource ID', 'Resource Name', 'Service Type', 'Pricing Model', 'GTA Zone', 'Equipment Category', 'Units', 'MTD Cost CAD', 'Projected Cost CAD', 'Cost/Unit CAD', 'Status'];
    const rows = resources.map(r => [
      r.id,
      `"${r.resourceName}"`,
      `"${r.azureServiceType}"`,
      `"${r.pricingModel}"`,
      `"${r.gtaZone}"`,
      `"${r.equipmentCategory}"`,
      r.monitoredUnitsCount,
      r.costCadMtd,
      r.costCadProjected,
      r.costPerUnitCad,
      `"${r.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `azure-hvac-cost-report-gta-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 w-full text-[#f3f2f1]">
      {/* Header */}
      <div className="bg-[#292827] border border-[#3b3a39] rounded-lg p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#3b3a39] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-[#0078D4]/20 border border-[#0078D4]/40 text-[#00ccff]">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h2 className="text-base font-semibold text-[#f3f2f1] tracking-tight">
                Executive & Mechanical Compliance Cost Reports
              </h2>
            </div>
            <p className="text-xs text-[#a19f9d] mt-1">
              Generate audited cost attribution exports for property managers, ESG carbon reporting, and mechanical service billing
            </p>
          </div>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 bg-[#0078D4] hover:bg-[#106EBE] text-white font-semibold px-4 py-2 rounded text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Dataset</span>
          </button>
        </div>

        {/* Report Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#252423] border border-[#3b3a39] rounded p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase font-mono text-[#00ccff] bg-[#0078D4]/25 px-2 py-0.5 rounded border border-[#0078D4]/40">
                  MONTHLY AUDIT
                </span>
                <Calendar className="w-4 h-4 text-[#a19f9d]" />
              </div>
              <h3 className="font-semibold text-[#f3f2f1] text-sm mt-2">
                GTA Property Manager Billing Report
              </h3>
              <p className="text-xs text-[#a19f9d] mt-1">
                Itemized cloud ingestion overhead apportioned by commercial square footage and mechanical tag.
              </p>
            </div>
            <button
              onClick={handleExportCsv}
              className="text-xs font-semibold text-[#f3f2f1] hover:text-white bg-[#323130] border border-[#3b3a39] hover:bg-[#3b3a39] p-2 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Summary</span>
            </button>
          </div>

          <div className="bg-[#252423] border border-[#3b3a39] rounded p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase font-mono text-[#107c10] bg-[#107c10]/20 px-2 py-0.5 rounded border border-[#107c10]/40">
                  COMPLIANCE
                </span>
                <ShieldCheck className="w-4 h-4 text-[#107c10]" />
              </div>
              <h3 className="font-semibold text-[#f3f2f1] text-sm mt-2">
                TSSA & ODP Environmental Log
              </h3>
              <p className="text-xs text-[#a19f9d] mt-1">
                Sensor logging verification records for refrigeration and pressure relief valve continuous monitoring.
              </p>
            </div>
            <button
              onClick={handleExportCsv}
              className="text-xs font-semibold text-[#f3f2f1] hover:text-white bg-[#323130] border border-[#3b3a39] hover:bg-[#3b3a39] p-2 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Compliance Certificate</span>
            </button>
          </div>

          <div className="bg-[#252423] border border-[#3b3a39] rounded p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase font-mono text-[#b180f0] bg-[#5c2d91]/30 px-2 py-0.5 rounded border border-[#5c2d91]/50">
                  FIN-OPS
                </span>
                <FileCheck className="w-4 h-4 text-[#b180f0]" />
              </div>
              <h3 className="font-semibold text-[#f3f2f1] text-sm mt-2">
                Azure Raw Usage Data (Canada Central)
              </h3>
              <p className="text-xs text-[#a19f9d] mt-1">
                Full grain hourly rate metrics matching Azure Resource Manager invoice line items in CAD.
              </p>
            </div>
            <button
              onClick={handleExportCsv}
              className="text-xs font-semibold text-[#f3f2f1] hover:text-white bg-[#323130] border border-[#3b3a39] hover:bg-[#3b3a39] p-2 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Raw JSON/CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
