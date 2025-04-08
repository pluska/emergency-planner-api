import { Request, Response } from 'express';
import { generateToken, revokeToken } from '../utils/token';
import redisClient from '../config/redis';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// Dummy user store in Redis
const createDummyUser = async (email: string, password: string, name: string) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = {
        id: Math.random().toString(36).substring(7),
        email,
        password: hashedPassword,
        name
    };
    await redisClient.set(`user:${email}`, JSON.stringify(user));
    return user;
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name } = req.body;

        // Validate required fields
        if (!email || !password || !name) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        // Check if user exists
        const existingUser = await redisClient.get(`user:${email}`);
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        // Create dummy user with hashed password
        const user = await createDummyUser(email, password, name);
        // Generate token
        const token = await generateToken({ userId: user.id, email: user.email });
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        console.error('Error in registration:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        // Get user from Redis
        const userStr = await redisClient.get(`user:${email}`);
        if (!userStr) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const user = JSON.parse(userStr);
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Generate token
        const token = await generateToken({ userId: user.id, email: user.email });

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
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }
        await revokeToken(token);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error in logout:', error);
        res.status(500).json({ error: 'Failed to logout' });
    }
};