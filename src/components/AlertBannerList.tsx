import React, { useState } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  Flame, 
  Droplets, 
  CloudRain, 
  Wind, 
  ChevronRight, 
  Filter, 
  MapPin, 
  Clock, 
  Users 
} from 'lucide-react';
import { EmergencyAlert, HazardLevel } from '../types';

interface AlertBannerListProps {
  alerts: EmergencyAlert[];
  onActionClick: (alert: EmergencyAlert) => void;
  onOpenSos: () => void;
}

export const AlertBannerList: React.FC<AlertBannerListProps> = ({
  alerts,
  onActionClick,
  onOpenSos,
}) => {
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter((alert) => {
    const matchesLevel = filterLevel === 'all' || alert.level === filterLevel;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.locationArea.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getSeverityPill = (level: HazardLevel) => {
    switch (level) {
      case 'urgent':
        return {
          label: 'URGENT HAZARD · SOS',
          icon: <Flame className="w-3.5 h-3.5 text-[#C94242]" />,
          dotColor: 'bg-[#C94242]',
          badgeBg: 'bg-[#ffdad6] text-[#93000a] border border-[#C94242]/20',
          borderColor: 'border-l-[#C94242]',
        };
      case 'warning':
        return {
          label: 'IMPORTANT WARNING',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-[#E88745]" />,
          dotColor: 'bg-[#E88745]',
          badgeBg: 'bg-[#ffeedd] text-[#b44800] border border-[#E88745]/20',
          borderColor: 'border-l-[#E88745]',
        };
      case 'caution':
        return {
          label: 'CAUTION · WATCH',
          icon: <AlertCircle className="w-3.5 h-3.5 text-[#b27906]" />,
          dotColor: 'bg-[#F3B94F]',
          badgeBg: 'bg-[#fef9ec] text-[#845b04] border border-[#F3B94F]/40',
          borderColor: 'border-l-[#F3B94F]',
        };
      case 'safe':
      default:
        return {
          label: 'VERIFIED SAFE',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#3D9368]" />,
          dotColor: 'bg-[#3D9368]',
          badgeBg: 'bg-[#DDF4E9] text-[#13734B] border border-[#3D9368]/20',
          borderColor: 'border-l-[#3D9368]',
        };
    }
  };

  const getCategoryIcon = (cat: EmergencyAlert['category']) => {
    switch (cat) {
      case 'Flood':
        return <Droplets className="w-4 h-4 text-[#167D78]" />;
      case 'Cyclone':
      case 'Storm Surge':
        return <Wind className="w-4 h-4 text-[#167D78]" />;
      default:
        return <CloudRain className="w-4 h-4 text-[#167D78]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Advisory Banner & Emergency Callout */}
      <div className="bg-[#DCEFFC] border border-[#263746]/10 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 text-[#167D78] shadow-sm">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="px-2 py-0.5 bg-[#b44800]/10 text-[#b44800] rounded text-[10px] font-extrabold uppercase tracking-wider">
                Simulation Drill Dataset
              </span>
            </div>
            <h2 className="text-base font-bold text-[#263746] tracking-tight">
              Monsoon River Basin Surge · Exercise Scenario Tier 3
            </h2>
            <p className="text-sm text-[#263746]/80 mt-0.5">
              Training data for humanitarian drills. Not connected to live feeds. In real emergencies, call 112 / 1078.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSos}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-[#C94242] hover:bg-[#b03030] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <Flame className="w-4 h-4" />
            <span>Simulate SOS (Drill)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#263746]/10 rounded-xl shadow-xs overflow-x-auto">
          {[
            { id: 'all', label: 'All Drill Bulletins' },
            { id: 'urgent', label: 'Urgent Hazards' },
            { id: 'warning', label: 'Warnings' },
            { id: 'caution', label: 'Watches' },
            { id: 'safe', label: 'Cleared Safe' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterLevel(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterLevel === tab.id
                  ? 'bg-[#167D78] text-white shadow-xs'
                  : 'text-[#263746]/70 hover:text-[#263746] hover:bg-[#FAFBF7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search simulated alerts..."
            aria-label="Search simulated disaster bulletins"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-white border border-[#263746]/20 rounded-xl px-3.5 py-2 text-xs text-[#263746] placeholder-[#263746]/50 focus:outline-none focus:border-[#167D78] focus:ring-2 focus:ring-[#167D78]/20"
          />
        </div>
      </div>

      {/* Alert Cards Container */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white border border-[#263746]/10 rounded-2xl p-12 text-center text-[#263746]/70">
            <CheckCircle2 className="w-10 h-10 text-[#3D9368] mx-auto mb-2" />
            <p className="font-semibold text-base text-[#263746]">No alerts matching criteria</p>
            <p className="text-xs text-[#263746]/60 mt-1">All monitoring sectors in this category are nominal.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const config = getSeverityPill(alert.level);

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl border border-[#263746]/10 border-l-[6px] ${config.borderColor} p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
              >
                {/* 3-Part Anatomy: 1. Severity Indicator + Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    {/* Status Chip: Pill-shaped, 6px 14px padding, 8px solid dot indicator */}
                    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${config.badgeBg}`}>
                      <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
                      <span>{config.label}</span>
                    </div>

                    <span className="text-xs font-semibold text-[#263746]/50 uppercase tracking-wider">
                      {alert.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#263746]/70">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#167D78]" />
                      <span>{alert.timestamp}</span>
                    </span>
                    <span aria-hidden="true" className="text-[#263746]/30">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#167D78]" />
                      <span>{alert.locationArea}</span>
                    </span>
                  </div>
                </div>

                {/* 2. Core Message: Bold plain-language instruction */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryIcon(alert.category)}
                    <h3 className="text-lg font-bold text-[#263746] tracking-tight">
                      {alert.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#263746]/90 font-normal">
                    {alert.message}
                  </p>
                </div>

                {/* 3. Prescribed Action: Single clear button */}
                <div className="pt-3 border-t border-[#263746]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#263746]/70">
                    <Users className="w-4 h-4 text-[#167D78]" />
                    <span>Estimated {alert.affectedCount.toLocaleString()} residents in sector</span>
                  </div>

                  <button
                    onClick={() => onActionClick(alert)}
                    className="h-[46px] sm:h-10 px-5 rounded-xl bg-[#167D78] hover:bg-[#126561] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xs cursor-pointer"
                  >
                    <span>{alert.prescribedAction}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
