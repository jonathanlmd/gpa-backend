import { Router } from 'express';
import ScheduleController from '../controller/ScheduleController';

const scheduleRoutes = Router();

const scheduleController = new ScheduleController();

scheduleRoutes.post('/', scheduleController.create);
scheduleRoutes.get('/:id', scheduleController.findById);
scheduleRoutes.get('/patient/:id', scheduleController.findByPatient);

export default scheduleRoutes;
