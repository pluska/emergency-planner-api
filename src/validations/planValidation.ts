import { body } from 'express-validator';

export const generatePlanValidation = [
    body('location')
        .notEmpty()
        .withMessage('Location is required')
        .isString()
        .withMessage('Location must be a string'),
    
    body('type')
        .notEmpty()
        .withMessage('Emergency type is required')
        .isString()
        .withMessage('Emergency type must be a string')
        .isIn(['fire', 'flood', 'earthquake', 'hurricane', 'tornado', 'pandemic', 'other'])
        .withMessage('Invalid emergency type'),
    
    body('size')
        .notEmpty()
        .withMessage('Size/scale is required')
        .isString()
        .withMessage('Size/scale must be a string')
        .isIn(['small', 'medium', 'large', 'catastrophic'])
        .withMessage('Invalid size/scale'),
    
    body('specificNeeds')
        .optional()
        .isString()
        .withMessage('Specific needs must be a string')
]; 