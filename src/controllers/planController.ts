import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { PlanType } from '../interface/Plans';
import { PlanService } from '../utils/plans';

dotenv.config();

// Gemini instance
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Plan service instance
const planService = new PlanService();

export const generatePlan = async (req: Request, res: Response): Promise<void> => {
    try {
        const { location, type, size, specificNeeds } = req.body;

        // Validate that the required fields are provided
        if (!location || !type || !size) {
            res.status(400).json({
                message: 'Missing required fields: location, type, and size are required'
            });
            return;
        }

        // Create the prompt for Gemini
        const prompt = `Create a detailed emergency plan for:
        Location: ${location}
        Type of Emergency: ${type}
        Size/Scale: ${size}
        ${specificNeeds ? `Specific Needs: ${specificNeeds}` : ''}

        Please provide:
        1. Immediate actions to take
        2. Evacuation procedures
        3. Communication plan
        4. Emergency contacts
        5. Resource requirements
        6. Safety measures
        7. Recovery steps`;

        // Generate response with Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({
            message: 'Emergency plan generated successfully',
            plan: text
        });
    } catch (error) {
        console.error('Error generating plan:', error);
        res.status(500).json({
            message: 'Error generating emergency plan',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getPlanHistory = async (_req: Request, res: Response): Promise<void> => {
    try {
        // TODO: Implement plan history
        res.json({
            message: 'Plan history retrieved successfully',
            plans: []
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving plan history',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getBeginSteps = async (_req: Request, res: Response): Promise<void> => {
  try {
    const steps = planService.getBeginSteps();
    res.json(steps);
  } catch (error) {
    console.error('Error getting begin steps:', error);
    res.status(500).json({ error: 'Failed to get begin steps' });
  }
};

export const getPlanSteps = async (req: Request, res: Response): Promise<void> => {
  try {
    const planType = req.params.planType as PlanType;
    console.log(planType);
    const steps = planService.getPlanSteps(planType);
    res.json(steps);
  } catch (error) {
    console.error('Error getting plan steps:', error);
    res.status(500).json({ error: 'Failed to get plan steps' });
  }
};

export const determineRecommendedPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const formData = req.body;
    const recommendation = planService.determineRecommendedPlan(formData);
    res.json(recommendation);
  } catch (error) {
    console.error('Error determining recommended plan:', error);
    res.status(500).json({ error: 'Failed to determine recommended plan' });
  }
}; 