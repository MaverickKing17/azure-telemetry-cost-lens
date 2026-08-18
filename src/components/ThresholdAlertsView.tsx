import React, { useState } from 'react';
import { 
  BellRing, 
  Plus, 
  CheckCircle, 
  Sliders
} from 'lucide-react';
import { BudgetThresholdRule } from '../types/cost-types';

interface ThresholdAlertsViewProps {
  initialRules: BudgetThresholdRule[];
}

export const ThresholdAlertsView: React.FC<ThresholdAlertsViewProps> = ({ initialRules }) => {
  const [rules, setRules] = useState<BudgetThresholdRule[]>(initialRules);
  const [newClientName, setNewClientName] = useState('');
  const [newZone, setNewZone] = useState('Mississauga');
  const [newEquipmentType, setNewEquipmentType] = useState('Carrier RTU Fleet');
  const [newThreshold, setNewThreshold] = useState('3500');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const toggleRule = (ruleId: string, clientName: string) => {
    setRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        const nextStatus = r.status === 'active' ? 'warning' : 'active';
        return {
          ...r,
          status: nextStatus
        };
      }
      return r;
    }));
    setFeedbackMessage(`Threshold config updated for ${clientName}`);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newRule: BudgetThresholdRule = {
      id: `rule-${Date.now()}`,
      clientName: newClientName.trim(),
      gtaZone: newZone,
      equipmentType: newEquipmentType,
      monthlyBudgetCapCad: Number(newThreshold) || 3500,
      currentSpendCad: 0,
      thresholdWarningPercent: 85,
      notifyEmails: ['dispatch@gtamechanical.ca'],
      notifyWebhook: 'https://hooks.slack.com/services/T00/B00/HVAC_ALERTS',
      autoThrottleOnBreach: true,
      status: 'active'
    };

    setRules(prev => [...prev, newRule]);
    setFeedbackMessage(`Added budget rule for ${newClientName}`);
    setNewClientName('');
    setNewThreshold('3500');
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  return (
    <div className="space-y-6 w-full text-white font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif]">
      {feedbackMessage && (
        <div className="bg-[#142A20] border border-[#22C55E] text-[#22C55E] px-4 py-2.5 rounded-lg text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <CheckCircle className="w-4 h-4 text-[#22C55E]" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#1C2541] border border-[#3A506B] rounded-xl p-6 shadow-[0_0_20px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9] transition-all duration-300">
        <div className="flex items-center gap-3 border-b border-[#3A506B] pb-5">
          <div className="p-2 rounded-lg bg-[#0B132B] border border-[#3A506B] text-[#6FFFE9]">
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Cost & Anomaly Threshold Rules Engine
            </h2>
            <p className="text-xs text-[#BCF8EC] mt-0.5">
              Automated Azure Budget API triggers with SMS and email notifications for mechanical field managers
            </p>
          </div>
        </div>

        {/* Existing Rules List */}
        <div className="space-y-3 mt-6">
          {rules.map((rule) => {
            const isExceeded = rule.status === 'exceeded';
            const isWarning = rule.status === 'warning';

            return (
              <div
                key={rule.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isExceeded 
                    ? 'bg-[#2A1520] border-[#EF4444]/60 red-glow' 
                    : isWarning
                    ? 'bg-[#2A2010] border-[#F59E0B]/50'
                    : 'bg-[#0B132B] border-[#3A506B] hover:border-[#6FFFE9]'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-white">{rule.clientName}</span>
                    <span className="text-[10px] font-mono bg-[#1C2541] text-white border border-[#3A506B] px-2 py-0.5 rounded">
                      Zone: {rule.gtaZone}
                    </span>
                    <span className="text-[10px] font-mono bg-[#0B132B] text-[#6FFFE9] border border-[#3A506B] px-2 py-0.5 rounded font-semibold">
                      {rule.equipmentType}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#BCF8EC] font-mono">
                    <span>Current: <strong className="text-white font-bold">${rule.currentSpendCad.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CAD</strong></span>
                    <span>•</span>
                    <span>Cap: <strong className="text-white font-bold">${rule.monthlyBudgetCapCad.toLocaleString()} CAD/mo</strong></span>
                    <span>•</span>
                    <span>Notify: {rule.notifyEmails.join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold font-mono px-3 py-1 rounded uppercase tracking-wider ${
                    isExceeded
                      ? 'bg-[#EF4444] text-white shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                      : isWarning
                      ? 'bg-[#F59E0B] text-[#0B132B] font-black'
                      : 'bg-[#22C55E] text-[#0B132B] font-black'
                  }`}>
                    {rule.status}
                  </span>

                  <button
                    onClick={() => toggleRule(rule.id, rule.clientName)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#0B132B] border border-[#3A506B] hover:border-[#6FFFE9] hover:text-[#6FFFE9] text-white transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    Configure
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Rule Form */}
      <div className="bg-[#1C2541] border border-[#3A506B] rounded-xl p-6 shadow-[0_0_20px_rgba(111,255,233,0.06)] hover:border-[#6FFFE9] transition-all duration-300 space-y-4">
        <h3 className="text-sm font-bold text-white">
          Create New Client Budget Threshold Rule
        </h3>

        <form onSubmit={handleAddRule} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#BCF8EC] block mb-1.5">Client / Portfolio Name</label>
            <input
              type="text"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              placeholder="e.g. Brookfield Financial Towers"
              className="w-full bg-[#0B132B] border border-[#3A506B] text-white placeholder:text-[#BCF8EC]/50 text-xs rounded-lg p-2.5 focus:outline-none focus:border-[#6FFFE9]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#BCF8EC] block mb-1.5">GTA Zone</label>
            <select
              value={newZone}
              aria-label="Select GTA Zone for Budget Rule"
              onChange={(e) => setNewZone(e.target.value)}
              className="w-full bg-[#0B132B] border border-[#3A506B] text-white text-xs rounded-lg p-2.5 focus:outline-none focus:border-[#6FFFE9] cursor-pointer"
            >
              <option value="Mississauga">Mississauga West</option>
              <option value="Downtown Toronto">Downtown Toronto Core</option>
              <option value="Markham">Markham Tech Corridor</option>
              <option value="Vaughan">Vaughan Logistics</option>
              <option value="Brampton">Brampton</option>
              <option value="Etobicoke">Etobicoke</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#BCF8EC] block mb-1.5">Monthly Budget Cap (CAD $)</label>
            <input
              type="number"
              value={newThreshold}
              onChange={(e) => setNewThreshold(e.target.value)}
              className="w-full bg-[#0B132B] border border-[#3A506B] text-white text-xs rounded-lg p-2.5 focus:outline-none focus:border-[#6FFFE9]"
              min="100"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-[#6FFFE9] hover:bg-[#5be7d1] text-[#0B132B] font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(111,255,233,0.3)] transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#0B132B]" />
              <span>+ Add Budget Rule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
