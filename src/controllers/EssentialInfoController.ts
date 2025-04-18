import { Request, Response } from 'express';
import { EssentialInfo } from '../interface/Profile';

// Mock database operations
const essentialInfoList: EssentialInfo[] = [];

export class EssentialInfoController {
    static async createEssentialInfo(req: Request, res: Response) {
        const newEssentialInfo: EssentialInfo = req.body;
        essentialInfoList.push(newEssentialInfo);
        res.status(201).json(newEssentialInfo);
    }

    static async getEssentialInfo(req: Request, res: Response) {
        res.status(200).json(essentialInfoList);
    }

    static async getEssentialInfoById(req: Request, res: Response) {
        const { id } = req.params;
        const essentialInfo = essentialInfoList.find(f => f.id === id);
        if (essentialInfo) {
            res.status(200).json(essentialInfo);
        } else {
            res.status(404).json({ message: 'Essential Info not found' });
        }
    }

    static async updateEssentialInfo(req: Request, res: Response) {
        const { id } = req.params;
        const index = essentialInfoList.findIndex(f => f.id === id);
        if (index !== -1) {
            essentialInfoList[index] = { ...essentialInfoList[index], ...req.body };
            res.status(200).json(essentialInfoList[index]);
        } else {
            res.status(404).json({ message: 'Essential Info not found' });
        }
    }

    static async deleteEssentialInfo(req: Request, res: Response) {
        const { id } = req.params;
        const index = essentialInfoList.findIndex(f => f.id === id);
        if (index !== -1) {
            essentialInfoList.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Essential Info not found' });
        }
    }
} 