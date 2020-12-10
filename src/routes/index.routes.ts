import { Router } from 'express';
import sessionsRoutes from './sessions.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
