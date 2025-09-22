import sqlite3 from 'sqlite3';
import path from 'node:path';

sqlite3.verbose();

const DB_PATH = path.resolve(__dirname, '..', 'data.sqlite');

export const db = new sqlite3.Database(DB_PATH);

export function initDb() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      checked INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );`);
    });
}
