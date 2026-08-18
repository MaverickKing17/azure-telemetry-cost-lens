import React from 'react';
import { 
  X, 
  ExternalLink, 
  Cpu
} from 'lucide-react';
import { AzureCostItem } from '../types/cost-types';

interface ResourceDetailModalProps {
  resource: AzureCostItem | null;
  onClose: () => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({ resource, onClose }) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#1C2541] border border-[#3A506B] rounded-xl w-full max-w-2xl shadow-[0_0_50px_rgba(111,255,233,0.15)] overflow-hidden flex flex-col max-h-[90vh] text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#3A506B] flex items-start justify-between bg-[#0B132B]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#1C2541] text-[#6FFFE9] border border-[#3A506B]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{resource.resourceName}</h3>
                <span className="text-[10px] font-mono bg-[#0B132B] text-[#6FFFE9] border border-[#3A506B] px-2 py-0.5 rounded font-medium">
                  {resource.azureMeterCategory}
                </span>
              </div>
              <p className="text-xs text-[#BCF8EC] font-mono mt-0.5">
                {resource.resourceGroup} • Region: Canada Central (Toronto DC)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#BCF8EC] hover:text-white p-1.5 rounded-lg hover:bg-[#1C2541] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-white">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#0B132B] border border-[#3A506B] rounded-lg p-3">
              <span className="text-[10px] font-semibold text-[#BCF8EC] uppercase">MTD Cost</span>
              <div className="text-lg font-bold text-[#6FFFE9] font-mono cyan-text-glow">
                ${resource.costCadMtd.toFixed(2)} <span className="text-xs text-[#BCF8EC] font-normal">CAD</span>
              </div>
            </div>

            <div className="bg-[#0B132B] border border-[#3A506B] rounded-lg p-3">
              <span className="text-[10px] font-semibold text-[#BCF8EC] uppercase">Projected Close</span>
              <div className="text-lg font-bold text-white font-mono">
                ${resource.costCadProjected.toFixed(2)} <span className="text-xs text-[#BCF8EC] font-normal">CAD</span>
              </div>
            </div>

            <div className="bg-[#0B132B] border border-[#3A506B] rounded-lg p-3">
              <span className="text-[10px] font-semibold text-[#BCF8EC] uppercase">Monitored Units</span>
              <div className="text-lg font-bold text-[#22C55E] font-mono">
                {resource.monitoredUnitsCount} units
              </div>
            </div>

            <div className="bg-[#0B132B] border border-[#3A506B] rounded-lg p-3">
              <span className="text-[10px] font-semibold text-[#BCF8EC] uppercase">Cost / Unit</span>
              <div className="text-lg font-bold text-[#6FFFE9] font-mono">
                ${resource.costPerUnitCad.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Operational Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#BCF8EC] font-mono">
              HVAC Telemetry Context
            </h4>
            <div className="bg-[#0B132B] border border-[#3A506B] rounded-lg p-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#3A506B]">
                <span className="text-[#BCF8EC]">GTA Regional Zone:</span>
                <span className="font-semibold text-white">{resource.gtaZone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3A506B]">
                <span className="text-[#BCF8EC]">Equipment Category:</span>
                <span className="font-mono text-[#6FFFE9] font-semibold">{resource.equipmentCategory}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3A506B]">
                <span className="text-[#BCF8EC]">Client Portfolio:</span>
                <span className="font-semibold text-white">{resource.clientPortfolio}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3A506B]">
                <span className="text-[#BCF8EC]">Data Ingress / Egress:</span>
                <span className="font-mono text-white">{resource.dataIngressGb} GB / {resource.dataEgressGb} GB</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#BCF8EC]">Status Diagnosis:</span>
                <span className="font-semibold text-white">{resource.statusDescription}</span>
              </div>
            </div>
          </div>

          {/* Cloud Optimization Action */}
          {resource.savingsPotentialCad > 0 && (
            <div className="bg-[#142A20] border border-[#22C55E]/50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#22C55E] block">Identified Optimization Opportunity</span>
                <span className="text-xs text-[#BCF8EC]">
                  Throttling telemetry / tiering can save ~${resource.savingsPotentialCad.toFixed(2)} CAD/mo
                </span>
              </div>
              <span className="text-sm font-bold text-[#22C55E] font-mono bg-[#0B132B] px-3 py-1 rounded border border-[#22C55E]/40">
                +${resource.savingsPotentialCad.toFixed(2)} CAD/mo
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#3A506B] bg-[#0B132B] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white hover:text-[#6FFFE9] bg-[#1C2541] hover:bg-[#142247] border border-[#3A506B] rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
          <a
            href="https://portal.azure.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold bg-[#0078D4] hover:bg-[#106EBE] text-white rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Open in Azure Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
