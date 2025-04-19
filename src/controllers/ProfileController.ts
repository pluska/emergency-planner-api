import { BaseController } from './base/BaseController';
import { Profile } from '../models/profileModel';
import { ProfileService } from '../services/ProfileService';

export class ProfileController extends BaseController<Profile> {
    private profileService: ProfileService;

    constructor() {
        super();
        this.profileService = new ProfileService();
    }

    protected async getItemById(id: string): Promise<Profile | null> {
        return this.profileService.getById(id);
    }

    protected async getAllItems(): Promise<Profile[]> {
        return this.profileService.getAll();
    }

    protected async createItem(item: Profile): Promise<Profile> {
        return this.profileService.create(item);
    }

    protected async updateItem(id: string, item: Partial<Profile>): Promise<Profile | null> {
        return this.profileService.update(id, item);
    }

    protected async deleteItem(id: string): Promise<boolean> {
        return this.profileService.delete(id);
    }
} 