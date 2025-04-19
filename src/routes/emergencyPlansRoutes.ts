import { Router, RequestHandler } from 'express';
import * as emergencyPlansController from '../controllers/emergencyPlansController';

const router = Router();

router.post('/', emergencyPlansController.createPlan as RequestHandler);
router.get('/', emergencyPlansController.getPlans as RequestHandler);
router.get('/:id', emergencyPlansController.getPlanById as RequestHandler);
router.put('/:id', emergencyPlansController.updatePlan as RequestHandler);
router.delete('/:id', emergencyPlansController.deletePlan as RequestHandler);

export default router; 