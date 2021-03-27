import { Food } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IFoodRepository from '../../repositories/model/IFoodRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class ShowFoodService {
	constructor(
		@inject('FoodRepository')
		private foodRepository: IFoodRepository,
	) {}

	public async execute({ id }: IRequest): Promise<Food> {
		const food = await this.foodRepository.findById(id);
		if (!food) {
			throw new AppError('Alimento não encontrado');
		}

		return food;
	}
}

export default ShowFoodService;
