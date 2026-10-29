import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  AlertBannerList 
} from './components/AlertBannerList';
import { 
  CommunityCheckIn 
} from './components/CommunityCheckIn';
import { 
  SafeShelterMap 
} from './components/SafeShelterMap';
import { 
  PreparednessChecklist 
} from './components/PreparednessChecklist';
import { 
  EmergencyRadio 
} from './components/EmergencyRadio';
import { 
  SosModal 
} from './components/SosModal';
import { 
  MobileStickyBar 
} from './components/MobileStickyBar';
import { 
  INITIAL_ALERTS, 
  INITIAL_FAMILY, 
  SHELTERS, 
  INITIAL_CHECKLIST 
} from './data/mockData';
import { 
  EmergencyAlert, 
  FamilyMember, 
  ChecklistItem, 
  SosBeacon, 
  SupportedLanguage 
} from './types';
import { 
  ShieldCheck, 
  PhoneCall, 
  Radio, 
  Heart, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle,
  Trash2,
  Lock
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('alerts');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isMobileSimulator, setIsMobileSimulator] = useState<boolean>(false);
  const [isSosOpen, setIsSosOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Session load timestamp (authentic, not fabricated)
  const [sessionStartTime] = useState<string>(() => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  // Persistent Checklist Items via LocalStorage
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('jeevika_checklist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage not accessible for checklist', e);
    }
    return INITIAL_CHECKLIST;
  });

  // Persistent Family Members (Non-sensitive local circle state)
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    try {
      const saved = localStorage.getItem('jeevika_family_circle');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage not accessible for family circle', e);
    }
    return INITIAL_FAMILY;
  });

  const [isUserSafe, setIsUserSafe] = useState<boolean>(() => {
    const self = familyMembers.find((m) => m.id === 'fam-1');
    return self ? self.status === 'safe' : true;
  });

  // Alerts remain the static exercise scenario
  const [alerts] = useState<EmergencyAlert[]>(INITIAL_ALERTS);

  // Sync checklist changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('jeevika_checklist', JSON.stringify(checklistItems));
    } catch (e) {
      console.warn('Failed to save checklist to localStorage', e);
    }
  }, [checklistItems]);

  // Sync family circle changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('jeevika_family_circle', JSON.stringify(familyMembers));
    } catch (e) {
      console.warn('Failed to save family circle to localStorage', e);
    }
  }, [familyMembers]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleMySafe = () => {
    const nextState = !isUserSafe;
    setIsUserSafe(nextState);

    // Update self in family circle
    setFamilyMembers((prev) =>
      prev.map((m) =>
        m.id === 'fam-1'
          ? {
              ...m,
              status: nextState ? 'safe' : 'pending',
              lastPing: 'Just now',
            }
          : m
      )
    );

    showToast(
      nextState
        ? 'Your status marked as "Safe" in local session.'
        : 'Status set to Pending in local session.'
    );
  };

  const handleAddFamilyMember = (newMember: Omit<FamilyMember, 'id'>) => {
    const member: FamilyMember = {
      ...newMember,
      id: 'fam-' + Date.now(),
    };
    setFamilyMembers((prev) => [...prev, member]);
    showToast(`Added ${member.name} to local emergency circle.`);
  };

  const handlePingMember = (id: string) => {
    setFamilyMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, lastPing: 'Simulated ping sent' } : m
      )
    );
  };

  const handleResetCircle = () => {
    setFamilyMembers(INITIAL_FAMILY);
    try {
      localStorage.removeItem('jeevika_family_circle');
    } catch {}
    showToast('Family circle reset to default training template.');
  };

  const handleToggleChecklistItem = (id: string) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddChecklistItem = (newItem: Omit<ChecklistItem, 'id'>) => {
    const item: ChecklistItem = {
      ...newItem,
      id: 'chk-' + Date.now(),
    };
    setChecklistItems((prev) => [item, ...prev]);
    showToast(`Saved "${item.title}" to local survival kit.`);
  };

  const handleResetChecklist = () => {
    setChecklistItems(INITIAL_CHECKLIST);
    try {
      localStorage.removeItem('jeevika_checklist');
    } catch {}
    showToast('Survival checklist reset to standard 72h template.');
  };

  const handleClearAllLocalData = () => {
    try {
      localStorage.removeItem('jeevika_checklist');
      localStorage.removeItem('jeevika_family_circle');
    } catch {}
    setChecklistItems(INITIAL_CHECKLIST);
    setFamilyMembers(INITIAL_FAMILY);
    setIsUserSafe(true);
    showToast('All local device data cleared successfully.');
  };

  const handleAlertAction = (alert: EmergencyAlert) => {
    if (alert.category === 'Flood' || alert.title.includes('Evacuation') || alert.title.includes('Scenario')) {
      setCurrentTab('map');
      showToast('Viewing Simulated High-Ground Shelters & Corridors.');
    } else if (alert.category === 'Water') {
      setCurrentTab('map');
      showToast('Viewing Sample Water Facilities on map.');
    } else {
      setCurrentTab('readiness');
      showToast('Reviewing survival bag preparedness items.');
    }
  };

  const handleSosSubmit = (beacon: SosBeacon) => {
    showToast(`Simulated drill record ${beacon.referenceCode} logged locally.`);
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] text-[#263746] flex flex-col font-jakarta selection:bg-[#DDF4E9]">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div 
          className="fixed top-20 right-4 sm:right-8 z-50 bg-[#263746] text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200"
          role="status"
          aria-live="polite"
        >
          <CheckCircle className="w-4 h-4 text-[#3D9368]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Bar Contract with Persistent DEMO Banner */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onLanguageChange={setLanguage}
        isMobileSimulator={isMobileSimulator}
        onToggleMobileSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
        onOpenSafeModal={handleToggleMySafe}
        isUserSafe={isUserSafe}
      />

      {/* Mobile Simulator Frame Wrapper vs Desktop Container */}
      <div
        className={`flex-1 transition-all ${
          isMobileSimulator
            ? 'max-w-md mx-auto my-4 sm:my-8 bg-[#FAFBF7] border-4 sm:border-8 border-[#263746]/20 rounded-3xl sm:rounded-[42px] shadow-2xl overflow-hidden pb-24 relative min-h-[780px]'
            : 'w-full'
        }`}
      >
        {/* Simulator Device Top Speaker Bar (Only visible in mobile preview mode) */}
        {isMobileSimulator && (
          <div className="bg-[#263746]/10 py-1.5 px-4 text-center text-[10px] font-bold text-[#263746]/70 uppercase tracking-widest flex items-center justify-between border-b border-[#263746]/10">
            <span>Mobile 390px View</span>
            <div className="w-16 h-1 bg-[#263746]/30 rounded-full" />
            <span>Battery: Drill Mode</span>
          </div>
        )}

        {/* Training Exercise Status Strip */}
        <div className="bg-[#FAFBF7] border-b border-[#263746]/8 px-4 sm:px-8 py-3">
          <div className={`${isMobileSimulator ? 'px-2' : 'max-w-7xl mx-auto'} flex flex-wrap items-center justify-between gap-3 text-xs`}>
            
            <div className="flex items-center gap-2 font-bold text-[#263746]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E88745]" />
              <span className="uppercase tracking-wider text-[11px] text-[#b44800]">Drill Scenario:</span>
              <span className="font-semibold text-[#263746]/80">Mahanadi Basin Inundation Drill · Sample Dataset</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-[#263746]/70">
              <span className="hidden sm:inline">Session Loaded: {sessionStartTime}</span>
              <span className="text-[#167D78] font-bold">4 Sample Shelters Available for Testing</span>
            </div>

          </div>
        </div>

        {/* Mobile Segmented Navigation Bar */}
        <div className={`p-2 bg-white border-b border-[#263746]/10 overflow-x-auto ${isMobileSimulator ? 'block' : 'lg:hidden'}`}>
          <div className="flex items-center gap-1.5 min-w-max px-2">
            {[
              { id: 'alerts', label: 'Drill Alerts' },
              { id: 'family', label: 'Family Safe' },
              { id: 'map', label: 'Shelters Map' },
              { id: 'readiness', label: '72h Kit' },
              { id: 'radio', label: 'Audio Radio' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  currentTab === tab.id
                    ? 'bg-[#167D78] text-white shadow-xs'
                    : 'text-[#263746]/70 hover:bg-[#FAFBF7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <main className={`p-4 sm:p-8 ${isMobileSimulator ? 'px-4' : 'max-w-7xl mx-auto'}`}>
          
          {currentTab === 'alerts' && (
            <div className="space-y-8">
              <AlertBannerList
                alerts={alerts}
                onActionClick={handleAlertAction}
                onOpenSos={() => setIsSosOpen(true)}
              />

              {/* In Desktop Mode, embed preview of the Specialty Community Check-In Card */}
              {!isMobileSimulator && (
                <div className="pt-6 border-t border-[#263746]/10">
                  <CommunityCheckIn
                    familyMembers={familyMembers}
                    onToggleMySafe={handleToggleMySafe}
                    onAddMember={handleAddFamilyMember}
                    onPingMember={handlePingMember}
                    onResetCircle={handleResetCircle}
                    isUserSafe={isUserSafe}
                  />
                </div>
              )}
            </div>
          )}

          {currentTab === 'family' && (
            <CommunityCheckIn
              familyMembers={familyMembers}
              onToggleMySafe={handleToggleMySafe}
              onAddMember={handleAddFamilyMember}
              onPingMember={handlePingMember}
              onResetCircle={handleResetCircle}
              isUserSafe={isUserSafe}
            />
          )}

          {currentTab === 'map' && (
            <SafeShelterMap
              shelters={SHELTERS}
            />
          )}

          {currentTab === 'readiness' && (
            <PreparednessChecklist
              items={checklistItems}
              onToggleItem={handleToggleChecklistItem}
              onAddItem={handleAddChecklistItem}
              onResetChecklist={handleResetChecklist}
            />
          )}

          {currentTab === 'radio' && (
            <EmergencyRadio
              language={language}
              onLanguageChange={setLanguage}
            />
          )}

        </main>
      </div>

      {/* Emergency SOS Modal (With Touch-Hold Mechanism & Real Calling Options) */}
      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        onSubmitSos={handleSosSubmit}
      />

      {/* Mobile Ergonomic Sticky Bottom Bar (Displays on mobile or inside desktop simulator) */}
      <MobileStickyBar
        onOpenSafeModal={handleToggleMySafe}
        onOpenSos={() => setIsSosOpen(true)}
        isUserSafe={isUserSafe}
        isSimulatorActive={isMobileSimulator}
      />

      {/* Footer strictly for quiet trust and emergency helplines */}
      <footer className="mt-auto border-t border-[#263746]/10 bg-white px-4 sm:px-8 py-6 text-xs text-[#263746]/70 pb-20 lg:pb-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-[#167D78] text-white flex items-center justify-center font-bold text-xs">
              J
            </div>
            <span className="font-bold text-[#263746]">
              Jeevika Humanitarian Safety Platform
            </span>
            <span aria-hidden="true" className="text-[#263746]/30">·</span>
            <span>Training & Demonstration Environment</span>
          </div>

          {/* Accessible Clickable Telephone Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 font-semibold text-[#263746]/80">
            <a
              href="tel:112"
              className="flex items-center gap-1.5 text-[#93000a] hover:underline cursor-pointer font-bold"
              title="Call National Emergency Number"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>National Emergency: 112</span>
            </a>

            <a
              href="tel:1078"
              className="flex items-center gap-1.5 text-[#C94242] hover:underline cursor-pointer"
              title="Call National Disaster Response Force Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>NDRF Hotline: 1078</span>
            </a>

            <a
              href="tel:108"
              className="flex items-center gap-1.5 text-[#167D78] hover:underline cursor-pointer"
              title="Call Medical Emergency Ambulance"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Medical Emergency: 108</span>
            </a>

            <button
              onClick={handleClearAllLocalData}
              className="text-[#263746]/50 hover:text-[#93000a] flex items-center gap-1 cursor-pointer transition-colors"
              title="Clear all stored checklist and circle data on this device"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Local Data</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
