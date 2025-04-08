import { Router } from 'express';
import { getBeginSteps, getPlanSteps, determineRecommendedPlan, generatePlan } from '../controllers/planController';
import { verifyToken } from '../utils/token';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     BeginStep:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - fields
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: "Personal Information"
 *         description:
 *           type: string
 *           example: "Basic information needed to customize your emergency plan"
 *         fields:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - type
 *               - label
 *               - key
 *               - required
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [select, input]
 *                 example: "select"
 *               label:
 *                 type: string
 *                 example: "Age Range"
 *               key:
 *                 type: string
 *                 example: "ageRange"
 *               required:
 *                 type: boolean
 *                 example: true
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                       example: "18-25"
 *                     label:
 *                       type: string
 *                       example: "18-25 years"
 *               inputType:
 *                 type: string
 *                 enum: [text, number, email, tel]
 *                 example: "text"
 *               min:
 *                 type: number
 *                 example: 1
 *               max:
 *                 type: number
 *                 example: 100
 *               placeholder:
 *                 type: string
 *                 example: "Enter your age"
 *     PlanStep:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - fields
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: "Basic Bagpack Information"
 *         description:
 *           type: string
 *           example: "Configure your emergency bagpack contents"
 *         fields:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - type
 *               - label
 *               - key
 *               - required
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [input, select]
 *                 example: "input"
 *               label:
 *                 type: string
 *                 example: "Number of People"
 *               key:
 *                 type: string
 *                 example: "peopleCount"
 *               required:
 *                 type: boolean
 *                 example: true
 *               inputType:
 *                 type: string
 *                 enum: [text, number, email, tel]
 *                 example: "number"
 *               min:
 *                 type: number
 *                 example: 1
 *               max:
 *                 type: number
 *                 example: 10
 *               placeholder:
 *                 type: string
 *                 example: "Enter number of people"
 *     PlanRecommendation:
 *       type: object
 *       required:
 *         - primaryRecommendation
 *         - secondaryRecommendation
 *         - reasoning
 *       properties:
 *         primaryRecommendation:
 *           type: string
 *           enum: [emergency-bagpack, storage, emergency-fund]
 *           example: "emergency-bagpack"
 *         secondaryRecommendation:
 *           type: string
 *           enum: [emergency-bagpack, storage, emergency-fund]
 *           example: "storage"
 *         reasoning:
 *           type: string
 *           example: "Based on your urban location, apartment living situation, and concern for natural disasters"
 *         additionalDetails:
 *           type: object
 *           properties:
 *             urgency:
 *               type: string
 *               enum: [low, medium, high]
 *               example: "high"
 *             estimatedCost:
 *               type: string
 *               example: "$200-500"
 *             timeToComplete:
 *               type: string
 *               example: "2-3 weeks"
 *     PlanGenerationRequest:
 *       type: object
 *       required:
 *         - location
 *         - type
 *         - size
 *       properties:
 *         location:
 *           type: string
 *           enum: [urban, suburban, rural]
 *           description: The location where the emergency plan will be implemented
 *           example: "urban"
 *         type:
 *           type: string
 *           enum: [natural-disasters, economic-crisis, medical-emergency]
 *           description: The type of emergency to plan for
 *           example: "natural-disasters"
 *         size:
 *           type: string
 *           description: The size or scale of the plan (e.g., number of people, area to cover)
 *           example: "4"
 *         specificNeeds:
 *           type: string
 *           description: Any specific requirements or considerations for the plan
 *           example: "elderly care, pet care, medical equipment"
 *     PlanGenerationResponse:
 *       type: object
 *       required:
 *         - steps
 *       properties:
 *         steps:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - description
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Location Assessment"
 *               description:
 *                 type: string
 *                 example: "Evaluate urban environment risks and resources"
 *         estimatedTime:
 *           type: string
 *           example: "2-3 weeks"
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           example: "high"
 *         recommendations:
 *           type: array
 *           items:
 *             type: string
 *           example: [
 *             "Install emergency alert system",
 *             "Create evacuation plan",
 *             "Stock essential supplies"
 *           ]
 */

/**
 * @swagger
 * /api/plans/begin:
 *   get:
 *     summary: Get initial assessment steps
 *     description: Retrieves the initial steps needed to assess the user's emergency planning needs
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Initial assessment steps retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BeginStep'
 *             example:
 *               - id: 1
 *                 title: "Personal Information"
 *                 description: "Basic information needed to customize your emergency plan"
 *                 fields:
 *                   - type: "select"
 *                     label: "Age Range"
 *                     key: "ageRange"
 *                     required: true
 *                     options:
 *                       - value: "18-25"
 *                         label: "18-25 years"
 *                       - value: "26-35"
 *                         label: "26-35 years"
 *                   - type: "input"
 *                     label: "Number of Dependents"
 *                     key: "dependents"
 *                     required: true
 *                     inputType: "number"
 *                     min: 0
 *                     max: 10
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing authentication token"
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
router.get('/begin', verifyToken, getBeginSteps);

/**
 * @swagger
 * /api/plans/{planType}/steps:
 *   get:
 *     summary: Get steps for a specific plan type
 *     description: Retrieves detailed steps for creating a specific type of emergency plan
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
 *         description: The type of emergency plan to get steps for
 *         example: emergency-bagpack
 *     responses:
 *       200:
 *         description: Plan steps retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlanStep'
 *             example:
 *               - id: 1
 *                 title: "Basic Bagpack Information"
 *                 description: "Configure your emergency bagpack contents"
 *                 fields:
 *                   - type: "input"
 *                     label: "Number of People"
 *                     key: "peopleCount"
 *                     required: true
 *                     inputType: "number"
 *                     min: 1
 *                     max: 10
 *                     placeholder: "Enter number of people"
 *                   - type: "select"
 *                     label: "Duration"
 *                     key: "duration"
 *                     required: true
 *                     options:
 *                       - value: "24h"
 *                         label: "24 hours"
 *                       - value: "72h"
 *                         label: "72 hours"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing authentication token"
 *       404:
 *         description: Plan type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Plan type 'invalid-type' not found"
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
router.get('/:planType/steps', verifyToken, getPlanSteps);

/**
 * @swagger
 * /api/plans/recommend:
 *   post:
 *     summary: Get plan recommendations based on form data
 *     description: Analyzes user input to recommend primary and secondary emergency plans
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *               - familySize
 *             properties:
 *               location:
 *                 type: string
 *                 enum: [urban, suburban, rural]
 *                 example: "urban"
 *               familySize:
 *                 type: number
 *                 minimum: 1
 *                 example: 4
 *               specificNeeds:
 *                 type: string
 *                 example: "elderly care, pet care"
 *               livingSituation:
 *                 type: string
 *                 enum: [apartment, house, mobile]
 *                 example: "apartment"
 *               primaryConcern:
 *                 type: string
 *                 enum: [natural-disasters, economic-crisis, medical-emergency]
 *                 example: "natural-disasters"
 *     responses:
 *       200:
 *         description: Plan recommendations generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanRecommendation'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing authentication token"
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid location value. Must be one of: urban, suburban, rural"
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
router.post('/recommend', verifyToken, determineRecommendedPlan);

/**
 * @swagger
 * /api/plans/generate:
 *   post:
 *     summary: Generate a customized emergency plan
 *     description: Creates a detailed emergency plan based on location, type, size, and specific needs
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanGenerationRequest'
 *           example:
 *             location: "urban"
 *             type: "natural-disasters"
 *             size: "4"
 *             specificNeeds: "elderly care, pet care, medical equipment"
 *     responses:
 *       200:
 *         description: Emergency plan generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanGenerationResponse'
 *             example:
 *               steps:
 *                 - id: 1
 *                   title: "Location Assessment"
 *                   description: "Evaluate urban environment risks and resources"
 *                 - id: 2
 *                   title: "Special Considerations"
 *                   description: "Plan for elderly care and pet needs"
 *               estimatedTime: "2-3 weeks"
 *               priority: "high"
 *               recommendations: [
 *                 "Install emergency alert system",
 *                 "Create evacuation plan",
 *                 "Stock essential supplies"
 *               ]
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing authentication token"
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid location. Must be one of: urban, suburban, rural"
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
router.post('/generate', verifyToken, generatePlan);

export default router; 