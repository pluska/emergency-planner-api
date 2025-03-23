import { createClient } from "redis/dist";
import dotenv from "dotenv";

dotenv.config();

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

export default redisClient;