import { inject, injectable } from 'tsyringe';
import { MealHasFood, Food } from '@prisma/client';
import IFoodRepository from '../../repositories/model/IFoodRepository';
import IMealRepository from '../../repositories/model/IMealRepository';
import IMealHasFoodRepository from '../../repositories/model/IMealHasFoodRepository';
import AppError from '../../errors/AppError';

interface IProps extends MealHasFood {
	food: Food;
}

@injectable()
class AddFoodToMealService {
	constructor(
		@inject('MealRepository')
		private mealRepository: IMealRepository,
		@inject('FoodRepository')
		private foodRepository: IFoodRepository,
		@inject('MealHasFoodRepository')
		private mealHasFoodRepository: IMealHasFoodRepository,
	) {}

	public async execute(ids: MealHasFood): Promise<IProps> {
		const { meal_id, food_id, description, measure } = ids;

		const isValidMeal = this.mealRepository.findById(meal_id);
		if (!isValidMeal) {
			throw new AppError('Refeição inválida');
		}
		const isValidFood = await this.foodRepository.findById(food_id);
		if (!isValidFood) {
			throw new AppError('Alimento inválido');
		}

		const record = await this.mealHasFoodRepository.findByIds({
			food_id,
			meal_id,
		});

		if (record) {
			throw new AppError('Alimento já está inserido nessa refeição');
		}

		const mealHasFood = await this.mealHasFoodRepository.create({
			description,
			food_id,
			meal_id,
			measure,
		});
		return {
			...mealHasFood,
			food: isValidFood,
		};
	}
}

export default AddFoodToMealService;
