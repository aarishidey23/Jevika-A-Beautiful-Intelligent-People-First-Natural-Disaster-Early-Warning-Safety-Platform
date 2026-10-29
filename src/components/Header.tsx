import React from 'react';
import { ShieldAlert, Globe, Smartphone, Monitor } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isMobileSimulator: boolean;
  onToggleMobileSimulator: () => void;
  onOpenSafeModal: () => void;
  isUserSafe: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onLanguageChange,
  isMobileSimulator,
  onToggleMobileSimulator,
  onOpenSafeModal,
  isUserSafe,
}) => {
  const navItems = [
    { id: 'alerts', label: 'Emergency Alerts' },
    { id: 'family', label: 'Family Check-In' },
    { id: 'map', label: 'Shelters & Routes' },
    { id: 'readiness', label: '72h Readiness' },
    { id: 'radio', label: 'Calm Radio' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FAFBF7]/95 backdrop-blur-md border-b border-[#263746]/10">
      {/* Critical Safety Notice: Always visible, prominent demo indicator */}
      <div className="bg-[#fff3cd] border-b border-[#ffeeba] px-4 py-1.5 text-center text-xs font-bold text-[#856404] flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#E88745] shrink-0" />
        <span>
          DEMO / TRAINING MODE — NOT CONNECTED TO LIVE EMERGENCY SERVICES.
        </span>
        <span className="hidden sm:inline">In a real emergency, call:</span>
        <a href="tel:112" className="underline font-extrabold text-[#93000a] hover:text-[#ba1a1a]">
          Dial 112
        </a>
        <span className="text-[#856404]/50">|</span>
        <a href="tel:1078" className="underline font-extrabold text-[#93000a] hover:text-[#ba1a1a]">
          NDRF 1078
        </a>
      </div>

      {/* Strict Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (Primary Action) */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8 px-4 sm:px-8 py-3">
        
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#167D78] flex items-center justify-center text-white shadow-sm">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <button
            onClick={() => onSelectTab('alerts')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-lg font-bold tracking-tight text-[#263746] whitespace-nowrap block">
              Jeevika
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#263746]/80">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                  isActive
                    ? 'text-[#167D78] border-b-2 border-[#167D78] font-bold'
                    : 'hover:text-[#263746] text-[#263746]/70'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Utility controls (Language & Mobile Simulator) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Language Selector */}
          <div className="relative flex items-center bg-[#ecf4ff] rounded-lg px-2 py-1 text-xs font-semibold text-[#263746]">
            <Globe className="w-3.5 h-3.5 mr-1 text-[#167D78]" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="bg-transparent border-none text-xs font-semibold text-[#263746] focus:outline-none cursor-pointer"
              aria-label="Select language"
            >
              <option value="en">EN (English)</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="bn">বাংলা (Bengali)</option>
            </select>
          </div>

          {/* Device Simulator Toggle */}
          <button
            onClick={onToggleMobileSimulator}
            aria-pressed={isMobileSimulator}
            title={isMobileSimulator ? "Switch to Wide Desktop View" : "Simulate Mobile Thumb-Zone View"}
            className="p-2 rounded-lg bg-[#ecf4ff] text-[#263746] hover:bg-[#d8eafe] transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            {isMobileSimulator ? (
              <>
                <Monitor className="w-4 h-4 text-[#167D78]" />
                <span className="hidden sm:inline">Desktop</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-[#167D78]" />
                <span className="hidden sm:inline">Mobile Preview</span>
              </>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenSafeModal}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm active:scale-[0.98] ${
              isUserSafe
                ? 'bg-[#DDF4E9] text-[#13734B] hover:bg-[#c7eedc]'
                : 'bg-[#167D78] text-white hover:bg-[#126561]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isUserSafe ? 'bg-[#3D9368]' : 'bg-[#F3B94F]'}`} />
            {isUserSafe ? 'Status: Safe' : 'Mark Myself Safe'}
          </button>

        </div>

      </div>
    </header>
  );
};
