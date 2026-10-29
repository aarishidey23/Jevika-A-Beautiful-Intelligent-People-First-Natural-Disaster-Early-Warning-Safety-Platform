import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, 
  MapPin, 
  Battery, 
  Users, 
  CheckCircle2, 
  X, 
  AlertTriangle, 
  ShieldAlert,
  Radio,
  PhoneCall,
  Crosshair
} from 'lucide-react';
import { SosBeacon } from '../types';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSos: (beacon: SosBeacon) => void;
}

export const SosModal: React.FC<SosModalProps> = ({
  isOpen,
  onClose,
  onSubmitSos,
}) => {
  const [triageType, setTriageType] = useState<SosBeacon['triageType']>('trapped_flood');
  const [peopleCount, setPeopleCount] = useState<number>(3);
  const [notes, setNotes] = useState('');
  
  // Real vs Simulated Geolocation State
  const [locationStatus, setLocationStatus] = useState<'requesting' | 'live' | 'simulated'>('simulated');
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
    accuracy?: number;
    altitude?: number;
  }>({
    latitude: 20.2961,
    longitude: 85.8245,
    altitude: 18.4,
  });

  // Battery detection if available
  const [batteryLevel, setBatteryLevel] = useState<number | undefined>(undefined);

  // Touch-and-hold state
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);
  const [dispatchedBeacon, setDispatchedBeacon] = useState<SosBeacon | null>(null);

  const holdTimerRef = useRef<number | null>(null);
  const holdStartTimeRef = useRef<number>(0);
  const HOLD_DURATION = 2200; // 2.2 seconds hold

  // Reset and request geolocation cleanly when modal opens
  useEffect(() => {
    if (!isOpen) {
      setHoldProgress(0);
      setIsHolding(false);
      setIsDispatched(false);
      setDispatchedBeacon(null);
      return;
    }

    // Escape key listener for accessible dismissal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Geolocation attempt
    if ('geolocation' in navigator) {
      setLocationStatus('requesting');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            latitude: Number(pos.coords.latitude.toFixed(5)),
            longitude: Number(pos.coords.longitude.toFixed(5)),
            accuracy: Math.round(pos.coords.accuracy),
            altitude: pos.coords.altitude ? Math.round(pos.coords.altitude) : undefined,
          });
          setLocationStatus('live');
        },
        () => {
          // Denied or timeout: fallback to sample training coordinates with explicit label
          setLocationStatus('simulated');
        },
        { timeout: 6000, enableHighAccuracy: true }
      );
    } else {
      setLocationStatus('simulated');
    }

    // Battery API check (safe progressive enhancement)
    if ('getBattery' in navigator) {
      (navigator as any).getBattery?.().then((bat: any) => {
        setBatteryLevel(Math.round(bat.level * 100));
      }).catch(() => {});
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const startHold = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isDispatched) return;

    setIsHolding(true);
    holdStartTimeRef.current = Date.now();

    holdTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progress = Math.min(100, (elapsed / HOLD_DURATION) * 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        clearInterval(holdTimerRef.current!);
        triggerDispatch();
      }
    }, 30);
  };

  const cancelHold = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setIsHolding(false);
    setHoldProgress(0);
  };

  const triggerDispatch = () => {
    const beacon: SosBeacon = {
      id: 'beacon-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      triageType,
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      accuracyMeters: coords.accuracy,
      isLiveLocation: locationStatus === 'live',
      batteryLevel: batteryLevel,
      peopleCount,
      notes: notes || 'Simulated drill beacon entry.',
      dispatched: true,
      referenceCode: 'DRILL-' + Math.floor(100000 + Math.random() * 900000),
    };

    setDispatchedBeacon(beacon);
    setIsDispatched(true);
    onSubmitSos(beacon);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#263746]/10 animate-in fade-in zoom-in-95 duration-150 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button with Escape notice */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#FAFBF7] border border-[#263746]/10 text-[#263746] flex items-center justify-center hover:bg-[#ecf4ff] font-bold cursor-pointer"
          aria-label="Close modal (Escape)"
        >
          <X className="w-4 h-4" />
        </button>

        {!isDispatched ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-[#ffdad6] text-[#C94242] flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 id="sos-modal-title" className="text-xl font-extrabold text-[#263746] tracking-tight">
                  Emergency Assistance & SOS Drill
                </h3>
                <p className="text-xs text-[#263746]/70">
                  Simulated distress beacon workflow for training and drills.
                </p>
              </div>
            </div>

            {/* CRITICAL SAFETY DISCLAIMER — Highly visible and permanent */}
            <div className="bg-[#fff3cd] border-2 border-[#ffeeba] rounded-2xl p-4 my-3 text-xs text-[#856404]">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#E88745] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold uppercase tracking-wide text-[#93000a]">
                    TRAINING DRILL MODE — DOES NOT CONTACT REAL RESCUERS
                  </strong>
                  <p className="mt-0.5 leading-relaxed">
                    This web app is a disaster risk-reduction simulation. Triggering this button will NOT dispatch emergency personnel.
                  </p>
                </div>
              </div>

              {/* Direct Calling Hotline Grid */}
              <div className="mt-3 pt-3 border-t border-[#ffeeba] grid grid-cols-2 gap-2 text-xs font-bold">
                <a
                  href="tel:112"
                  className="px-3 py-2 bg-[#93000a] text-white rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#ba1a1a] shadow-xs cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call 112 (National)</span>
                </a>
                <a
                  href="tel:1078"
                  className="px-3 py-2 bg-[#167D78] text-white rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#126561] shadow-xs cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>NDRF: 1078</span>
                </a>
              </div>
            </div>

            {/* Location & Device Telemetry Card with Explicit Live vs Simulated Status */}
            <div className="bg-[#FAFBF7] border border-[#263746]/10 rounded-2xl p-4 my-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#167D78] flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>Location Status:</span>
                </span>
                
                {locationStatus === 'live' ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF4E9] text-[#13734B] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D9368]" />
                    <span>Live GPS Acquired (±{coords.accuracy}m)</span>
                  </span>
                ) : locationStatus === 'requesting' ? (
                  <span className="text-[10px] font-semibold text-[#263746]/60">
                    Acquiring GPS...
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef9ec] text-[#845b04] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3B94F]" />
                    <span>Simulated Drill Coordinates</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#263746]">
                <div className="flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-4 h-4 text-[#167D78]" />
                  <span>{coords.latitude}° N, {coords.longitude}° E</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <Battery className="w-4 h-4 text-[#167D78]" />
                  <span>{batteryLevel !== undefined ? `Battery: ${batteryLevel}%` : 'Battery: Nominal'}</span>
                </div>
              </div>
            </div>

            {/* Triage Selection */}
            <div className="space-y-2 mb-4">
              <label className="block text-xs font-bold text-[#263746] uppercase tracking-wider">
                Simulated Emergency Triage Type
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'trapped_flood', label: 'Flood / Trapped Water', sub: 'Rising water / roof stranded' },
                  { id: 'medical_critical', label: 'Critical Medical', sub: 'Trauma, oxygen, insulin needed' },
                  { id: 'elderly_infant', label: 'Elderly or Infant', sub: 'Mobility impaired / newborn' },
                  { id: 'structural_danger', label: 'Structural Danger', sub: 'Wall collapse / live wires' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTriageType(item.id as SosBeacon['triageType'])}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      triageType === item.id
                        ? 'border-[#C94242] bg-[#fff5f5] text-[#263746]'
                        : 'border-[#263746]/15 bg-white text-[#263746]/80 hover:bg-[#FAFBF7]'
                    }`}
                  >
                    <span className="font-bold block">{item.label}</span>
                    <span className="text-[11px] text-[#263746]/60 block mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* People Count */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#263746] mb-1.5">
                Simulated Individuals Count: <span className="text-[#167D78] font-extrabold">{peopleCount} persons</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => {
                  const isSel = peopleCount === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPeopleCount(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        isSel
                          ? 'bg-[#167D78] border-[#167D78] text-white shadow-xs'
                          : 'bg-white border-[#263746]/20 text-[#263746] hover:bg-[#FAFBF7]'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes field with proper htmlFor / id */}
            <div className="mb-5">
              <label htmlFor="sos-drill-notes" className="block text-xs font-bold text-[#263746] mb-1">
                Exercise Notes / Floor / Landmark (Optional)
              </label>
              <input
                id="sos-drill-notes"
                type="text"
                placeholder="e.g. 2nd floor balcony, red roof (exercise details)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border border-[#263746]/20 rounded-xl px-3.5 py-2 text-xs text-[#263746] focus:outline-none focus:border-[#167D78] focus:ring-2 focus:ring-[#167D78]/20"
              />
            </div>

            {/* Touch-and-Hold Activation Mechanic */}
            <div className="space-y-2">
              <div className="text-center">
                <span className="text-xs font-bold text-[#263746]/80">
                  Press and hold below for 2 seconds to simulate test SOS
                </span>
                <p className="text-[11px] text-[#263746]/50">
                  Hold mechanic prevents accidental panic triggers.
                </p>
              </div>

              {/* Touch-and-Hold Button */}
              <button
                type="button"
                onMouseDown={startHold}
                onMouseUp={cancelHold}
                onMouseLeave={cancelHold}
                onTouchStart={startHold}
                onTouchEnd={cancelHold}
                onTouchCancel={cancelHold}
                className="relative w-full min-h-[56px] rounded-2xl bg-[#C94242] hover:bg-[#b03030] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 overflow-hidden shadow-md shadow-[#C94242]/20 select-none active:scale-[0.99] transition-transform cursor-pointer"
              >
                {/* Hold Progress Bar Overlay */}
                <div
                  className="absolute inset-y-0 left-0 bg-[#93000a] transition-all duration-75"
                  style={{ width: `${holdProgress}%` }}
                />

                <span className="relative z-10 flex items-center gap-2">
                  <Flame className="w-5 h-5 fill-current" />
                  <span>{isHolding ? `Simulating Hold (${Math.round(holdProgress)}%)...` : 'HOLD TO SIMULATE SOS BEACON'}</span>
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Dispatched Confirmation View — Accurate, Truthful, and Safe */
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#DDF4E9] text-[#13734B] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D9368] block">
                Simulated Drill Beacon Logged
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#263746] tracking-tight mt-1">
                Exercise Entry Recorded Locally
              </h3>
              <p className="text-xs text-[#263746]/70 mt-1 max-w-sm mx-auto">
                This beacon is recorded inside your local session for demonstration purposes. <strong>No real rescue teams were alerted.</strong>
              </p>
            </div>

            {/* Genuine Helplines Callout */}
            <div className="bg-[#fff3cd] border border-[#ffeeba] rounded-2xl p-3.5 text-left text-xs text-[#856404]">
              <span className="font-bold block text-[#93000a] mb-1">
                Need Real Emergency Assistance?
              </span>
              <p className="mb-2">Do not rely on this simulator. Use standard phone dialer:</p>
              <div className="flex gap-2">
                <a
                  href="tel:112"
                  className="flex-1 py-1.5 px-3 bg-[#93000a] text-white rounded-lg text-center font-bold hover:bg-[#ba1a1a]"
                >
                  Dial 112 (Police / Fire / Ambulance)
                </a>
                <a
                  href="tel:1078"
                  className="flex-1 py-1.5 px-3 bg-[#167D78] text-white rounded-lg text-center font-bold hover:bg-[#126561]"
                >
                  Dial 1078 (Disaster Authority)
                </a>
              </div>
            </div>

            <div className="bg-[#FAFBF7] border border-[#263746]/10 rounded-2xl p-4 text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#263746]/60 font-semibold">Simulated Drill Ref:</span>
                <span className="font-extrabold text-[#263746]">{dispatchedBeacon?.referenceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#263746]/60 font-semibold">Coordinates Logged:</span>
                <span className="font-semibold text-[#167D78]">
                  {dispatchedBeacon?.latitude}° N, {dispatchedBeacon?.longitude}° E {dispatchedBeacon?.isLiveLocation ? '(Live)' : '(Sample)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#263746]/60 font-semibold">Transmission Status:</span>
                <span className="font-bold text-[#3D9368]">Simulated Test Completed</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#167D78] text-white font-bold text-xs hover:bg-[#126561] shadow-xs cursor-pointer"
              >
                Close & Return to Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
