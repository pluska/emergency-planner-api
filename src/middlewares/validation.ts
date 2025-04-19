import { Request, Response, NextFunction } from 'express';
import { registerSchema, loginSchema } from '../validation/authValidation';

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
}; 