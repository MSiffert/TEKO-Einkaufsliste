import { Router } from 'express';
import { ItemService } from '../services/item.service';

export const itemsRouter = Router();

itemsRouter.post('/', async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const item = await ItemService.create(name, quantity ?? 1);
        res.status(201).json(item);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

itemsRouter.get('/', async (_req, res) => {
    const items = await ItemService.list();
    res.json(items);
});

itemsRouter.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'invalid id' });
    }

    try {
        const updated = await ItemService.update(id, req.body ?? {});
        console.log(updated)

        if (!updated) {
            return res.status(404).json({ error: 'not found' });
        }

        res.json(updated);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

itemsRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'invalid id' });
    }

    const ok = await ItemService.remove(id);

    res.status(ok ? 204 : 404).end();
});

itemsRouter.post('/reset', async (_req, res) => {
    await ItemService.reset();
    res.status(204).end();
});

itemsRouter.get('/export/csv', async (_req, res) => {
    const csv = await ItemService.exportCsv();

    res.header('Content-Type', 'text/csv');
    res.attachment('einkaufsliste.csv');
    res.send(csv);
});