import { Router } from 'express';
import FoodController from '../controller/FoodController';

const foodRoutes = Router();

const foodController = new FoodController();

foodRoutes.post('/', foodController.create);
foodRoutes.get('/:id', foodController.show);
foodRoutes.get('/', foodController.list);
foodRoutes.put('/', foodController.update);
foodRoutes.delete('/:id', foodController.delete);

export default foodRoutes;
