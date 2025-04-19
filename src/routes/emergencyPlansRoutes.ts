import { Router, Request, Response } from 'express';
import { EmergencyPlansController } from '../controllers/emergencyPlansController';

const router = Router();
const emergencyPlansController = new EmergencyPlansController();

router.post('/', async (req: Request, res: Response) => {
    try {
        const item = await emergencyPlansController.createItem(req.body);
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create emergency plan' });
    }
});

router.get('/', async (_req: Request, res: Response) => {
    try {
        const items = await emergencyPlansController.getAllItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get emergency plans' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const item = await emergencyPlansController.getItemById(req.params.id);
        if (!item) {
            res.status(404).json({ error: 'Emergency plan not found' });
            return;
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get emergency plan' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const item = await emergencyPlansController.updateItem(req.params.id, req.body);
        if (!item) {
            res.status(404).json({ error: 'Emergency plan not found' });
            return;
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update emergency plan' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const success = await emergencyPlansController.deleteItem(req.params.id);
        if (!success) {
            res.status(404).json({ error: 'Emergency plan not found' });
            return;
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete emergency plan' });
    }
});

export default router; 