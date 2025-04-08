import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import redisClient from '../config/redis';
import { UserInterface } from '../interface/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JWTPayload {
  userId: string;
  email: string;
}
const generateToken = async (payload: JWTPayload): Promise<string> => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  // Store token in Redis with expiration
  const expiresInSeconds = 3600; // 1 hour in seconds
  try {
    await redisClient.set(`token:${token}`, JSON.stringify(payload), {
      EX: expiresInSeconds
    });
  } catch (error) {
    console.error('Error storing token in Redis:', error);
    // Continue even if Redis fails - the JWT will still be valid
  }

  return token;
};

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ error: 'Invalid token format' });
      return;
    }

    // Check if token exists in Redis
    const cachedToken = await redisClient.get(`token:${token}`);
    if (!cachedToken) {
      res.status(401).json({ error: 'Token has been revoked or expired' });
      return;
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    (req as unknown as UserInterface).user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const revokeToken = async (token: string): Promise<void> => {
  await redisClient.del(`token:${token}`);
};

export { generateToken, verifyToken, revokeToken };
