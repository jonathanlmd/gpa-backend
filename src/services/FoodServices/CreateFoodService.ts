import { inject, injectable } from 'tsyringe';
import { alimento as Food } from '@prisma/client';
import IFoodRepository from '../../repositories/model/IFoodRepository';
import AppError from '../../errors/AppError';

@injectable()
class CreateFoodService {
	constructor(
		@inject('FoodRepository')
		private foodRepository: IFoodRepository,
	) {}

	public async execute(food: Omit<Food, 'id'>): Promise<Food> {
		const { medida, caloria, nome, unindade } = food;

		if (!(medida && caloria && nome && unindade)) {
			throw new AppError('All fields should be informed');
		}

		return await this.foodRepository.create({
			...food,
		});
	}
}

export default CreateFoodService;
