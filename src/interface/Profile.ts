export interface Profile {
    id: number;
    user_id: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
    phone_number: string | null;
    address: string | null;
    natural_disaster_risk: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateProfileRequest {
    user_id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    phone_number?: string;
    address?: string;
    natural_disaster_risk?: string;
}

export interface UpdateProfileRequest {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    address?: string;
    natural_disaster_risk?: string;
}

export interface EssentialInfo {
    id: string;
    user_id: string;
    age_range: '18-25' | '26-35' | '36-50' | '51-65' | '65+';
    dependents_count: number;
    living_situation: 'own-house' | 'rent-house' | 'apartment' | 'shared' | 'other';
    natural_disaster_risk: 'high' | 'medium' | 'low';
    economic_stability: 'stable' | 'moderate' | 'unstable';
    essential_services: 'excellent' | 'good' | 'limited';
    employment_status: 'full-time' | 'part-time' | 'self-employed' | 'unemployed' | 'retired';
    income_stability: 'very-stable' | 'stable' | 'variable' | 'unstable';
    savings_level: 'none' | 'low' | 'medium' | 'high';
    primary_concern: 'natural-disasters' | 'economic-crisis' | 'health-emergencies' | 'job-loss' | 'general-preparedness';
    immediate_need: 'high' | 'medium' | 'low';
    storage_space: 'large' | 'medium' | 'limited' | 'none';
    primary_recommendation: 'emergency-bagpack' | 'storage' | 'emergency-fund';
    secondary_recommendation?: 'emergency-bagpack' | 'storage' | 'emergency-fund';
    recommendation_reasoning?: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateEssentialInfoRequest {
    user_id: string;
    age_range: '18-25' | '26-35' | '36-50' | '51-65' | '65+';
    dependents_count: number;
    living_situation: 'own-house' | 'rent-house' | 'apartment' | 'shared' | 'other';
    natural_disaster_risk: 'high' | 'medium' | 'low';
    economic_stability: 'stable' | 'moderate' | 'unstable';
    essential_services: 'excellent' | 'good' | 'limited';
    employment_status: 'full-time' | 'part-time' | 'self-employed' | 'unemployed' | 'retired';
    income_stability: 'very-stable' | 'stable' | 'variable' | 'unstable';
    savings_level: 'none' | 'low' | 'medium' | 'high';
    primary_concern: 'natural-disasters' | 'economic-crisis' | 'health-emergencies' | 'job-loss' | 'general-preparedness';
    immediate_need: 'high' | 'medium' | 'low';
    storage_space: 'large' | 'medium' | 'limited' | 'none';
    primary_recommendation: 'emergency-bagpack' | 'storage' | 'emergency-fund';
    secondary_recommendation?: 'emergency-bagpack' | 'storage' | 'emergency-fund';
    recommendation_reasoning?: string;
}

export interface UpdateEssentialInfoRequest {
    age_range?: '18-25' | '26-35' | '36-50' | '51-65' | '65+';
    dependents_count?: number;
    living_situation?: 'own-house' | 'rent-house' | 'apartment' | 'shared' | 'other';
    natural_disaster_risk?: 'high' | 'medium' | 'low';
    economic_stability?: 'stable' | 'moderate' | 'unstable';
    essential_services?: 'excellent' | 'good' | 'limited';
    employment_status?: 'full-time' | 'part-time' | 'self-employed' | 'unemployed' | 'retired';
    income_stability?: 'very-stable' | 'stable' | 'variable' | 'unstable';
    savings_level?: 'none' | 'low' | 'medium' | 'high';
    primary_concern?: 'natural-disasters' | 'economic-crisis' | 'health-emergencies' | 'job-loss' | 'general-preparedness';
    immediate_need?: 'high' | 'medium' | 'low';
    storage_space?: 'large' | 'medium' | 'limited' | 'none';
    primary_recommendation?: 'emergency-bagpack' | 'storage' | 'emergency-fund';
    secondary_recommendation?: 'emergency-bagpack' | 'storage' | 'emergency-fund';
    recommendation_reasoning?: string;
}
