import { Router } from 'express';
import { generateResponse } from '../controllers/geminiController';
import { auth } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * /api/gemini/generate:
 *   post:
 *     summary: Generate a response using Gemini AI
 *     tags: [Gemini]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: The prompt to send to Gemini
 *     responses:
 *       200:
 *         description: Response generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/generate', auth, generateResponse);

export default router;