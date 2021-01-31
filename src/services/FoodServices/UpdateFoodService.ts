import { alimento as Food } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import AppError from '../../errors/AppError';
import IFoodRepository from '../../repositories/model/IFoodRepository';

interface IRequest {
	id: number;
	medida?: number;
	caloria?: number;
	nome?: string;
	unindade: string;
}

@injectable()
class UpdateFoodService {
	constructor(
		@inject('FoodRepository')
		private foodsRepository: IFoodRepository,
	) {}

	public async execute({
		id,
		medida,
		caloria,
		nome,
		unindade,
	}: IRequest): Promise<Food> {
		const food = await this.foodsRepository.findById(id);
		if (!food) {
			throw new AppError('Food not found');
		}

		if (!(medida && caloria && nome && unindade)) {
			throw new AppError('All fields should be informed');
		}

		return this.foodsRepository.update({
			id,
			medida,
			caloria,
			nome,
			unindade,
		});
	}
}

export default UpdateFoodService;
