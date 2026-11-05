'use client';

import React from 'react';
import { PortalId, UserSession } from '@/types';
import {
  Wheat,
  Truck,
  ShieldCheck,
  Sparkles,
  LogOut,
  Layers,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  Building2,
  ChevronRight,
  ClipboardList,
  X
} from 'lucide-react';

interface SidebarProps {
  activePortal: PortalId;
  onPortalChange: (portal: PortalId) => void;
  userSession: UserSession;
  onLogout: () => void;
  pendingApprovalsCount: number;
  alertCount?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePortal,
  onPortalChange,
  userSession,
  onLogout,
  pendingApprovalsCount,
  alertCount = 0,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const currentRole = userSession.role;

  // Friendly role titles and badges
  const roleDisplayInfo = {
    LEVEL_1: {
      badge: 'Field Staff',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      avatarColor: 'bg-blue-600',
    },
    LEVEL_2: {
      badge: 'Supervisor',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      avatarColor: 'bg-amber-600',
    },
    LEVEL_3: {
      badge: 'Owner / Management',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      avatarColor: 'bg-slate-900',
    },
  }[currentRole];

  const handleSelectPortal = (portal: PortalId) => {
    onPortalChange(portal);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside className={`fixed md:sticky top-0 bottom-0 left-0 z-50 md:z-30 w-64 lg:w-72 bg-white border-r border-slate-200/90 flex flex-col h-screen shrink-0 select-none shadow-xs transition-transform duration-200 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        {/* 1. BRAND HEADER */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-700 flex items-center justify-center font-black text-white text-lg shadow-sm tracking-wider ring-4 ring-emerald-500/10">
              NK
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-slate-900 font-sans">
                  NJIPP KONSULT
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Farm & Business Management
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onCloseMobile}
            className="md:hidden text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. USER PROFILE CARD */}
        <div className="p-4 mx-3 my-3 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-xs ${roleDisplayInfo.avatarColor}`}>
              {userSession.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {userSession.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${roleDisplayInfo.color}`}>
                  {roleDisplayInfo.badge}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. NAVIGATION SECTION */}
        <div className="flex-1 px-3 py-2 space-y-6 overflow-y-auto">
          
          {/* LEVEL 1: STAFF NAVIGATION */}
          {currentRole === 'LEVEL_1' && (
            <div className="space-y-1">
              <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Staff Work Station
              </div>

              <button
                onClick={() => handleSelectPortal('PORTAL_FARM')}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <ClipboardList className="w-4 h-4 text-emerald-600" />
                  <span>Daily Work Entry</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>
              <p className="px-3 pt-2 text-[11px] text-slate-500 leading-relaxed">
                Use this screen to enter feeding, egg/milk collection, driver cash, fuel receipts, and sales.
              </p>
            </div>
          )}

          {/* LEVEL 2: SUPERVISOR NAVIGATION */}
          {currentRole === 'LEVEL_2' && (
            <div className="space-y-1">
              <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Supervisor Menu
              </div>

              <button
                onClick={() => handleSelectPortal('PORTAL_GOVERNANCE')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePortal === 'PORTAL_GOVERNANCE'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Overview & Alerts</span>
                </div>
                {pendingApprovalsCount > 0 && (
                  <span className={`h-5 min-w-5 px-1.5 rounded-full text-[10px] font-black flex items-center justify-center ${
                    activePortal === 'PORTAL_GOVERNANCE' ? 'bg-white text-amber-700' : 'bg-amber-500 text-white'
                  }`}>
                    {pendingApprovalsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleSelectPortal('PORTAL_FARM')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePortal === 'PORTAL_FARM'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wheat className="w-4 h-4" />
                  <span>Farm Review</span>
                </div>
              </button>

              <button
                onClick={() => handleSelectPortal('PORTAL_TRANSPORT')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePortal === 'PORTAL_TRANSPORT'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4" />
                  <span>Transport Review</span>
                </div>
              </button>
            </div>
          )}

          {/* LEVEL 3: EXECUTIVE & OWNER NAVIGATION */}
          {currentRole === 'LEVEL_3' && (
            <div className="space-y-1">
              <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Business Sections
              </div>

              {/* 1. Livestock Farm */}
              <button
                onClick={() => handleSelectPortal('PORTAL_FARM')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePortal === 'PORTAL_FARM'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wheat className="w-4 h-4" />
                  <span>Livestock Farm</span>
                </div>
                {activePortal === 'PORTAL_FARM' && <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {/* 2. Transport & Vehicles */}
              <button
                onClick={() => handleSelectPortal('PORTAL_TRANSPORT')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePortal === 'PORTAL_TRANSPORT'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4" />
                  <span>Transport Fleet</span>
                </div>
                {activePortal === 'PORTAL_TRANSPORT' && <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {/* 3. Finance & Approvals */}
              <button
                onClick={() => handleSelectPortal('PORTAL_GOVERNANCE')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePortal === 'PORTAL_GOVERNANCE'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Finance & Approvals</span>
                </div>
                {pendingApprovalsCount > 0 ? (
                  <span className={`h-5 min-w-5 px-1.5 rounded-full text-[10px] font-black flex items-center justify-center ${
                    activePortal === 'PORTAL_GOVERNANCE' ? 'bg-white text-indigo-700' : 'bg-amber-500 text-white'
                  }`}>
                    {pendingApprovalsCount}
                  </span>
                ) : activePortal === 'PORTAL_GOVERNANCE' ? (
                  <ChevronRight className="w-3.5 h-3.5" />
                ) : null}
              </button>

              {/* 4. Other Business Ventures */}
              <button
                onClick={() => handleSelectPortal('PORTAL_VENTURES')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePortal === 'PORTAL_VENTURES'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Other Businesses</span>
                </div>
                {activePortal === 'PORTAL_VENTURES' && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

        </div>

        {/* 4. BOTTOM FOOTER & SIGN OUT */}
        <div className="p-4 border-t border-slate-200/80 space-y-3 bg-slate-50/50">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Online & Synced</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">BMS v2.0</span>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50 font-bold text-xs transition-all shadow-xs cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>
    </>
  );
};
