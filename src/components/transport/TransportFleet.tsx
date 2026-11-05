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
  Bike,
  Coins,
  Fuel,
  Wrench,
  ShieldCheck,
  Plus,
  Trash2,
  AlertTriangle,
  User,
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface TransportFleetProps {
  currentRole: UserRoleLevel;
  fleet: FleetVehicle[];
  remittances: DailyRemittanceRecord[];
  onOpenRemittanceModal: () => void;
  onOpenFuelMaintenanceModal: () => void;
  onDeleteRecord: (recordId: string, recordType: string) => void;
}

export const TransportFleet: React.FC<TransportFleetProps> = ({
  currentRole,
  fleet,
  remittances,
  onOpenRemittanceModal,
  onOpenFuelMaintenanceModal,
  onDeleteRecord,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'REMITTANCES' | 'FLEET_ROSTER' | 'VALUATIONS'>('REMITTANCES');
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType | 'ALL'>('ALL');

  const filteredFleet = selectedVehicleType === 'ALL'
    ? fleet
    : fleet.filter((v) => v.type === selectedVehicleType);

  return (
    <div className="space-y-6">
      {/* HEADER & QUICK ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Transport & Fleet Operations</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-medium">
              3 Asset Categories
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Motorcycles, Commercial Buses & Trikes: Driver biodata verification, fuel logs, daily remittances, and market asset valuations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenRemittanceModal}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Log Driver Remittance</span>
          </button>
          <button
            onClick={onOpenFuelMaintenanceModal}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all"
          >
            <Fuel className="w-4 h-4 text-amber-400" />
            <span>Fuel / Maintenance</span>
          </button>
        </div>
      </div>

      {/* 3 VEHICLE FLEET SUMMARY CARDS WITH PRESENT VALUATION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Motorcycles */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-lg">
                🏍️
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Commercial Motorcycles</h3>
                <span className="text-[11px] text-slate-400">Dispatch & Commuter 2-Wheelers</span>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
              18 Bikes
            </span>
          </div>

          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Present Market Value:</span>
              <span className="text-white font-mono-num font-bold">₦14,400,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Daily Target / Unit:</span>
              <span className="text-emerald-400 font-mono-num font-semibold">₦6,000 / day</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Depreciation Schedule:</span>
              <span className="text-slate-300">15% per annum</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">17 Active • 1 Routine Service</span>
            <span className="text-emerald-400 font-semibold">100% Remittance</span>
          </div>
        </div>

        {/* Commercial Buses */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 text-lg">
                🚌
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Commercial Transit Buses</h3>
                <span className="text-[11px] text-slate-400">Passenger Urban Transport</span>
              </div>
            </div>
            <span className="text-[10px] bg-blue-950 text-blue-400 px-2 py-0.5 rounded font-mono font-bold">
              8 Buses
            </span>
          </div>

          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Present Market Value:</span>
              <span className="text-white font-mono-num font-bold">₦41,600,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Daily Target / Unit:</span>
              <span className="text-blue-400 font-mono-num font-semibold">₦20,000 / day</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Fuel Consumption Index:</span>
              <span className="text-slate-300 font-mono-num">8.4 KM / Liter</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">All 8 Active On Routes</span>
            <span className="text-blue-400 font-semibold">Cleared Target</span>
          </div>
        </div>

        {/* Tricycles (Trikes) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 text-lg">
                🛺
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Tricycles (Trikes)</h3>
                <span className="text-[11px] text-slate-400">Intra-City Commercial Trikes</span>
              </div>
            </div>
            <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">
              12 Trikes
            </span>
          </div>

          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Present Market Value:</span>
              <span className="text-white font-mono-num font-bold">₦12,450,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Daily Target / Unit:</span>
              <span className="text-amber-400 font-mono-num font-semibold">₦10,000 / day</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Hire-Purchase Debt Balance:</span>
              <span className="text-rose-400 font-mono-num font-bold">₦3,850,000</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">12 Active Units</span>
            <span className="text-amber-400 font-semibold">⚠️ ₦3k Arrears Today</span>
          </div>
        </div>
      </div>

      {/* SUB-TABS: REMITTANCES | FLEET ROSTER & DRIVER BIODATA | VALUATIONS */}
      <div className="border-b border-slate-800 flex items-center gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('REMITTANCES')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeSubTab === 'REMITTANCES'
              ? 'text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>Daily Driver Remittances ({remittances.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('FLEET_ROSTER')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeSubTab === 'FLEET_ROSTER'
              ? 'text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Fleet Registry & Driver Biodata ({fleet.length} Units)</span>
        </button>
      </div>

      {/* SUB-TAB 1: REMITTANCES */}
      {activeSubTab === 'REMITTANCES' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div>
              <h3 className="text-sm font-bold text-white">Daily Collections & Arrears Reconciliation</h3>
              <p className="text-xs text-slate-400">
                Automatic target vs remittance deficit tracking credited to NJIPP accounts.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Vehicle Plate / Date</th>
                  <th className="px-4 py-3">Assigned Driver</th>
                  <th className="px-4 py-3">Target</th>
                  <th className="px-4 py-3">Remitted</th>
                  <th className="px-4 py-3">Deficit / Arrears</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Governance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {remittances.map((remit) => (
                  <tr key={remit.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium text-white">
                      <div>{remit.plateNumber}</div>
                      <span className="text-[10px] text-slate-500 font-mono-num">{remit.timestamp}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">{remit.driverName}</div>
                      <div className="text-slate-500 text-[10px]">Received by: {remit.receivedBy}</div>
                    </td>
                    <td className="px-4 py-3 font-mono-num text-slate-300">
                      ₦{remit.targetAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono-num font-bold text-emerald-400">
                      ₦{remit.remittedAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono-num">
                      {remit.deficitSurplus < 0 ? (
                        <span className="text-rose-400 font-bold">
                          -₦{Math.abs(remit.deficitSurplus).toLocaleString()} Arrears
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold">₦0 (Cleared)</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                        {remit.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {remit.status === 'CLEARED' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                          Cleared
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-semibold">
                          Partial Arrears
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onDeleteRecord(remit.id, 'REMITTANCE')}
                        disabled={currentRole === 'LEVEL_1'}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                          currentRole === 'LEVEL_1'
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            : currentRole === 'LEVEL_2'
                            ? 'bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-white'
                            : 'bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white'
                        }`}
                      >
                        {currentRole === 'LEVEL_1'
                          ? 'Delete Locked'
                          : currentRole === 'LEVEL_2'
                          ? 'Request Delete'
                          : 'Delete (L3)'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: FLEET ROSTER & DRIVER BIODATA */}
      {activeSubTab === 'FLEET_ROSTER' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fleet.map((veh) => (
            <div key={veh.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {veh.type === 'MOTORCYCLE' ? '🏍️' : veh.type === 'BUS' ? '🚌' : '🛺'}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{veh.plateNumber}</h3>
                    <span className="text-[11px] text-slate-400">{veh.chassisNumber}</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold">
                  {veh.operationalStatus}
                </span>
              </div>

              {/* VALUATION GAUGE */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Purchase Price ({veh.purchaseYear}):</span>
                  <span className="font-mono-num text-slate-300">₦{veh.purchasePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Depreciation Rate:</span>
                  <span className="font-mono-num text-slate-300">{(veh.depreciationRateAnnual * 100).toFixed(0)}% p.a.</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800 font-semibold">
                  <span className="text-emerald-400">Current Market Value:</span>
                  <span className="font-mono-num text-emerald-400">₦{veh.presentMarketValue.toLocaleString()}</span>
                </div>
              </div>

              {/* DRIVER BIODATA */}
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <span className="font-bold text-white">{veh.driver.fullName}</span>
                </div>
                <div className="text-slate-400 text-[11px] space-y-1">
                  <div>Phone: {veh.driver.phone}</div>
                  <div>
                    License: <strong className="text-slate-200">{veh.driver.licenseNumber}</strong> (Exp: {veh.driver.licenseExpiry})
                  </div>
                  {veh.driver.hirePurchaseDebtBalance && (
                    <div className="text-rose-400 font-semibold">
                      Hire-Purchase Debt: ₦{veh.driver.hirePurchaseDebtBalance.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Verified Guarantors (2)
                  </span>
                  <div className="mt-1 space-y-1 text-[11px] text-slate-300">
                    {veh.driver.guarantors.map((g, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>• {g.name} ({g.relationship})</span>
                        <span className="text-slate-500 font-mono-num">{g.phone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
