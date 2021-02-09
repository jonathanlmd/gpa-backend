import { Router } from 'express';
import MealController from '../controller/MealController';

const mealRoutes = Router();

const mealController = new MealController();

mealRoutes.post('/', mealController.create);
mealRoutes.put('/', mealController.update);
mealRoutes.delete('/:id', mealController.delete);
mealRoutes.post('/addFood', mealController.addFoodToMeal);

export default mealRoutes;
