import { BaseService } from './BaseService';
import { User } from '../models/userModel';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class UserService extends BaseService<User> {
    constructor() {
        super('users');
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    }

    async createUser(email: string, password: string): Promise<User> {
        const id = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await this.query(
            'INSERT INTO users (id, email, password) VALUES ($1, $2, $3) RETURNING *',
            [id, email, hashedPassword]
        );
        return result.rows[0];
    }

    async verifyPassword(email: string, password: string): Promise<User | null> {
        const user = await this.findByEmail(email);
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : null;
    }
} 