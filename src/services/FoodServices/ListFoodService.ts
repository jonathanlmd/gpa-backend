import { alimento as Food } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IFoodRepository from '../../repositories/model/IFoodRepository';

@injectable()
class ListFoodService {
	constructor(
		@inject('FoodRepository')
		private foodRepository: IFoodRepository,
	) {}

	public async execute(): Promise<Food[]> {
		return (await this.foodRepository.getAll()) as Food[];
	}
}

export default ListFoodService;
