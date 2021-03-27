import { Router } from 'express';
import ScheduleController from '../controller/ScheduleController';

const scheduleRoutes = Router();

const scheduleController = new ScheduleController();

scheduleRoutes.post('/', scheduleController.create);
scheduleRoutes.get('/:id', scheduleController.show);
scheduleRoutes.get('/last/:id', scheduleController.list);

export default scheduleRoutes;
