import { inject, injectable } from 'tsyringe';
import { Meal, Substitution } from '@prisma/client';
import IMealRepository from 'repositories/model/IMealRepository';
import IMealHasFoodRepository from 'repositories/model/IMealHasFoodRepository';
import ISubstitutionRepository from '../../repositories/model/ISubstitutionRepository';
import IFoodRepository from '../../repositories/model/IFoodRepository';
import AppError from '../../errors/AppError';

interface IParams extends Omit<Meal, 'id'> {
	substitutions?: Array<{
		id: number;
		measure: number;
		description: string | null;
	}>;
}
interface IResponse extends Food {
	substitutions: Substitution[];
}

@injectable()
class CreateMealService {
	constructor(
		@inject('MealRepository')
		private mealRepository: IMealRepository,
		@inject('MealHasFoodRepository')
		private mealHasFoodRepository: IMealHasFoodRepository,
	) {}

	public async execute(food: IParams): Promise<IResponse> {
		const { measure, calories, name, unity, substitutions } = food;

		if (!(measure && calories && name && unity)) {
			throw new AppError('All fields should be informed');
		}

		const newFood = await this.foodRepository.create({
			measure,
			calories,
			name,
			unity,
		});

		let createdSubstitutions;
		if (substitutions) {
			createdSubstitutions = await Promise.allSettled(
				substitutions
					.filter(subs => subs.id !== newFood.id)
					.map(
						async ({ id: substitution_id, measure: measure_, description }) => {
							return await this.substitutionRepository.create({
								food_id: substitution_id,
								food_substitution_id: newFood.id,
								description,
								measure: measure_,
							});
						},
					),
			);
		}

		return {
			substitutions: createdSubstitutions
				? createdSubstitutions
						.filter(resp => resp.status === 'fulfilled')
						.map((resp: any) => resp.value as Substitution)
				: [],
			...newFood,
		};
	}
}

export default CreateMealService;
