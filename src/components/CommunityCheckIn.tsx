import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Battery, 
  MapPin, 
  UserPlus, 
  BellRing, 
  HeartHandshake, 
  Check, 
  AlertCircle,
  Share2,
  ShieldCheck,
  Trash2,
  Lock
} from 'lucide-react';
import { FamilyMember } from '../types';

interface CommunityCheckInProps {
  familyMembers: FamilyMember[];
  onToggleMySafe: () => void;
  onAddMember: (member: Omit<FamilyMember, 'id'>) => void;
  onPingMember: (id: string) => void;
  onResetCircle?: () => void;
  isUserSafe: boolean;
}

export const CommunityCheckIn: React.FC<CommunityCheckInProps> = ({
  familyMembers,
  onToggleMySafe,
  onAddMember,
  onPingMember,
  onResetCircle,
  isUserSafe,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('');
  const [newMemberLocation, setNewMemberLocation] = useState('');
  const [pingFeedback, setPingFeedback] = useState<string | null>(null);

  const safeCount = familyMembers.filter((m) => m.status === 'safe').length;
  const totalCount = familyMembers.length;
  const isAllSafe = safeCount === totalCount;

  // Escape key listener for Add Member Modal
  useEffect(() => {
    if (!showAddModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAddModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAddModal]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const initials = newMemberName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    onAddMember({
      name: newMemberName.trim(),
      relation: newMemberRelation.trim() || 'Family Member',
      status: 'pending',
      avatarInitials: initials,
      avatarBg: '#00635E',
      lastPing: 'Awaiting first check-in',
      location: newMemberLocation.trim() || 'Location not updated',
      batteryPercent: 85,
      notes: 'Added to local emergency circle.',
    });

    setNewMemberName('');
    setNewMemberRelation('');
    setNewMemberLocation('');
    setShowAddModal(false);
  };

  const handleTriggerPing = (id: string, name: string) => {
    onPingMember(id);
    setPingFeedback(`Simulated check-in prompt queued for ${name}. (In production, an automated SMS prompt is triggered).`);
    setTimeout(() => setPingFeedback(null), 4000);
  };

  const handleCopyStatus = async () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const textToCopy = `Jeevika Family Circle Status (${timeStr}): ${safeCount} of ${totalCount} members confirmed safe. Generated from Jeevika Safety Platform.`;

    let success = false;

    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        success = true;
      } catch {
        // Attempt fallback
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        success = false;
      }
    }

    if (success) {
      setPingFeedback('Status summary copied! You can paste this text directly into your phone’s SMS or messaging app.');
    } else {
      setPingFeedback('Unable to auto-copy to clipboard. Please take a manual screenshot or copy manually.');
    }

    setTimeout(() => setPingFeedback(null), 4500);
  };

  return (
    <div className="space-y-6">
      {/* Specialty Component: Community Check-In Card with Soft Ivory-to-Mint Gradient Header */}
      <div className="bg-white rounded-3xl border border-[#263746]/10 shadow-md overflow-hidden">
        {/* Soft Ivory-to-Mint Gradient Header */}
        <div className="bg-gradient-to-r from-[#FAFBF7] via-[#ebf7f1] to-[#DDF4E9] p-6 sm:p-8 border-b border-[#263746]/8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#167D78]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#167D78]">
                  Family Circle (Demonstration Mode)
                </span>
                <span aria-hidden="true" className="text-[#263746]/30">·</span>
                <span className="text-xs font-semibold text-[#263746]/70">
                  {safeCount} of {totalCount} Marked Safe
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#263746] tracking-tight">
                {isAllSafe ? 'All Family Members Marked Safe' : 'Family Safety Check-In Hub'}
              </h2>
              <p className="text-sm text-[#263746]/80 mt-1 max-w-xl">
                Simulated family accountability hub. Demonstrates rapid status verification and draft SMS generation for real crises.
              </p>
            </div>

            {/* Single Prominent Tap Target: Mark Myself Safe (min 52px on mobile) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onToggleMySafe}
                className={`min-h-[52px] px-7 py-3 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] transition-all cursor-pointer ${
                  isUserSafe
                    ? 'bg-[#DDF4E9] text-[#13734B] hover:bg-[#c7eedc] border border-[#3D9368]/30'
                    : 'bg-[#167D78] hover:bg-[#126561] text-white'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{isUserSafe ? 'Status: Safe ✓' : 'Mark Myself Safe'}</span>
              </button>
            </div>
          </div>

          {/* Quick Notification Pill if ping sent or copied */}
          {pingFeedback && (
            <div className="mt-4 p-3 bg-white/95 border border-[#167D78]/30 rounded-xl text-xs font-semibold text-[#167D78] flex items-center gap-2 shadow-xs">
              <BellRing className="w-4 h-4 text-[#167D78] shrink-0" />
              <span>{pingFeedback}</span>
            </div>
          )}
        </div>

        {/* Member Cards Grid */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#263746]">
              Circle Members & Dependents
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="text-xs font-bold text-[#167D78] hover:text-[#00635E] flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ecf4ff] hover:bg-[#d8eafe] transition-colors cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add Member</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familyMembers.map((member) => {
              const isSafe = member.status === 'safe';

              return (
                <div
                  key={member.id}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                    isSafe
                      ? 'bg-white border-[#3D9368]/20 hover:border-[#3D9368]/40 shadow-xs'
                      : 'bg-[#fefcf8] border-[#F3B94F]/40 hover:border-[#F3B94F]/70 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      
                      {/* Large Scannable Avatar */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-base shadow-xs ${
                            isSafe ? 'ring-2 ring-[#3D9368]' : 'ring-2 ring-[#F3B94F]'
                          }`}
                          style={{ backgroundColor: member.avatarBg }}
                        >
                          {member.avatarInitials}
                        </div>

                        {/* Verified Safe Badge vs Pending Ring */}
                        <div
                          className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-xs ${
                            isSafe ? 'bg-[#3D9368] text-white' : 'bg-[#F3B94F] text-white'
                          }`}
                          title={isSafe ? 'Status: Safe' : 'Status: Check-In Pending'}
                        >
                          {isSafe ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                          )}
                        </div>
                      </div>

                      {/* Name & Relation */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-[#263746] tracking-tight">
                            {member.name}
                          </h4>
                        </div>
                        <p className="text-xs font-semibold text-[#263746]/60">
                          {member.relation}
                        </p>

                        <div className="flex items-center gap-3 mt-2 text-xs text-[#263746]/70">
                          <span className="flex items-center gap-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#167D78]" />
                            <span className="truncate max-w-[140px] sm:max-w-[200px]">{member.location}</span>
                          </span>
                          <span aria-hidden="true" className="text-[#263746]/30">·</span>
                          <span className="flex items-center gap-1 font-medium">
                            <Battery className="w-3.5 h-3.5 text-[#167D78]" />
                            <span>{member.batteryPercent}%</span>
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Status Pill Badge */}
                    <div className="shrink-0 text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                          isSafe
                            ? 'bg-[#DDF4E9] text-[#13734B]'
                            : 'bg-[#fef9ec] text-[#845b04]'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSafe ? 'bg-[#3D9368]' : 'bg-[#F3B94F]'
                          }`}
                        />
                        {isSafe ? 'Safe' : 'Pending'}
                      </span>
                      <p className="text-[11px] text-[#263746]/50 mt-1">
                        {member.lastPing}
                      </p>
                    </div>
                  </div>

                  {/* Notes Field */}
                  {member.notes && (
                    <div className="mt-3 pt-3 border-t border-[#263746]/6 text-xs text-[#263746]/80 flex items-start gap-1.5">
                      <span className="font-semibold text-[#263746]/60">Note:</span>
                      <span className="italic">{member.notes}</span>
                    </div>
                  )}

                  {/* Action Row */}
                  {!isSafe && (
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => handleTriggerPing(member.id, member.name)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#ecf4ff] hover:bg-[#d8eafe] text-[#167D78] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <BellRing className="w-3.5 h-3.5" />
                        <span>Simulate Check-in Ping</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Privacy Notice & Clipboard Actions Footer */}
        <div className="bg-[#FAFBF7] px-6 py-4 border-t border-[#263746]/8 flex flex-col md:flex-row items-center justify-between text-xs text-[#263746]/70 gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#167D78] shrink-0" />
            <span>
              <strong>Local Privacy Notice:</strong> Circle data is stored locally in your browser and is never sent to external servers.
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {onResetCircle && (
              <button
                onClick={onResetCircle}
                className="flex items-center gap-1 font-bold text-[#b44800] hover:text-[#93000a] cursor-pointer"
                title="Reset family circle back to default template"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Circle Data</span>
              </button>
            )}

            <button
              onClick={handleCopyStatus}
              className="flex items-center gap-1.5 font-bold text-[#167D78] hover:text-[#00635E] cursor-pointer px-3 py-1.5 rounded-xl bg-[#ecf4ff] hover:bg-[#d8eafe] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Copy Status for SMS Relay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Member Modal with Semantic Labels & Keyboard Accessibility */}
      {showAddModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-member-title"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#263746]/10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#263746]/10">
              <h3 id="add-member-title" className="text-lg font-bold text-[#263746]">
                Add Family Circle Member
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-[#ecf4ff] text-[#263746] font-bold flex items-center justify-center hover:bg-[#d8eafe] cursor-pointer"
                aria-label="Close modal (Escape)"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label htmlFor="new-member-name" className="block text-xs font-bold text-[#263746] mb-1">
                  Full Name <span className="text-[#C94242]">*</span>
                </label>
                <input
                  id="new-member-name"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full bg-white border border-[#263746]/20 rounded-xl px-3.5 py-2.5 text-sm text-[#263746] focus:outline-none focus:border-[#167D78] focus:ring-2 focus:ring-[#167D78]/20"
                />
              </div>

              <div>
                <label htmlFor="new-member-relation" className="block text-xs font-bold text-[#263746] mb-1">
                  Relationship / Role
                </label>
                <input
                  id="new-member-relation"
                  type="text"
                  placeholder="e.g. Father, Daughter, Neighbor"
                  value={newMemberRelation}
                  onChange={(e) => setNewMemberRelation(e.target.value)}
                  className="w-full bg-white border border-[#263746]/20 rounded-xl px-3.5 py-2.5 text-sm text-[#263746] focus:outline-none focus:border-[#167D78] focus:ring-2 focus:ring-[#167D78]/20"
                />
              </div>

              <div>
                <label htmlFor="new-member-location" className="block text-xs font-bold text-[#263746] mb-1">
                  Assumed or Last Known Location
                </label>
                <input
                  id="new-member-location"
                  type="text"
                  placeholder="e.g. Sector 2 High Ground Colony"
                  value={newMemberLocation}
                  onChange={(e) => setNewMemberLocation(e.target.value)}
                  className="w-full bg-white border border-[#263746]/20 rounded-xl px-3.5 py-2.5 text-sm text-[#263746] focus:outline-none focus:border-[#167D78] focus:ring-2 focus:ring-[#167D78]/20"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#263746]/20 text-xs font-bold text-[#263746] hover:bg-[#FAFBF7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#167D78] hover:bg-[#126561] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
