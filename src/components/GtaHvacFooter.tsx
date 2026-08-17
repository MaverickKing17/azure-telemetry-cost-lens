import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Server, 
  FileText, 
  Lock, 
  Scale, 
  Award,
  Globe2
} from 'lucide-react';

export const GtaHvacFooter: React.FC = () => {
  return (
    <footer className="bg-[#252423] text-[#f3f2f1] border-t border-[#3b3a39] py-12 px-8 mt-16 rounded-xl shadow-2xl font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,sans-serif]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        
        {/* Column 1: Brand & Industry Compliance */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#0078D4] rounded flex items-center justify-center shadow-xs">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3v6h8V3h-8zm6 4h-4V5h4v2zm-6 4v6h8v-6h-8zm6 4h-4v-2h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2zM3 3v6h8V3H3zm6 4H5V5h4v2z" />
              </svg>
            </div>
            <span className="font-mono text-base font-bold tracking-tight text-[#f3f2f1]">
              NEXUS<span className="text-[#00ccff]">HVAC</span>
            </span>
          </div>
          
          <p className="text-xs text-[#a19f9d] leading-relaxed">
            Enterprise cloud telemetry & cost management engineering purpose-built for Ontario commercial mechanical contractors, building automation specialists, and district energy operators.
          </p>

          <div className="space-y-2 pt-1 font-mono text-[11px] text-[#a19f9d]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#107c10] shrink-0" />
              <span>TSSA Ontario Compliant Telemetry</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[#00ccff] shrink-0" />
              <span>ODP / ASHRAE Guideline 36 Aligned</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#107c10] shrink-0" />
              <span>OBC SB-10 Energy Code Ready</span>
            </div>
          </div>
        </div>

        {/* Column 2: Legal & Governance Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-mono tracking-wider text-[#f3f2f1] uppercase border-b border-[#3b3a39] pb-2">
            Governance & Legal
          </h4>
          <ul className="space-y-2 text-xs text-[#a19f9d]">
            <li>
              <a href="#terms" className="hover:text-[#00ccff] transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#a19f9d]" />
                <span>Terms of Service & SLA</span>
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-[#00ccff] transition-colors flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#a19f9d]" />
                <span>Enterprise Privacy Statement</span>
              </a>
            </li>
            <li>
              <a href="#compliance" className="hover:text-[#00ccff] transition-colors flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#a19f9d]" />
                <span>Data Residency (Canada PIPEDA)</span>
              </a>
            </li>
            <li>
              <a href="#cookies" className="hover:text-[#00ccff] transition-colors flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-[#a19f9d]" />
                <span>Telemetry Cookie Settings</span>
              </a>
            </li>
            <li>
              <a href="#license" className="hover:text-[#00ccff] transition-colors flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#a19f9d]" />
                <span>Master SaaS Agreement (MSA)</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Industry Disclaimers */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-mono tracking-wider text-[#f3f2f1] uppercase border-b border-[#3b3a39] pb-2">
            Industry Disclaimers
          </h4>
          <p className="text-[11px] text-[#a19f9d] leading-relaxed">
            NexusHVAC is an independent enterprise analytics solution. Microsoft, Microsoft Azure, and Azure IoT Hub are registered trademarks of Microsoft Corporation.
          </p>
          <p className="text-[11px] text-[#a19f9d] leading-relaxed">
            Cost attribution models reflect real-time telemetry estimations ingested via Microsoft Azure Resource Manager (ARM API v2.4) in Canada Central region and do not replace official monthly Microsoft billing invoices.
          </p>
        </div>

        {/* Column 4: Regional Node Status & GTA Support */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-mono tracking-wider text-[#f3f2f1] uppercase border-b border-[#3b3a39] pb-2">
            Regional Status
          </h4>
          
          <div className="p-3 bg-[#1b1a19] border border-[#3b3a39] rounded space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#a19f9d] font-mono">Primary Node:</span>
              <span className="text-xs font-semibold text-[#107c10] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#107c10] animate-pulse" />
                Canada Central
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#a19f9d]">Availability SLA:</span>
              <span className="text-[#f3f2f1] font-semibold">99.99% Uptime</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#a19f9d]">Latency (Toronto DC):</span>
              <span className="text-[#00ccff] font-semibold">8.4 ms</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-[#a19f9d]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#00ccff] shrink-0" />
              <span>100 University Ave, Toronto, ON M5J 1V6</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#00ccff] shrink-0" />
              <span className="font-mono">1-800-555-HVAC (24/7 Field Dispatch)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#00ccff] shrink-0" />
              <span className="font-mono">support@nexushvac.ca</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Copyright Bar */}
      <div className="mt-10 pt-6 border-t border-[#3b3a39] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a19f9d] max-w-7xl mx-auto font-mono">
        <div>
          © {new Date().getFullYear()} NexusHVAC Systems Corp. All rights reserved. Registered in the Province of Ontario, Canada.
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-[#107c10]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#107c10]" />
            TLS 1.3 Encrypted
          </span>
          <span>•</span>
          <span>BACnet/IP Gateway v4.8</span>
          <span>•</span>
          <span className="text-[#00ccff]">GTA Dispatch Active</span>
        </div>
      </div>
    </footer>
  );
};
