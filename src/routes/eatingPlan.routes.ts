import { Router } from 'express';
import EatingPlanController from '../controller/EatingPlanController';

const eatingPlanRoutes = Router();

const eatingPlanController = new EatingPlanController();

eatingPlanRoutes.post('/', eatingPlanController.create);
eatingPlanRoutes.put('/', eatingPlanController.update);
eatingPlanRoutes.delete('/:id', eatingPlanController.delete);
eatingPlanRoutes.get('/:id', eatingPlanController.show);

export default eatingPlanRoutes;
