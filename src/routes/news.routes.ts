import { Router } from 'express';
import NewsController from '../controller/NewsController';

const newsRoutes = Router();

const newsController = new NewsController();

newsRoutes.post('/', newsController.create);
newsRoutes.get('/:id', newsController.show);
newsRoutes.get('/', newsController.list);
newsRoutes.get('/date/:month/:year', newsController.getByMonthAndYear);
newsRoutes.put('/', newsController.update);
newsRoutes.delete('/:id', newsController.delete);

export default newsRoutes;
