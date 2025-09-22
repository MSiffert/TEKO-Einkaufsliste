"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const db_1 = require("../db");
const validate_1 = require("../utils/validate");
function nowIso() {
    return new Date().toISOString();
}
exports.ItemService = {
    create(name, quantity = 1) {
        (0, validate_1.checkNonEmptyString)(name, 'name');
        (0, validate_1.checkPositiveInt)(quantity, 'quantity');
        const now = nowIso();
        return new Promise((resolve, reject) => {
            const stmt = db_1.db.prepare('INSERT INTO items (name, quantity, checked, created_at, updated_at) VALUES (?, ?, 0, ?, ?)');
            stmt.run([name.trim(), quantity, now, now], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve({ id: this.lastID, name: name.trim(), quantity, checked: false, created_at: now, updated_at: now });
            });
            stmt.finalize();
        });
    },
    list() {
        return new Promise((resolve, reject) => {
            db_1.db.all('SELECT * FROM items ORDER BY id DESC', (err, rows) => {
                if (err)
                    return reject(err);
                const items = rows.map((r) => ({
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
    update(id, data) {
        return new Promise((resolve, reject) => {
            const fields = [];
            const values = [];
            if (data.name !== undefined) {
                (0, validate_1.checkNonEmptyString)(data.name, 'name');
                fields.push('name = ?');
                values.push(data.name.trim());
            }
            if (data.quantity !== undefined) {
                (0, validate_1.checkPositiveInt)(data.quantity, 'quantity');
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
            db_1.db.run(`UPDATE items SET ${fields.join(', ')} WHERE id = ?`, values, function (err) {
                if (err) {
                    return reject(err);
                }
                if (this.changes === 0) {
                    return resolve(null);
                }
                db_1.db.get('SELECT * FROM items WHERE id = ?', [id], (err2, row) => {
                    if (err2)
                        return reject(err2);
                    if (!row)
                        return resolve(null);
                    resolve({
                        id: row.id,
                        name: row.name,
                        quantity: row.quantity,
                        checked: !!row.checked,
                        created_at: row.created_at,
                        updated_at: row.updated_at,
                    });
                });
            });
        });
    },
    remove(id) {
        return new Promise((resolve, reject) => {
            db_1.db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(this.changes > 0);
            });
        });
    },
    reset() {
        return new Promise((resolve, reject) => {
            db_1.db.run('DELETE FROM items', (err) => err ? reject(err) : resolve());
        });
    },
    exportCsv() {
        return new Promise((resolve, reject) => {
            db_1.db.all('SELECT * FROM items ORDER BY LOWER(name) ASC', (err, rows) => {
                if (err) {
                    return reject(err);
                }
                const header = 'Name,Quantity,Checked';
                const lines = rows.map((r) => [escapeCsv(String(r.name)), Number(r.quantity), r.checked ? '1' : '0'].join(','));
                resolve([header, ...lines].join('\n'));
            });
        });
    }
};
function escapeCsv(val) {
    if (/[",\n]/.test(val)) {
        return '"' + val.replace(/"/g, '""') + '"';
    }
    return val;
}
