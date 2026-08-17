import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Scale, 
  Award, 
  Globe2, 
  CheckCircle2, 
  ExternalLink, 
  Download,
  AlertTriangle,
  Building2,
  Server
} from 'lucide-react';

export type LegalDocType = 'terms' | 'privacy' | 'data-residency' | 'cookies' | 'msa';

interface LegalModalProps {
  docType: LegalDocType | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ docType, onClose }) => {
  const [activeTab, setActiveTab] = useState<LegalDocType>(docType || 'terms');

  // Sync active tab if docType prop changes
  React.useEffect(() => {
    if (docType) {
      setActiveTab(docType);
    }
  }, [docType]);

  if (!docType) return null;

  const legalContent: Record<LegalDocType, {
    title: string;
    subtitle: string;
    badge: string;
    icon: React.ReactNode;
    lastUpdated: string;
    sections: { heading: string; body: string | string[] }[];
  }> = {
    terms: {
      title: 'Terms of Service & Telemetry SLA',
      subtitle: 'Ontario Mechanical Contractor & Commercial Building Telemetry Terms',
      badge: 'SLA: 99.99% UPTIME',
      icon: <FileText className="w-5 h-5 text-[#00E5FF]" />,
      lastUpdated: 'August 2026 (v4.2.0-ON)',
      sections: [
        {
          heading: '1. Service Scope & Greater Toronto Mechanical Gateway Telemetry',
          body: 'NexusHVAC Corp ("NexusHVAC") provisions cloud-native HVAC telemetry ingestion, ARM cost attribution, and BACnet/IP edge bridging services across commercial real estate portfolios in the Province of Ontario. By accessing this Command Center, mechanical contractors, facilities managers, and engineering operators agree to adhere to these operating terms.'
        },
        {
          heading: '2. High-Availability SLA & Canada Central Ingestion Uptime',
          body: [
            'NexusHVAC maintains a target 99.99% service level availability for real-time telemetry stream ingestion into Microsoft Azure Canada Central (Toronto DC).',
            'Planned maintenance windows are scheduled during low-demand municipal hours (02:00–04:00 EST Sundays) with a minimum 72-hour advance dispatch notification.',
            'Automated edge caching persists on-premise up to 72 hours of BACnet and Modbus sensor readings during upstream ISP or carrier outages without loss of audit integrity.'
          ]
        },
        {
          heading: '3. Technical Standards & TSSA Compliance',
          body: 'All telemetry ingestion models conform to Ontario Technical Standards and Safety Authority (TSSA) Act, O. Reg. 220/01 (Boilers and Pressure Vessels), and ASHRAE Guideline 36-2021 High-Performance Sequences of Operation for HVAC Systems.'
        },
        {
          heading: '4. Cloud Spend Estimations & Azure ARM API Attribution',
          body: 'Cost figures presented in this portal represent near-real-time computational estimations derived via Microsoft Azure Resource Manager (ARM API v2.4). While designed for 99.8% billing parity with Microsoft monthly commercial invoices, official reconciled financial billing remains governed by your Azure Enterprise Agreement (EA) or Cloud Solution Provider (CSP) agreement.'
        }
      ]
    },
    privacy: {
      title: 'Enterprise Privacy Statement & Tenant Isolation',
      subtitle: 'Ontario PIPEDA and Commercial Building Information Security Standards',
      badge: 'PIPEDA & SOC2 TYPE II',
      icon: <Lock className="w-5 h-5 text-[#00E5FF]" />,
      lastUpdated: 'August 2026 (Revision 3.8)',
      sections: [
        {
          heading: '1. Commitment to Canadian Data Privacy (PIPEDA & PHIPA)',
          body: 'NexusHVAC is fully compliant with the Personal Information Protection and Electronic Documents Act (PIPEDA) and Ontario provincial privacy regulations. Telemetry streaming records captured from commercial BAS/BMS hardware are strictly confined to operational sensor parameters (temperature, static pressure, fan speed, electrical demand, VFD Hz).'
        },
        {
          heading: '2. Zero Tenant PII Collection Policy',
          body: 'Our edge gateway protocols filter and sanitize all data at the local Niagara/BACnet controller interface. No tenant personally identifiable information (PII), badge access logs, or room occupancy identities are transmitted or retained in Azure telemetry pipelines.'
        },
        {
          heading: '3. Cryptographic Isolation & Role-Based Access Control (RBAC)',
          body: [
            'Every client portfolio is segregated via Azure Cosmos DB multi-tenant partition keys and encrypted using Azure Key Vault Managed HSM with 256-bit AES customer-managed keys (CMK).',
            'Transit encryption strictly enforces TLS 1.3 with automated certificate rotation via Azure App Service Managed Certificates.'
          ]
        },
        {
          heading: '4. Third-Party Disclosures & Security Auditing',
          body: 'NexusHVAC never sells, rents, or monetizes commercial equipment operational data. Aggregated anonymized efficiency metrics may be utilized solely for regional Ontario energy benchmarking code (OBC SB-10) compliance verification upon explicit client written consent.'
        }
      ]
    },
    'data-residency': {
      title: 'Data Residency & Sovereign Cloud Guarantee',
      subtitle: '100% Ontario & Canadian Sovereign Cloud Infrastructure Mandate',
      badge: 'CANADA CENTRAL DC (TORONTO)',
      icon: <Scale className="w-5 h-5 text-[#00E5FF]" />,
      lastUpdated: 'August 2026',
      sections: [
        {
          heading: '1. 100% Canadian Data In-Flight & At-Rest Mandate',
          body: 'NexusHVAC guarantees that 100% of telemetry payloads, client diagnostics, historical time-series data, and cost management logs are stored, processed, and backed up exclusively within Microsoft Azure data centers located physically in Toronto, Ontario (Canada Central) and Quebec City (Canada East for secondary zone-redundant disaster recovery).'
        },
        {
          heading: '2. Exclusion from Foreign Extraterritorial Jurisdiction',
          body: 'Data is strictly safeguarded against extraterritorial data transfer mandates. No telemetry packets or customer records cross international borders during standard ingestion, stream processing, cold blob storage, or automated billing attribution.'
        },
        {
          heading: '3. Geo-Redundant Disaster Recovery (GZRS)',
          body: 'Cold diagnostics storage accounts utilize Geo-Zone-Redundant Storage (GZRS) spanning 3 independent availability zones in Toronto with asynchronous replication to Quebec City, providing an industry-leading 99.9999999999999% (16 nines) of data durability.'
        },
        {
          heading: '4. Provincial Municipal & Healthcare Readiness',
          body: 'Our architecture satisfies data sovereignty requirements for Ontario hospitals (UHN, Sunnybrook, Trillium Health Partners), municipal infrastructure (City of Toronto, Peel, York Region), and institutional facilities.'
        }
      ]
    },
    cookies: {
      title: 'Telemetry Cookie & Edge Gateway Settings',
      subtitle: 'Diagnostics Caching, IoT Session State & Browser Storage Preferences',
      badge: 'DIAGNOSTICS & TELEMETRY CONTROL',
      icon: <Globe2 className="w-5 h-5 text-[#00E5FF]" />,
      lastUpdated: 'August 2026',
      sections: [
        {
          heading: '1. Strict Essential Cookies & Tokens Only',
          body: 'NexusHVAC uses only essential session authentication tokens and local edge gateway diagnostics caches. We do not use third-party marketing, behavioral tracking, or advertising cookies.'
        },
        {
          heading: '2. Edge Gateway Diagnostics Local Storage',
          body: [
            'Azure IoT Hub Token: Secure ephemeral session state for live WebSocket device twin synchronization (expires every 60 minutes).',
            'Filter Preferences: Remembers selected Greater Toronto Area municipal zones, equipment categories, and threshold parameters.',
            'Local Anomaly Cache: Maintains temporary offline acknowledgment states during field technician site inspections.'
          ]
        },
        {
          heading: '3. Granular Field Technician Controls',
          body: 'Field technicians can clear browser diagnostics cache at any time without terminating active field gateway telemetry bridges or BACnet controllers.'
        }
      ]
    },
    msa: {
      title: 'Master SaaS Agreement (MSA) & Contractor Licensing',
      subtitle: 'Commercial HVAC Telemetry Service Terms & Mechanical Liability Framework',
      badge: 'ENTERPRISE CONTRACTOR LICENSE',
      icon: <Award className="w-5 h-5 text-[#00E5FF]" />,
      lastUpdated: 'August 2026 (Enterprise Ed.)',
      sections: [
        {
          heading: '1. Commercial Contractor Subscription & Node Allocation',
          body: 'This Master SaaS Agreement governs the licensing of NexusHVAC software modules to certified mechanical contractors, refrigeration specialists, and building automation integrators licensed in the Province of Ontario.'
        },
        {
          heading: '2. Equipment Monitored Units (MU) & Tiering Billing',
          body: 'Subscriptions are billed based on the active count of monitored HVAC assets (RTUs, Chillers, Boilers, Cooling Towers, MAUs) and IoT bridge gateways registered in the Azure device registry. Telemetry sampling rates may be throttled to reduce ingestion overhead as modeled in the Optimization Simulator.'
        },
        {
          heading: '3. Technical Field Disclaimer & Liability Limitations',
          body: 'NexusHVAC provides operational analytics, cloud cost governance, and anomaly detection. In no event shall NexusHVAC replace physical inspection, certified gas technician verification (G1/G2 TSSA licenses), or 313A refrigeration mechanics on-site. Field teams maintain full physical responsibility for mechanical equipment safe operation.'
        },
        {
          heading: '4. Intellectual Property & Firmware Updates',
          body: 'All proprietary edge telemetry algorithms, predictive fault detection models (FDD), and Azure Stream Analytics query templates remain the exclusive intellectual property of NexusHVAC Systems Corp.'
        }
      ]
    }
  };

  const currentDoc = legalContent[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#111622] border border-cyan-500/40 rounded-2xl w-full max-w-4xl shadow-[0_0_50px_rgba(0,229,255,0.18)] overflow-hidden flex flex-col max-h-[90vh] text-white">
        
        {/* Modal Top Header */}
        <div className="p-6 border-b border-cyan-500/30 flex items-start justify-between bg-[#0B0F17]/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-[#00E5FF] border border-cyan-500/40 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              {currentDoc.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-lg font-bold text-white tracking-tight">{currentDoc.title}</h3>
                <span className="text-[10px] font-mono font-bold bg-cyan-950/80 text-[#00E5FF] border border-cyan-500/50 px-2.5 py-0.5 rounded-full tracking-wide">
                  {currentDoc.badge}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {currentDoc.subtitle} • <span className="font-mono text-cyan-400">{currentDoc.lastUpdated}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-6 py-3 bg-[#080C14] border-b border-cyan-500/20 overflow-x-auto">
          {(
            [
              { id: 'terms', label: 'Terms of Service', icon: <FileText className="w-3.5 h-3.5" /> },
              { id: 'privacy', label: 'Privacy & PIPEDA', icon: <Lock className="w-3.5 h-3.5" /> },
              { id: 'data-residency', label: 'Data Residency', icon: <Scale className="w-3.5 h-3.5" /> },
              { id: 'cookies', label: 'Telemetry Cookies', icon: <Globe2 className="w-3.5 h-3.5" /> },
              { id: 'msa', label: 'Master SaaS (MSA)', icon: <Award className="w-3.5 h-3.5" /> },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-[#00E5FF] border border-cyan-400/60 shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body with Rich Legal Sections */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-white text-sm leading-relaxed">
          {/* Trust Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0B101D] border border-cyan-500/30 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00E5FF] shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">TSSA Ontario Aligned</div>
                <div className="text-[11px] text-slate-300">O. Reg 220/01 Compliant</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0B101D] border border-cyan-500/30 flex items-center gap-3">
              <Server className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Canada Central Sovereign</div>
                <div className="text-[11px] text-slate-300">Toronto DC (PIPEDA)</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0B101D] border border-cyan-500/30 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">ASHRAE 36 Standard</div>
                <div className="text-[11px] text-slate-300">High-Performance BAS</div>
              </div>
            </div>
          </div>

          {/* Sectional Content */}
          <div className="space-y-6">
            {currentDoc.sections.map((section, idx) => (
              <div key={idx} className="bg-[#0B101D] p-5 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-2.5">
                <h4 className="font-bold text-base text-[#00E5FF] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                  {section.heading}
                </h4>
                {Array.isArray(section.body) ? (
                  <ul className="space-y-2 pl-4 text-slate-300 text-xs sm:text-sm list-disc">
                    {section.body.map((item, itemIdx) => (
                      <li key={itemIdx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {section.body}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Official Provincial Attestation Box */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex items-start gap-3 text-xs text-cyan-200">
            <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold">Official Corporate Attestation (Province of Ontario)</strong>
              <span>
                Executed by NexusHVAC Systems Corp. Telemetry security audits are verified bi-annually in accordance with ISO/IEC 27001:2022 and SOC2 Type II standards under Canadian jurisdiction.
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-cyan-500/30 bg-[#0B0F17] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono">
            Document Hash: <span className="text-[#00E5FF]">SHA256-NX-ON-{activeTab.toUpperCase()}-2026</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const blob = new Blob([
                  `${currentDoc.title}\n${currentDoc.subtitle}\nLast Updated: ${currentDoc.lastUpdated}\n\n` +
                  currentDoc.sections.map(s => `${s.heading}\n${Array.isArray(s.body) ? s.body.join('\n') : s.body}\n`).join('\n')
                ], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `nexushvac-${activeTab}-legal-doc.txt`;
                a.click();
              }}
              className="px-4 py-2 text-xs font-semibold text-white hover:text-[#00E5FF] bg-slate-900 border border-slate-700 hover:border-cyan-400/50 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Plain Text</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all cursor-pointer"
            >
              Accept & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
