import { EatingPlan } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IEatingPlanRepository from 'repositories/model/IEatingPlanRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class DeleteEatingPlanService {
	constructor(
		@inject('EatingPlanRepository')
		private eatingPlanRepository: IEatingPlanRepository,
	) {}

	public async execute({ id }: IRequest): Promise<EatingPlan> {
		const isValidEatingPlan = await this.eatingPlanRepository.getById(id);
		if (!isValidEatingPlan) {
			throw new AppError('Eating Plan not found');
		}

		return await this.eatingPlanRepository.deleteById(isValidEatingPlan.id);
	}
}

export default DeleteEatingPlanService;
