import { Router } from 'express';
import SessionsController from '../controller/SessionsController';

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post('/patient', sessionsController.patientLogin);
sessionsRoutes.post('/nutritionist', sessionsController.nutritionistLogin);

export default sessionsRoutes;
