import { Router } from 'express';
import { generateResponse } from '../controllers/geminiController';
import { verifyToken } from '../utils/token';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     GeminiRequest:
 *       type: object
 *       required:
 *         - prompt
 *       properties:
 *         prompt:
 *           type: string
 *           description: The prompt to send to Gemini
 *           example: "Generate a detailed emergency plan for a family of 4 living in an urban area"
 *         options:
 *           type: object
 *           properties:
 *             temperature:
 *               type: number
 *               minimum: 0
 *               maximum: 1
 *               description: Controls randomness in the response
 *               example: 0.7
 *             maxTokens:
 *               type: number
 *               minimum: 1
 *               description: Maximum number of tokens to generate
 *               example: 1000
 *     GeminiResponse:
 *       type: object
 *       required:
 *         - response
 *       properties:
 *         response:
 *           type: string
 *           description: The generated response from Gemini
 *           example: "Here's a detailed emergency plan for your family..."
 *         metadata:
 *           type: object
 *           properties:
 *             tokensUsed:
 *               type: number
 *               example: 450
 *             processingTime:
 *               type: string
 *               example: "2.5s"
 */

/**
 * @swagger
 * /api/gemini/generate:
 *   post:
 *     summary: Generate a response using Gemini AI
 *     description: Uses Google's Gemini AI to generate responses for emergency planning queries
 *     tags: [Gemini]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeminiRequest'
 *     responses:
 *       200:
 *         description: Response generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeminiResponse'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid prompt. Prompt cannot be empty."
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing authentication token"
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Rate limit exceeded. Please try again later."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error occurred"
 */
router.post('/generate', verifyToken, (req, res, next) => {
  generateResponse(req, res).catch(next);
});

export default router;