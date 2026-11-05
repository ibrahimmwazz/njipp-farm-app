'use client';

import React, { useState } from 'react';
import {
  Truck,
  Plus,
  Coins,
  Fuel,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  FileBadge,
  Phone,
  BarChart3,
  MapPin,
  TrendingDown,
  ChevronRight,
  ShieldAlert,
  Wrench,
  Gauge,
  Clock,
  Calendar,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import {
  UserRoleLevel,
  FleetVehicle,
  DailyRemittanceRecord,
  FuelAndMaintenanceRecord,
  VehicleType,
  VehicleCategoryLedgerRow
} from '@/types';
import { ModernMetricCard } from '@/components/ui/ModernMetricCard';
import { TransportUnitsDashboard } from './TransportUnitsDashboard';

interface ModernTransportProps {
  currentRole: UserRoleLevel;
  fleet: FleetVehicle[];
  remittances: DailyRemittanceRecord[];
  fuelLogs: FuelAndMaintenanceRecord[];
  vehicleRows?: VehicleCategoryLedgerRow[];
  onOpenRemittanceDrawer: () => void;
  onOpenFuelDrawer: () => void;
  onDeleteRecord: (id: string, type: string) => void;
}

export const ModernTransportWorkspace: React.FC<ModernTransportProps> = ({
  currentRole,
  fleet,
  remittances,
  fuelLogs,
  vehicleRows = [],
  onOpenRemittanceDrawer,
  onOpenFuelDrawer,
  onDeleteRecord,
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'FLEET' | 'DRIVERS' | 'REMITTANCES' | 'FUEL'>('OVERVIEW');
  const [vehicleFilter, setVehicleFilter] = useState<VehicleType | 'ALL'>('ALL');

  const filteredFleet =
    vehicleFilter === 'ALL' ? fleet : fleet.filter((v) => v.type === vehicleFilter);

  // Dynamic calculations from props
  const totalMarketValuation = fleet.reduce((acc, curr) => acc + curr.presentMarketValue, 0);
  const totalRemitted = remittances.reduce((acc, curr) => acc + curr.remittedAmount, 0);
  const totalTarget = remittances.reduce((acc, curr) => acc + curr.targetAmount, 0);
  const totalArrears = Math.max(0, totalTarget - totalRemitted);

  // Breakdown by vehicle class
  const mcFleet = fleet.filter((v) => v.type === 'MOTORCYCLE');
  const busFleet = fleet.filter((v) => v.type === 'BUS');
  const trikeFleet = fleet.filter((v) => v.type === 'TRIKE');

  const mcValuation = mcFleet.reduce((a, b) => a + b.presentMarketValue, 0);
  const busValuation = busFleet.reduce((a, b) => a + b.presentMarketValue, 0);
  const trikeValuation = trikeFleet.reduce((a, b) => a + b.presentMarketValue, 0);

  const trikeHpDebt = trikeFleet.reduce((a, b) => a + (b.driver.hirePurchaseDebtBalance || 0), 0);

  // Split fuel logs into pure fuel vs maintenance records
  const fuelOnlyLogs = fuelLogs.filter((l) => l.recordType === 'FUEL');
  const maintenanceLogs = fuelLogs.filter((l) => l.recordType === 'MAINTENANCE');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. TOP HEADER & ACTION BAR */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 font-mono bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Transport & Fleet
            </span>
            <span className="text-xs font-bold text-slate-500">• Motorcycles • Buses • Tricycles</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Transport & Vehicles Management
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl font-medium">
            Manage commercial motorcycles, buses, and tricycles. Track driver daily cash returns, fuel receipts, and workshop repair costs.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          {currentRole === 'LEVEL_1' ? (
            <>
              <button
                onClick={onOpenRemittanceDrawer}
                className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all hover:shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Record Driver Cash</span>
              </button>
              <button
                onClick={onOpenFuelDrawer}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all hover:shadow-md cursor-pointer"
              >
                <Fuel className="w-4 h-4 text-cyan-400" />
                <span>Record Fuel / Repair</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-700 font-medium shadow-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                {currentRole === 'LEVEL_2'
                  ? 'Supervisor Fleet Desk • Driver cash & fuel logs are punched by Level 1 staff'
                  : 'Executive Fleet Console • Daily receipts entered by Level 1. Fleet asset valuations active.'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. TAB NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'OVERVIEW', label: 'Transport Overview', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'FLEET', label: 'Vehicles List & Values', icon: <Truck className="w-4 h-4" />, count: fleet.length },
          { id: 'DRIVERS', label: 'Drivers & Contracts', icon: <UserCheck className="w-4 h-4" />, count: fleet.length },
          { id: 'REMITTANCES', label: 'Daily Driver Cash & Debts', icon: <Coins className="w-4 h-4" />, count: remittances.length },
          { id: 'FUEL', label: 'Fuel & Maintenance Bills', icon: <Fuel className="w-4 h-4" />, count: fuelLogs.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === tab.id ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ================= TAB 1: FLEET OVERVIEW & VEHICLE CATEGORY DASHBOARD ================= */}
      {activeTab === 'OVERVIEW' && (
        <TransportUnitsDashboard
          vehicleRows={vehicleRows}
          onOpenRemittanceDrawer={onOpenRemittanceDrawer}
          onOpenFuelDrawer={onOpenFuelDrawer}
        />
      )}

      {/* ================= TAB 2: VEHICLE ASSET REGISTER & DEPRECIATION ================= */}
      {activeTab === 'FLEET' && (
        <div className="space-y-6">
          
          {/* DEPRECIATION ENGINE BANNER */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-950">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                %
              </div>
              <div>
                <strong className="block text-blue-900">Straight-Line Asset Valuation & Depreciation Engine</strong>
                <span className="text-blue-800 text-[11px]">
                  Book Value is computed annually based on acquisition cost, service year, and straight-line depreciation rates (Buses 12%, Trikes 18%, Bikes 15%).
                </span>
              </div>
            </div>
            <span className="font-mono font-bold px-3 py-1 bg-white text-blue-800 rounded-lg border border-blue-200">
              Total Book: ₦{totalMarketValuation.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-200 pb-4 overflow-x-auto text-xs">
            {(['ALL', 'MOTORCYCLE', 'BUS', 'TRIKE'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setVehicleFilter(type)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  vehicleFilter === type
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {type === 'ALL' ? `All Vehicles (${fleet.length})` : `${type}s (${fleet.filter(v => v.type === type).length})`}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Plate / Make & Model</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Engine & Chassis Number</th>
                    <th className="px-6 py-4">Acquisition Cost</th>
                    <th className="px-6 py-4">Annual Depr. %</th>
                    <th className="px-6 py-4">Present Book Value</th>
                    <th className="px-6 py-4">Current Mileage</th>
                    <th className="px-6 py-4">Driver Assigned</th>
                    <th className="px-6 py-4">Operational Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFleet.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">
                        {v.plateNumber}
                        <span className="block text-[11px] text-slate-500 font-sans font-normal">{v.makeModel}</span>
                      </td>
                      <td className="px-6 py-4 font-bold">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 font-mono">
                          {v.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-600 text-[11px]">
                        <div>Eng: {v.engineNumber || 'N/A'}</div>
                        <div className="text-slate-400">Chas: {v.chassisNumber}</div>
                      </td>
                      <td className="px-6 py-4 font-mono-num text-slate-600">
                        ₦{v.purchasePrice.toLocaleString()}
                        <span className="block text-[10px] text-slate-400 font-sans">Acq: {v.acquisitionDate || v.purchaseYear}</span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-700">
                        {(v.depreciationRateAnnual * 100).toFixed(0)}% / yr
                      </td>
                      <td className="px-6 py-4 font-mono-num font-black text-slate-900 text-sm">
                        ₦{v.presentMarketValue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-800 font-semibold">
                        {v.currentMileageKm.toLocaleString()} KM
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">{v.driver.fullName}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            v.operationalStatus === 'ACTIVE'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {v.operationalStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: DRIVER DOSSIERS (NIN & GUARANTORS) ================= */}
      {activeTab === 'DRIVERS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fleet.map((v) => (
              <div key={v.id} className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
                
                {/* Header Profile */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-800 border border-blue-200 flex items-center justify-center font-bold text-base font-mono">
                      {v.driver.fullName.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">{v.driver.fullName}</h3>
                      <p className="text-xs text-slate-500 font-mono">
                        Assigned: {v.plateNumber} ({v.type})
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    {v.driver.contractStatus.replace('_', ' ')}
                  </span>
                </div>

                {/* Primary Biodata */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Verified National NIN:</span>
                    <span className="font-mono font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      {v.driver.nationalIdNin}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Driver License Number:</span>
                    <span className="font-mono text-slate-800 font-bold">{v.driver.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">License Expiry Date:</span>
                    <span className="font-mono text-slate-800">{v.driver.licenseExpiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone Contact:</span>
                    <span className="font-mono text-slate-800">{v.driver.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Residential Address:</span>
                    <span className="text-slate-700 font-medium truncate max-w-xs">{v.driver.residentialAddress}</span>
                  </div>
                  {v.driver.hirePurchaseDebtBalance !== undefined && (
                    <div className="flex justify-between pt-1 border-t border-slate-100">
                      <span className="text-slate-500">Hire-Purchase Balance:</span>
                      <span className="font-mono font-bold text-rose-600">
                        ₦{v.driver.hirePurchaseDebtBalance.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {v.driver.cumulativeArrearsBalance !== undefined && v.driver.cumulativeArrearsBalance > 0 && (
                    <div className="flex justify-between">
                      <span className="text-rose-600 font-bold">Cumulative Arrears Held:</span>
                      <span className="font-mono font-bold text-rose-700">
                        -₦{v.driver.cumulativeArrearsBalance.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Next of Kin */}
                {v.driver.nextOfKin && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-700 block text-[11px]">Next-of-Kin Biodata:</span>
                    <div className="flex justify-between text-slate-600">
                      <span>{v.driver.nextOfKin.fullName} ({v.driver.nextOfKin.relationship})</span>
                      <span className="font-mono">{v.driver.nextOfKin.phone}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{v.driver.nextOfKin.address}</p>
                  </div>
                )}

                {/* 2 Verified Guarantors */}
                <div className="pt-2 border-t border-slate-100 text-xs space-y-2">
                  <span className="font-bold text-slate-700 block text-[11px]">Two Verified Guarantors:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                    {v.driver.guarantors.map((g, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                        <strong className="block text-slate-900">{g.name}</strong>
                        <div className="text-slate-500 font-mono text-[10px]">{g.relationship} • {g.phone}</div>
                        <div className="text-[10px] text-slate-400 truncate">{g.address}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: CASHIER RETURNS & ARREARS ================= */}
      {activeTab === 'REMITTANCES' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-blue-700" />
                  <span>Driver Daily Remittance Ledger</span>
                </h3>
                <p className="text-xs text-slate-500">Real-time cashier reconciliation of expected targets, cash remitted, and arrears deficits</p>
              </div>
              <button
                onClick={onOpenRemittanceDrawer}
                className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs self-start sm:self-auto"
              >
                + Post Cashier Remittance
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Receipt ID / Time</th>
                    <th className="px-6 py-4">Vehicle Plate</th>
                    <th className="px-6 py-4">Driver Name</th>
                    <th className="px-6 py-4">Target Amount</th>
                    <th className="px-6 py-4">Remitted Cash</th>
                    <th className="px-6 py-4">Reconciliation Status</th>
                    <th className="px-6 py-4">Channel</th>
                    <th className="px-6 py-4">Cashier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {remittances.map((remit) => (
                    <tr key={remit.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-800">
                        {remit.id}
                        <span className="block text-[10px] text-slate-400 font-sans">{remit.timestamp}</span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">{remit.plateNumber}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{remit.driverName}</td>
                      <td className="px-6 py-4 font-mono-num text-slate-500">₦{remit.targetAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 font-mono-num font-black text-slate-900 text-sm">
                        ₦{remit.remittedAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {remit.deficitSurplus < 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            -₦{Math.abs(remit.deficitSurplus).toLocaleString()} Arrears
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Cleared in Full
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold font-mono text-slate-600">{remit.paymentMethod}</td>
                      <td className="px-6 py-4 text-slate-500">{remit.receivedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: FUEL TELEMATICS & WORKSHOP MAINTENANCE ================= */}
      {activeTab === 'FUEL' && (
        <div className="space-y-8">
          
          {/* SECTION A: FUEL CONSUMPTION TELEMATICS */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Fuel className="w-5 h-5 text-cyan-600" />
                  <span>Fuel Consumption Telematics & Mileage Radar</span>
                </h3>
                <p className="text-xs text-slate-500">Cross-checks odometer mileage against liters dispensed to detect fuel siphoning anomalies</p>
              </div>
              <button
                onClick={onOpenFuelDrawer}
                className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs self-start sm:self-auto"
              >
                + Log Fuel Purchase
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Voucher ID / Date</th>
                    <th className="px-6 py-4">Vehicle Plate</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Odometer (KM)</th>
                    <th className="px-6 py-4">Liters Dispensed</th>
                    <th className="px-6 py-4">KM/L Efficiency</th>
                    <th className="px-6 py-4">Vendor Station</th>
                    <th className="px-6 py-4">Total Cost (₦)</th>
                    <th className="px-6 py-4">Audit Radar Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fuelOnlyLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-800">
                        {log.id}
                        <span className="block text-[10px] text-slate-400 font-sans">{log.timestamp}</span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">{log.vehiclePlate}</td>
                      <td className="px-6 py-4 font-bold">{log.vehicleType}</td>
                      <td className="px-6 py-4 font-mono-num">{log.mileageKm.toLocaleString()} KM</td>
                      <td className="px-6 py-4 font-mono-num font-bold text-slate-900">{log.litersDispensed} L</td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-800">
                        {log.kmPerLiter ? `${log.kmPerLiter} KM/L` : '—'}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{log.vendorName}</td>
                      <td className="px-6 py-4 font-mono-num font-bold text-slate-900">
                        ₦{log.costTotal.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {log.isAbnormalFuelFlag ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            Abnormal Consumption Flag
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Verified Normal
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION B: WORKSHOP MAINTENANCE & SERVICING LEDGER */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-indigo-700" />
                  <span>Fleet Maintenance & Workshop Servicing Ledger</span>
                </h3>
                <p className="text-xs text-slate-500">Scheduled preventative servicing vs unscheduled breakdown repairs with parts replacement audit</p>
              </div>
              <button
                onClick={onOpenFuelDrawer}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs self-start sm:self-auto"
              >
                + Log Servicing Voucher
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Service Ref / Date</th>
                    <th className="px-6 py-4">Vehicle Plate</th>
                    <th className="px-6 py-4">Classification</th>
                    <th className="px-6 py-4">Service Details</th>
                    <th className="px-6 py-4">Parts Replaced</th>
                    <th className="px-6 py-4">Workshop Vendor</th>
                    <th className="px-6 py-4">Next Target Mileage</th>
                    <th className="px-6 py-4">Total Cost (₦)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {maintenanceLogs.map((maint) => (
                    <tr key={maint.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-800">
                        {maint.id}
                        <span className="block text-[10px] text-slate-400 font-sans">{maint.timestamp}</span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">{maint.vehiclePlate}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                            maint.maintenanceType === 'SCHEDULED_PREVENTATIVE'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {maint.maintenanceType?.replace('_', ' ') || 'PREVENTATIVE'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800 max-w-xs">{maint.details}</td>
                      <td className="px-6 py-4 text-slate-600 max-w-xs font-mono text-[11px]">
                        {maint.partsReplaced || 'Standard Routine Servicing'}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{maint.vendorName}</td>
                      <td className="px-6 py-4 font-mono text-slate-700">
                        {maint.nextServiceMileageKm ? `${maint.nextServiceMileageKm.toLocaleString()} KM` : '—'}
                      </td>
                      <td className="px-6 py-4 font-mono-num font-black text-slate-900 text-sm">
                        ₦{maint.costTotal.toLocaleString()}
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
