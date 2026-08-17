# NexusHVAC — Azure Cloud FinOps & Ambient Twin Cost Ops Engine
### Greater Toronto Area (GTA) Commercial Mechanical & Telemetry Cost Command

[![Azure Resource Manager](https://img.shields.io/badge/Azure%20Region-Canada%20Central-0078D4?logo=microsoftazure&logoColor=white)](https://azure.microsoft.com)
[![Compliance](https://img.shields.io/badge/Compliance-TSSA%20%7C%20ODP%20Ready-059669)](https://www.tssa.org)
[![Currency](https://img.shields.io/badge/Currency-CAD%20($)-0284C7)](https://bankofcanada.ca)
[![UI Architecture](https://img.shields.io/badge/Theme-Hybrid%20SaaS%20High--Contrast-64748B)](#user-interface--design-system)

---

## 🌟 Executive Overview

**NexusHVAC Ambient Twin Cost Ops** is an enterprise-grade cloud cost management and IoT telemetry optimization platform specifically designed for **mechanical contractors, commercial building operators, and HVAC fleet engineers across the Greater Toronto Area (GTA)**.

By bridging physical HVAC assets (RTUs, Chillers, Hydronic Boilers, Cooling Towers, Variable Frequency Drives) with **Microsoft Azure (Canada Central Region)** telemetry services, NexusHVAC translates abstract Azure cloud billing line items (IoT Hub messages, Cosmos DB Request Units, Stream Analytics streaming units, and Blob hot/cold storage) into direct **per-unit mechanical operational cost benchmarks**.

---

## 🏙️ Greater Toronto Area (GTA) Sub-Fleet Coverage

NexusHVAC manages telemetry streams across **85 commercial mechanical facilities** distributed throughout the GTA:

| GTA Regional Zone | Monitored Facilities | Active Mechanical Units | Primary Equipment Mix |
| :--- | :--- | :--- | :--- |
| **Downtown Core / Bay St.** | 28 High-Rise Towers | 840 Units | York/Trane Centrifugal Chillers, VAV Air Handlers, Cooling Towers |
| **Peel Region (Mississauga & Brampton)** | 22 Logistics Hubs | 680 Units | 25–50 Ton Carrier & Daikin Packaged RTUs, Makeup Air Units |
| **York Region (Vaughan & Markham)** | 19 Tech Campuses | 520 Units | High-Efficiency VRF Systems, Data Room CRAC Units, Hydronic Boilers |
| **Halton & Durham Sectors** | 16 Industrial Plants | 410 Units | Process Chillers, Cleaver-Brooks Boilers, Ammonia Refrigeration |

---

## ⚡ Core Platform Capabilities

### 1. 📊 Real-Time Azure Cost Attribution
* **Physical Tag Mapping**: Attenuates Azure Resource IDs to mechanical equipment tags (e.g., `rtu-packaged-units`, `centrifugal-chillers`, `hydronic-boilers`, `cooling-towers`).
* **CAD ($) Normalization**: Real-time conversion and projection against monthly budgets ($17,500.00 CAD baseline).
* **Per-Unit Unit Economics**: Tracks the exact cloud cost per physical HVAC unit/month (benchmark target: `< $4.50 CAD/unit/mo`).

### 2. 🚨 Anomaly Detection & One-Click IoT Device Twin Remediation
* **Polling Rate Runaway Detection**: Automatically identifies unthrottled IoT Edge gateways streaming at excessive 1-second rates instead of the standard 15-second SLA.
* **Instant Cloud Cost Impact**: Computes live runaway burn rates (e.g., `+$145.20 CAD/day`).
* **Direct Patching**: One-click Device Twin desired properties patch to throttle sample frequency back to 15s without interrupting BACnet/IP communications.

### 3. 🧪 Telemetry Cost Optimization Simulator
* Interactive slider simulations testing the financial trade-offs between:
  * Edge Telemetry Ingestion Frequency (1s – 60s)
  * Azure Cosmos DB Hot Diagnostic Retention TTL (14d – 365d)
  * Azure Stream Analytics Streaming Units (1 – 12 SUs)
  * Azure Storage Hot/Cool/Archive Tiering Automation

### 4. 📋 TSSA & ODP Compliance Reporting
* Export audit-ready datasets and CSV reports formatted for GTA Property Managers, ESG Carbon Accounting, and Ontario Technical Standards and Safety Authority (TSSA) environmental compliance logs.

---

## 🎨 User Interface & Design System (Hybrid SaaS Theme)

NexusHVAC utilizes a **Hybrid SaaS High-Contrast Aesthetic** specifically optimized for mechanical engineers and technicians operating in bright plant rooms, field trailers, and modern operations centers:

* **Dark Navigation Anchor**: Deep slate sidebar (`bg-slate-900 text-white`) providing grounding and clear orientation.
* **Industrial Clean Canvas**: `#F1F5F9` light background delivering high contrast and zero eye fatigue.
* **White Card Containers**: `bg-white` panels with crisp `border-slate-200` and subtle elevation.
* **High-Legibility Alerts**: Soft red alert container (`bg-red-50 border-red-200`) with dark red typography (`text-red-950`).
* **GTA HVAC Operational Footer**: Real-time status indicators confirming Canada Central Azure connection, TSSA compliance, and local Toronto ON support availability.

---

## 🛠️ Technology Stack

* **Frontend**: React 18 with TypeScript & Vite
* **Styling**: Tailwind CSS with custom Hybrid SaaS tokens
* **Icons**: Lucide React
* **Cloud Targets**: Microsoft Azure (IoT Hub, Cosmos DB, Azure Stream Analytics, Azure Blob Storage, Azure Cost Management API)
* **Region**: Azure Canada Central (Toronto DC)

---

## 🚀 Getting Started

### Installation

```bash
# Clone repository
git clone https://github.com/ambientops/nexushvac-azure-costops.git

# Install dependencies
npm install

# Run development command center
npm run dev
```

### Production Build

```bash
npm run build
```

---

## 📄 Compliance & Licensing

* **TSSA Ready**: Certified data retention formats for Ontario Boilers and Pressure Vessels regulation.
* **ODP Standards**: Refrigerant leak detection and continuous telemetry logging SLA verification.
* Built for mechanical contractors and building operations teams across Southern Ontario.
