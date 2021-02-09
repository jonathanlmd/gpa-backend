import { inject, injectable } from 'tsyringe';
import { MealHasFood } from '@prisma/client';
import IFoodRepository from '../../repositories/model/IFoodRepository';
import IMealRepository from '../../repositories/model/IMealRepository';
import IMealHasFoodRepository from '../../repositories/model/IMealHasFoodRepository';
import AppError from '../../errors/AppError';

@injectable()
class UpdateMealService {
	constructor(
		@inject('MealRepository')
		private mealRepository: IMealRepository,
		@inject('FoodRepository')
		private foodRepository: IFoodRepository,
		@inject('MealHasFoodRepository')
		private mealHasFoodRepository: IMealHasFoodRepository,
	) {}

	public async execute(ids: MealHasFood): Promise<MealHasFood> {
		const { meal_id, food_id, description, measure } = ids;

		const isValidMeal = this.mealRepository.findById(meal_id);
		if (!isValidMeal) {
			throw new AppError('Invalid Meal');
		}
		const isValidFood = this.foodRepository.findById(food_id);
		if (!isValidFood) {
			throw new AppError('Invalid Food');
		}

		return await this.mealHasFoodRepository.create({
			description,
			food_id,
			meal_id,
			measure,
		});
	}
}

export default UpdateMealService;
