import { DataSource } from 'typeorm';
import { User } from '../models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const password = process.env.DB_PASSWORD;
if (!password) {
    throw new Error('Database password is not set in environment variables');
}
// TODO: Add SSL configuration
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '24999525',
    database: process.env.DB_NAME || 'emergency_planner',
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    entities: [User],
    subscribers: [],
    migrations: [],
});
