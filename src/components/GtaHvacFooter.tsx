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
  Globe2,
  Zap
} from 'lucide-react';
import { LegalDocType } from './LegalModal';

interface GtaHvacFooterProps {
  onOpenLegal: (docType: LegalDocType) => void;
}

export const GtaHvacFooter: React.FC<GtaHvacFooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="bg-[#0B0F17] text-slate-300 border-t border-cyan-500/30 py-12 px-8 mt-12 rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.06)] font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        
        {/* Column 1: Brand & Industry Compliance */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              <Zap className="w-5 h-5 text-black" fill="currentColor" />
            </div>
            <span className="font-mono text-lg font-bold tracking-tight text-white">
              NEXUS<span className="text-[#00E5FF] neon-text-glow">HVAC</span>
            </span>
          </div>
          
          <p className="text-xs text-slate-300 leading-relaxed">
            Enterprise cloud telemetry & cost management engineering purpose-built for Ontario commercial mechanical contractors, building automation specialists, and district energy operators.
          </p>

          <div className="space-y-2 pt-1 font-mono text-[11px] text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <span className="text-white font-medium">TSSA Ontario Compliant Telemetry</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-white font-medium">ODP / ASHRAE Guideline 36 Aligned</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-white font-medium">OBC SB-10 Energy Code Ready</span>
            </div>
          </div>
        </div>

        {/* Column 2: Legal & Governance Links with Interactive Modals */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-mono tracking-wider text-white uppercase border-b border-cyan-500/30 pb-2 flex items-center gap-2">
            <Scale className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Governance & Legal</span>
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li>
              <button 
                onClick={() => onOpenLegal('terms')}
                className="hover:text-[#00E5FF] transition-all flex items-center gap-2 text-left group cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline text-slate-200 group-hover:text-[#00E5FF]">Terms of Service & SLA</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenLegal('privacy')}
                className="hover:text-[#00E5FF] transition-all flex items-center gap-2 text-left group cursor-pointer"
              >
                <Lock className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline text-slate-200 group-hover:text-[#00E5FF]">Enterprise Privacy Statement</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenLegal('data-residency')}
                className="hover:text-[#00E5FF] transition-all flex items-center gap-2 text-left group cursor-pointer"
              >
                <Scale className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline text-slate-200 group-hover:text-[#00E5FF]">Data Residency (Ontario PIPEDA)</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenLegal('cookies')}
                className="hover:text-[#00E5FF] transition-all flex items-center gap-2 text-left group cursor-pointer"
              >
                <Globe2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline text-slate-200 group-hover:text-[#00E5FF]">Telemetry Cookie Settings</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenLegal('msa')}
                className="hover:text-[#00E5FF] transition-all flex items-center gap-2 text-left group cursor-pointer"
              >
                <Award className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline text-slate-200 group-hover:text-[#00E5FF]">Master SaaS Agreement (MSA)</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Industry Disclaimers */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-mono tracking-wider text-white uppercase border-b border-cyan-500/30 pb-2 flex items-center gap-2">
            <Server className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Industry Disclaimers</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            NexusHVAC is an independent enterprise analytics solution. Microsoft, Microsoft Azure, and Azure IoT Hub are registered trademarks of Microsoft Corporation.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Cost attribution models reflect real-time telemetry estimations ingested via Microsoft Azure Resource Manager (ARM API v2.4) in Canada Central region and do not replace official monthly Microsoft billing invoices.
          </p>
        </div>

        {/* Column 4: Regional Node Status & GTA Support */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-mono tracking-wider text-white uppercase border-b border-cyan-500/30 pb-2 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Regional Status</span>
          </h4>
          
          <div className="p-3.5 bg-[#111622] border border-cyan-500/30 rounded-xl space-y-2 shadow-[0_0_15px_rgba(0,229,255,0.06)]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300 font-mono">Primary Node:</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                Canada Central (Toronto)
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Availability SLA:</span>
              <span className="text-white font-bold">99.99% Uptime</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Latency (Toronto DC):</span>
              <span className="text-[#00E5FF] font-bold">8.4 ms</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <span className="text-white">100 University Ave, Toronto, ON M5J 1V6</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <span className="font-mono text-cyan-300 font-semibold">1-800-555-HVAC (24/7 Field Dispatch)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <span className="font-mono text-slate-300">support@nexushvac.ca</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Copyright Bar */}
      <div className="mt-10 pt-6 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 max-w-7xl mx-auto font-mono">
        <div className="text-slate-300">
          © {new Date().getFullYear()} NexusHVAC Systems Corp. All rights reserved. Registered in Ontario, Canada.
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
            TLS 1.3 Encrypted
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">BACnet/IP Gateway v4.8</span>
          <span className="text-slate-600">•</span>
          <span className="text-[#00E5FF] neon-text-glow">GTA Dispatch Active</span>
        </div>
      </div>
    </footer>
  );
};
