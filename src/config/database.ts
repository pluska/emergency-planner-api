import { DataSource } from 'typeorm';
import { User } from '../models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const password = process.env.DB_PASSWORD;
if (!password) {
    throw new Error('Database password is not set in environment variables');
}

const connectionString = `postgresql://${process.env.DB_USERNAME}:${password}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: connectionString,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    entities: [User],
    migrations: [],
    subscribers: [],
});
