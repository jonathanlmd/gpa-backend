import { Router } from 'express';
import NewController from '../controller/NewController';

const newRoutes = Router();

const newController = new NewController();

newRoutes.post('/', newController.create);
newRoutes.get('/:id', newController.show);
newRoutes.get('/', newController.list);
newRoutes.put('/', newController.update);
newRoutes.delete('/:id', newController.delete);

export default newRoutes;
