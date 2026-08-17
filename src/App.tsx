import React, { useState } from 'react';
import { 
  MOCK_AZURE_RESOURCES, 
  INITIAL_ANOMALIES, 
  GTA_ZONE_SUMMARIES, 
  EQUIPMENT_SUMMARIES, 
  BUDGET_RULES 
} from './data/mockAzureHvacData';
import { AzureCostItem, AnomalyAlert, EquipmentCostSummary } from './types/cost-types';
import { CommandHeader } from './components/CommandHeader';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { AnomalyAlertCard } from './components/AnomalyAlertCard';
import { CostByEquipmentChart } from './components/CostByEquipmentChart';
import { ResourceBreakdownTable } from './components/ResourceBreakdownTable';
import { GtaSiteTelemetryMap } from './components/GtaSiteTelemetryMap';
import { FleetTelemetryView } from './components/FleetTelemetryView';
import { ThresholdAlertsView } from './components/ThresholdAlertsView';
import { OptimizationSimulator } from './components/OptimizationSimulator';
import { ExportReportsView } from './components/ExportReportsView';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { GtaHvacFooter } from './components/GtaHvacFooter';
import { Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);
  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>(INITIAL_ANOMALIES);
  const [resources, setResources] = useState<AzureCostItem[]>(MOCK_AZURE_RESOURCES);
  const [equipmentData, setEquipmentData] = useState<EquipmentCostSummary[]>(EQUIPMENT_SUMMARIES);
  const [selectedResourceModal, setSelectedResourceModal] = useState<AzureCostItem | null>(null);
  
  // Real-time simulated Azure sync state
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Today, 14:22 EST');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Financial calculations
  const totalSpentCad = resources.reduce((sum, res) => sum + res.costCadMtd, 0);
  const monthlyBudgetCad = 17500.00;
  
  // Compute projected close based on anomaly status
  const activeCriticalAnomaly = anomalies.find(a => a.severity === 'critical' && a.status === 'active');
  const anomalyProjectedImpact = activeCriticalAnomaly ? activeCriticalAnomaly.estimatedCostImpactCad * 14 : 0;
  const projectedCloseCad = 17200.00 + anomalyProjectedImpact;
  
  const totalMonitoredUnits = resources.reduce((sum, res) => sum + res.monitoredUnitsCount, 0);
  const avgCostPerUnitCad = totalMonitoredUnits > 0 ? totalSpentCad / totalMonitoredUnits : 4.18;

  // Filter resources by selected GTA zone
  const displayedResources = selectedZone === 'all' 
    ? resources 
    : resources.filter(r => r.gtaZone.toLowerCase().includes(selectedZone.toLowerCase()));

  // Trigger simulated Azure API Sync
  const handleTriggerSync = () => {
    setIsSyncing(true);
    showToast('Connecting to Azure Resource Manager API (Canada Central)...');
    
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' EST');
      showToast('✅ Azure Cost Management API data synchronized');
    }, 1000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle Anomaly Auto-Remediation
  const handleRemediateAnomaly = (anomalyId: string) => {
    setAnomalies(prev => prev.map(a => {
      if (a.id === anomalyId) {
        return {
          ...a,
          status: 'remediated',
          estimatedCostImpactCad: 0,
        };
      }
      return a;
    }));

    setResources(prev => prev.map(res => {
      if (res.id === 'res-01') {
        return {
          ...res,
          status: 'Optimal',
          statusDescription: 'Edge telemetry sampling throttled to 15s standard rate',
          costCadProjected: 3500.00,
          savingsPotentialCad: 0,
        };
      }
      return res;
    }));

    setEquipmentData(prev => prev.map(eq => {
      if (eq.category === 'Rooftop Units (RTUs)') {
        return {
          ...eq,
          deltaPercentVsLastMonth: 1.2,
          avgPingRateSec: 15,
        };
      }
      return eq;
    }));

    showToast('⚡ Device Twin patch applied: 48 RTU Modems reverted to 15s rate. Savings: +$145.20 CAD/day');
  };

  const handleAcknowledgeAnomaly = (anomalyId: string) => {
    setAnomalies(prev => prev.map(a => a.id === anomalyId ? { ...a, status: 'acknowledged' } : a));
    showToast('Alert acknowledged by technician.');
  };

  const handleSelectTag = (tag: string) => {
    if (selectedTagFilter === tag) {
      setSelectedTagFilter(null);
      showToast(`Cleared filter for ${tag}`);
    } else {
      setSelectedTagFilter(tag);
      showToast(`Filtered resources by: ${tag}`);
    }
  };

  const activeAnomalyCount = anomalies.filter(a => a.status === 'active').length;

  return (
    <>
      <style>{`body, html, #root { background-color: #1b1a19 !important; color: #f3f2f1 !important; margin: 0; padding: 0; width: 100vw; height: 100vh; overflow-x: hidden; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; }`}</style>
      
      <div className="flex min-h-[100dvh] min-w-[100vw] bg-[#1b1a19] text-[#f3f2f1] m-0 p-0 font-['Segoe_UI',-apple-system,BlinkMacSystemFont,Roboto,sans-serif] selection:bg-[#0078D4] selection:text-white">
        {/* Toast Notification Ticker */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-[#252423] border border-[#0078d4] text-[#c7e0f4] px-4 py-2.5 rounded shadow-2xl flex items-center gap-2.5 text-xs font-mono">
            <Sparkles className="w-4 h-4 text-[#00ccff] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* The Sidebar (Microsoft Azure Dark Slate) */}
        <div className="w-64 flex-shrink-0 h-screen bg-[#252423] border-r border-[#3b3a39] flex flex-col">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            activeAnomalyCount={activeAnomalyCount}
            selectedZone={selectedZone}
          />
        </div>

        {/* The Main Dashboard Area (Official Azure Dark Slate) */}
        <div className="flex-1 h-screen bg-[#1b1a19] p-8 overflow-y-auto flex flex-col space-y-6">
          {/* Top Command Header */}
          <CommandHeader
            totalSpentCad={totalSpentCad}
            projectedCloseCad={projectedCloseCad}
            monthlyBudgetCad={monthlyBudgetCad}
            monitoredUnits={totalMonitoredUnits}
            avgCostPerUnitCad={avgCostPerUnitCad}
            selectedZone={selectedZone}
            onSelectZone={setSelectedZone}
            zones={GTA_ZONE_SUMMARIES}
            isSyncing={isSyncing}
            onTriggerSync={handleTriggerSync}
            lastSyncTime={lastSyncTime}
            hasActiveAnomaly={activeCriticalAnomaly !== undefined}
            onQuickOptimize={() => setActiveTab('optimization')}
          />

          {/* Viewport Content */}
          <div className="w-full space-y-6 flex-1">
            {activeTab === 'dashboard' && (
              <div className="w-full space-y-6">
                {/* Top Dashboard Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full">
                  <div className="xl:col-span-8 w-full">
                    <CostByEquipmentChart
                      equipmentData={equipmentData}
                      onSelectTag={handleSelectTag}
                    />
                  </div>

                  <div className="xl:col-span-4 w-full">
                    <AnomalyAlertCard
                      anomalies={anomalies}
                      onRemediate={handleRemediateAnomaly}
                      onAcknowledge={handleAcknowledgeAnomaly}
                    />
                  </div>
                </div>

                {/* Service Breakdown & Utility Table */}
                <div className="w-full">
                  <ResourceBreakdownTable
                    resources={displayedResources}
                    onSelectResource={(res) => setSelectedResourceModal(res)}
                    selectedTagFilter={selectedTagFilter}
                  />
                </div>

                {/* GTA Regional Telemetry Nodes Map */}
                <div className="w-full">
                  <GtaSiteTelemetryMap
                    zones={GTA_ZONE_SUMMARIES}
                    selectedZone={selectedZone}
                    onSelectZone={setSelectedZone}
                  />
                </div>
              </div>
            )}

            {activeTab === 'fleet-telemetry' && (
              <div className="w-full">
                <FleetTelemetryView
                  equipmentData={equipmentData}
                />
              </div>
            )}

            {activeTab === 'alert-thresholds' && (
              <div className="w-full">
                <ThresholdAlertsView
                  initialRules={BUDGET_RULES}
                />
              </div>
            )}

            {activeTab === 'optimization' && (
              <div className="w-full">
                <OptimizationSimulator />
              </div>
            )}

            {activeTab === 'export-reports' && (
              <div className="w-full">
                <ExportReportsView
                  resources={resources}
                />
              </div>
            )}
          </div>

          {/* Custom Comprehensive GTA HVAC Footer (Dark Mode) */}
          <GtaHvacFooter />
        </div>

        {/* Resource Detail Modal */}
        <ResourceDetailModal
          resource={selectedResourceModal}
          onClose={() => setSelectedResourceModal(null)}
        />
      </div>
    </>
  );
}
