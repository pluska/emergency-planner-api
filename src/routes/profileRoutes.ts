import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';

const router = Router();

router.post('/profiles', ProfileController.createProfile);
router.get('/profiles', ProfileController.getProfiles);
router.get('/profiles/:id', ProfileController.getProfileById);
router.put('/profiles/:id', ProfileController.updateProfile);
router.delete('/profiles/:id', ProfileController.deleteProfile);

export default router; 