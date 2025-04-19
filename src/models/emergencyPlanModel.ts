export enum EmergencyType {
  FIRE = 'fire',
  FLOOD = 'flood',
  EARTHQUAKE = 'earthquake',
  HURRICANE = 'hurricane',
  TORNADO = 'tornado',
  PANDEMIC = 'pandemic',
  OTHER = 'other'
}

export enum EmergencySize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  CATASTROPHIC = 'catastrophic'
}

export interface EmergencyPlan {
  id?: string;
  user_id: string;
  location: string;
  type: EmergencyType;
  size: EmergencySize;
  specific_needs?: string;
  plan_content: string;
  created_at?: Date;
  updated_at?: Date;
} 