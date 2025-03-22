import { AppDataSource } from './config/database';
import dotenv from 'dotenv';
import { resolve } from 'path';

console.log('Current working directory:', process.cwd());
console.log('Loading .env from:', resolve('.env'));
dotenv.config();

async function testConnection() {
    try {
        console.log('Attempting to connect to database...');
        console.log('Environment variables:', {
            DB_HOST: process.env.DB_HOST,
            DB_PORT: process.env.DB_PORT,
            DB_USERNAME: process.env.DB_USERNAME,
            DB_NAME: process.env.DB_NAME,
            DB_PASSWORD_LENGTH: process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0,
            NODE_ENV: process.env.NODE_ENV
        });
        
        await AppDataSource.initialize();
        console.log('Successfully connected to the database!');
        
        // Test query
        const result = await AppDataSource.query('SELECT NOW()');
        console.log('Database time:', result[0].now);
        
        await AppDataSource.destroy();
        console.log('Connection closed successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

testConnection(); 