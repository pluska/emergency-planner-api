import { BaseService } from './BaseService';
import { EssentialInfo } from '../models/essentialInfoModel';

export class EssentialInfoService extends BaseService<EssentialInfo> {
    constructor() {
        super('essential_info');
    }
} 