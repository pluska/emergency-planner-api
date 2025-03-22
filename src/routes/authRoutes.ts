import express from 'express';
import { registerValidation, loginValidation } from '../validations/authValidation';
import { register, login, logout } from '../controllers/authController';

const router = express.Router();

// Auth routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', logout);

export default router;