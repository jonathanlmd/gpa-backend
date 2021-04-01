import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
	AddFoodToMealService,
	CreateMealService,
	DeleteMealService,
	RemoveFoodFromMealService,
	UpdateMealService,
} from '../services/MealServices';

export default class MealController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, eating_plan_id, observations } = request.body;

		const createMealService = await container.resolve(CreateMealService);

		const meal = await createMealService.execute({
			name,
			eating_plan_id,
			observations,
		});

		return response.json(meal);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id, name, eating_plan_id, observations } = request.body;

		const updateMealService = await container.resolve(UpdateMealService);

		const updatedMeal = await updateMealService.execute({
			id,
			name,
			eating_plan_id,
			observations,
		});

		return response.json(updatedMeal);
	}

	public async addFoodToMeal(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { description, food_id, meal_id, measure } = request.body;
		const addFoodToMealService = await container.resolve(AddFoodToMealService);

		const mealHasFood = await addFoodToMealService.execute({
			description,
			food_id,
			meal_id,
			measure,
		});

		return response.json(mealHasFood);
	}

	public async removeFoodToMeal(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { foodId, mealId } = request.params;
		const removeFoodFromMealService = await container.resolve(
			RemoveFoodFromMealService,
		);

		const mealHasFood = await removeFoodFromMealService.execute({
			food_id: parseInt(foodId, 10),
			meal_id: parseInt(mealId, 10),
		});

		return response.json(mealHasFood);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const deleteMealService = await container.resolve(DeleteMealService);

		const meal = await deleteMealService.execute({
			id: parseInt(id, 10),
		});

		return response.json(meal);
	}
}
