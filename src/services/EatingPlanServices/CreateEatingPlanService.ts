import { inject, injectable } from 'tsyringe';
import { EatingPlan } from '@prisma/client';
import IEatingPlanRepository from 'repositories/model/IEatingPlanRepository';

@injectable()
class CreateEatingPlanService {
	constructor(
		@inject('EatingPlanRepository')
		private eatingPlanRepository: IEatingPlanRepository,
	) {}

	public async execute(
		eatingPlan: Omit<EatingPlan, 'id'>,
	): Promise<EatingPlan> {
		const { guidelines } = eatingPlan;

		return await this.eatingPlanRepository.create({
			guidelines,
		});
	}
}

export default CreateEatingPlanService;
