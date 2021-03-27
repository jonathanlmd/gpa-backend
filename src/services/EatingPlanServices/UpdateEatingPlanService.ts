import { inject, injectable } from 'tsyringe';
import { EatingPlan } from '@prisma/client';
import IEatingPlanRepository from '../../repositories/model/IEatingPlanRepository';
import AppError from '../../errors/AppError';

@injectable()
class UpdateEatingPlanService {
	constructor(
		@inject('EatingPlanRepository')
		private eatingPlanRepository: IEatingPlanRepository,
	) {}

	public async execute(eatingPlan: EatingPlan): Promise<EatingPlan> {
		const { guidelines, id } = eatingPlan;

		if (!id) {
			throw new AppError('Id inválido');
		}

		return await this.eatingPlanRepository.update({
			id,
			guidelines,
		});
	}
}

export default UpdateEatingPlanService;
