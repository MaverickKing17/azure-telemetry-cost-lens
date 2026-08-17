import React from 'react';
import { 
  X, 
  ExternalLink, 
  Cpu, 
  Layers, 
  DollarSign, 
  Activity, 
  Sliders, 
  Clock, 
  Database, 
  Radio, 
  HardDrive, 
  ShieldCheck 
} from 'lucide-react';
import { AzureCostItem } from '../types/cost-types';

interface ResourceDetailModalProps {
  resource: AzureCostItem | null;
  onClose: () => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({ resource, onClose }) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#292827] border border-[#3b3a39] rounded-lg w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#f3f2f1]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#3b3a39] flex items-start justify-between bg-[#252423]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#0078D4]/20 text-[#00ccff] border border-[#0078D4]/40">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-[#f3f2f1]">{resource.resourceName}</h3>
                <span className="text-[10px] font-mono bg-[#1b1a19] text-[#00ccff] border border-[#3b3a39] px-2 py-0.5 rounded font-medium">
                  {resource.azureMeterCategory}
                </span>
              </div>
              <p className="text-xs text-[#a19f9d] font-mono mt-0.5">
                {resource.resourceGroup} • Region: Canada Central (Toronto DC)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#a19f9d] hover:text-[#f3f2f1] p-1.5 rounded hover:bg-[#323130] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#f3f2f1]">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#252423] border border-[#3b3a39] rounded p-3">
              <span className="text-[10px] font-semibold text-[#a19f9d] uppercase">MTD Cost</span>
              <div className="text-lg font-bold text-[#00ccff] font-mono">
                ${resource.costCadMtd.toFixed(2)} <span className="text-xs text-[#a19f9d] font-normal">CAD</span>
              </div>
            </div>

            <div className="bg-[#252423] border border-[#3b3a39] rounded p-3">
              <span className="text-[10px] font-semibold text-[#a19f9d] uppercase">Projected Close</span>
              <div className="text-lg font-bold text-[#f3f2f1] font-mono">
                ${resource.costCadProjected.toFixed(2)} <span className="text-xs text-[#a19f9d] font-normal">CAD</span>
              </div>
            </div>

            <div className="bg-[#252423] border border-[#3b3a39] rounded p-3">
              <span className="text-[10px] font-semibold text-[#a19f9d] uppercase">Monitored Units</span>
              <div className="text-lg font-bold text-[#107c10] font-mono">
                {resource.monitoredUnitsCount} units
              </div>
            </div>

            <div className="bg-[#252423] border border-[#3b3a39] rounded p-3">
              <span className="text-[10px] font-semibold text-[#a19f9d] uppercase">Cost / Unit</span>
              <div className="text-lg font-bold text-[#00ccff] font-mono">
                ${resource.costPerUnitCad.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Operational Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#a19f9d] font-mono">
              HVAC Telemetry Context
            </h4>
            <div className="bg-[#252423] border border-[#3b3a39] rounded p-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#3b3a39]">
                <span className="text-[#a19f9d]">GTA Regional Zone:</span>
                <span className="font-semibold text-[#f3f2f1]">{resource.gtaZone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3b3a39]">
                <span className="text-[#a19f9d]">Equipment Category:</span>
                <span className="font-mono text-[#00ccff] font-semibold">{resource.equipmentCategory}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3b3a39]">
                <span className="text-[#a19f9d]">Client Portfolio:</span>
                <span className="font-semibold text-[#f3f2f1]">{resource.clientPortfolio}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3b3a39]">
                <span className="text-[#a19f9d]">Data Ingress / Egress:</span>
                <span className="font-mono text-[#f3f2f1]">{resource.dataIngressGb} GB / {resource.dataEgressGb} GB</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#a19f9d]">Status Diagnosis:</span>
                <span className="font-semibold text-[#f3f2f1]">{resource.statusDescription}</span>
              </div>
            </div>
          </div>

          {/* Cloud Optimization Action */}
          {resource.savingsPotentialCad > 0 && (
            <div className="bg-[#107c10]/15 border border-[#107c10]/40 rounded p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#107c10] block">Identified Optimization Opportunity</span>
                <span className="text-xs text-[#f3f2f1]">
                  Throttling telemetry / tiering can save ~${resource.savingsPotentialCad.toFixed(2)} CAD/mo
                </span>
              </div>
              <span className="text-sm font-bold text-[#107c10] font-mono bg-[#1b1a19] px-3 py-1 rounded border border-[#107c10]/30">
                +${resource.savingsPotentialCad.toFixed(2)} CAD/mo
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#3b3a39] bg-[#252423] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#f3f2f1] hover:text-white bg-[#323130] hover:bg-[#3b3a39] rounded transition-colors cursor-pointer"
          >
            Close
          </button>
          <a
            href="https://portal.azure.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold bg-[#0078D4] hover:bg-[#106EBE] text-white rounded flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <span>Open in Azure Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
