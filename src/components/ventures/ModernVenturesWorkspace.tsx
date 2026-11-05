'use client';

import React, { useState } from 'react';
import {
  Tv,
  Wheat,
  Droplet,
  Trees,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  TrendingUp,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  Ticket,
  Plus,
  ShieldCheck,
  Package,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  ViewingCentreMatchEvent,
  CashCropsPlotRecord,
  TableWaterBatchRun,
  ForestryNurseryBed
} from '@/types';
import { ModernMetricCard } from '@/components/ui/ModernMetricCard';

interface VenturesWorkspaceProps {
  matches: ViewingCentreMatchEvent[];
  plots: CashCropsPlotRecord[];
  waterBatches: TableWaterBatchRun[];
  nurseryBeds: ForestryNurseryBed[];
  onSellTicket?: (matchId: string, tier: 'VIP' | 'REGULAR') => void;
  onRecordConcession?: (matchId: string, amount: number) => void;
  onApplyCropInput?: (plotId: string, bags: number) => void;
  onRecordWaterBatch?: (productLine: any, units: number) => void;
  onTransplantNursery?: (bedId: string, count: number) => void;
  onNotify: (msg: string) => void;
}

export const ModernVenturesWorkspace: React.FC<VenturesWorkspaceProps> = ({
  matches,
  plots,
  waterBatches,
  nurseryBeds,
  onSellTicket,
  onRecordConcession,
  onApplyCropInput,
  onRecordWaterBatch,
  onTransplantNursery,
  onNotify,
}) => {
  const [activeVenture, setActiveVenture] = useState<'VIEWING_CENTRE' | 'CASH_CROPS' | 'WATER_FACTORY' | 'AGROFORESTRY'>('VIEWING_CENTRE');

  // Viewing centre metrics
  const totalGateIncome = matches.reduce((sum, m) => sum + m.gateIncomeTotal, 0);
  const totalConcessions = matches.reduce((sum, m) => sum + m.concessionsRevenue, 0);

  // Cash crops metrics
  const totalHectares = plots.reduce((sum, p) => sum + p.hectares, 0);
  const totalExpectedTonnes = plots.reduce((sum, p) => sum + p.expectedYieldTonnes, 0);

  // Water factory metrics
  const totalWaterUnits = waterBatches.reduce((sum, b) => sum + b.unitsProduced, 0);

  // Forestry metrics
  const totalSeedlings = nurseryBeds.reduce((sum, b) => sum + b.seedlingsGerminated, 0);
  const totalForestryValuation = nurseryBeds.reduce((sum, b) => sum + b.estimatedCommercialValuation, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* HEADER HERO */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-700 font-mono bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              Other Businesses
            </span>
            <span className="text-xs font-bold text-slate-500">• 4 Business Ventures</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Other Business Ventures
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl font-medium">
            Manage our 250-seat football viewing centre, 50-hectare grain crop farm, table water bottling factory, and commercial tree planting nursery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-50 text-purple-900 text-xs font-bold border border-purple-200">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>4 Active Units</span>
          </span>
        </div>
      </div>

      {/* HORIZONTAL VENTURE SELECTOR TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'VIEWING_CENTRE', label: '1. Football Viewing Centre (250 Seats)', icon: <Tv className="w-4 h-4 text-purple-600" /> },
          { id: 'CASH_CROPS', label: '2. 50-Hectare Crop Farm', icon: <Wheat className="w-4 h-4 text-amber-600" /> },
          { id: 'WATER_FACTORY', label: '3. Pure Table Water Factory', icon: <Droplet className="w-4 h-4 text-cyan-600" /> },
          { id: 'AGROFORESTRY', label: '4. Tree Planting & Nursery', icon: <Trees className="w-4 h-4 text-emerald-600" /> },
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveVenture(v.id as any)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeVenture === v.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200'
            }`}
          >
            {v.icon}
            <span>{v.label}</span>
          </button>
        ))}
      </div>

      {/* ================= 1. VIEWING CENTRE VENTURE ================= */}
      {activeVenture === 'VIEWING_CENTRE' && (
        <div className="space-y-8">
          
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ModernMetricCard
              title="Hall Seating Capacity"
              value="250 Seats"
              subtitle="Dolby sound & satellite projector"
              change="Air-Conditioned"
              trend="up"
              trendGood={true}
              accentColor="purple"
              icon={<Users className="w-5 h-5 text-purple-600" />}
              badge="Main Arena"
            />
            <ModernMetricCard
              title="Gate Ticket Revenue"
              value={`₦${totalGateIncome.toLocaleString()}`}
              subtitle="VIP (₦1,500) & Regular (₦800)"
              change="+₦200.5k"
              trend="up"
              trendGood={true}
              accentColor="emerald"
              icon={<Ticket className="w-5 h-5 text-emerald-600" />}
              badge="Today's Fixtures"
            />
            <ModernMetricCard
              title="Concessions Sales"
              value={`₦${totalConcessions.toLocaleString()}`}
              subtitle="Chilled beverages & fresh popcorn"
              change="+22.4%"
              trend="up"
              trendGood={true}
              accentColor="amber"
              icon={<Sparkles className="w-5 h-5 text-amber-600" />}
              badge="Refreshed"
            />
            <ModernMetricCard
              title="Broadcast Live Feed"
              value="SuperSport HD"
              subtitle="Dual backup generator power"
              change="Uninterrupted"
              trend="up"
              trendGood={true}
              accentColor="blue"
              icon={<Tv className="w-5 h-5 text-blue-600" />}
              badge="Active Feed"
            />
          </div>

          {/* FIXTURES & TICKETING TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Broadcast Fixtures & Ticket Reconciliation</h3>
                <p className="text-xs text-slate-500">Live seat occupancy tracking and automated gate ticketing</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                250 Seats Max
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Fixture / Tournament</th>
                    <th className="px-6 py-4">Kick-off Time</th>
                    <th className="px-6 py-4">Tickets Sold</th>
                    <th className="px-6 py-4">Hall Occupancy %</th>
                    <th className="px-6 py-4">Gate Income (₦)</th>
                    <th className="px-6 py-4">Concessions (₦)</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Ticketing Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {matches.map((match) => {
                    const totalSold = match.ticketsSoldVIP + match.ticketsSoldRegular;
                    const occupancy = ((totalSold / match.totalCapacity) * 100).toFixed(1);
                    return (
                      <tr key={match.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4">
                          <strong className="block text-slate-900 text-sm">{match.fixtureTitle}</strong>
                          <span className="text-[11px] text-purple-700 font-semibold">{match.tournament}</span>
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-700">{match.startTime}</td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-900">{totalSold} / {match.totalCapacity}</span>
                          <span className="block text-[10px] text-slate-400">
                            {match.ticketsSoldVIP} VIP • {match.ticketsSoldRegular} Reg
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-purple-600 h-full rounded-full"
                                style={{ width: `${Math.min(100, Number(occupancy))}%` }}
                              />
                            </div>
                            <span className="font-mono font-bold text-slate-800">{occupancy}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono-num font-black text-slate-900 text-sm">
                          ₦{match.gateIncomeTotal.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 font-mono-num font-bold text-amber-700">
                          ₦{match.concessionsRevenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-700">
                            {match.broadcastStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                if (onSellTicket) onSellTicket(match.id, 'REGULAR');
                                onNotify(`🎟️ Sold Regular Ticket for ${match.fixtureTitle} (₦${match.ticketPrice}).`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-bold text-[10px]"
                            >
                              + Regular
                            </button>
                            <button
                              onClick={() => {
                                if (onSellTicket) onSellTicket(match.id, 'VIP');
                                onNotify(`⭐ Sold VIP Ticket for ${match.fixtureTitle} (₦1,500).`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px]"
                            >
                              + VIP
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ================= 2. CASH CROPS 50 HA FARM ================= */}
      {activeVenture === 'CASH_CROPS' && (
        <div className="space-y-8">
          
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ModernMetricCard
              title="Total Farm Parcel"
              value={`${totalHectares} Hectares`}
              subtitle="Zoned commercial plots"
              change="100% Cultivated"
              trend="up"
              trendGood={true}
              accentColor="amber"
              icon={<MapPin className="w-5 h-5 text-amber-600" />}
              badge="3 Zoned Plots"
            />
            <ModernMetricCard
              title="Projected Harvest"
              value={`${totalExpectedTonnes} Tonnes`}
              subtitle="Maize, Soybeans & Cassava tubers"
              change="+15% Yield Target"
              trend="up"
              trendGood={true}
              accentColor="emerald"
              icon={<Wheat className="w-5 h-5 text-emerald-600" />}
              badge="Q4 Harvest"
            />
            <ModernMetricCard
              title="Soil Moisture Level"
              value="32% Mean"
              subtitle="Drip & furrow irrigation monitored"
              change="Optimal Range"
              trend="up"
              trendGood={true}
              accentColor="blue"
              icon={<Droplet className="w-5 h-5 text-blue-600" />}
              badge="Telemetry"
            />
            <ModernMetricCard
              title="Crop Inputs In Warehouse"
              value="90 Bags NPK"
              subtitle="Safety stock compound fertilizer"
              change="Restocked"
              trend="up"
              trendGood={true}
              accentColor="emerald"
              icon={<Package className="w-5 h-5 text-emerald-600" />}
              badge="Warehouse Safe"
            />
          </div>

          {/* PLOT REGISTRY TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Commercial Field Plot Registry (50 Ha)</h3>
                <p className="text-xs text-slate-500">Agronomy phenology tracking, fertilizer application logs, and harvest projections</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                50.0 Hectares Total
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Plot Code</th>
                    <th className="px-6 py-4">Crop Planted</th>
                    <th className="px-6 py-4">Hectares</th>
                    <th className="px-6 py-4">Soil Moisture %</th>
                    <th className="px-6 py-4">Fertilizer Applied</th>
                    <th className="px-6 py-4">Growth Stage</th>
                    <th className="px-6 py-4">Projected Yield</th>
                    <th className="px-6 py-4">Field Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {plots.map((plot) => (
                    <tr key={plot.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">{plot.plotCode}</td>
                      <td className="px-6 py-4">
                        <strong className="text-slate-900">{plot.cropName}</strong>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-800">{plot.hectares} Ha</td>
                      <td className="px-6 py-4 font-mono font-bold text-blue-700">{plot.soilMoisturePercent}%</td>
                      <td className="px-6 py-4 font-mono text-slate-700">{plot.fertilizerBagsApplied} Bags NPK</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{plot.growthStage}</td>
                      <td className="px-6 py-4 font-mono-num font-black text-emerald-800 text-sm">
                        {plot.expectedYieldTonnes} Tonnes
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            if (onApplyCropInput) onApplyCropInput(plot.id, 5);
                            onNotify(`🌱 Applied 5 bags of fertilizer to ${plot.plotCode} (${plot.cropName}).`);
                          }}
                          className="px-3 py-1 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-[10px]"
                        >
                          + Apply 5 Bags NPK
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

      {/* ================= 3. TABLE WATER FACTORY ================= */}
      {activeVenture === 'WATER_FACTORY' && (
        <div className="space-y-8">
          
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ModernMetricCard
              title="Total Output Today"
              value={`${totalWaterUnits.toLocaleString()} Units`}
              subtitle="Sachet 50cl bags & bottled 75cl packs"
              change="+12.5%"
              trend="up"
              trendGood={true}
              accentColor="blue"
              icon={<Droplet className="w-5 h-5 text-cyan-600" />}
              badge="Dual Lines"
            />
            <ModernMetricCard
              title="NAFDAC Quality Lab"
              value="STAMPED & PASS"
              subtitle="Batch certification approved"
              change="pH 7.18 • TDS 40ppm"
              trend="up"
              trendGood={true}
              accentColor="emerald"
              icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
              badge="NAFDAC Certified"
            />
            <ModernMetricCard
              title="Roll Film Packaging"
              value="65 Rolls"
              subtitle="Food-grade printed 30-micron film"
              change="Sufficient"
              trend="up"
              trendGood={true}
              accentColor="blue"
              icon={<Package className="w-5 h-5 text-blue-600" />}
              badge="Factory Store"
            />
            <ModernMetricCard
              title="PET Preforms 750ml"
              value="4,800 Units"
              subtitle="Blow-moulding bottle inventory"
              change="Ready Run"
              trend="up"
              trendGood={true}
              accentColor="purple"
              icon={<Layers className="w-5 h-5 text-purple-600" />}
              badge="Active Preforms"
            />
          </div>

          {/* WATER BATCH PRODUCTION TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Table Water Production & Lab Release Register</h3>
                <p className="text-xs text-slate-500">Reverse osmosis telemetry, pH/TDS lab parameters, and wholesale distribution batches</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                NAFDAC Enforced
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Batch Code</th>
                    <th className="px-6 py-4">Product Line</th>
                    <th className="px-6 py-4">Units Produced</th>
                    <th className="px-6 py-4">pH Telemetry</th>
                    <th className="px-6 py-4">TDS (ppm)</th>
                    <th className="px-6 py-4">Packaging Material</th>
                    <th className="px-6 py-4">QC Release</th>
                    <th className="px-6 py-4">Dispatch Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {waterBatches.map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">{batch.batchCode}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">
                        {batch.productLine.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 font-mono-num font-black text-slate-900 text-sm">
                        {batch.unitsProduced.toLocaleString()} / {batch.targetUnits.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-cyan-700">{batch.phTelemetry}</td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-700">{batch.tdsTelemetry} ppm</td>
                      <td className="px-6 py-4 text-slate-600">
                        {batch.packagingFilmConsumedKg > 0 ? `${batch.packagingFilmConsumedKg}kg Film` : `${batch.preformsConsumed} Preforms`}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          NAFDAC Stamped
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            if (onRecordWaterBatch) onRecordWaterBatch(batch.productLine, 100);
                            onNotify(`💧 Dispatched +100 units of ${batch.batchCode} to wholesale distributor.`);
                          }}
                          className="px-3 py-1 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-[10px]"
                        >
                          + Dispatch 100 Units
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

      {/* ================= 4. AGROFORESTRY & TREE PLANTING ================= */}
      {activeVenture === 'AGROFORESTRY' && (
        <div className="space-y-8">
          
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ModernMetricCard
              title="Nursery Seedlings"
              value={`${totalSeedlings.toLocaleString()}`}
              subtitle="Teak, Oil Palm & Gmelina saplings"
              change="96.2% Germination"
              trend="up"
              trendGood={true}
              accentColor="emerald"
              icon={<Trees className="w-5 h-5 text-emerald-600" />}
              badge="3 Beds"
            />
            <ModernMetricCard
              title="Biological Asset Valuation"
              value={`₦${(totalForestryValuation / 1000000).toFixed(2)}M`}
              subtitle="Standing nursery asset valuation"
              change="+18.5% Capital Gain"
              trend="up"
              trendGood={true}
              accentColor="purple"
              icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
              badge="Capital Asset"
            />
            <ModernMetricCard
              title="Transplant Target"
              value="8,500 Saplings"
              subtitle="Transplantation into permanent forestry"
              change="Season Ready"
              trend="up"
              trendGood={true}
              accentColor="blue"
              icon={<Clock className="w-5 h-5 text-blue-600" />}
              badge="Hardening Stage"
            />
            <ModernMetricCard
              title="10-Year Timber Projection"
              value="₦120,000,000"
              subtitle="Projected mature standing timber value"
              change="Long-Term Capital"
              trend="up"
              trendGood={true}
              accentColor="emerald"
              icon={<Trees className="w-5 h-5 text-emerald-600" />}
              badge="Sovereign Fund"
            />
          </div>

          {/* NURSERY BEDS REGISTER TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Agroforestry Nursery Bed Germination Register</h3>
                <p className="text-xs text-slate-500">Seedling germination tracking, hardening stages, and biological capital asset valuation</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                10,000 Seedling Capacity
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Bed Code</th>
                    <th className="px-6 py-4">Botanical Species</th>
                    <th className="px-6 py-4">Seedlings Germinated</th>
                    <th className="px-6 py-4">Germination Rate</th>
                    <th className="px-6 py-4">Development Stage</th>
                    <th className="px-6 py-4">Current Valuation (₦)</th>
                    <th className="px-6 py-4">Transplant Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {nurseryBeds.map((bed) => (
                    <tr key={bed.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">{bed.bedCode}</td>
                      <td className="px-6 py-4">
                        <strong className="text-slate-900 text-sm">{bed.speciesName}</strong>
                      </td>
                      <td className="px-6 py-4 font-mono-num font-bold text-slate-800">
                        {bed.seedlingsGerminated.toLocaleString()} / {bed.targetSeedlings.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-emerald-700">
                        {bed.germinationRatePercent}%
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-700">
                          {bed.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono-num font-black text-slate-900 text-sm">
                        ₦{bed.estimatedCommercialValuation.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            if (onTransplantNursery) onTransplantNursery(bed.id, 100);
                            onNotify(`🌲 Prepared 100 saplings of ${bed.speciesName} for plantation transplanting.`);
                          }}
                          className="px-3 py-1 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px]"
                        >
                          + Transplant 100
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

    </div>
  );
};
