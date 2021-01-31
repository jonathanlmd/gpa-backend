import { alimento as Food } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IFoodRepository from '../../repositories/model/IFoodRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class DeleteFoodService {
	constructor(
		@inject('FoodRepository')
		private foodRepository: IFoodRepository,
	) {}

	public async execute({ id }: IRequest): Promise<Food> {
		const isValidFood = await this.foodRepository.findById(id);
		if (!isValidFood) {
			throw new AppError('Food not found');
		}
		return await this.foodRepository.delete(id);
	}
}

export default DeleteFoodService;
