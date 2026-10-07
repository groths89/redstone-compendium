import { Router } from 'express';
import { simulateComponent } from '../controllers/componentController';

export const componentRouter = Router();

componentRouter.post('/simulate', simulateComponent);