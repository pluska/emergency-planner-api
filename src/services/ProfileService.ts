import { BaseService } from './BaseService';
import { Profile } from '../models/profileModel';

export class ProfileService extends BaseService<Profile> {
    constructor() {
        super('profiles');
    }
} 