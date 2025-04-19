import { Request, Response } from 'express';
import { ErrorHandler } from './ErrorHandler';

export abstract class BaseController<T> {
    protected abstract getItemById(id: string): Promise<T | null>;
    protected abstract getAllItems(): Promise<T[]>;
    protected abstract createItem(item: T): Promise<T>;
    protected abstract updateItem(id: string, item: Partial<T>): Promise<T | null>;
    protected abstract deleteItem(id: string): Promise<boolean>;

    async create(req: Request, res: Response): Promise<void> {
        try {
            const newItem = await this.createItem(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const items = await this.getAllItems();
            res.status(200).json(items);
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const item = await this.getItemById(req.params.id);
            if (!item) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }
            res.status(200).json(item);
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const updatedItem = await this.updateItem(req.params.id, req.body);
            if (!updatedItem) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }
            res.status(200).json(updatedItem);
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteItem(req.params.id);
            if (!success) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            ErrorHandler.handleError(res, error);
        }
    }
} 