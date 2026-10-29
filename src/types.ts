export type HazardLevel = 'safe' | 'caution' | 'warning' | 'urgent';

export interface EmergencyAlert {
  id: string;
  level: HazardLevel;
  code: string; // e.g. "FL-04"
  title: string;
  category: 'Flood' | 'Cyclone' | 'Water' | 'Storm Surge' | 'Infrastructure';
  message: string;
  prescribedAction: string;
  timestamp: string;
  locationArea: string;
  affectedCount: number;
  isResolved?: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  status: 'safe' | 'pending' | 'needs_aid';
  avatarInitials: string;
  avatarBg: string;
  lastPing: string;
  location: string;
  batteryPercent: number;
  hasMedicalNeed?: boolean;
  notes?: string;
}

export interface Shelter {
  id: string;
  name: string;
  type: 'Civic Hall' | 'School Campus' | 'Stadium' | 'Hospital Annex';
  address: string;
  distanceKm: number;
  elevationMeters: number;
  capacityTotal: number;
  capacityOccupied: number;
  status: 'Open' | 'Filling Fast' | 'Full';
  amenities: {
    cleanWater: boolean;
    generators: boolean;
    medicalStaff: boolean;
    petFriendly: boolean;
    wheelchairAccessible: boolean;
  };
  contactPhone: string;
  coordinates: { x: number; y: number }; // Percentage for interactive map
}

export interface ChecklistItem {
  id: string;
  category: 'Water & Food' | 'Medical' | 'Documents' | 'Power & Light' | 'Sanitation';
  title: string;
  description: string;
  completed: boolean;
  isEssential: boolean;
}

export interface SosBeacon {
  id: string;
  timestamp: string;
  triageType: 'trapped_flood' | 'medical_critical' | 'elderly_infant' | 'structural_danger';
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracyMeters?: number;
  isLiveLocation: boolean;
  batteryLevel?: number;
  peopleCount: number;
  notes: string;
  dispatched: boolean;
  referenceCode: string;
}

export type SupportedLanguage = 'en' | 'hi' | 'bn';
