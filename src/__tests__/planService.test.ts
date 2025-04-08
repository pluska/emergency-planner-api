import { PlanService } from '../utils/plans';
import { PlanType } from '../interface/Plans';

describe('PlanService', () => {
  let planService: PlanService;

  beforeEach(() => {
    planService = new PlanService();
  });

  describe('getBeginSteps', () => {
    it('should return the initial steps with personal information fields', () => {
      const steps = planService.getBeginSteps();
      
      expect(steps).toBeDefined();
      expect(steps.length).toBeGreaterThan(0);
      expect(steps[0].title).toBe('Personal Information');
      expect(steps[0].fields).toBeDefined();
      expect(steps[0].fields.length).toBe(3); // Age Range, Dependents, Living Situation
    });
  });

  describe('determineRecommendedPlan', () => {
    it('should recommend storage for high natural disaster risk and large storage space', () => {
      const formData = {
        naturalDisasterRisk: 'high',
        economicStability: 'stable',
        livingSituation: 'own-house',
        storageSpace: 'large',
        incomeStability: 'stable',
        savingsLevel: 'high',
        primaryConcern: 'natural-disasters'
      };

      const recommendation = planService.determineRecommendedPlan(formData);
      
      expect(recommendation.primaryRecommendation).toBe('storage');
      expect(recommendation.reasoning).toContain('Storage');
    });

    it('should recommend emergency-fund for unstable economic conditions', () => {
      const formData = {
        naturalDisasterRisk: 'low',
        economicStability: 'unstable',
        livingSituation: 'apartment',
        storageSpace: 'limited',
        incomeStability: 'unstable',
        savingsLevel: 'none',
        primaryConcern: 'economic-crisis'
      };

      const recommendation = planService.determineRecommendedPlan(formData);
      
      expect(recommendation.primaryRecommendation).toBe('emergency-fund');
      expect(recommendation.reasoning).toContain('Emergency Fund');
    });

    it('should throw error for invalid plan type', () => {
      const invalidPlanType = 'invalid-plan' as PlanType;
      
      expect(() => {
        planService.getPlanSteps(invalidPlanType);
      }).toThrow('Invalid plan type');
    });
  });
}); 