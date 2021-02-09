import { inject, injectable } from 'tsyringe';
import { Meal } from '@prisma/client';
import IMealRepository from '../../repositories/model/IMealRepository';
import AppError from '../../errors/AppError';

@injectable()
class CreateMealService {
	constructor(
		@inject('MealRepository')
		private mealRepository: IMealRepository,
	) {}

	public async execute(meal: Omit<Meal, 'id'>): Promise<Meal> {
		const { eating_plan_id, name, observations } = meal;

		if (!(eating_plan_id && name)) {
			throw new AppError('All fields should be informed');
		}

		return await this.mealRepository.create({
			eating_plan_id,
			name,
			observations,
		});
	}
}

export default CreateMealService;
