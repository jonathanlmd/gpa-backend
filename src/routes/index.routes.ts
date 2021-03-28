import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import foodRoutes from './food.routes';
import tipRoutes from './tip.routes';
import newRoutes from './news.routes';
import sessionsRoutes from './sessions.routes';
import userRoutes from './user.routes';
import eatingPlanRoutes from './eatingPlan.routes';
import mealRoutes from './meal.routes';
import scheduleRoutes from './schedule.routes';
import selectRoutes from './select.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/food', ensureAuthenticated, foodRoutes);
routes.use('/schedule', ensureAuthenticated, scheduleRoutes);
routes.use('/select', ensureAuthenticated, selectRoutes);
routes.use('/tip', ensureAuthenticated, tipRoutes);
routes.use('/news', ensureAuthenticated, newRoutes);
routes.use('/eatingplan', ensureAuthenticated, eatingPlanRoutes);
routes.use('/meal', ensureAuthenticated, mealRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
