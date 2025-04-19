import { EmergencyPlan, EmergencyType, EmergencySize } from '../models/emergencyPlanModel';

export interface CreateEmergencyPlanRequest {
    user_id: string;
    location: string;
    type: EmergencyType;
    size: EmergencySize;
    specific_needs?: string;
    plan_content: string;
}

export interface UpdateEmergencyPlanRequest {
    location?: string;
    type?: EmergencyType;
    size?: EmergencySize;
    specific_needs?: string;
    plan_content?: string;
}

export interface PlanOption {
  value: string;
  label: string;
}

export interface PlanField {
  type: 'select' | 'input';
  label: string;
  key: string;
  required: boolean;
  options?: PlanOption[];
  inputType?: string;
  min?: number;
  max?: number;
  placeholder?: string;
}

export interface PlanStep {
  id: number;
  title: string;
  fields: PlanField[];
}

export type PlanType = 'emergency-bagpack' | 'storage' | 'emergency-fund';

export interface PlanRecommendation {
  primaryRecommendation: PlanType;
  secondaryRecommendation?: PlanType;
  reasoning: string;
} 