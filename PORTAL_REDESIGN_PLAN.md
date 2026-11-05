# NJIPP KONSULT LTD — Enterprise Portal Redesign & Architectural Plan
**Author:** Lead Software Engineer & Principal Enterprise Architect  
**Document Version:** 2.0.0  
**Project:** NJIPP KONSULT LTD Enterprise Portal  

---

## 1. Executive Diagnosis: Dashboard vs. Enterprise Portal

### The Critical Architectural Shift:
* **The Problem:** The initial interface was formatted as an aggregated single-page dashboard with small metric cards competing for attention.
* **The Solution (Enterprise Portal):** An enterprise portal functions as an operational workspace partitioned into **distinct, full-fledged departmental portals**:
  1. 🌾 **Farm Operations Portal**: Livestock Herd Registry, Feeding & Ration Station, Veterinary Clinic Desk, Farm Inventory & Movement, Farm Expenses.
  2. 🚚 **Transport & Fleet Portal**: Fleet Asset Valuation Desk, Driver Biodata Hub, Daily Remittance Cashier Station, Fuel & Workshop Tickets.
  3. 🛡️ **Executive Governance & Approvals Portal**: Purchase Requisitions, Company Debt Commitments, Deletion Quarantine Vault, Permanent Audit Ledger.
  4. 🚀 **Future Strategic Ventures Portal**: Viewing Centre, Cash Crops Agronomy, Table Water Factory, Tree Planting.

---

## 2. Visual Overhaul: High-Contrast Modern Light Theme

We are replacing the dark aesthetic with a **Stripe / Linear / Apple-grade enterprise light design system**:

### Visual Design Tokens:
* **Base Canvas Background**: `#F8FAFC` (Slate 50) — clean, glare-free, distraction-free neutral canvas.
* **Worksurface & Table Panels**: `#FFFFFF` (Pure Crisp White) with refined `#E2E8F0` (Slate 200) borders.
* **Shadow Elevation**: Soft, clean micro-shadows (`box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.02)`).
* **Typography & Text Contrast**:
  * Primary Body & Headings: `#0F172A` (Slate 900) & `#334155` (Slate 700) for maximum legibility.
  * Muted Metadata: `#64748B` (Slate 500).
  * Monospaced Numbers: `JetBrains Mono` for currency amounts (`₦`), tag numbers, and license plates.
* **Brand Accents**:
  * **NJIPP Forest Emerald** (`#059669` / `#047857`): Farm division indicators, cleared remittances, success states.
  * **Transit Navy** (`#1E3A8A` / `#1E293B`): Transport division headers, fleet asset badges.
  * **Safety Amber** (`#D97706`): Arrears, fuel alerts, supervisor soft-delete notices.
  * **Fiscal Crimson** (`#DC2626`): Debt liabilities, mortality, permanent purge buttons.
  * **Royal Executive Indigo** (`#4F46E5`): Level 3 governance approval gates and board authorizations.

---

## 3. Structural Re-Architecture: Multi-Portal Navigation Shell

```
+---------------------------------------------------------------------------------------------------------+
|  [NJIPP KONSULT LTD]  |  PORTAL SWITCHER:  [🌾 Farm Portal]  [🚚 Transport Portal]  [🛡️ Governance]      |
|  Global Search (⌘K)   |  Active User: [Level 1 | Level 2 | Level 3] | 🔔 Approvals (3) | Avatar        |
+-----------------------+---------------------------------------------------------------------------------+
| CONTEXTUAL SIDEBAR    | DEPARTMENTAL WORKSPACE CANVAS                                                   |
| (Morphs per portal)   |                                                                                 |
|                       | • Breadcrumbs: NJIPP Portal > Farm Operations > Feeding & Stock Deduction       |
| • Department Desks    | • Department Action Ribbon (+ New Entry, Export Excel, Filter by Section)       |
| • Operational Desks   | • Deep Operational Data Tables (Spacious, full width, high contrast)            |
| • Sub-unit Navigation | • Slide-out Inspection Drawers & Audit Trails                                   |
+-----------------------+---------------------------------------------------------------------------------+
```

---

## 4. Departmental Sub-Portals Detailed Breakdown

### 4.1 Farm Operations Portal (`Farm Portal`)
Organized into 5 dedicated desks:
1. **Livestock Herd Registry**:
   * Granular section desks: **Poultry (3,500 birds)**, **Sheep (420 head)**, **Goats (680 head)**, and **Cattle (260 head)**.
   * Batch details: Pen/Paddock location, breed variety, arrival date, daily egg crates / milk yield.
2. **Feeding & Ration Desk**:
   * Daily feeding log with live automatic subtraction from central warehouse inventory.
3. **Veterinary & Clinical Station**:
   * Disease diagnoses, vaccination boosters (Newcastle, Gumboro), deworming cycles, mortality audits, and vet doctor sign-offs.
4. **Farm Inventory & Stock Movements**:
   * Stock In / Stock Out ledger (Feeds, Drugs, Crates, Tools) with Low Stock Trigger alerts.
5. **Farm Expenses Ledger**:
   * Direct operational expenditures: feed purchases, wages, facility repairs, vet bills.

---

### 4.2 Transport & Fleet Portal (`Transport Portal`)
Organized into 4 dedicated desks:
1. **Fleet Asset Registry & Market Valuation Desk**:
   * Categorized by **Motorcycles (18)**, **Commercial Buses (8)**, and **Tricycles / Trikes (12)**.
   * Depreciation schedules (12% to 18% p.a.) showing original purchase cost vs. current fair market value.
2. **Driver Compliance & Biodata Hub**:
   * Driver dossiers: Contact info, license class & expiry countdown.
   * Two verified guarantors with contact details.
   * Hire-purchase debt balances.
3. **Daily Remittance & Cashier Station**:
   * High-speed cashier input for driver daily returns.
   * Target vs. Actual Remittance = Deficit/Arrears calculation.
   * Cash, Bank Transfer, and POS payment modes.
4. **Fuel & Workshop Maintenance Desk**:
   * Fuel dispensing logs with KM mileage and fuel efficiency (KM/L).
   * Workshop servicing tickets and spare parts costs.

---

### 4.3 Executive Governance & Approval Portal (`Governance Portal`)
*Exclusively governed by Level 3 authority:*
1. **Purchase Requisitions Desk**:
   * Operational purchase orders drafted by Level 1/2 staff.
   * Level 3 executive sign-off queue.
2. **Company Debt & Liabilities Console**:
   * **Sole Level 3 Gate**: Sanctioning company debt (e.g. Simba TVS Tricycle hire-purchase debt).
   * Creditor repayment tracking and liability terms.
3. **Two-Person Deletion Quarantine Vault**:
   * Level 1: Delete buttons strictly hidden/disabled.
   * Level 2: Supervisor submits Soft-Delete request with mandatory written justification.
   * Level 3: Evaluates the quarantine queue to permanently purge or restore records.
4. **Permanent Cryptographic Audit Ledger**:
   * Filterable, unalterable log with SHA-256 transaction hashes.

---

### 4.4 Future Strategic Ventures Portal (`Ventures Portal`)
Dedicated sub-portals for upcoming commercial ventures:
1. **Viewing Centre Desk**: Electronic ticketing gate, match fixture schedule, concession sales till.
2. **Cash Crops Agronomy Desk**: 50 hectares plot zoning, planting cycles, harvest silos.
3. **Table Water Factory Desk**: Batch QC (pH/TDS), sachet/bottle packaging, wholesale dispatch.
4. **Tree Planting & Agroforestry Desk**: 10,000 nursery seedlings, GPS plots, standing timber asset valuation.

---

## 5. Execution Steps

1. **Step 1:** Rewrite `src/app/globals.css` with clean, modern light theme tokens (`#F8FAFC`, `#FFFFFF`, `#E2E8F0`, `#0F172A`).
2. **Step 2:** Refactor the top navigation into a **Portal Switcher Shell** (`Farm Portal`, `Transport Portal`, `Governance Portal`, `Ventures Portal`).
3. **Step 3:** Implement context-aware sidebars that adapt dynamically to the active portal's operational desks.
4. **Step 4:** Rebuild the main content areas into spacious, full-width operational desks with clean data tables, search filters, and action trays.
5. **Step 5:** Verify compilation and hot-reload live on `http://localhost:3000`.
