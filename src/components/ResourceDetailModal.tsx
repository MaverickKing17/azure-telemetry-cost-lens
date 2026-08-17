import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check
} from 'lucide-react';
import { AzureCostItem } from '../types/cost-types';

interface ResourceDetailModalProps {
  resource: AzureCostItem | null;
  onClose: () => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'rawJson' | 'telemetry'>('overview');

  if (!resource) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(resource, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#11141C] border border-slate-800 rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-start justify-between gap-4 bg-[#0B0F17]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                {resource.azureMeterCategory}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                📍 {resource.gtaZone}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white font-mono mt-1">
              {resource.resourceName}
            </h2>
            <div className="text-xs text-slate-400 mt-0.5">
              {resource.hvacBusinessPurpose}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Nav Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-800 text-xs font-mono bg-[#0B0F17]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-2 transition-all font-semibold cursor-pointer ${
              activeTab === 'overview'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Operational Overview
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`pb-2 px-2 transition-all font-semibold cursor-pointer ${
              activeTab === 'telemetry'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            BACnet & Edge Specs
          </button>
          <button
            onClick={() => setActiveTab('rawJson')}
            className={`pb-2 px-2 transition-all font-semibold cursor-pointer ${
              activeTab === 'rawJson'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw Azure JSON
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Financial Snapshot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase">MTD Cost:</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    ${resource.costCadMtd.toFixed(2)} CAD
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase">Cost Per Unit:</div>
                  <div className="text-base font-bold text-cyan-400 mt-0.5">
                    ${resource.costPerUnitCad.toFixed(2)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase">Nodes:</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {resource.monitoredUnitsCount} Units
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase">Savings:</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">
                    ${resource.savingsPotentialCad.toFixed(2)} CAD
                  </div>
                </div>
              </div>

              {/* Business Metadata */}
              <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Azure Resource ID:</span>
                  <span className="text-slate-300 truncate max-w-[320px]">{resource.resourceId}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Resource Group:</span>
                  <span className="text-cyan-400">{resource.resourceGroup}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Equipment Tag:</span>
                  <span className="text-white font-semibold">{resource.equipmentTag}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Client Portfolio:</span>
                  <span className="text-slate-300">{resource.clientPortfolio}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Azure Pricing Tier:</span>
                  <span className="text-emerald-400">{resource.pricingModel}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Status:</span>
                  <span className="text-amber-400">{resource.statusDescription}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-3">
                <div className="text-sm font-bold text-cyan-400">
                  Edge Gateway & Field Telemetry Specifications
                </div>
                <div className="grid grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Data Ingress:</span>
                    <strong className="text-white">{resource.dataIngressGb} GB / month</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Data Egress:</span>
                    <strong className="text-white">{resource.dataEgressGb} GB / month</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Protocols:</span>
                    <strong className="text-cyan-400">BACnet/IP, Modbus TCP, MQTT TLS</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Hardware:</span>
                    <strong className="text-white">Moxa UC-8100 & Raspberry Pi CM4 Gateways</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rawJson' && (
            <div className="relative">
              <button
                onClick={handleCopyJson}
                className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 flex items-center gap-1 border border-slate-700 transition-colors z-10 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
              <pre className="p-4 rounded-xl bg-[#070A0F] border border-slate-800 text-[11px] font-mono text-cyan-400/90 overflow-x-auto max-h-[350px]">
                {JSON.stringify(resource, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-[#0B0F17] text-xs font-mono">
          <span className="text-slate-500">
            Subscription: sub-prod-gta-telemetry-01 (CAD)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
