export enum AgeRange {
  EIGHTEEN_TO_TWENTY_FIVE = '18-25',
  TWENTY_SIX_TO_THIRTY_FIVE = '26-35',
  THIRTY_SIX_TO_FIFTY = '36-50',
  FIFTY_ONE_TO_SIXTY_FIVE = '51-65',
  SIXTY_FIVE_PLUS = '65+'
}

export enum LivingSituation {
  OWN_HOUSE = 'own-house',
  RENT_HOUSE = 'rent-house',
  APARTMENT = 'apartment',
  SHARED = 'shared',
  OTHER = 'other'
}

export enum RiskLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum EconomicStability {
  STABLE = 'stable',
  MODERATE = 'moderate',
  UNSTABLE = 'unstable'
}

export enum EssentialServices {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  LIMITED = 'limited'
}

export enum EmploymentStatus {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  SELF_EMPLOYED = 'self-employed',
  UNEMPLOYED = 'unemployed',
  RETIRED = 'retired'
}

export enum IncomeStability {
  VERY_STABLE = 'very-stable',
  STABLE = 'stable',
  VARIABLE = 'variable',
  UNSTABLE = 'unstable'
}

export enum SavingsLevel {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum PrimaryConcern {
  NATURAL_DISASTERS = 'natural-disasters',
  ECONOMIC_CRISIS = 'economic-crisis',
  HEALTH_EMERGENCIES = 'health-emergencies',
  JOB_LOSS = 'job-loss',
  GENERAL_PREPAREDNESS = 'general-preparedness'
}

export enum StorageSpace {
  LARGE = 'large',
  MEDIUM = 'medium',
  LIMITED = 'limited',
  NONE = 'none'
}

export enum RecommendationType {
  EMERGENCY_BAGPACK = 'emergency-bagpack',
  STORAGE = 'storage',
  EMERGENCY_FUND = 'emergency-fund'
}

export interface EssentialInfo {
  id?: string;
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
  created_at?: Date;
  updated_at?: Date;
} 