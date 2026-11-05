'use client';

import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Fuel,
  CheckCircle2,
  Trash2,
  TrendingDown,
  Wheat,
  Scale,
  Clock,
  ArrowRight,
  Stethoscope,
  Package,
  Truck,
  BarChart3
} from 'lucide-react';
import {
  PendingApprovalItem,
  FuelAndMaintenanceRecord,
  DailyRemittanceRecord,
  ProductionYieldRecord,
  FarmMedicalRecord,
  InventoryItem,
  AnimalProductionLedgerRow,
  VehicleCategoryLedgerRow
} from '@/types';
import { AnimalUnitsDashboard } from '@/components/farm/AnimalUnitsDashboard';
import { TransportUnitsDashboard } from '@/components/transport/TransportUnitsDashboard';

interface Level2SupervisorProps {
  quarantineRequests: PendingApprovalItem[];
  abnormalFuelLogs: FuelAndMaintenanceRecord[];
  remittanceArrears: DailyRemittanceRecord[];
  yields?: ProductionYieldRecord[];
  medicalLogs?: FarmMedicalRecord[];
  inventory?: InventoryItem[];
  ledgerRows?: AnimalProductionLedgerRow[];
  vehicleRows?: VehicleCategoryLedgerRow[];
  onRequestQuarantineDelete: (id: string, type: string) => void;
  onClearAnomalyFlag: (id: string) => void;
}

export const Level2SupervisorDesk: React.FC<Level2SupervisorProps> = ({
  quarantineRequests,
  abnormalFuelLogs,
  remittanceArrears,
  yields = [],
  medicalLogs = [],
  inventory = [],
  ledgerRows = [],
  vehicleRows = [],
  onRequestQuarantineDelete,
  onClearAnomalyFlag,
}) => {
  const [activeRollupTab, setActiveRollupTab] = React.useState<'FARM' | 'TRANSPORT'>('FARM');
  // Clinical alerts: sick animals, medicines given with withdrawal days, or deaths
  const clinicalAlerts = medicalLogs.filter(
    (m) => m.mortalityCount > 0 || (m.withdrawalPeriodDays && m.withdrawalPeriodDays > 0)
  );

  // Low stock in store
  const lowStockItems = inventory.filter((i) => i.currentStock <= i.reorderPoint);

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-2">
      
      {/* 1. SUPERVISOR HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white">
              Supervisor Station
            </span>
            <span className="text-xs text-amber-100">• Kabiru Sanusi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Supervisor Review & Daily Alerts
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-2xl font-medium leading-relaxed">
            Review everyday entries from field workers and drivers. Check fuel warnings, follow up on unpaid driver cash, check sick animals, and review delete requests.
          </p>
        </div>

        <div className="absolute right-6 bottom-3 opacity-15 text-8xl pointer-events-none font-black select-none">
          L2
        </div>
      </div>

      {/* 2. TOP CALM SUMMARY STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Fuel Alerts</div>
          <div className="text-2xl font-black text-rose-600 mt-2">{abnormalFuelLogs.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Vehicles using high fuel</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Unpaid Driver Debt</div>
          <div className="text-2xl font-black text-amber-600 mt-2">{remittanceArrears.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Drivers short on target</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Animal Health Alerts</div>
          <div className="text-2xl font-black text-rose-600 mt-2">{clinicalAlerts.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Sick or medicines given</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Items for Delete</div>
          <div className="text-2xl font-black text-purple-600 mt-2">{quarantineRequests.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Waiting for MD approval</p>
        </div>
      </div>

      {/* 3. TOTAL DASHBOARD & UNITS PERFORMANCE ROLL-UPS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 w-fit">
          <button
            type="button"
            onClick={() => setActiveRollupTab('FARM')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeRollupTab === 'FARM'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Wheat className="w-3.5 h-3.5 text-emerald-400" />
            <span>Livestock Units (A through F)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveRollupTab('TRANSPORT')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeRollupTab === 'TRANSPORT'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-blue-400" />
            <span>Fleet & Vehicles Performance (Buses, Trikes, Bikes)</span>
          </button>
        </div>

        {activeRollupTab === 'FARM' ? (
          <AnimalUnitsDashboard ledgerRows={ledgerRows || []} />
        ) : (
          <TransportUnitsDashboard vehicleRows={vehicleRows || []} />
        )}
      </div>

      {/* 4. FOUR ALERT CARDS WITH DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. High Fuel Usage Alerts */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Fuel className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">High Fuel Usage Alerts</h3>
                <p className="text-xs text-slate-500">Vehicles burning more fuel than expected</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              {abnormalFuelLogs.length} Flags
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {abnormalFuelLogs.length === 0 ? (
              <p className="py-6 text-center text-slate-400">All vehicle fuel consumption is normal today.</p>
            ) : (
              abnormalFuelLogs.map((log) => (
                <div key={log.id} className="py-3.5 space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">{log.vehiclePlate}</span>
                    <span className="text-rose-600 font-mono">{log.kmPerLiter} KM per Liter</span>
                  </div>
                  <p className="text-slate-600 text-xs">{log.details}</p>
                  <button
                    onClick={() => onClearAnomalyFlag(log.id)}
                    className="text-xs text-blue-700 hover:text-blue-900 font-bold pt-1 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Confirm & Mark as Checked</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 2. Driver Unpaid Daily Balances */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Short Driver Payments</h3>
                <p className="text-xs text-slate-500">Drivers who remitted less than their daily target</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {remittanceArrears.length} Drivers
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {remittanceArrears.length === 0 ? (
              <p className="py-6 text-center text-slate-400">All drivers met their targets today. Zero arrears.</p>
            ) : (
              remittanceArrears.map((remit) => (
                <div key={remit.id} className="py-3.5 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">{remit.driverName}</span>
                    <span className="text-rose-600 font-bold">Short by ₦{Math.abs(remit.deficitSurplus).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-500 text-xs">
                    Vehicle: {remit.plateNumber} • Target was: ₦{remit.targetAmount.toLocaleString()} • Paid: ₦{remit.remittedAmount.toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. Sick Animals & Medicine Withdrawal Period */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Animal Health & Medicines</h3>
                <p className="text-xs text-slate-500">Sick animals and withdrawal safety periods</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              {clinicalAlerts.length} Active
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {clinicalAlerts.length === 0 ? (
              <p className="py-6 text-center text-slate-400">All animals are healthy. No medicines or deaths today.</p>
            ) : (
              clinicalAlerts.map((med) => (
                <div key={med.id} className="py-3.5 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">{med.targetBatch}</span>
                    {med.withdrawalPeriodDays ? (
                      <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-[11px] font-bold">
                        Medicine Active ({med.withdrawalPeriodDays} days: Do Not Sell/Eat)
                      </span>
                    ) : (
                      <span className="text-rose-600 font-bold text-xs">
                        {med.mortalityCount} Deaths Recorded
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-xs">{med.diagnosisOrEvent} (Vet: {med.vetName})</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 4. Records Awaiting Delete Approval */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Pending Deletion Requests</h3>
                <p className="text-xs text-slate-500">Records held until approved by the General Manager</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              {quarantineRequests.length} Pending
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {quarantineRequests.length === 0 ? (
              <p className="py-6 text-center text-slate-400">No records waiting to be deleted.</p>
            ) : (
              quarantineRequests.map((req) => (
                <div key={req.id} className="py-3.5 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">{req.title}</span>
                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      Waiting for MD
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs">{req.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
