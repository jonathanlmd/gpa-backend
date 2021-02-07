import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import foodRoutes from './food.routes';
import tipRoutes from './tip.routes';
import newRoutes from './news.routes';
import sessionsRoutes from './sessions.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/food', ensureAuthenticated, foodRoutes);
routes.use('/tip', ensureAuthenticated, tipRoutes);
routes.use('/news', ensureAuthenticated, newRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
