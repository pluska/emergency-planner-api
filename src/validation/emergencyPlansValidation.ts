import Joi from 'joi';
import { EmergencyPlan } from '../models/emergencyPlanModel';

export const validateEmergencyPlan = (plan: EmergencyPlan) => {
  const schema = Joi.object({
    user_id: Joi.string().uuid().required(),
    location: Joi.string().max(255).required(),
    type: Joi.string().valid('fire', 'flood', 'earthquake', 'hurricane', 'tornado', 'pandemic', 'other').required(),
    size: Joi.string().valid('small', 'medium', 'large', 'catastrophic').required(),
    specific_needs: Joi.string().allow(''),
    plan_content: Joi.string().required(),
  });

  return schema.validate(plan);
}; 