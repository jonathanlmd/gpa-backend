import { Food, Substitution } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import ISubstitutionRepository from '../../repositories/model/ISubstitutionRepository';
import AppError from '../../errors/AppError';
import IFoodRepository from '../../repositories/model/IFoodRepository';

interface IRequest {
	id: number;
	measure?: number;
	calories?: number;
	name?: string;
	unity: string;
	substitutions?: Array<{
		id: number;
		measure: number;
		description: string | null;
	}>;
}
interface IResponse extends Food {
	substitutions: Array<Substitution>;
}

@injectable()
class UpdateFoodService {
	constructor(
		@inject('FoodRepository')
		private foodsRepository: IFoodRepository,
		@inject('SubstitutionRepository')
		private substitutionRepository: ISubstitutionRepository,
	) {}

	public async execute({
		id,
		measure,
		calories,
		name,
		unity,
		substitutions,
	}: IRequest): Promise<IResponse> {
		const food = await this.foodsRepository.findById(id);
		if (!food) {
			throw new AppError('Alimento não encontrado');
		}

		if (!(measure && calories && name && unity)) {
			throw new AppError('Todos os campos devem ser informaods');
		}
		if (substitutions) {
			await this.substitutionRepository.deleteByFood(food.id);

			await Promise.allSettled(
				substitutions
					.filter(subs => subs.id !== food.id)
					.map(
						async ({ id: substitution_id, measure: measure_, description }) => {
							return await this.substitutionRepository.create({
								food_id: id,
								food_substitution_id: substitution_id,
								description,
								measure: measure_,
							});
						},
					),
			);
		}

		const {
			substitutions: substitutions_,
			...rest
		} = await this.foodsRepository.update({
			id,
			measure,
			calories,
			name,
			unity,
		});

		return {
			...rest,
			substitutions: substitutions_,
		};
	}
}

export default UpdateFoodService;
