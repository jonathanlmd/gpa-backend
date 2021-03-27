import { Food, Meal } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IMealRepository from '../../repositories/model/IMealRepository';
import IMealHasFoodRepository from '../../repositories/model/IMealHasFoodRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class DeleteMealService {
	constructor(
		@inject('MealRepository')
		private mealRepository: IMealRepository,
		@inject('MealHasFoodRepository')
		private mealHasFoodRepository: IMealHasFoodRepository,
	) {}

	public async execute({ id }: IRequest): Promise<Meal> {
		const isValidMeal = await this.mealRepository.findById(id);
		if (!isValidMeal) {
			throw new AppError('Alimento não encontrado');
		}

		await this.mealHasFoodRepository.deleteByMeal(isValidMeal.id);

		return await this.mealRepository.deleteById(isValidMeal.id);
	}
}

export default DeleteMealService;
