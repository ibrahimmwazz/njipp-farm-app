'use client';

import React from 'react';
import {
  Sparkles,
  Tv,
  Wheat,
  Droplet,
  Trees,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const FutureVentures: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Future Strategic Endeavours</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono font-medium">
              4 Pipeline Subsidiaries
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pluggable micro-architecture for NJIPP KONSULT LTD upcoming commercial enterprises. Built to integrate seamlessly into central accounting.
          </p>
        </div>

        <span className="text-xs font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 px-3 py-1.5 rounded-xl self-start md:self-auto">
          Ready for Activation
        </span>
      </div>

      {/* 4 VENTURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Venture 1: Viewing Centre */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-red-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center text-2xl border border-red-500/20">
                📺
              </div>
              <div>
                <h3 className="text-base font-bold text-white">1. Sports Viewing Centre</h3>
                <p className="text-xs text-slate-400">Match ticketing & refreshment concessions</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold font-mono">
              Ready To Deploy
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Equipped for electronic barcode gate ticketing, live Premier League/Champions League fixtures schedule, 250-seat tiered capacity monitoring, and cold beverage/concession POS cashier reconciliation.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex justify-between items-center">
            <span className="text-slate-400">Target Seating: 250 Capacity</span>
            <span className="text-emerald-400 font-mono-num font-bold">Est. ₦90,000 / Match Day</span>
          </div>
        </div>

        {/* Venture 2: Cash Crops Production */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl border border-amber-500/20">
                🌾
              </div>
              <div>
                <h3 className="text-base font-bold text-white">2. Cash Crops Production</h3>
                <p className="text-xs text-slate-400">Commercial grain, legume & tuber agronomy</p>
              </div>
            </div>
            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-semibold font-mono">
              Planned 2026/27
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            GPS zoned plot boundary tracking across 50 hectares (Maize, Soybeans, Cassava). Features soil preparation calendars, fertilizer and chemical application tracking, harvest yield tonnage, and silo storage ledger.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex justify-between items-center">
            <span className="text-slate-400">Farmland Size: 50 Hectares</span>
            <span className="text-amber-400 font-mono-num font-bold">Yield Forecasting Integrated</span>
          </div>
        </div>

        {/* Venture 3: Table Water Factory */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-2xl border border-cyan-500/20">
                💧
              </div>
              <div>
                <h3 className="text-base font-bold text-white">3. Table Water Factory</h3>
                <p className="text-xs text-slate-400">Sachet & bottled pure water manufacturing</p>
              </div>
            </div>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-semibold font-mono">
              Setup Phase
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Batch manufacturing engine, water treatment laboratory records (pH, TDS, reverse osmosis micron filtration cycles), NAFDAC batch stamping, packaging film stock, and distributor fleet dispatch manifests.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex justify-between items-center">
            <span className="text-slate-400">Packaging Output: 2,000 Bags / Day</span>
            <span className="text-cyan-400 font-mono-num font-bold">Wholesale Distributor Network</span>
          </div>
        </div>

        {/* Venture 4: Tree Planting Business */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-500/20">
                🌲
              </div>
              <div>
                <h3 className="text-base font-bold text-white">4. Tree Planting & Agroforestry</h3>
                <p className="text-xs text-slate-400">Commercial timber, oil palm & carbon asset forestry</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold font-mono">
              Green Capital Asset
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Nursery seedling germination tracking (Teak, Gmelina, Oil Palm, Citrus), plot growth rate inspections, mortality replacement records, and long-term standing timber capital valuation models.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex justify-between items-center">
            <span className="text-slate-400">Nursery Target: 10,000 Seedlings</span>
            <span className="text-emerald-400 font-mono-num font-bold">Multi-Year High-Yield Growth</span>
          </div>
        </div>

      </div>
    </div>
  );
};
