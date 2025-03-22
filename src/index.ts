import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { createClient } from 'redis';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { AppDataSource } from './data-source';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Redis client setup
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error('Max reconnection attempts reached');
        return new Error('Max reconnection attempts reached');
      }
      return Math.min(retries * 100, 3000);
    },
  }
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
  if (err.code === 'ECONNREFUSED') {
    console.error('Make sure Redis server is running');
  } else {
    console.error('An unexpected error occurred:', err.message);
  }
});

redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('ready', () => console.log('Redis Client Ready'));
redisClient.on('reconnecting', () => console.log('Redis Client Reconnecting'));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Emergency Planner API',
      version: '1.0.0',
      description: 'API documentation for Emergency Planner',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
    
    try {
      await redisClient.connect();
      console.log('Redis connected successfully');
    } catch (redisError) {
      if (redisError instanceof Error) {
        console.warn('Redis connection failed, continuing without Redis:', redisError.message);
      } else {
        console.warn('Redis connection failed, continuing without Redis:', redisError);
      }
    }

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();