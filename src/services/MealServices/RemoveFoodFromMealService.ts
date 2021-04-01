import { inject, injectable } from 'tsyringe';
import { MealHasFood } from '@prisma/client';
import IMealHasFoodRepository from '../../repositories/model/IMealHasFoodRepository';
import AppError from '../../errors/AppError';

interface MealHasFoodIds {
	meal_id: number;
	food_id: number;
}

@injectable()
class RemoveFoodFromMealService {
	constructor(
		@inject('MealHasFoodRepository')
		private mealHasFoodRepository: IMealHasFoodRepository,
	) {}

	public async execute(ids: MealHasFoodIds): Promise<MealHasFood> {
		const { meal_id, food_id } = ids;

		const record = await this.mealHasFoodRepository.findByIds({
			food_id,
			meal_id,
		});

		if (!record) {
			throw new AppError('Alimento não listado para essa refeição');
		}

		return await this.mealHasFoodRepository.delete({
			food_id,
			meal_id,
		});
	}
}

export default RemoveFoodFromMealService;
