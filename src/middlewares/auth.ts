import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await verifyToken(req, res, next);
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Optional: Middleware to check if user is authenticated without throwing error
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await verifyToken(req, res, next);
  } catch (error) {
    next();
  }
};
