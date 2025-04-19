// Create mock instance
const mockUserServiceInstance = {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
    verifyPassword: jest.fn(),
};

// Mock modules
jest.mock('../services/UserService', () => ({
    UserService: jest.fn(() => mockUserServiceInstance)
}));

jest.mock('redis', () => {
    const mockRedisGet = jest.fn().mockResolvedValue(null);
    const mockRedisSet = jest.fn().mockResolvedValue('OK');
    const mockRedisDel = jest.fn().mockResolvedValue(1);
    return {
        createClient: jest.fn().mockImplementation(() => ({
            connect: jest.fn().mockResolvedValue(undefined),
            get: mockRedisGet,
            set: mockRedisSet,
            del: mockRedisDel,
            on: jest.fn(),
            quit: jest.fn().mockResolvedValue(undefined),
        })),
    };
});

jest.mock('bcrypt');

jest.mock('../utils/token', () => ({
    generateToken: jest.fn().mockResolvedValue('mockToken'),
    revokeToken: jest.fn().mockResolvedValue(undefined),
}));

import { Request, Response } from 'express';
import { register, login, logout } from '../controllers/authController';

describe('Authentication', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockRedisSet: jest.Mock;
    let mockRedisDel: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            body: {},
            headers: {},
        };
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        // Get the mock functions
        const redisMock = require('redis');
        const redisClient = redisMock.createClient();
        mockRedisSet = redisClient.set;
        mockRedisDel = redisClient.del;

        // Clear all mock calls
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should register a new user successfully', async () => {
            const mockUser = {
                id: '123',
                email: 'test@example.com',
                password: 'hashedPassword',
            };

            mockRequest.body = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };

            mockUserServiceInstance.findByEmail.mockResolvedValue(null);
            mockUserServiceInstance.createUser.mockResolvedValue(mockUser);

            await register(mockRequest as Request, mockResponse as Response);

            expect(mockUserServiceInstance.findByEmail).toHaveBeenCalledWith('test@example.com');
            expect(mockUserServiceInstance.createUser).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(mockRedisSet).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'User registered successfully',
                token: expect.any(String),
                user: expect.objectContaining({
                    id: '123',
                    email: 'test@example.com',
                    name: 'Test User'
                })
            }));
        });

        it('should handle missing required fields', async () => {
            mockRequest.body = {
                email: 'test@example.com',
                // Missing password and name
            };

            await register(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: 'Missing required fields'
            });
        });

        it('should handle existing user', async () => {
            const existingUser = {
                id: '123',
                email: 'test@example.com',
                password: 'hashedPassword',
            };

            mockRequest.body = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };

            mockUserServiceInstance.findByEmail.mockResolvedValue(existingUser);

            await register(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: 'User already exists'
            });
        });
    });

    describe('login', () => {
        it('should login user successfully', async () => {
            const mockUser = {
                id: '123',
                email: 'test@example.com',
                password: 'hashedPassword',
            };

            mockRequest.body = {
                email: 'test@example.com',
                password: 'password123'
            };

            mockUserServiceInstance.verifyPassword.mockResolvedValue(mockUser);

            await login(mockRequest as Request, mockResponse as Response);

            expect(mockUserServiceInstance.verifyPassword).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(mockRedisSet).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Login successful',
                token: expect.any(String),
                user: expect.objectContaining({
                    id: '123',
                    email: 'test@example.com'
                })
            }));
        });

        it('should handle invalid credentials', async () => {
            mockRequest.body = {
                email: 'test@example.com',
                password: 'wrongpassword'
            };

            mockUserServiceInstance.verifyPassword.mockResolvedValue(null);

            await login(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: 'Invalid credentials'
            });
        });

        it('should handle missing required fields', async () => {
            mockRequest.body = {
                email: 'test@example.com',
                // Missing password
            };

            await login(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: 'Missing required fields'
            });
        });
    });

    describe('logout', () => {
        it('should logout user successfully', async () => {
            mockRequest.headers = {
                authorization: 'Bearer mockToken'
            };

            await logout(mockRequest as Request, mockResponse as Response);

            expect(mockRedisDel).toHaveBeenCalledWith('session:mockToken');
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Logged out successfully'
            });
        });

        it('should handle missing token', async () => {
            mockRequest.headers = {};

            await logout(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: 'No token provided'
            });
        });
    });
}); 