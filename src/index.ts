import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import redisClient from './config/redis';
import app from './app';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

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