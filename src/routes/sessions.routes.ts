import { Router } from 'express';
import SessionsController from '../controller/SessionsController';

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post('/', sessionsController.login);
sessionsRoutes.post('/forgot', sessionsController.forgotPassword);
sessionsRoutes.post('/reset', sessionsController.resetPassword);

export default sessionsRoutes;
