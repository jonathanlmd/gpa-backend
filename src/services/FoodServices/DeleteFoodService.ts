import { Food } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import ISubstitutionRepository from '../../repositories/model/ISubstitutionRepository';
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
		@inject('SubstitutionRepository')
		private substitutionRepository: ISubstitutionRepository,
	) {}

	public async execute({ id }: IRequest): Promise<Food> {
		const isValidFood = await this.foodRepository.findById(id);
		if (!isValidFood) {
			throw new AppError('Food not found');
		}

		await this.substitutionRepository.deleteByFood(isValidFood.id);

		return await this.foodRepository.delete(id);
	}
}

export default DeleteFoodService;
