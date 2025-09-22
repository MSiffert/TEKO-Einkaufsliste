import { db } from '../db';
import { Item } from '../models/item.model';
import { checkNonEmptyString, checkPositiveInt } from '../utils/validate';

function nowIso() {
    return new Date().toISOString();
}

export const ItemService = {
    create(name: string, quantity = 1): Promise<Item> {
        checkNonEmptyString(name, 'name');
        checkPositiveInt(quantity, 'quantity');

        const now = nowIso();
        return new Promise((resolve, reject) => {
            const stmt = db.prepare('INSERT INTO items (name, quantity, checked, created_at, updated_at) VALUES (?, ?, 0, ?, ?)');
            stmt.run([name.trim(), quantity, now, now], function (err) {
                if (err) {
                    return reject(err);
                }

                resolve({ id: this.lastID, name: name.trim(), quantity, checked: false, created_at: now, updated_at: now });
            });
            stmt.finalize();
        });
    },

    list(): Promise<Item[]> {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM items ORDER BY id DESC', (err, rows: any[]) => {
                if (err) return reject(err);
                const items: Item[] = rows.map((r: any) => ({
                    id: r.id,
                    name: r.name,
                    quantity: r.quantity,
                    checked: !!r.checked,
                    created_at: r.created_at,
                    updated_at: r.updated_at,
                }));
                resolve(items);
            });
        });
    },

    update(id: number, data: Partial<Pick<Item, 'name' | 'quantity' | 'checked'>>): Promise<Item | null> {
        return new Promise((resolve, reject) => {
            const fields: string[] = [];
            const values: any[] = [];

            if (data.name !== undefined) {
                checkNonEmptyString(data.name, 'name');
                fields.push('name = ?');
                values.push(data.name.trim());
            }

            if (data.quantity !== undefined) {
                checkPositiveInt(data.quantity, 'quantity');
                fields.push('quantity = ?');
                values.push(data.quantity);
            }

            if (data.checked !== undefined) {
                fields.push('checked = ?');
                values.push(data.checked ? 1 : 0);
            }

            if (fields.length === 0) {
                return resolve(null);
            }

            const updatedAt = nowIso();
            fields.push('updated_at = ?');
            values.push(updatedAt);
            values.push(id);

            db.run(`UPDATE items SET ${fields.join(', ')} WHERE id = ?`, values, function (err) {
                if (err) {
                    return reject(err);
                }

                if (this.changes === 0) {
                    return resolve(null);
                }

                db.get('SELECT * FROM items WHERE id = ?', [id], (err2, row: any) => {
                    if (err2) return reject(err2);
                    if (!row) return resolve(null);
                    resolve({
                        id: row.id,
                        name: row.name,
                        quantity: row.quantity,
                        checked: !!row.checked,
                        created_at: row.created_at,
                        updated_at: row.updated_at,
                    } as Item);
                });
            });
        });
    },


    remove(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
                if (err) {
                    return reject(err);
                }

                resolve(this.changes > 0);
            });
        });
    },

    reset(): Promise<void> {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM items', (err) => err ? reject(err) : resolve());
        });
    },

    exportCsv(): Promise<string> {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM items ORDER BY LOWER(name) ASC', (err, rows: any[]) => {
                if (err) {
                    return reject(err);
                }

                const header = 'Name,Quantity,Checked';
                const lines = rows.map((r: any) =>
                    [escapeCsv(String(r.name)), Number(r.quantity), r.checked ? '1' : '0'].join(',')
                );

                resolve([header, ...lines].join('\n'));
            });
        });
    }
};


function escapeCsv(val: string) {
    if (/[",\n]/.test(val)) {
        return '"' + val.replace(/"/g, '""') + '"';
    }

    return val;
}