import { BaseController } from './base/BaseController';
import { EssentialInfo } from '../models/essentialInfoModel';
import { EssentialInfoService } from '../services/EssentialInfoService';

export class EssentialInfoController extends BaseController<EssentialInfo> {
    private essentialInfoService: EssentialInfoService;

    constructor() {
        super();
        this.essentialInfoService = new EssentialInfoService();
    }

    protected async getItemById(id: string): Promise<EssentialInfo | null> {
        return this.essentialInfoService.getById(id);
    }

    protected async getAllItems(): Promise<EssentialInfo[]> {
        return this.essentialInfoService.getAll();
    }

    protected async createItem(item: EssentialInfo): Promise<EssentialInfo> {
        return this.essentialInfoService.create(item);
    }

    protected async updateItem(id: string, item: Partial<EssentialInfo>): Promise<EssentialInfo | null> {
        return this.essentialInfoService.update(id, item);
    }

    protected async deleteItem(id: string): Promise<boolean> {
        return this.essentialInfoService.delete(id);
    }
} 