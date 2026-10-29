import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  AlertTriangle, 
  Phone, 
  Check, 
  X, 
  Droplet, 
  Zap, 
  Stethoscope, 
  PawPrint, 
  Accessibility, 
  Layers, 
  Mountain,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { Shelter } from '../types';

interface SafeShelterMapProps {
  shelters: Shelter[];
  onSelectShelter?: (shelter: Shelter) => void;
}

export const SafeShelterMap: React.FC<SafeShelterMapProps> = ({
  shelters,
}) => {
  const [selectedShelterId, setSelectedShelterId] = useState<string>(shelters[0]?.id || 'sh-1');
  const [showFloodZoneLayer, setShowFloodZoneLayer] = useState(true);
  const [showSafeCorridors, setShowSafeCorridors] = useState(true);
  const [filterPetFriendly, setFilterPetFriendly] = useState(false);
  const [filterMedical, setFilterMedical] = useState(false);
  const [navigationActive, setNavigationActive] = useState(false);

  const activeShelter = shelters.find((s) => s.id === selectedShelterId) || shelters[0];

  const displayedShelters = shelters.filter((s) => {
    if (filterPetFriendly && !s.amenities.petFriendly) return false;
    if (filterMedical && !s.amenities.medicalStaff) return false;
    return true;
  });

  const getStatusBadge = (status: Shelter['status']) => {
    switch (status) {
      case 'Open':
        return {
          bg: 'bg-[#DDF4E9] text-[#13734B]',
          dot: 'bg-[#3D9368]',
          text: 'Open · Beds Available',
        };
      case 'Filling Fast':
        return {
          bg: 'bg-[#fef9ec] text-[#845b04]',
          dot: 'bg-[#F3B94F]',
          text: 'Filling Fast · <20% Left',
        };
      case 'Full':
      default:
        return {
          bg: 'bg-[#ffeedd] text-[#b44800]',
          dot: 'bg-[#E88745]',
          text: 'Capacity Full · Redirecting',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Control & Filter Strip */}
      <div className="bg-white rounded-2xl border border-[#263746]/10 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#b44800]/10 text-[#b44800]">
              Simulation Dataset
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#263746] tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#167D78]" />
            <span>Evacuation Routes & Certified Shelters</span>
          </h2>
          <p className="text-xs text-[#263746]/70 mt-0.5">
            Topological drill map. Shelter occupancies and route statuses are simulated for training exercises.
          </p>
        </div>

        {/* Toggle Layers */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowSafeCorridors(!showSafeCorridors)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showSafeCorridors
                ? 'bg-[#167D78] text-white shadow-xs'
                : 'bg-[#ecf4ff] text-[#263746] hover:bg-[#d8eafe]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Demo Safe Corridors</span>
          </button>

          <button
            onClick={() => setShowFloodZoneLayer(!showFloodZoneLayer)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showFloodZoneLayer
                ? 'bg-[#DCEFFC] text-[#167D78] border border-[#167D78]/30'
                : 'bg-[#ecf4ff] text-[#263746] hover:bg-[#d8eafe]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#167D78]" />
            <span>Simulated Inundation</span>
          </button>

          <button
            onClick={() => setFilterMedical(!filterMedical)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              filterMedical
                ? 'bg-[#00635E] text-white'
                : 'bg-[#ecf4ff] text-[#263746] hover:bg-[#d8eafe]'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Medical Facilities</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map Visual + Shelter Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Tactical Map (7 cols on lg) */}
        <div className="lg:col-span-7 bg-[#ebf3f7] rounded-3xl border border-[#263746]/10 shadow-md p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between min-h-[440px]">
          
          {/* Map Header Status Indicator */}
          <div className="relative z-10 flex items-center justify-between pointer-events-none mb-2">
            <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#263746]/10 shadow-xs pointer-events-auto flex items-center gap-2 text-xs font-bold text-[#263746]">
              <span className="w-2 h-2 rounded-full bg-[#3D9368]" />
              <span>North Ridge Corridor: All Clear</span>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#263746]/10 shadow-xs pointer-events-auto text-xs font-semibold text-[#263746]/80 flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-[#167D78]" />
              <span>Datum: +35m Elevation</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] my-auto">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full rounded-2xl overflow-hidden select-none"
              style={{ backgroundColor: '#f1f7fa' }}
            >
              {/* Topographical Contour Shading (Elevation) */}
              <circle cx="50" cy="40" r="44" fill="#e2edf5" opacity="0.6" />
              <circle cx="50" cy="40" r="32" fill="#d2e3ee" opacity="0.6" />
              <circle cx="50" cy="40" r="18" fill="#c3daf0" opacity="0.7" />

              {/* River Mahanadi Path (Bottom diagonal) */}
              <path
                d="M -10,85 Q 30,70 60,88 T 110,82"
                fill="none"
                stroke="#8ecae6"
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Flood Inundation Zone (if enabled) */}
              {showFloodZoneLayer && (
                <path
                  d="M -10,95 Q 30,78 60,94 T 110,88 L 110,105 L -10,105 Z"
                  fill="#DCEFFC"
                  opacity="0.8"
                />
              )}

              {/* Submerged / Closed Bridge Marker */}
              {showFloodZoneLayer && (
                <g transform="translate(42, 75)">
                  <rect x="-6" y="-3" width="12" height="6" rx="2" fill="#C94242" />
                  <text x="0" y="1" fill="#ffffff" fontSize="2.8" fontWeight="bold" textAnchor="middle">
                    CLOSED
                  </text>
                </g>
              )}

              {/* Safe Corridors (Green highlighted evacuation routes) */}
              {showSafeCorridors && (
                <>
                  {/* Route Alpha: High Ground Spine */}
                  <path
                    d="M 15,35 Q 32,28 50,30 T 75,65"
                    fill="none"
                    stroke="#167D78"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                  {/* Route Beta: West Link */}
                  <path
                    d="M 32,28 L 68,22"
                    fill="none"
                    stroke="#3D9368"
                    strokeWidth="2"
                  />
                </>
              )}

              {/* Shelter Interactive Markers */}
              {displayedShelters.map((shelter) => {
                const isSelected = shelter.id === selectedShelterId;
                const isFull = shelter.status === 'Full';
                const markerColor = isFull ? '#E88745' : shelter.status === 'Filling Fast' ? '#F3B94F' : '#167D78';

                return (
                  <g
                    key={shelter.id}
                    className="cursor-pointer transition-transform duration-150 hover:scale-110"
                    onClick={() => setSelectedShelterId(shelter.id)}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle
                        cx={shelter.coordinates.x}
                        cy={shelter.coordinates.y}
                        r="8"
                        fill="none"
                        stroke={markerColor}
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    )}

                    {/* Outer pin background */}
                    <circle
                      cx={shelter.coordinates.x}
                      cy={shelter.coordinates.y}
                      r="4.5"
                      fill={isSelected ? '#00635E' : markerColor}
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                    />

                    {/* Inner icon mark */}
                    <circle
                      cx={shelter.coordinates.x}
                      cy={shelter.coordinates.y}
                      r="1.6"
                      fill="#ffffff"
                    />

                    {/* Label */}
                    <text
                      x={shelter.coordinates.x}
                      y={shelter.coordinates.y - 6}
                      fill="#263746"
                      fontSize="3.2"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="select-none pointer-events-none drop-shadow-xs"
                    >
                      {shelter.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}

              {/* User Current Position Ping */}
              <g transform="translate(18, 38)">
                <circle cx="0" cy="0" r="5" fill="#3D9368" opacity="0.3" />
                <circle cx="0" cy="0" r="2.8" fill="#3D9368" stroke="#ffffff" strokeWidth="0.8" />
                <text x="0" y="6" fill="#13734B" fontSize="2.8" fontWeight="bold" textAnchor="middle">
                  You Are Here
                </text>
              </g>
            </svg>
          </div>

          {/* Map Legend */}
          <div className="relative z-10 pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#263746]/80 font-semibold border-t border-[#263746]/10">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#167D78]" />
                <span>Certified Shelter</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-1 bg-[#167D78] rounded-full" />
                <span>Elevated Safe Route</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#C94242]" />
                <span>Inundated Hazard</span>
              </span>
            </div>
            <span>Scale: 1cm = 500m</span>
          </div>

        </div>

        {/* Shelter Detail Inspector Card (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#263746]/10 p-6 shadow-md flex flex-col justify-between">
          <div>
            {/* Shelter Status Pill & Distance */}
            <div className="flex items-center justify-between gap-2 mb-3">
              {(() => {
                const badge = getStatusBadge(activeShelter.status);
                return (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${badge.bg}`}>
                    <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                    <span>{badge.text}</span>
                  </span>
                );
              })()}

              <span className="text-xs font-bold text-[#167D78]">
                {activeShelter.distanceKm} km away
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-[#263746] tracking-tight">
              {activeShelter.name}
            </h3>
            <p className="text-xs text-[#263746]/70 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#167D78] shrink-0" />
              <span>{activeShelter.address}</span>
            </p>

            {/* Metrics Row: Elevation & Capacity */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-[#FAFBF7] border border-[#263746]/8 rounded-2xl p-3.5">
                <span className="text-[11px] font-semibold text-[#263746]/60 uppercase tracking-wider block">
                  Ground Elevation
                </span>
                <span className="text-xl font-extrabold text-[#167D78] tabular-nums mt-0.5 block">
                  +{activeShelter.elevationMeters}m
                </span>
                <span className="text-[11px] text-[#3D9368] font-bold">
                  High flood security
                </span>
              </div>

              <div className="bg-[#FAFBF7] border border-[#263746]/8 rounded-2xl p-3.5">
                <span className="text-[11px] font-semibold text-[#263746]/60 uppercase tracking-wider block">
                  Bed Occupancy
                </span>
                <span className="text-xl font-extrabold text-[#263746] tabular-nums mt-0.5 block">
                  {activeShelter.capacityOccupied} / {activeShelter.capacityTotal}
                </span>
                <span className="text-[11px] text-[#263746]/60 font-semibold">
                  {activeShelter.capacityTotal - activeShelter.capacityOccupied} beds open
                </span>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="mb-5">
              <div className="w-full bg-[#ecf4ff] h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    activeShelter.capacityOccupied / activeShelter.capacityTotal > 0.85
                      ? 'bg-[#E88745]'
                      : 'bg-[#167D78]'
                  }`}
                  style={{
                    width: `${Math.min(100, (activeShelter.capacityOccupied / activeShelter.capacityTotal) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Verified Amenities Grid */}
            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-[#263746] uppercase tracking-wider block">
                Shelter Facilities & Medical Care
              </span>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`p-2 rounded-xl flex items-center gap-2 font-semibold ${activeShelter.amenities.cleanWater ? 'bg-[#DDF4E9] text-[#13734B]' : 'bg-[#FAFBF7] text-[#263746]/40'}`}>
                  <Droplet className="w-4 h-4 text-[#167D78]" />
                  <span>Potable Water Depot</span>
                </div>

                <div className={`p-2 rounded-xl flex items-center gap-2 font-semibold ${activeShelter.amenities.generators ? 'bg-[#DDF4E9] text-[#13734B]' : 'bg-[#FAFBF7] text-[#263746]/40'}`}>
                  <Zap className="w-4 h-4 text-[#167D78]" />
                  <span>Emergency Power</span>
                </div>

                <div className={`p-2 rounded-xl flex items-center gap-2 font-semibold ${activeShelter.amenities.medicalStaff ? 'bg-[#DDF4E9] text-[#13734B]' : 'bg-[#FAFBF7] text-[#263746]/40'}`}>
                  <Stethoscope className="w-4 h-4 text-[#167D78]" />
                  <span>On-Site Nurse & EMT</span>
                </div>

                <div className={`p-2 rounded-xl flex items-center gap-2 font-semibold ${activeShelter.amenities.petFriendly ? 'bg-[#DDF4E9] text-[#13734B]' : 'bg-[#FAFBF7] text-[#263746]/40'}`}>
                  <PawPrint className="w-4 h-4 text-[#167D78]" />
                  <span>Pet-Friendly Quarters</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons: Genuine external directions + Drill overlay */}
          <div className="space-y-2.5 pt-4 border-t border-[#263746]/8">
            <button
              onClick={() => setNavigationActive(!navigationActive)}
              className="w-full h-11 rounded-2xl bg-[#167D78] hover:bg-[#126561] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>{navigationActive ? 'Active Drill Corridor Overlay (Route A)' : 'Preview Drill Route Corridor (Route A)'}</span>
            </button>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeShelter.address + ', Odisha, India')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-2xl bg-[#ecf4ff] hover:bg-[#d8eafe] text-[#167D78] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Open Shelter Address in Google Maps</span>
            </a>

            <a
              href={`tel:${activeShelter.contactPhone}`}
              className="w-full h-10 rounded-2xl bg-[#FAFBF7] hover:bg-[#ecf4ff] border border-[#263746]/15 text-[#263746] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#167D78]" />
              <span>Call Intake Desk: {activeShelter.contactPhone}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
