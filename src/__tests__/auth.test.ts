import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { register, login } from '../controllers/authController';

// Mock Redis client
jest.mock('redis', () => {
  const mockRedisGet = jest.fn().mockResolvedValue(null);
  const mockRedisSet = jest.fn().mockResolvedValue('OK');
  return {
    createClient: jest.fn().mockImplementation(() => ({
      connect: jest.fn().mockResolvedValue(undefined),
      get: mockRedisGet,
      set: mockRedisSet,
      on: jest.fn(),
      quit: jest.fn().mockResolvedValue(undefined),
    })),
  };
});

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true),
}));

// Mock jwt
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mockToken'),
}));

describe('Authentication', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockRedisGet: jest.Mock;
  let mockRedisSet: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    // Get the mock functions from the Redis mock
    const redisMock = require('redis');
    const redisClient = redisMock.createClient();
    mockRedisGet = redisClient.get;
    mockRedisSet = redisClient.set;
    // Clear all mock calls
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      await register(mockRequest as Request, mockResponse as Response);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockRedisSet).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'User registered successfully',
        token: expect.any(String),
        user: expect.objectContaining({
          email: 'test@example.com'
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
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User'
      };

      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123'
      };

      mockRedisGet.mockResolvedValueOnce(JSON.stringify(mockUser));

      await login(mockRequest as Request, mockResponse as Response);

      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Login successful',
        token: expect.any(String),
        user: expect.objectContaining({
          email: 'test@example.com'
        })
      }));
    });

    it('should handle invalid credentials', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User'
      };

      mockRequest.body = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      mockRedisGet.mockResolvedValueOnce(JSON.stringify(mockUser));
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Invalid credentials'
      });
    });
  });
}); 