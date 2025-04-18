import { Request } from 'express';

export interface UserInterface extends Request {
    user: {
        id: string;
        email: string;
        name: string;
    }
}

export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
}
