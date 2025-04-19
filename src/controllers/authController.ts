import { Request, Response } from 'express';
import { generateToken, revokeToken } from '../utils/token';
import redisClient from '../config/redis';
import { UserService } from '../services/UserService';
import { emailService } from '../services/emailService';
import crypto from 'crypto';

const userService = new UserService();

export const register = async (req: Request, res: Response): Promise<void> => {
    console.log('register');
    try {
        const { email, password, name } = req.body;

        // Check if user exists
        const existingUser = await userService.findByEmail(email);
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        // Create user in database
        const user = await userService.createUser(email, password);
        if (!user.id) {
            throw new Error('User creation failed - no ID returned');
        }
        
        // Generate token and store session in Redis
        const token = await generateToken({ id: user.id, email: user.email, name });
        const sessionKey = `session:${token}`;
        await redisClient.set(sessionKey, JSON.stringify({ userId: user.id }), { EX: 24 * 60 * 60 }); // 24 hours expiry

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: user.id, email: user.email, name }
        });
    } catch (error) {
        console.error('Error in registration:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Verify credentials
        const user = await userService.verifyPassword(email, password);
        if (!user || !user.id) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Generate token and store session in Redis
        const token = await generateToken({ id: user.id, email: user.email, name: '' });
        const sessionKey = `session:${token}`;
        await redisClient.set(sessionKey, JSON.stringify({ userId: user.id }), { EX: 24 * 60 * 60 }); // 24 hours expiry

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({ error: 'Invalid token format' });
            return;
        }
        
        // Remove session from Redis
        const sessionKey = `session:${token}`;
        await redisClient.del(sessionKey);
        await revokeToken(token);
        
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error in logout:', error);
        res.status(500).json({ error: 'Failed to logout' });
    }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await userService.findByEmail(email);
        if (!user) {
            // Return success even if user doesn't exist to prevent email enumeration
            res.json({ message: 'If an account exists with this email, you will receive a password reset link' });
            return;
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Store token in Redis with 1 hour expiry
        await redisClient.set(`reset:${hashedToken}` as any, user.id as any, { EX: 3600 });

        // Send reset email
        await emailService.sendPasswordResetEmail(email, resetToken);

        res.json({ message: 'If an account exists with this email, you will receive a password reset link' });
    } catch (error) {
        console.error('Error in forgot password:', error);
        res.status(500).json({ error: 'Failed to process password reset request' });
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token, password } = req.body;

        // Hash the token
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Get user ID from Redis
        const userId = await redisClient.get(`reset:${hashedToken}`);
        if (!userId) {
            res.status(400).json({ error: 'Invalid or expired reset token' });
            return;
        }

        // Update password
        await userService.updatePassword(userId, password);

        // Delete the used token
        await redisClient.del(`reset:${hashedToken}`);

        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error in reset password:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
};