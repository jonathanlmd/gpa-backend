import { Router } from 'express';
import SessionsController from '../controller/SessionsController';

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post('/', sessionsController.login);

export default sessionsRoutes;
