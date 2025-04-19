import { Request } from 'express';
import { User } from '../models/userModel';

export interface UserInterface extends Request {
    user: {
        id: string;
        email: string;
    }
}

export interface CreateUserRequest {
    email: string;
    password: string;
}

export interface UpdateUserRequest {
    email?: string;
    password?: string;
}
