import React, { useState } from 'react';
import { 
  BellRing, 
  Plus, 
  Trash2, 
  Mail, 
  Webhook, 
  Zap
} from 'lucide-react';
import { BudgetThresholdRule } from '../types/cost-types';

interface ThresholdAlertsViewProps {
  initialRules: BudgetThresholdRule[];
}

export const ThresholdAlertsView: React.FC<ThresholdAlertsViewProps> = ({
  initialRules,
}) => {
  const [rules, setRules] = useState<BudgetThresholdRule[]>(initialRules);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newZone, setNewZone] = useState('Mississauga');
  const [newEquipment, setNewEquipment] = useState('Rooftop Units (RTUs)');
  const [newBudget, setNewBudget] = useState(2500);
  const [newEmail, setNewEmail] = useState('dispatch@gtamechanical.ca');
  const [newThrottle, setNewThrottle] = useState(true);

  const handleToggleThrottle = (ruleId: string) => {
    setRules(rules.map(r => r.id === ruleId ? { ...r, autoThrottleOnBreach: !r.autoThrottleOnBreach } : r));
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(r => r.id !== ruleId));
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName) return;

    const newRule: BudgetThresholdRule = {
      id: `rule-${Date.now()}`,
      clientName: newClientName,
      gtaZone: newZone,
      equipmentType: newEquipment,
      monthlyBudgetCapCad: Number(newBudget),
      currentSpendCad: 0,
      thresholdWarningPercent: 85,
      notifyEmails: [newEmail],
      notifyWebhook: 'https://hooks.slack.com/services/T00/HVAC',
      autoThrottleOnBreach: newThrottle,
      status: 'active',
    };

    setRules([newRule, ...rules]);
    setShowAddModal(false);
    setNewClientName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#11141C] border border-slate-800 rounded-xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Automated Cloud Guardrails
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
              Azure Anomaly Protection
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1">
            Budget Thresholds & Client SLA Spending Guardrails
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure automated spending limits, on-call alert webhooks, and auto-throttling to prevent bill shock.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F17] font-bold text-xs tracking-wide uppercase transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)] flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Budget Guardrail</span>
        </button>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => {
          const percentUsed = Math.min(100, Math.round((rule.currentSpendCad / rule.monthlyBudgetCapCad) * 100));
          const isWarning = percentUsed >= rule.thresholdWarningPercent;
          const isExceeded = rule.currentSpendCad >= rule.monthlyBudgetCapCad;

          return (
            <div
              key={rule.id}
              className={`bg-[#11141C] border rounded-xl p-5 relative overflow-hidden transition-all ${
                isExceeded
                  ? 'border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                  : isWarning
                    ? 'border-amber-500/30'
                    : 'border-slate-800'
              }`}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <div className="text-sm font-bold text-white">
                    {rule.clientName}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    📍 {rule.gtaZone} • <span className="text-cyan-400">{rule.equipmentType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                    isExceeded
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : isWarning
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    {isExceeded ? 'EXCEEDED' : isWarning ? 'WARNING' : 'ACTIVE'}
                  </span>
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors"
                    title="Delete rule"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Spend Meter */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Current Monthly Spend:</span>
                  <span className="text-white font-bold">
                    ${rule.currentSpendCad.toFixed(2)} / ${rule.monthlyBudgetCapCad.toFixed(2)} CAD
                  </span>
                </div>
                <div className="w-full h-2 bg-[#0B0F17] rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isExceeded
                        ? 'bg-red-500'
                        : isWarning
                          ? 'bg-amber-400'
                          : 'bg-cyan-500'
                    }`}
                    style={{ width: `${percentUsed}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Trigger Alert at {rule.thresholdWarningPercent}%</span>
                  <span>{percentUsed}% Consumed</span>
                </div>
              </div>

              {/* Routing */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    Alert Emails:
                  </span>
                  <span className="text-slate-300 truncate max-w-[180px]">{rule.notifyEmails.join(', ')}</span>
                </div>

                {rule.notifyWebhook && (
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Webhook className="w-3.5 h-3.5 text-indigo-400" />
                      Dispatch Webhook:
                    </span>
                    <span className="text-cyan-400 truncate max-w-[180px]">Active Webhook</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Auto-Throttle on Breach:
                  </span>
                  <button
                    onClick={() => handleToggleThrottle(rule.id)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      rule.autoThrottleOnBreach
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {rule.autoThrottleOnBreach ? 'ENABLED (30s)' : 'DISABLED'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#11141C] border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Create New Budget Guardrail</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRule} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Client Contract Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brookfield Place Tower B"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-[#0B0F17] text-white p-2.5 rounded-lg border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">GTA Service Zone:</label>
                  <select
                    value={newZone}
                    onChange={(e) => setNewZone(e.target.value)}
                    className="w-full bg-[#0B0F17] text-white p-2.5 rounded-lg border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  >
                    <option>Mississauga</option>
                    <option>Downtown Toronto</option>
                    <option>Markham</option>
                    <option>Vaughan</option>
                    <option>Brampton</option>
                    <option>Etobicoke</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Monthly Cap (CAD):</label>
                  <input
                    type="number"
                    min="100"
                    max="50000"
                    value={newBudget}
                    onChange={(e) => setNewBudget(Number(e.target.value))}
                    className="w-full bg-[#0B0F17] text-white p-2.5 rounded-lg border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Alert Email:</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-[#0B0F17] text-white p-2.5 rounded-lg border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="throttleCheck"
                  checked={newThrottle}
                  onChange={(e) => setNewThrottle(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="throttleCheck" className="text-slate-300 cursor-pointer">
                  Auto-throttle edge sensors to 30s frequency upon budget breach
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B0F17] font-bold cursor-pointer"
                >
                  Save Guardrail
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
