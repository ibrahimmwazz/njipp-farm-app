'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendGood?: boolean;
  icon: React.ReactNode;
  badge?: string;
  accentColor?: 'emerald' | 'blue' | 'indigo' | 'amber' | 'purple' | 'rose';
  onClick?: () => void;
}

export const ModernMetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  change,
  trend = 'neutral',
  trendGood = true,
  icon,
  badge,
  accentColor = 'emerald',
  onClick,
}) => {
  const getAccentStyles = () => {
    switch (accentColor) {
      case 'emerald':
        return {
          iconBg: 'bg-emerald-50 text-emerald-700 ring-emerald-500/10',
          borderHover: 'hover:border-emerald-300',
          barColor: 'bg-emerald-500',
        };
      case 'blue':
        return {
          iconBg: 'bg-blue-50 text-blue-700 ring-blue-500/10',
          borderHover: 'hover:border-blue-300',
          barColor: 'bg-blue-500',
        };
      case 'indigo':
        return {
          iconBg: 'bg-indigo-50 text-indigo-700 ring-indigo-500/10',
          borderHover: 'hover:border-indigo-300',
          barColor: 'bg-indigo-500',
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-50 text-amber-700 ring-amber-500/10',
          borderHover: 'hover:border-amber-300',
          barColor: 'bg-amber-500',
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-50 text-purple-700 ring-purple-500/10',
          borderHover: 'hover:border-purple-300',
          barColor: 'bg-purple-500',
        };
      case 'rose':
        return {
          iconBg: 'bg-rose-50 text-rose-700 ring-rose-500/10',
          borderHover: 'hover:border-rose-300',
          barColor: 'bg-rose-500',
        };
    }
  };

  const styles = getAccentStyles();

  const isPositive = (trend === 'up' && trendGood) || (trend === 'down' && !trendGood);
  const isNegative = (trend === 'down' && trendGood) || (trend === 'up' && !trendGood);

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 ' + styles.borderHover : ''
      }`}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
          {title}
        </span>
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ring-1 ${styles.iconBg}`}>
          {icon}
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mt-3">
        <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono-num">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-0.5 font-medium line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Trend & Context Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {change ? (
          <div className="flex items-center gap-1.5 font-semibold">
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded-md font-mono text-[11px] ${
                isPositive
                  ? 'bg-emerald-50 text-emerald-700'
                  : isNegative
                  ? 'bg-rose-50 text-rose-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
              {trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {trend === 'neutral' && <Minus className="w-3.5 h-3.5 mr-0.5" />}
              {change}
            </span>
            <span className="text-slate-400 font-normal">vs prev shift</span>
          </div>
        ) : (
          <span className="text-slate-400 font-normal text-[11px]">Daily target on track</span>
        )}

        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};
