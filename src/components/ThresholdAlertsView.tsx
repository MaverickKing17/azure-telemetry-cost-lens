import React, { useState } from 'react';
import { 
  BellRing, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle,
  Mail,
  Smartphone,
  Webhook
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

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        return {
          ...r,
          status: r.status === 'active' ? 'warning' : 'active'
        };
      }
      return r;
    }));
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName) return;

    const newRule: BudgetThresholdRule = {
      id: `rule-${Date.now()}`,
      clientName: newClientName,
      gtaZone: newZone,
      equipmentType: newEquipmentType,
      monthlyBudgetCapCad: Number(newThreshold),
      currentSpendCad: 0,
      thresholdWarningPercent: 85,
      notifyEmails: ['dispatch@gtamechanical.ca'],
      notifyWebhook: 'https://hooks.slack.com/services/T00/B00/HVAC_ALERTS',
      autoThrottleOnBreach: true,
      status: 'active'
    };

    setRules(prev => [...prev, newRule]);
    setNewClientName('');
    setNewThreshold('3500');
  };

  return (
    <div className="space-y-6 w-full text-[#f3f2f1]">
      {/* Header */}
      <div className="bg-[#292827] border border-[#3b3a39] rounded-lg p-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-[#3b3a39] pb-5">
          <div className="p-2 rounded bg-[#0078D4]/20 border border-[#0078D4]/40 text-[#00ccff]">
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#f3f2f1] tracking-tight">
              Cost & Anomaly Threshold Rules Engine
            </h2>
            <p className="text-xs text-[#a19f9d] mt-0.5">
              Automated Azure Budget API triggers with SMS and email notifications for mechanical field managers
            </p>
          </div>
        </div>

        {/* Existing Rules List */}
        <div className="space-y-3 mt-6">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`p-4 rounded border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                rule.status === 'exceeded' 
                  ? 'bg-[#a80000]/15 border-[#a80000]/50' 
                  : rule.status === 'warning'
                  ? 'bg-[#ffaa00]/15 border-[#ffaa00]/40'
                  : 'bg-[#252423] border-[#3b3a39]'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#f3f2f1]">{rule.clientName}</span>
                  <span className="text-[10px] font-mono bg-[#1b1a19] text-[#f3f2f1] border border-[#3b3a39] px-2 py-0.5 rounded">
                    Zone: {rule.gtaZone}
                  </span>
                  <span className="text-[10px] font-mono bg-[#0078D4]/25 text-[#00ccff] border border-[#0078D4]/40 px-2 py-0.5 rounded font-medium">
                    {rule.equipmentType}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#a19f9d] font-mono">
                  <span>Current: <strong className="text-[#f3f2f1]">${rule.currentSpendCad.toFixed(2)} CAD</strong></span>
                  <span>•</span>
                  <span>Cap: <strong className="text-[#f3f2f1]">${rule.monthlyBudgetCapCad.toLocaleString()} CAD/mo</strong></span>
                  <span>•</span>
                  <span>Notify: {rule.notifyEmails.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded uppercase ${
                  rule.status === 'exceeded'
                    ? 'bg-[#a80000]/25 text-[#ff6b6b] border border-[#a80000]/50'
                    : rule.status === 'warning'
                    ? 'bg-[#ffaa00]/20 text-[#ffaa00] border border-[#ffaa00]/40'
                    : 'bg-[#107c10]/20 text-[#107c10] border border-[#107c10]/40'
                }`}>
                  {rule.status}
                </span>

                <button
                  onClick={() => toggleRule(rule.id)}
                  className="px-3 py-1.5 rounded text-xs font-semibold bg-[#323130] border border-[#3b3a39] hover:bg-[#3b3a39] text-[#f3f2f1] transition-colors cursor-pointer"
                >
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Rule Form */}
      <div className="bg-[#292827] border border-[#3b3a39] rounded-lg p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-semibold text-[#f3f2f1]">
          Create New Client Budget Threshold Rule
        </h3>

        <form onSubmit={handleAddRule} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#a19f9d] block mb-1">Client / Portfolio Name</label>
            <input
              type="text"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              placeholder="e.g. Oxford Properties Loop"
              className="w-full bg-[#252423] border border-[#3b3a39] text-[#f3f2f1] placeholder:text-[#a19f9d] text-xs rounded p-2 focus:outline-none focus:border-[#00ccff]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#a19f9d] block mb-1">GTA Zone</label>
            <select
              value={newZone}
              onChange={(e) => setNewZone(e.target.value)}
              className="w-full bg-[#252423] border border-[#3b3a39] text-[#f3f2f1] text-xs rounded p-2 focus:outline-none focus:border-[#00ccff]"
            >
              <option value="Mississauga">Mississauga West</option>
              <option value="Downtown Toronto">Downtown Toronto</option>
              <option value="Markham">Markham Tech Corridor</option>
              <option value="Vaughan">Vaughan Logistics</option>
              <option value="Brampton">Brampton</option>
              <option value="Etobicoke">Etobicoke</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#a19f9d] block mb-1">Monthly Budget Cap (CAD $)</label>
            <input
              type="number"
              value={newThreshold}
              onChange={(e) => setNewThreshold(e.target.value)}
              className="w-full bg-[#252423] border border-[#3b3a39] text-[#f3f2f1] text-xs rounded p-2 focus:outline-none focus:border-[#00ccff]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-[#0078D4] hover:bg-[#106EBE] text-white font-semibold py-2 px-4 rounded text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Budget Rule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
