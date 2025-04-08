import { Request, Response } from 'express';
import { generatePlan, getPlanHistory, getBeginSteps, getPlanSteps, determineRecommendedPlan } from '../src/controllers/planController';
import { PlanService } from '../src/utils/plans';
import { PlanStep, PlanType, PlanRecommendation } from '../src/interface/Plans';
import Redis from 'ioredis';

// Mock Redis
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    expire: jest.fn(),
  }));
});

// Mock PlanService
jest.mock('../src/utils/plans', () => ({
  PlanService: jest.fn().mockImplementation(() => ({
    getBeginSteps: jest.fn(),
    getPlanSteps: jest.fn(),
    determineRecommendedPlan: jest.fn(),
  })),
}));

describe('Plan Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockPlanService: jest.Mocked<PlanService>;
  let mockRedis: jest.Mocked<Redis>;
  let originalConsoleError: typeof console.error;

  beforeEach(() => {
    // Store original console.error
    originalConsoleError = console.error;
    // Mock console.error
    console.error = jest.fn();

    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    mockPlanService = new PlanService() as jest.Mocked<PlanService>;
    mockRedis = new Redis() as jest.Mocked<Redis>;
  });

  afterEach(() => {
    // Restore original console.error
    console.error = originalConsoleError;
    jest.clearAllMocks();
  });

  describe('getPlanSteps', () => {
    it('should return plan steps for valid plan type', async () => {
      const mockSteps: PlanStep[] = [{
        id: 1,
        title: 'Test Step',
        fields: []
      }];
      mockPlanService.getPlanSteps.mockReturnValue(mockSteps);
      
      mockRequest.params = { planType: 'emergency-bagpack' };
      
      await getPlanSteps(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.json).toHaveBeenCalledWith(mockSteps);
    });

    it('should handle invalid plan type', async () => {
      mockPlanService.getPlanSteps.mockImplementation(() => {
        throw new Error('Invalid plan type');
      });
      
      mockRequest.params = { planType: 'invalid-type' };
      
      await getPlanSteps(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to get plan steps' });
    });
  });

  describe('getBeginSteps', () => {
    it('should return begin steps', async () => {
      const mockSteps: PlanStep[] = [{
        id: 1,
        title: 'Begin Step',
        fields: []
      }];
      mockPlanService.getBeginSteps.mockReturnValue(mockSteps);
      
      await getBeginSteps(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.json).toHaveBeenCalledWith(mockSteps);
    });

    it('should handle errors', async () => {
      mockPlanService.getBeginSteps.mockImplementation(() => {
        throw new Error('Test error');
      });
      
      await getBeginSteps(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to get begin steps' });
    });
  });

  describe('determineRecommendedPlan', () => {
    it('should return plan recommendation', async () => {
      const mockRecommendation: PlanRecommendation = {
        primaryRecommendation: 'emergency-bagpack' as PlanType,
        secondaryRecommendation: 'storage' as PlanType,
        reasoning: 'Test reasoning'
      };
      mockPlanService.determineRecommendedPlan.mockReturnValue(mockRecommendation);
      
      mockRequest.body = { test: 'data' };
      
      await determineRecommendedPlan(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.json).toHaveBeenCalledWith(mockRecommendation);
    });

    it('should handle errors', async () => {
      mockPlanService.determineRecommendedPlan.mockImplementation(() => {
        throw new Error('Test error');
      });
      
      mockRequest.body = { test: 'data' };
      
      await determineRecommendedPlan(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to determine recommended plan' });
    });
  });
}); 