import { BaseService } from './BaseService';
import { EmergencyPlan } from '../models/emergencyPlanModel';
import { validateEmergencyPlan } from '../validation/emergencyPlansValidation';

export class EmergencyPlanService extends BaseService<EmergencyPlan> {
    constructor() {
        super('emergency_plans');
    }

    async create(item: EmergencyPlan): Promise<EmergencyPlan> {
        const { error } = validateEmergencyPlan(item);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return super.create(item);
    }

    async update(id: string, item: Partial<EmergencyPlan>): Promise<EmergencyPlan | null> {
        const { error } = validateEmergencyPlan(item as EmergencyPlan);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return super.update(id, item);
    }
} 