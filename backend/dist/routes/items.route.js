"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsRouter = void 0;
const express_1 = require("express");
const item_service_1 = require("../services/item.service");
exports.itemsRouter = (0, express_1.Router)();
exports.itemsRouter.post('/', async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const item = await item_service_1.ItemService.create(name, quantity ?? 1);
        res.status(201).json(item);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
});
exports.itemsRouter.get('/', async (_req, res) => {
    const items = await item_service_1.ItemService.list();
    res.json(items);
});
exports.itemsRouter.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'invalid id' });
    }
    try {
        const updated = await item_service_1.ItemService.update(id, req.body ?? {});
        console.log(updated);
        if (!updated) {
            return res.status(404).json({ error: 'not found' });
        }
        res.json(updated);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
});
exports.itemsRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'invalid id' });
    }
    const ok = await item_service_1.ItemService.remove(id);
    res.status(ok ? 204 : 404).end();
});
exports.itemsRouter.post('/reset', async (_req, res) => {
    await item_service_1.ItemService.reset();
    res.status(204).end();
});
exports.itemsRouter.get('/export/csv', async (_req, res) => {
    const csv = await item_service_1.ItemService.exportCsv();
    res.header('Content-Type', 'text/csv');
    res.attachment('einkaufsliste.csv');
    res.send(csv);
});
