import { Request, Response } from 'express';
import { Profile } from '../interface/Profile';

// Mock database operations
const profiles: Profile[] = [];

export class ProfileController {
    static async createProfile(req: Request, res: Response) {
        const newProfile: Profile = req.body;
        profiles.push(newProfile);
        res.status(201).json(newProfile);
    }

    static async getProfiles(req: Request, res: Response) {
        res.status(200).json(profiles);
    }

    static async getProfileById(req: Request, res: Response) {
        const { id } = req.params;
        const profile = profiles.find(p => p.id === parseInt(id));
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    }

    static async updateProfile(req: Request, res: Response) {
        const { id } = req.params;
        const index = profiles.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            profiles[index] = { ...profiles[index], ...req.body };
            res.status(200).json(profiles[index]);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    }

    static async deleteProfile(req: Request, res: Response) {
        const { id } = req.params;
        const index = profiles.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            profiles.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    }
} 