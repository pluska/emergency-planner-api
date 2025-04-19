import { EmergencyPlan } from '../models/emergencyPlanModel';
import pool from '../config/database';

export const insertEmergencyPlan = async (planData: EmergencyPlan): Promise<EmergencyPlan> => {
  const { user_id, location, type, size, specific_needs, plan_content } = planData;
  const result = await pool.query(
    'INSERT INTO public.emergency_plans (user_id, location, type, size, specific_needs, plan_content) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [user_id, location, type, size, specific_needs, plan_content]
  );
  return result.rows[0];
};

export const getEmergencyPlans = async (): Promise<EmergencyPlan[]> => {
  const result = await pool.query('SELECT * FROM public.emergency_plans');
  return result.rows;
};

export const getEmergencyPlanById = async (id: string): Promise<EmergencyPlan | null> => {
  const result = await pool.query('SELECT * FROM public.emergency_plans WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const updateEmergencyPlan = async (id: string, planData: EmergencyPlan): Promise<EmergencyPlan | null> => {
  const { user_id, location, type, size, specific_needs, plan_content } = planData;
  const result = await pool.query(
    'UPDATE public.emergency_plans SET user_id = $1, location = $2, type = $3, size = $4, specific_needs = $5, plan_content = $6 WHERE id = $7 RETURNING *',
    [user_id, location, type, size, specific_needs, plan_content, id]
  );
  return result.rows[0] || null;
};

export const deleteEmergencyPlan = async (id: string): Promise<EmergencyPlan | null> => {
  const result = await pool.query('DELETE FROM public.emergency_plans WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
}; 