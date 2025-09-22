"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.initDb = initDb;
const sqlite3_1 = __importDefault(require("sqlite3"));
const node_path_1 = __importDefault(require("node:path"));
sqlite3_1.default.verbose();
const DB_PATH = node_path_1.default.resolve(__dirname, '..', 'data.sqlite');
exports.db = new sqlite3_1.default.Database(DB_PATH);
function initDb() {
    exports.db.serialize(() => {
        exports.db.run(`CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      checked INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );`);
    });
}
