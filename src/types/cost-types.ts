export interface AzureCostItem {
  id: string;
  resourceId: string;
  resourceName: string;
  azureServiceType: string;
  resourceGroup: string;
  azureMeterCategory: string;
  hvacBusinessPurpose: string;
  equipmentTag: string;
  equipmentCategory: 'Rooftop Units (RTUs)' | 'Water-Cooled Chillers' | 'Commercial Boilers' | 'Air Handling Units' | 'VRF Heat Recovery' | 'Centrifugal Pumps' | 'Chillers' | 'VRF Systems' | 'Air Handling Units (AHUs)' | 'Pumping Systems' | string;
  gtaZone: 'Mississauga' | 'Downtown Toronto' | 'Markham' | 'Vaughan' | 'Brampton' | 'Etobicoke' | string;
  clientPortfolio: string;
  monitoredUnitsCount: number;
  costCadMtd: number;
  costCadProjected: number;
  costCadLastMonth: number;
  costPerUnitCad: number;
  dataIngressGb: number;
  dataEgressGb: number;
  status: 'Optimal' | 'Spike Warning' | 'Tiering Candidate' | 'Over-provisioned';
  statusDescription: string;
  savingsPotentialCad: number;
  pricingModel: string;
  rawAzureTelemetryJson?: Record<string, any>;
}

export interface AnomalyAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  affectedService: string;
  equipmentScope: string;
  gtaLocation: string;
  spikePercentage: number;
  estimatedCostImpactCad: number;
  detectedAt: string;
  rootCause: string;
  technicalDetails: string;
  recommendedAction: string;
  remediationAvailable: boolean;
  remediationPayload?: {
    actionType: 'throttle_sampling' | 'blob_cool_tier' | 'cosmos_scale_ru' | 'disable_debug_logs';
    savingsPerDayCad: number;
    sensorUnitsAffected: number;
  };
  status: 'active' | 'remediated' | 'acknowledged';
}

export interface GtaZoneSummary {
  zoneId: 'all' | 'mississauga' | 'downtown' | 'markham' | 'vaughan' | 'brampton' | 'etobicoke';
  name: string;
  shortName: string;
  coordinates: { lat: number; lng: number };
  activeHvacUnits: number;
  clientCount: number;
  costCadMtd: number;
  budgetCapCad: number;
  avgCostPerUnitCad: number;
  topEquipmentType: string;
  status: 'normal' | 'warning' | 'critical';
  sensorPingsToday: string;
}

export interface EquipmentCostSummary {
  category: 'Rooftop Units (RTUs)' | 'Water-Cooled Chillers' | 'Commercial Boilers' | 'VRF Heat Recovery' | 'Air Handling Units' | 'Centrifugal Pumps';
  equipmentTag: string;
  unitCount: number;
  totalCostCad: number;
  budgetCostCad: number;
  costPerUnitCad: number;
  avgPingRateSec: number;
  monthlyTelemetryGb: number;
  primaryAzureService: string;
  deltaPercentVsLastMonth: number;
  gtaLocations: string[];
}

export interface BudgetThresholdRule {
  id: string;
  clientName: string;
  gtaZone: string;
  equipmentType: string;
  monthlyBudgetCapCad: number;
  currentSpendCad: number;
  thresholdWarningPercent: number;
  notifyEmails: string[];
  notifyWebhook: string;
  autoThrottleOnBreach: boolean;
  status: 'active' | 'warning' | 'exceeded';
}
