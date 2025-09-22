import { ItemService } from '../src/services/item.service';
import { db, initDb } from '../src/db';

beforeAll(() => {
    initDb();
});

afterAll((done) => {
    db.close((err) => {
        done(err as any);
    });
});

describe('ItemService', () => {
    it('creates and lists items', async () => {
        const created = await ItemService.create('Milch', 2);
        expect(created.id).toBeDefined();
        const list = await ItemService.list();
        expect(list.find(i => i.id === created.id)?.name).toBe('Milch');
    });

    it('updates item', async () => {
        const a = await ItemService.create('Brot', 1);
        const upd = await ItemService.update(a.id!, { quantity: 3, checked: true });
        expect(upd?.quantity).toBe(3);
        expect(upd?.checked).toBe(true);
    });

    it('removes item', async () => {
        const a = await ItemService.create('Eier', 10);
        const ok = await ItemService.remove(a.id!);
        expect(ok).toBe(true);
    });
});