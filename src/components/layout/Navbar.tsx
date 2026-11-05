'use client';

import React from 'react';
import { UserRoleLevel, PortalId, UserSession } from '@/types';
import {
  Wheat,
  Truck,
  ShieldCheck,
  Sparkles,
  Search,
  Bell,
  Clock,
  Layers,
  LogOut,
  User,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';

interface NavbarProps {
  activePortal: PortalId;
  onPortalChange: (portal: PortalId) => void;
  userSession?: UserSession | null;
  onLogout: () => void;
  pendingApprovalsCount: number;
  onResetDemo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePortal,
  onPortalChange,
  userSession,
  onLogout,
  pendingApprovalsCount,
  onResetDemo,
}) => {
  const currentRole = userSession?.role || 'LEVEL_3';
  const userName = userSession?.name || 'Corporate User';

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
      {/* TOP BRAND & PORTAL SWITCHER ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* BRAND LOGO */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center font-black text-white text-base shadow-sm tracking-wider ring-2 ring-emerald-500/20">
            NK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-slate-900 font-sans">
                NJIPP KONSULT
              </span>
              <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                BMS 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Enterprise Operations & Governance Portal
            </p>
          </div>
        </div>

        {/* CENTER PORTAL SWITCHER TABS (ONLY VISIBLE FOR SUPERVISOR & EXECUTIVE) */}
        {currentRole !== 'LEVEL_1' ? (
          <div className="hidden lg:flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200 shadow-inner">
            <button
              onClick={() => onPortalChange('PORTAL_FARM')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePortal === 'PORTAL_FARM'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 ring-1 ring-emerald-500/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Wheat className={`w-3.5 h-3.5 ${activePortal === 'PORTAL_FARM' ? 'text-emerald-600' : 'text-slate-500'}`} />
              <span>Farm Operations</span>
            </button>

            <button
              onClick={() => onPortalChange('PORTAL_TRANSPORT')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePortal === 'PORTAL_TRANSPORT'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 ring-1 ring-blue-500/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Truck className={`w-3.5 h-3.5 ${activePortal === 'PORTAL_TRANSPORT' ? 'text-blue-600' : 'text-slate-500'}`} />
              <span>Transport Fleet</span>
            </button>

            <button
              onClick={() => onPortalChange('PORTAL_GOVERNANCE')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePortal === 'PORTAL_GOVERNANCE'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80 ring-1 ring-indigo-500/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${activePortal === 'PORTAL_GOVERNANCE' ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span>{currentRole === 'LEVEL_2' ? 'Supervisor Radar' : 'Governance & Finance'}</span>
              {pendingApprovalsCount > 0 && (
                <span className="h-4 px-1.5 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                  {pendingApprovalsCount}
                </span>
              )}
            </button>

            {currentRole === 'LEVEL_3' && (
              <button
                onClick={() => onPortalChange('PORTAL_VENTURES')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activePortal === 'PORTAL_VENTURES'
                    ? 'bg-white text-purple-700 shadow-sm border border-slate-200/80 ring-1 ring-purple-500/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${activePortal === 'PORTAL_VENTURES' ? 'text-purple-600' : 'text-slate-500'}`} />
                <span>Future Ventures</span>
              </button>
            )}
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-900 rounded-xl border border-blue-200 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Field Terminal Station Active</span>
          </div>
        )}

        {/* RIGHT CONTROLS: AUTHENTICATED USER SESSION PROFILE & LOGOUT */}
        <div className="flex items-center gap-3">
          
          {/* USER PROFILE CARD */}
          <div className="flex items-center gap-2.5 p-1.5 pr-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className={`h-8 w-8 rounded-xl flex items-center justify-center font-bold text-xs ${
              currentRole === 'LEVEL_1'
                ? 'bg-blue-600 text-white'
                : currentRole === 'LEVEL_2'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-900 text-white'
            }`}>
              {userName.split(' ').map((n) => n[0]).join('')}
            </div>
            
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {userName}
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-mono font-bold leading-tight ${
                  currentRole === 'LEVEL_1'
                    ? 'text-blue-700'
                    : currentRole === 'LEVEL_2'
                    ? 'text-amber-700'
                    : 'text-indigo-700'
                }`}>
                  {currentRole === 'LEVEL_1'
                    ? 'Layer 1: Field Entry'
                    : currentRole === 'LEVEL_2'
                    ? 'Layer 2: Supervisor'
                    : 'Layer 3: Executive MD'}
                </span>
              </div>
            </div>
          </div>

          {/* RESET DEMO DEFAULTS */}
          {onResetDemo && (
            <button
              onClick={onResetDemo}
              title="Reset all data to official factory defaults"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>
          )}

          {/* LOG OUT BUTTON */}
          <button
            onClick={onLogout}
            title="Terminate Active Session and Return to Login"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-700 border border-rose-200 hover:border-rose-700 transition-all shadow-xs cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

        </div>

      </div>

      {/* MOBILE PORTAL SWITCHER ROW (FOR LEVEL 2 & 3 ON SMALL SCREENS) */}
      {currentRole !== 'LEVEL_1' && (
        <div className="lg:hidden flex items-center gap-1 p-2 bg-slate-100 border-t border-slate-200 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => onPortalChange('PORTAL_FARM')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activePortal === 'PORTAL_FARM' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Farm
          </button>
          <button
            onClick={() => onPortalChange('PORTAL_TRANSPORT')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activePortal === 'PORTAL_TRANSPORT' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Transport
          </button>
          <button
            onClick={() => onPortalChange('PORTAL_GOVERNANCE')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activePortal === 'PORTAL_GOVERNANCE' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            {currentRole === 'LEVEL_2' ? 'Supervisor Radar' : 'Governance & POs'}
          </button>
          {currentRole === 'LEVEL_3' && (
            <button
              onClick={() => onPortalChange('PORTAL_VENTURES')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                activePortal === 'PORTAL_VENTURES' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Future Ventures
            </button>
          )}
        </div>
      )}

    </header>
  );
};
