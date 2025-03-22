import { AppDataSource } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
    try {
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