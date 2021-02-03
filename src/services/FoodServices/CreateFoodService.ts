import { inject, injectable } from 'tsyringe';
import { alimento as Food, substitutos as Substitutions } from '@prisma/client';
import ISubstitutionRepository from '../../repositories/model/ISubstitutionRepository';
import IFoodRepository from '../../repositories/model/IFoodRepository';
import AppError from '../../errors/AppError';

interface IParams extends Omit<Food, 'id'> {
	substitutions?: Array<{
		id: number;
		measure: number;
		description: string | null;
	}>;
}
interface IResponse extends Food {
	substitutions: Substitutions[];
}

@injectable()
class CreateFoodService {
	constructor(
		@inject('FoodRepository')
		private foodRepository: IFoodRepository,
		@inject('SubstitutionRepository')
		private substitutionRepository: ISubstitutionRepository,
	) {}

	public async execute(food: IParams): Promise<IResponse> {
		const { medida, caloria, nome, unindade, substitutions } = food;

		if (!(medida && caloria && nome && unindade)) {
			throw new AppError('All fields should be informed');
		}

		const newFood = await this.foodRepository.create({
			medida,
			caloria,
			nome,
			unindade,
		});

		let createdSubstitutions;
		if (substitutions) {
			createdSubstitutions = await Promise.allSettled(
				substitutions
					.filter(subs => subs.id !== newFood.id)
					.map(async ({ id: substitution_id, measure, description }) => {
						return await this.substitutionRepository.create({
							alimento_id: newFood.id,
							alimento_substituto_id: substitution_id,
							descricao: description,
							medida: measure,
						});
					}),
			);
		}

		return {
			substitutions: createdSubstitutions
				? createdSubstitutions
						.filter(resp => resp.status === 'fulfilled')
						.map((resp: any) => resp.value as Substitutions)
				: [],
			...newFood,
		};
	}
}

export default CreateFoodService;
