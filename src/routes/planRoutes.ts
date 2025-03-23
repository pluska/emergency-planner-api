import { Router } from 'express';
import { getBeginSteps, getPlanSteps, determineRecommendedPlan, generatePlan } from '../controllers/planController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * /api/plans/begin:
 *   get:
 *     summary: Get initial assessment steps
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Initial assessment steps retrieved successfully
 */
router.get('/begin', authenticateToken, getBeginSteps);

/**
 * @swagger
 * /api/plans/{planType}/steps:
 *   get:
 *     summary: Get steps for a specific plan type
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [emergency-bagpack, storage, emergency-fund]
 *     responses:
 *       200:
 *         description: Plan steps retrieved successfully
 */
router.get('/:planType/steps', authenticateToken, getPlanSteps);

/**
 * @swagger
 * /api/plans/recommend:
 *   post:
 *     summary: Get plan recommendations based on form data
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Plan recommendations generated successfully
 */
router.post('/recommend', authenticateToken, determineRecommendedPlan);

/**
 * @swagger
 * /api/plans/generate:
 *   post:
 *     summary: Generate a customized plan using AI
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: AI-generated plan created successfully
 */
router.post('/generate', authenticateToken, generatePlan);

export default router; 