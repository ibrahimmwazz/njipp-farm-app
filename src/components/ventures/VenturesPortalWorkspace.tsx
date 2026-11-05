'use client';

import React from 'react';
import {
  Sparkles,
  Tv,
  Wheat,
  Droplet,
  Trees,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';

interface VenturesPortalWorkspaceProps {
  subDesk: string;
  onSubDeskChange: (desk: string) => void;
}

export const VenturesPortalWorkspace: React.FC<VenturesPortalWorkspaceProps> = ({
  subDesk,
  onSubDeskChange,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* DEPARTMENT HEADER */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>NJIPP Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-purple-800 font-semibold">Future Strategic Ventures</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 capitalize">
              {subDesk.replace('venture_', '').replace('ventures_', '').replace('_', ' ')} Desk
            </span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Future Strategic Ventures Portal</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 font-bold font-mono">
              4 Pipeline Subsidiaries
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pluggable micro-modules for NJIPP KONSULT LTD commercial expansions, integrated directly into central financial reporting.
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-xl self-start md:self-auto">
          Extensible Architecture
        </span>
      </div>

      {/* 4 STRATEGIC VENTURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Venture 1: Viewing Centre */}
        <div className="portal-card rounded-2xl p-6 space-y-4 border-t-4 border-t-red-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-2xl border border-red-200">
                📺
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">1. Sports Viewing Centre</h3>
                <p className="text-xs text-slate-500">Match ticketing & refreshment concessions</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold font-mono">
              Ready to Activate
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Equipped for electronic barcode gate ticketing, live Premier League / Champions League broadcast scheduling, 250-seat tiered capacity monitoring, and cold beverage/concession POS cashier reconciliation.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center font-medium">
            <span className="text-slate-600">Target Capacity: 250 Seats</span>
            <span className="text-emerald-700 font-mono-num font-bold">Est. ₦90,000 / Match Day</span>
          </div>
        </div>

        {/* Venture 2: Cash Crops Production */}
        <div className="portal-card rounded-2xl p-6 space-y-4 border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl border border-amber-200">
                🌾
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">2. Cash Crops Production</h3>
                <p className="text-xs text-slate-500">Commercial grain, legume & tuber agronomy</p>
              </div>
            </div>
            <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-bold font-mono">
              Planned 2026/27
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            GPS zoned plot boundary tracking across 50 hectares (Maize, Soybeans, Cassava). Features soil preparation calendars, fertilizer and chemical application tracking, harvest yield tonnage, and silo storage ledger.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center font-medium">
            <span className="text-slate-600">Farmland Size: 50 Hectares</span>
            <span className="text-amber-700 font-mono-num font-bold">Yield Forecasting Integrated</span>
          </div>
        </div>

        {/* Venture 3: Table Water Factory */}
        <div className="portal-card rounded-2xl p-6 space-y-4 border-t-4 border-t-cyan-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-2xl border border-cyan-200">
                💧
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">3. Table Water Factory</h3>
                <p className="text-xs text-slate-500">Sachet & bottled pure water manufacturing</p>
              </div>
            </div>
            <span className="text-[10px] bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded font-bold font-mono">
              Setup Phase
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Batch manufacturing engine, water treatment laboratory records (pH, TDS, reverse osmosis micron filtration cycles), NAFDAC batch stamping, packaging film stock, and distributor fleet dispatch manifests.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center font-medium">
            <span className="text-slate-600">Packaging Output: 2,000 Bags / Day</span>
            <span className="text-cyan-700 font-mono-num font-bold">Wholesale Distributor Network</span>
          </div>
        </div>

        {/* Venture 4: Tree Planting Business */}
        <div className="portal-card rounded-2xl p-6 space-y-4 border-t-4 border-t-emerald-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl border border-emerald-200">
                🌲
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">4. Tree Planting & Agroforestry</h3>
                <p className="text-xs text-slate-500">Commercial timber, oil palm & carbon forestry</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold font-mono">
              Green Capital Asset
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Nursery seedling germination tracking (Teak, Gmelina, Oil Palm, Citrus), plot growth rate inspections, mortality replacement records, and long-term standing timber capital valuation models.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center font-medium">
            <span className="text-slate-600">Nursery Target: 10,000 Seedlings</span>
            <span className="text-emerald-700 font-mono-num font-bold">Multi-Year High-Yield Growth</span>
          </div>
        </div>

      </div>
    </div>
  );
};
