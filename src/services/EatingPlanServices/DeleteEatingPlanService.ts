import { EatingPlan } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IMealHasFoodRepository from '../../repositories/model/IMealHasFoodRepository';
import IEatingPlanRepository from '../../repositories/model/IEatingPlanRepository';
import IMealRepository from '../../repositories/model/IMealRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class DeleteEatingPlanService {
	constructor(
		@inject('EatingPlanRepository')
		private eatingPlanRepository: IEatingPlanRepository,
		@inject('MealRepository')
		private mealRepository: IMealRepository,
		@inject('MealHasFoodRepository')
		private mealHasFoodRepository: IMealHasFoodRepository,
	) {}

	public async execute({ id }: IRequest): Promise<EatingPlan> {
		const isValidEatingPlan = await this.eatingPlanRepository.getById(id);
		if (!isValidEatingPlan) {
			throw new AppError('Plano alimentar não encontrado');
		}

		await Promise.allSettled(
			isValidEatingPlan.meal.map(async ({ id: meal_id }) => {
				return await this.mealHasFoodRepository.deleteByMeal(meal_id);
			}),
		);

		await this.mealRepository.deleteByEatingPlan(isValidEatingPlan.id);

		return await this.eatingPlanRepository.deleteById(isValidEatingPlan.id);
	}
}

export default DeleteEatingPlanService;
