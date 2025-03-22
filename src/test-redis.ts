import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

async function testRedisConnection() {
    const redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err);
    });

    try {
        console.log('Attempting to connect to Redis...');
        await redisClient.connect();
        console.log('Successfully connected to Redis!');

        // Test operation
        await redisClient.set('test-key', 'test-value');
        const value = await redisClient.get('test-key');
        console.log('Test key value:', value);

        await redisClient.disconnect();
        console.log('Redis connection closed successfully');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
}

testRedisConnection(); 