import { Profile } from '../models/profileModel';
import { EssentialInfo, AgeRange, LivingSituation, RiskLevel, EconomicStability, EssentialServices, EmploymentStatus, IncomeStability, SavingsLevel, PrimaryConcern, StorageSpace, RecommendationType } from '../models/essentialInfoModel';

export interface CreateProfileRequest {
    user_id: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    address?: string;
    country?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    medical_conditions?: string;
    allergies?: string;
    blood_type?: string;
}

export interface UpdateProfileRequest {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    address?: string;
    country?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    medical_conditions?: string;
    allergies?: string;
    blood_type?: string;
}

export interface CreateEssentialInfoRequest {
    user_id: string;
    age_range: AgeRange;
    dependents_count: number;
    living_situation: LivingSituation;
    natural_disaster_risk: RiskLevel;
    economic_stability: EconomicStability;
    essential_services: EssentialServices;
    employment_status: EmploymentStatus;
    income_stability: IncomeStability;
    savings_level: SavingsLevel;
    primary_concern: PrimaryConcern;
    immediate_need: RiskLevel;
    storage_space: StorageSpace;
    primary_recommendation: RecommendationType;
    secondary_recommendation?: RecommendationType;
    recommendation_reasoning?: string;
}

export interface UpdateEssentialInfoRequest {
    age_range?: AgeRange;
    dependents_count?: number;
    living_situation?: LivingSituation;
    natural_disaster_risk?: RiskLevel;
    economic_stability?: EconomicStability;
    essential_services?: EssentialServices;
    employment_status?: EmploymentStatus;
    income_stability?: IncomeStability;
    savings_level?: SavingsLevel;
    primary_concern?: PrimaryConcern;
    immediate_need?: RiskLevel;
    storage_space?: StorageSpace;
    primary_recommendation?: RecommendationType;
    secondary_recommendation?: RecommendationType;
    recommendation_reasoning?: string;
}
