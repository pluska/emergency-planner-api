import { Request, Response } from 'express';
import { BaseController } from './base/BaseController';
import { EmergencyPlan } from '../models/emergencyPlanModel';
import { EmergencyPlanService } from '../services/EmergencyPlanService';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PlanType } from '../interface/Plans';
import { PlanService } from '../utils/plans';
import { ErrorHandler } from './base/ErrorHandler';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const planService = new PlanService();

export class EmergencyPlansController extends BaseController<EmergencyPlan> {
    private emergencyPlanService: EmergencyPlanService;

    constructor() {
        super();
        this.emergencyPlanService = new EmergencyPlanService();
    }

    public async getItemById(id: string): Promise<EmergencyPlan | null> {
        return this.emergencyPlanService.getById(id);
    }

    public async getAllItems(): Promise<EmergencyPlan[]> {
        return this.emergencyPlanService.getAll();
    }

    public async createItem(item: EmergencyPlan): Promise<EmergencyPlan> {
        return this.emergencyPlanService.create(item);
    }

    public async updateItem(id: string, item: Partial<EmergencyPlan>): Promise<EmergencyPlan | null> {
        return this.emergencyPlanService.update(id, item);
    }

    public async deleteItem(id: string): Promise<boolean> {
        return this.emergencyPlanService.delete(id);
    }

    async generatePlan(req: Request, res: Response): Promise<void> {
        try {
            const { location, type, size, specificNeeds } = req.body;

            if (!location || !type || !size) {
                res.status(400).json({
                    message: 'Missing required fields: location, type, and size are required'
                });
                return;
            }

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

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            res.json({
                message: 'Emergency plan generated successfully',
                plan: text
            });
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    async getPlanSteps(req: Request, res: Response): Promise<void> {
        try {
            const planType = req.params.planType as PlanType;
            const steps = planService.getPlanSteps(planType);
            res.json(steps);
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    async determineRecommendedPlan(req: Request, res: Response): Promise<void> {
        try {
            const formData = req.body;
            const recommendation = planService.determineRecommendedPlan(formData);
            res.json(recommendation);
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }
} 