import React from 'react';
import { ShieldCheck, Flame, Bell, MapPin } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenSafeModal: () => void;
  onOpenSos: () => void;
  isUserSafe: boolean;
  isSimulatorActive?: boolean;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenSafeModal,
  onOpenSos,
  isUserSafe,
  isSimulatorActive = false,
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#263746]/10 px-4 py-2.5 shadow-lg ${
        isSimulatorActive ? 'block' : 'lg:hidden'
      }`}
    >
      <div className="max-w-md mx-auto flex items-center gap-3">
        
        {/* 'I Am Safe' Primary Reassurance Button (min 52px height) */}
        <button
          onClick={onOpenSafeModal}
          className={`flex-1 min-h-[52px] rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer ${
            isUserSafe
              ? 'bg-[#DDF4E9] text-[#13734B] border border-[#3D9368]/30'
              : 'bg-[#167D78] text-white hover:bg-[#126561]'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span>{isUserSafe ? 'Status: Safe ✓' : 'Mark Myself Safe'}</span>
        </button>

        {/* 'Request Aid' / SOS Button (Solid #C94242, min 52px height) */}
        <button
          onClick={onOpenSos}
          className="min-h-[52px] px-5 rounded-2xl bg-[#C94242] hover:bg-[#b03030] text-white font-extrabold text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer shrink-0"
        >
          <Flame className="w-4 h-4 fill-current" />
          <span>SOS (Drill)</span>
        </button>

      </div>
    </div>
  );
};
