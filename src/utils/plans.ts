import { PlanStep, PlanType, PlanRecommendation } from '../interface/Plans';
import { emergencyBagpackSteps } from '../plans/bagpack';
import { emergencyFundSteps } from '../plans/fund';
import { storageSteps } from '../plans/storage';
// Plan steps definitions
const beginSteps: PlanStep[] = [
  {
    id: 1,
    title: 'Personal Information',
    fields: [
      {
        type: 'select',
        label: 'Age Range',
        key: 'ageRange',
        required: true,
        options: [
          { value: '18-25', label: '18-25 years' },
          { value: '26-35', label: '26-35 years' },
          { value: '36-50', label: '36-50 years' },
          { value: '51-65', label: '51-65 years' },
          { value: '65+', label: 'Over 65 years' }
        ]
      },
      {
        type: 'input',
        label: 'Number of Dependents',
        key: 'dependentsCount',
        required: true,
        inputType: 'number',
        min: 0,
        max: 15,
        placeholder: 'e.g., 2'
      },
      {
        type: 'select',
        label: 'Living Situation',
        key: 'livingSituation',
        required: true,
        options: [
          { value: 'own-house', label: 'Own House' },
          { value: 'rent-house', label: 'Rented House' },
          { value: 'apartment', label: 'Apartment' },
          { value: 'shared', label: 'Shared Housing' },
          { value: 'other', label: 'Other' }
        ]
      }
    ]
  },
];

export class PlanService {
  getBeginSteps(): PlanStep[] {
    return beginSteps;
  }

  getPlanSteps(planType: PlanType): PlanStep[] {
    switch (planType) {
      case 'emergency-bagpack':
        return emergencyBagpackSteps;
      case 'emergency-fund':
        return emergencyFundSteps;
      case 'storage':
        return storageSteps;
      default:
        throw new Error('Invalid plan type');
    }
  }

  determineRecommendedPlan(formData: Record<string, string>): PlanRecommendation {
    const points = {
      'emergency-bagpack': 0,
      'storage': 0,
      'emergency-fund': 0
    };

    // Natural disaster risk assessment
    if (formData.naturalDisasterRisk === 'high') {
      points['emergency-bagpack'] += 3;
      points['storage'] += 2;
    }

    // Economic stability assessment
    if (formData.economicStability === 'unstable') {
      points['emergency-fund'] += 3;
    }

    // Living situation assessment
    if (formData.livingSituation === 'apartment') {
      points['emergency-bagpack'] += 1;
      points['emergency-fund'] += 1;
    } else if (formData.livingSituation === 'own-house') {
      points['storage'] += 2;
    }

    // Storage space assessment
    if (formData.storageSpace === 'large') {
      points['storage'] += 2;
    } else if (formData.storageSpace === 'limited' || formData.storageSpace === 'none') {
      points['emergency-fund'] += 1;
      points['emergency-bagpack'] += 1;
    }

    // Financial situation assessment
    if (formData.incomeStability === 'unstable' || formData.incomeStability === 'variable') {
      points['emergency-fund'] += 3;
    }

    if (formData.savingsLevel === 'none' || formData.savingsLevel === 'low') {
      points['emergency-fund'] += 2;
    }

    // Primary concern assessment
    if (formData.primaryConcern === 'natural-disasters') {
      points['emergency-bagpack'] += 2;
      points['storage'] += 1;
    } else if (formData.primaryConcern === 'economic-crisis' || formData.primaryConcern === 'job-loss') {
      points['emergency-fund'] += 2;
    }

    // Determine primary and secondary recommendations
    const sortedPlans = Object.entries(points)
      .sort(([,a], [,b]) => b - a)
      .map(([plan]) => plan) as Array<PlanType>;

    const primaryRecommendation = sortedPlans[0];
    const secondaryRecommendation = sortedPlans[1];

    // Generate reasoning
    let reasoning = '';
    if (primaryRecommendation === 'emergency-bagpack') {
      reasoning = 'Based on your location\'s natural disaster risk and living situation, an Emergency Bagpack would be most beneficial for immediate evacuation needs.';
    } else if (primaryRecommendation === 'storage') {
      reasoning = 'Given your available space and stable living situation, a comprehensive Storage plan would provide the best long-term security.';
    } else {
      reasoning = 'Considering the economic factors and your financial situation, building an Emergency Fund should be your top priority.';
    }

    return {
      primaryRecommendation,
      secondaryRecommendation,
      reasoning
    };
  }
} 