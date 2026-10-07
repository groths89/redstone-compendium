import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { componentRouter } from './routes/componentRoutes';

export const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/components', componentRouter);

// Health Check
app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Error Handling Middleware
app.use(errorHandler);