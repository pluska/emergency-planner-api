import { Response } from 'express';

export class ErrorHandler {
    static handleError(res: Response, error: unknown): void {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
} 