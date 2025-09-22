import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { initDb } from './db';
import { itemsRouter } from './routes/items.route';

initDb();

export const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/items', itemsRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));