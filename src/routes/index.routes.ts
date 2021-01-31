import { Router } from 'express';
import foodRoutes from './food.routes';
import sessionsRoutes from './sessions.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/food', foodRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
