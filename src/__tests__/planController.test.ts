import { Request, Response } from 'express';
import { generatePlan, getPlanSteps } from '../controllers/planController';
import { PlanStep } from '../interface/Plans';

// Mock the PlanService class and its instance methods
jest.mock('../utils/plans', () => {
  const mockGetPlanSteps = jest.fn();
  return {
    PlanService: jest.fn().mockImplementation(() => {
      return {
        getPlanSteps: mockGetPlanSteps
      };
    })
  };
});

// Mock the GoogleGenerativeAI
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: jest.fn().mockReturnValue('Generated plan content')
        }
      })
    })
  }))
}));

describe('PlanController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockGetPlanSteps: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    // Get the mock function from the PlanService mock
    const plansMock = require('../utils/plans');
    const planService = new plansMock.PlanService();
    mockGetPlanSteps = planService.getPlanSteps;
    // Clear mock calls between tests
    jest.clearAllMocks();
  });

  describe('generatePlan', () => {
    it('should return 400 if required fields are missing', async () => {
      mockRequest.body = {
        location: 'New York',
        // Missing type and size
      };

      await generatePlan(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Missing required fields: location, type, and size are required'
      });
    });

    it('should generate a plan successfully', async () => {
      mockRequest.body = {
        location: 'New York',
        type: 'earthquake',
        size: 'large'
      };

      await generatePlan(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Emergency plan generated successfully',
          plan: expect.any(String)
        })
      );
    }, 10000); // Increased timeout for this test
  });

  describe('getPlanSteps', () => {
    it('should return plan steps for valid plan type', async () => {
      const mockSteps: PlanStep[] = [{
        id: 1,
        title: 'Test Step',
        fields: []
      }];
      mockRequest.params = { planType: 'emergency-bagpack' };
      mockGetPlanSteps.mockReturnValue(mockSteps);

      await getPlanSteps(mockRequest as Request, mockResponse as Response);

      expect(mockGetPlanSteps).toHaveBeenCalledWith('emergency-bagpack');
      expect(mockResponse.json).toHaveBeenCalledWith(mockSteps);
    });

    it('should handle errors when getting plan steps', async () => {
      mockRequest.params = { planType: 'invalid-type' };
      mockGetPlanSteps.mockImplementation(() => {
        throw new Error('Invalid plan type');
      });

      await getPlanSteps(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Failed to get plan steps'
      });
    });
  });
}); 