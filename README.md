# NJIPP KONSULT LTD — Enterprise Management System (EMS)
## Integrated Farm ERP, Transport & Fleet Operations, and Strategic Ventures

A unified enterprise management system engineered for **NJIPP KONSULT LTD**, featuring:
- **Integrated Farm Operations**: Poultry (Layers & Broilers), Sheep, Goats, Cattle, Feeding with automatic warehouse stock deduction, and Veterinary medical records.
- **Transport & Logistics Services**: Commercial Motorcycles, Buses, and Trikes; Driver Biodata with verified guarantors, fuel logs, daily remittance reconciliation, and present asset market valuations.
- **Strict 3-Tier RBAC & Governance**:
  - `Level 1`: Entry Only (Farm hands, Yard clerks, Operators).
  - `Level 2`: Supervision (Audit visibility, Soft-delete requests into quarantine hold).
  - `Level 3`: Executive / Managing Director (Sole authority for debt assumption, capital purchase orders, and permanent record purges).
- **Future Ventures Architecture**: Modular plug-and-play modules for Viewing Centre, Cash Crops Production, Table Water Factory, and Tree Planting / Agroforestry.

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v18.17.0 or later (v20+ recommended)
- **npm**: v9+

### 2. Running Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## Project Structure

```
├── PROJECT_BLUEPRINT.md            # Master PM & Lead Engineer architectural blueprint
├── UI_UX_DESIGN_SPECIFICATION.md   # Design system tokens, role-adaptive UX & layout
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML & body wrapper
│   │   ├── page.tsx                # Central stateful app engine with 3-tier RBAC
│   │   └── globals.css             # Obsidian theme, typography & glassmorphism
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Executive top bar, search, role switcher, live clock
│   │   │   └── Sidebar.tsx         # Navigation rail, permission badges
│   │   ├── dashboard/
│   │   │   └── ExecutiveCockpit.tsx# Consolidated KPI cards, cross-venture radar
│   │   ├── farm/
│   │   │   └── FarmManagement.tsx  # 4 livestock divisions, feed logger, vet care, stock ledger
│   │   ├── transport/
│   │   │   └── TransportFleet.tsx  # 3 vehicle classes, valuations, driver biodata, remittances
│   │   ├── governance/
│   │   │   └── ApprovalsAndDebtHub.tsx # Level 3 approval gate, debt ledger, audit trail
│   │   ├── ventures/
│   │   │   └── FutureVentures.tsx  # Viewing centre, cash crops, water factory, tree planting
│   │   └── modals/
│   │       └── ActionModals.tsx    # Feed log modal, remittance modal, medical modal, requisition modal
│   ├── lib/
│   │   └── initialData.ts          # Operational datasets & baseline records
│   └── types/
│       └── index.ts                # TypeScript domain models
```

---

## 3-Tier Governance Matrix

| Role | Operational Scope | Delete Permission | Financial & Debt Approval |
| :--- | :--- | :--- | :--- |
| **Level 1 (Entry)** | Record daily feeding, remittances, medical notes | ⛔ Denied | ⛔ Denied |
| **Level 2 (Supervisor)** | Monitor all unit entries, flag discrepancies | ⚠️ Request Soft-Delete (Requires L3 Quarantine Sign-off) | ⛔ Denied |
| **Level 3 (Executive / MD)** | Executive command, full audit, P&L reporting | ✅ Permitted (Immutable Audit Hash logged) | ✅ Exclusive Sole Authority |

---
*Built for NJIPP KONSULT LTD.*
