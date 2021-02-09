import { inject, injectable } from 'tsyringe';
import { Meal } from '@prisma/client';
import IMealRepository from '../../repositories/model/IMealRepository';
import AppError from '../../errors/AppError';

@injectable()
class UpdateMealService {
	constructor(
		@inject('MealRepository')
		private mealRepository: IMealRepository,
	) {}

	public async execute(meal: Meal): Promise<Meal> {
		const { eating_plan_id, name, observations, id } = meal;

		if (!(id && eating_plan_id && name)) {
			throw new AppError('All fields should be informed');
		}

		return await this.mealRepository.update({
			eating_plan_id,
			name,
			id,
			observations,
		});
	}
}

export default UpdateMealService;
