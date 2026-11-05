'use client';

import React, { useState } from 'react';
import {
  UserRoleLevel,
  FleetVehicle,
  DailyRemittanceRecord,
  FuelAndMaintenanceRecord,
  VehicleType
} from '@/types';
import {
  Truck,
  Plus,
  Coins,
  Fuel,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  TrendingDown,
  Phone,
  FileBadge,
  AlertOctagon,
  FileCheck2
} from 'lucide-react';

interface TransportPortalWorkspaceProps {
  subDesk: string;
  currentRole: UserRoleLevel;
  fleet: FleetVehicle[];
  remittances: DailyRemittanceRecord[];
  fuelLogs: FuelAndMaintenanceRecord[];
  onOpenRemittanceModal: () => void;
  onOpenFuelMaintenanceModal: () => void;
  onDeleteRecord: (id: string, type: string) => void;
  onSubDeskChange: (desk: string) => void;
}

export const TransportPortalWorkspace: React.FC<TransportPortalWorkspaceProps> = ({
  subDesk,
  currentRole,
  fleet,
  remittances,
  fuelLogs,
  onOpenRemittanceModal,
  onOpenFuelMaintenanceModal,
  onDeleteRecord,
  onSubDeskChange,
}) => {
  const [vehicleFilter, setVehicleFilter] = useState<VehicleType | 'ALL'>('ALL');

  const filteredFleet = vehicleFilter === 'ALL'
    ? fleet
    : fleet.filter((v) => v.type === vehicleFilter);

  const totalMarketValuation = fleet.reduce((acc, curr) => acc + curr.presentMarketValue, 0);
  const totalRemitted = remittances.reduce((acc, curr) => acc + curr.remittedAmount, 0);
  const totalTarget = remittances.reduce((acc, curr) => acc + curr.targetAmount, 0);
  const totalArrears = Math.max(0, totalTarget - totalRemitted);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* DEPARTMENT HEADER & ACTION RIBBON */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>NJIPP Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-blue-800 font-semibold">Division 2: Fleet & Transport Logistics</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 capitalize">
              {subDesk.replace('transport_', '').replace('_', ' ')} Desk
            </span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Fleet & Transport Logistics System</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-bold font-mono">
              Motorcycles • Buses • Trikes
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Market depreciation tracking, driver biodata & NIN verification, trip returns, and fuel-mileage cross-checking.
          </p>
        </div>

        {/* PRIMARY ACTIONS */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={onOpenRemittanceModal}
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Log Daily Remittance</span>
          </button>
          <button
            onClick={onOpenFuelMaintenanceModal}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 border border-slate-300 shadow-sm transition-all"
          >
            <Fuel className="w-4 h-4 text-amber-600" />
            <span>Fuel / Workshop Ticket</span>
          </button>
        </div>
      </div>

      {/* ================= DESK 1: FLEET OVERVIEW ================= */}
      {subDesk === 'transport_overview' && (
        <div className="space-y-6">
          {/* 3 VEHICLE ASSET VALUATION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Motorcycles */}
            <div
              onClick={() => onSubDeskChange('transport_valuation')}
              className="portal-card-interactive p-5 rounded-2xl cursor-pointer border-t-4 border-t-emerald-600"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                  <span className="text-xl">🏍️</span> Commercial Motorcycles
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold font-mono">
                  18 Units
                </span>
              </div>
              <div className="mt-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Present Market Value:</span>
                  <span className="font-mono-num font-black text-slate-900 text-base">₦14,400,000</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Daily Target:</span>
                  <span className="font-mono-num font-semibold text-slate-700">₦6,000 / day</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Fuel Efficiency:</span>
                  <span className="text-emerald-700 font-bold font-mono">34.5 KM / L</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[11px]">
                <span className="text-slate-500">17 Active • 1 Service</span>
                <span className="text-emerald-700 font-bold">100% Remitted</span>
              </div>
            </div>

            {/* Commercial Buses */}
            <div
              onClick={() => onSubDeskChange('transport_valuation')}
              className="portal-card-interactive p-5 rounded-2xl cursor-pointer border-t-4 border-t-blue-600"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                  <span className="text-xl">🚌</span> Commercial Transit Buses
                </span>
                <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-bold font-mono">
                  8 Units
                </span>
              </div>
              <div className="mt-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Present Market Value:</span>
                  <span className="font-mono-num font-black text-slate-900 text-base">₦41,600,000</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Daily Target:</span>
                  <span className="font-mono-num font-semibold text-slate-700">₦20,000 / day</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Fuel Efficiency:</span>
                  <span className="font-mono-num text-slate-700 font-bold">8.4 KM / L</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[11px]">
                <span className="text-slate-500">All 8 Active On Routes</span>
                <span className="text-blue-700 font-bold">Cleared</span>
              </div>
            </div>

            {/* Tricycles / Trikes */}
            <div
              onClick={() => onSubDeskChange('transport_valuation')}
              className="portal-card-interactive p-5 rounded-2xl cursor-pointer border-t-4 border-t-amber-500"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                  <span className="text-xl">🛺</span> Tricycles (Trikes)
                </span>
                <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-bold font-mono">
                  12 Units
                </span>
              </div>
              <div className="mt-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Present Market Value:</span>
                  <span className="font-mono-num font-black text-slate-900 text-base">₦12,450,000</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Hire-Purchase Debt:</span>
                  <span className="font-mono-num font-bold text-rose-600">₦3,850,000</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Fuel Efficiency:</span>
                  <span className="font-mono-num text-slate-700 font-bold">18.2 KM / L</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[11px]">
                <span className="text-slate-500">12 Active Units</span>
                <span className="text-amber-700 font-bold">⚠️ ₦3k Arrears Today</span>
              </div>
            </div>

          </div>

          {/* CASHIER SUMMARY & RECENT REMITTANCES */}
          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Today's Collections & Remittances</h3>
                <p className="text-xs text-slate-500">Cash, bank transfers, and POS collections</p>
              </div>
              <button
                onClick={() => onSubDeskChange('transport_remittance')}
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                Open Cashier Remittance Desk →
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {remittances.map((remit) => (
                <div key={remit.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 font-mono font-bold text-xs">
                      {remit.plateNumber}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{remit.driverName}</div>
                      <div className="text-slate-500 text-[11px]">
                        Target: ₦{remit.targetAmount.toLocaleString()} • Paid via {remit.paymentMethod}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono-num font-black text-slate-900 text-sm">
                      ₦{remit.remittedAmount.toLocaleString()}
                    </div>
                    {remit.deficitSurplus < 0 ? (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                        Deficit: -₦{Math.abs(remit.deficitSurplus).toLocaleString()} Arrears
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Full Remittance Cleared
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= DESK 2: FLEET VALUATION & REGISTRY ================= */}
      {subDesk === 'transport_valuation' && (
        <div className="space-y-4">
          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Fleet Asset Register & Market Tracker</h3>
                <p className="text-xs text-slate-500">
                  Engine numbers, chassis IDs, acquisition dates, and real-time market value engine.
                </p>
              </div>
              <div className="text-xs text-slate-700 font-mono font-bold bg-white border px-3 py-1 rounded-lg">
                Total Fleet Value: ₦{totalMarketValuation.toLocaleString()}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 font-bold">Plate / Type</th>
                    <th className="px-5 py-3.5 font-bold">Engine #</th>
                    <th className="px-5 py-3.5 font-bold">Chassis ID</th>
                    <th className="px-5 py-3.5 font-bold">Purchase (Year)</th>
                    <th className="px-5 py-3.5 font-bold">Mileage</th>
                    <th className="px-5 py-3.5 font-bold">Depreciation</th>
                    <th className="px-5 py-3.5 font-bold">Market Valuation</th>
                    <th className="px-5 py-3.5 font-bold">Driver Assigned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFleet.map((veh) => (
                    <tr key={veh.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-slate-900">
                        {veh.plateNumber}
                        <span className="block text-[10px] text-slate-500 font-sans font-normal">{veh.type}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-600 font-mono text-[11px]">{veh.engineNumber || 'N/A'}</td>
                      <td className="px-5 py-4 text-slate-500 font-mono text-[11px]">{veh.chassisNumber}</td>
                      <td className="px-5 py-4 font-mono-num text-slate-700">
                        ₦{veh.purchasePrice.toLocaleString()} ({veh.purchaseYear})
                      </td>
                      <td className="px-5 py-4 font-mono-num text-slate-700 font-bold">
                        {veh.currentMileageKm.toLocaleString()} KM
                      </td>
                      <td className="px-5 py-4 font-mono-num text-slate-500">
                        {(veh.depreciationRateAnnual * 100).toFixed(0)}% p.a.
                      </td>
                      <td className="px-5 py-4 font-mono-num font-black text-emerald-700 text-sm">
                        ₦{veh.presentMarketValue.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-900">{veh.driver.fullName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= DESK 3: DRIVER DIRECTORY & BIODATA HUB ================= */}
      {subDesk === 'transport_drivers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {fleet.map((veh) => (
            <div key={veh.id} className="portal-card rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-base">
                    👤
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{veh.driver.fullName}</h3>
                    <span className="text-[11px] text-slate-500">Vehicle: {veh.plateNumber} ({veh.type})</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold font-mono">
                  {veh.driver.contractStatus.replace('_', ' ')}
                </span>
              </div>

              {/* DOSSIER & NATIONAL ID */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>National ID (NIN):</span>
                  <span className="font-bold text-slate-900 font-mono text-[11px]">{veh.driver.nationalIdNin}</span>
                </div>
                <div className="flex justify-between">
                  <span>Residential Address:</span>
                  <span className="text-slate-800 font-medium text-right text-[11px]">{veh.driver.residentialAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone Number:</span>
                  <span className="font-bold text-slate-900 font-mono-num">{veh.driver.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Driver's License:</span>
                  <span className="font-mono text-slate-900 font-bold">{veh.driver.licenseNumber} (Exp: {veh.driver.licenseExpiry})</span>
                </div>
                {veh.driver.hirePurchaseDebtBalance && (
                  <div className="flex justify-between pt-1 border-t border-slate-200 text-rose-600 font-bold">
                    <span>Hire-Purchase Debt:</span>
                    <span className="font-mono-num">₦{veh.driver.hirePurchaseDebtBalance.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* NEXT OF KIN & GUARANTORS */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 text-[11px]">
                  <span className="font-bold text-blue-900 block">Next of Kin:</span>
                  <div className="text-slate-700 mt-0.5 flex justify-between">
                    <span>{veh.driver.nextOfKin.fullName} ({veh.driver.nextOfKin.relationship})</span>
                    <span className="font-mono-num">{veh.driver.nextOfKin.phone}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Verified Guarantors (2 Minimum)
                  </span>
                  <div className="space-y-1.5 pt-1">
                    {veh.driver.guarantors.map((g, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-white border border-slate-200 flex justify-between items-center text-[11px]">
                        <div>
                          <div className="font-bold text-slate-800">{g.name}</div>
                          <span className="text-slate-500">{g.relationship}</span>
                        </div>
                        <span className="font-mono-num text-slate-600 font-semibold">{g.phone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= DESK 4: DAILY REMITTANCES ================= */}
      {subDesk === 'transport_remittance' && (
        <div className="space-y-4">
          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Cashier Remittance Reconciliation Desk</h3>
                <p className="text-xs text-slate-500">
                  Target vs Actual Remittance deficit calculation and arrears accumulation.
                </p>
              </div>
              <button
                onClick={onOpenRemittanceModal}
                className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Post New Remittance</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 font-bold">Plate / Date</th>
                    <th className="px-5 py-3.5 font-bold">Driver Name</th>
                    <th className="px-5 py-3.5 font-bold">Expected Target</th>
                    <th className="px-5 py-3.5 font-bold">Remitted Amount</th>
                    <th className="px-5 py-3.5 font-bold">Arrears / Deficit</th>
                    <th className="px-5 py-3.5 font-bold">Payment Mode</th>
                    <th className="px-5 py-3.5 font-bold">Status</th>
                    <th className="px-5 py-3.5 font-bold text-right">Governance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {remittances.map((remit) => (
                    <tr key={remit.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-mono font-bold text-slate-900">{remit.plateNumber}</div>
                        <span className="text-[10px] text-slate-400 font-mono-num">{remit.timestamp}</span>
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-900">{remit.driverName}</td>
                      <td className="px-5 py-4 font-mono-num text-slate-700 font-semibold">
                        ₦{remit.targetAmount.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 font-mono-num font-black text-slate-900 text-sm">
                        ₦{remit.remittedAmount.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 font-mono-num">
                        {remit.deficitSurplus < 0 ? (
                          <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">
                            -₦{Math.abs(remit.deficitSurplus).toLocaleString()} Arrears
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-semibold">₦0 (Cleared)</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                          {remit.paymentMethod}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {remit.status === 'CLEARED' ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Cleared
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            Partial Arrears
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => onDeleteRecord(remit.id, 'REMITTANCE')}
                          disabled={currentRole === 'LEVEL_1'}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                            currentRole === 'LEVEL_1'
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : currentRole === 'LEVEL_2'
                              ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                              : 'bg-rose-100 hover:bg-rose-200 text-rose-900'
                          }`}
                        >
                          {currentRole === 'LEVEL_1'
                            ? 'Locked'
                            : currentRole === 'LEVEL_2'
                            ? 'Request Delete'
                            : 'Purge (L3)'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= DESK 5: FUEL & WORKSHOP MAINTENANCE ================= */}
      {subDesk === 'transport_maintenance' && (
        <div className="space-y-4">
          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Fuel Consumption & Workshop Maintenance Ledger</h3>
                <p className="text-xs text-slate-500">
                  Fuel purchases cross-checked against mileage (KM/L) to flag abnormal usage or leaks.
                </p>
              </div>
              <button
                onClick={onOpenFuelMaintenanceModal}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Issue Ticket</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 font-bold">Ticket ID / Date</th>
                    <th className="px-5 py-3.5 font-bold">Vehicle Plate</th>
                    <th className="px-5 py-3.5 font-bold">Type</th>
                    <th className="px-5 py-3.5 font-bold">Details / Service</th>
                    <th className="px-5 py-3.5 font-bold">Odometer (KM)</th>
                    <th className="px-5 py-3.5 font-bold">Fuel Efficiency</th>
                    <th className="px-5 py-3.5 font-bold">Cost</th>
                    <th className="px-5 py-3.5 font-bold">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fuelLogs.map((fl) => (
                    <tr key={fl.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-mono font-bold text-slate-900">{fl.id}</div>
                        <span className="text-[10px] text-slate-400 font-mono-num">{fl.timestamp}</span>
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-900 font-mono">{fl.vehiclePlate}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          fl.recordType === 'FUEL' ? 'bg-amber-50 text-amber-800' : 'bg-blue-50 text-blue-800'
                        }`}>
                          {fl.recordType}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-800">{fl.details}</td>
                      <td className="px-5 py-4 font-mono-num text-slate-700 font-bold">
                        {fl.mileageKm.toLocaleString()} KM
                      </td>
                      <td className="px-5 py-4">
                        {fl.kmPerLiter ? (
                          <span className="font-mono-num font-bold text-emerald-700">
                            {fl.kmPerLiter} KM / L
                          </span>
                        ) : (
                          <span className="text-slate-400">Workshop Ticket</span>
                        )}
                      </td>
                      <td className="px-5 py-4 font-mono-num font-black text-slate-900">
                        ₦{fl.costTotal.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        {fl.receiptAttached ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                            <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" /> Attached
                          </span>
                        ) : (
                          <span className="text-slate-400">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
