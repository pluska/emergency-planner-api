import { AgeRange, LivingSituation, RiskLevel, EconomicStability, EssentialServices, EmploymentStatus, IncomeStability, SavingsLevel, PrimaryConcern, StorageSpace, RecommendationType } from '../models/essentialInfoModel';

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