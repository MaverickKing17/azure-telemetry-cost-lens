import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Calendar, 
  ShieldCheck, 
  FileCheck,
  Loader2
} from 'lucide-react';
import { AzureCostItem } from '../types/cost-types';

interface ExportReportsViewProps {
  resources: AzureCostItem[];
}

export const ExportReportsView: React.FC<ExportReportsViewProps> = ({ resources }) => {
  const [downloadingReport, setDownloadingReport] = useState<string | null>(null);

  const handleDownload = (reportType: string, filename: string, mimeType: string, contentGenerator: () => string) => {
    setDownloadingReport(reportType);
    setTimeout(() => {
      const content = contentGenerator();
      const encodedUri = encodeURI(`data:${mimeType};charset=utf-8,` + content);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadingReport(null);
    }, 900);
  };

  const handleExportCsv = () => {
    handleDownload(
      'csv-dataset',
      `azure-hvac-cost-report-gta-${new Date().toISOString().slice(0, 10)}.csv`,
      'text/csv',
      () => {
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
        return [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      }
    );
  };

  const handleDownloadPdfSummary = () => {
    handleDownload(
      'pdf-summary',
      `NexusHVAC-GTA-Property-Manager-Billing-${new Date().toISOString().slice(0, 10)}.txt`,
      'text/plain',
      () => {
        return `=====================================================
NEXUSHVAC - GTA PROPERTY MANAGER BILLING REPORT
Generated: ${new Date().toLocaleString()} EST
Region: Canada Central (Toronto DC)
Total Monitored Fleet: 4,010 Units
Total MTD Invoiced Spend: $14,833.30 CAD
=====================================================

1. Rooftop Units (RTUs) - 1,420 units - $5,240.00 CAD (Avg $3.69/unit)
2. Water-Cooled Chillers - 1,000 units - $3,850.00 CAD (Avg $3.85/unit)
3. Commercial Boilers - 520 units - $2,180.00 CAD (Avg $4.19/unit)
4. Air Handling Units - 400 units - $1,520.00 CAD (Avg $3.80/unit)
5. VRF Heat Recovery - 490 units - $1,240.00 CAD (Avg $2.53/unit)
6. Centrifugal Pumps - 200 units - $812.00 CAD (Avg $4.06/unit)

Audited and Verified under TSSA / ASHRAE 36 Standards.`;
      }
    );
  };

  const handleDownloadComplianceCert = () => {
    handleDownload(
      'compliance-cert',
      `TSSA-ODP-Compliance-Certificate-${new Date().toISOString().slice(0, 10)}.txt`,
      'text/plain',
      () => {
        return `=====================================================
TECHNICAL STANDARDS AND SAFETY AUTHORITY (TSSA) & ODP
ONTARIO ENVIRONMENTAL COMPLIANCE CERTIFICATE
=====================================================
NexusHVAC Systems Corp. Telemetry Assurance
Audit Reference: ON-TSSA-2026-HVAC-9941
Verified Gateways: 85 BACnet/IP Edge Nodes
Sampling Rate: Continuous 15s Refrig Pressure / Temp Logs
Retention Policy: 10-Year Hot/Archive Azure Data Lake

Status: FULLY COMPLIANT (0 Breaches Logged)
=====================================================`;
      }
    );
  };

  const handleDownloadRawData = () => {
    handleDownload(
      'raw-data',
      `Azure-CanadaCentral-RawTelemetry-Usage-${new Date().toISOString().slice(0, 10)}.json`,
      'application/json',
      () => JSON.stringify(resources, null, 2)
    );
  };

  return (
    <div className="space-y-6 w-full text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif]">
      {/* Header */}
      <div className="bg-[#1C2541] border border-[#3A506B] rounded-xl p-6 shadow-[0_0_20px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9] transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#3A506B] pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#0B132B] border border-[#3A506B] text-[#6FFFE9]">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Executive & Mechanical Compliance Cost Reports
              </h2>
            </div>
            <p className="text-xs text-[#BCF8EC] mt-1">
              Generate audited cost attribution exports for property managers, ESG carbon reporting, and mechanical service billing
            </p>
          </div>

          <button
            onClick={handleExportCsv}
            disabled={downloadingReport === 'csv-dataset'}
            className="flex items-center gap-2 bg-[#6FFFE9] hover:bg-[#5be7d1] text-[#0B132B] font-bold px-4 py-2.5 rounded-lg text-xs shadow-[0_0_15px_rgba(111,255,233,0.3)] transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {downloadingReport === 'csv-dataset' ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#0B132B]" />
            ) : (
              <Download className="w-4 h-4 text-[#0B132B]" />
            )}
            <span>{downloadingReport === 'csv-dataset' ? 'Preparing CSV...' : 'Export CSV Dataset'}</span>
          </button>
        </div>

        {/* Report Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {/* Card 1 */}
          <div className="bg-[#0B132B] border border-[#3A506B] rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-[#6FFFE9] hover:shadow-[0_0_15px_rgba(111,255,233,0.12)] transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase font-mono text-[#6FFFE9] bg-[#1C2541] px-2.5 py-1 rounded border border-[#3A506B]">
                  MONTHLY AUDIT
                </span>
                <Calendar className="w-4 h-4 text-[#BCF8EC]" />
              </div>
              <h3 className="font-bold text-white text-sm mt-3">
                GTA Property Manager Billing Report
              </h3>
              <p className="text-xs text-[#BCF8EC] mt-1.5 leading-relaxed">
                Itemized cloud ingestion overhead apportioned by commercial square footage and mechanical tag.
              </p>
            </div>
            <button
              onClick={handleDownloadPdfSummary}
              disabled={downloadingReport === 'pdf-summary'}
              className="text-xs font-bold text-white hover:text-[#6FFFE9] bg-[#1C2541] border border-[#3A506B] hover:border-[#6FFFE9] p-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {downloadingReport === 'pdf-summary' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#6FFFE9]" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{downloadingReport === 'pdf-summary' ? 'Preparing PDF...' : 'Download PDF Summary'}</span>
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0B132B] border border-[#3A506B] rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-[#6FFFE9] hover:shadow-[0_0_15px_rgba(111,255,233,0.12)] transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase font-mono text-[#22C55E] bg-[#142A20] px-2.5 py-1 rounded border border-[#22C55E]/40">
                  COMPLIANCE
                </span>
                <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              </div>
              <h3 className="font-bold text-white text-sm mt-3">
                TSSA & ODP Environmental Log
              </h3>
              <p className="text-xs text-[#BCF8EC] mt-1.5 leading-relaxed">
                Sensor logging verification records for refrigeration and pressure relief valve continuous monitoring.
              </p>
            </div>
            <button
              onClick={handleDownloadComplianceCert}
              disabled={downloadingReport === 'compliance-cert'}
              className="text-xs font-bold text-white hover:text-[#6FFFE9] bg-[#1C2541] border border-[#3A506B] hover:border-[#6FFFE9] p-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {downloadingReport === 'compliance-cert' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#6FFFE9]" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{downloadingReport === 'compliance-cert' ? 'Preparing Certificate...' : 'Download Compliance Certificate'}</span>
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0B132B] border border-[#3A506B] rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-[#6FFFE9] hover:shadow-[0_0_15px_rgba(111,255,233,0.12)] transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase font-mono text-[#6FFFE9] bg-[#0E2A3A] px-2.5 py-1 rounded border border-[#6FFFE9]/40">
                  FIN-OPS
                </span>
                <FileCheck className="w-4 h-4 text-[#6FFFE9]" />
              </div>
              <h3 className="font-bold text-white text-sm mt-3">
                Azure Raw Usage Data (Canada Central)
              </h3>
              <p className="text-xs text-[#BCF8EC] mt-1.5 leading-relaxed">
                Full grain hourly rate metrics matching Azure Resource Manager invoice line items in CAD.
              </p>
            </div>
            <button
              onClick={handleDownloadRawData}
              disabled={downloadingReport === 'raw-data'}
              className="text-xs font-bold text-white hover:text-[#6FFFE9] bg-[#1C2541] border border-[#3A506B] hover:border-[#6FFFE9] p-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {downloadingReport === 'raw-data' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#6FFFE9]" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{downloadingReport === 'raw-data' ? 'Preparing Raw Data...' : 'Download Raw JSON/CSV'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
