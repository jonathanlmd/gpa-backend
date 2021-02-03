import { alimento as Food, substitutos as Substitutions } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import ISubstitutionRepository from '../../repositories/model/ISubstitutionRepository';
import AppError from '../../errors/AppError';
import IFoodRepository from '../../repositories/model/IFoodRepository';

interface IRequest {
	id: number;
	medida?: number;
	caloria?: number;
	nome?: string;
	unindade: string;
	substitutions?: Array<{
		id: number;
		measure: number;
		description: string | null;
	}>;
}
interface IResponse extends Food {
	substitutions: Array<Substitutions>;
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
		medida,
		caloria,
		nome,
		unindade,
		substitutions,
	}: IRequest): Promise<IResponse> {
		const food = await this.foodsRepository.findById(id);
		if (!food) {
			throw new AppError('Food not found');
		}

		if (!(medida && caloria && nome && unindade)) {
			throw new AppError('All fields should be informed');
		}
		if (substitutions) {
			await this.substitutionRepository.deleteByFood(food.id);

			await Promise.allSettled(
				substitutions
					.filter(subs => subs.id !== food.id)
					.map(async ({ id: substitution_id, measure, description }) => {
						return await this.substitutionRepository.create({
							alimento_id: id,
							alimento_substituto_id: substitution_id,
							descricao: description,
							medida: measure,
						});
					}),
			);
		}

		const {
			substitutos_alimentoTosubstitutos_alimento_id,
			...rest
		} = await this.foodsRepository.update({
			id,
			medida,
			caloria,
			nome,
			unindade,
		});

		return {
			...rest,
			substitutions: substitutos_alimentoTosubstitutos_alimento_id,
		};
	}
}

export default UpdateFoodService;
