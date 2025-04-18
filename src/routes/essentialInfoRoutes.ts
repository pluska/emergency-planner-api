import { Router } from 'express';
import { EssentialInfoController } from '../controllers/EssentialInfoController';

const router = Router();

router.post('/essential-info', EssentialInfoController.createEssentialInfo);
router.get('/essential-info', EssentialInfoController.getEssentialInfo);
router.get('/essential-info/:id', EssentialInfoController.getEssentialInfoById);
router.put('/essential-info/:id', EssentialInfoController.updateEssentialInfo);
router.delete('/essential-info/:id', EssentialInfoController.deleteEssentialInfo);

export default router; 