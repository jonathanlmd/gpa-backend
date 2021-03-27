/* eslint-disable no-underscore-dangle */
import { EatingPlan } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IEatingPlanRepository from '../../repositories/model/IEatingPlanRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class GetLastEatingPlanService {
	constructor(
		@inject('EatingPlanRepository')
		private eatingPlanRepository: IEatingPlanRepository,
	) {}

	public async execute({ id }: IRequest): Promise<EatingPlan> {
		const eatingPlan = await this.eatingPlanRepository.getById(id);
		if (!eatingPlan) {
			throw new AppError('News not found');
		}

		return eatingPlan;
	}
}

export default GetLastEatingPlanService;
