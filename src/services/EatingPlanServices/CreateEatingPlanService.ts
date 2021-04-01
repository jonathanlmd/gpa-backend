import { inject, injectable } from 'tsyringe';
import { EatingPlan } from '@prisma/client';
import IScheduleRepository from '../../repositories/model/IScheduleRepository';
import IEatingPlanRepository from '../../repositories/model/IEatingPlanRepository';
import AppError from '../../errors/AppError';

@injectable()
class CreateEatingPlanService {
	constructor(
		@inject('EatingPlanRepository')
		private eatingPlanRepository: IEatingPlanRepository,
		@inject('ScheduleRepository')
		private scheduleRepository: IScheduleRepository,
	) {}

	public async execute(
		eatingPlan: Omit<EatingPlan, 'id'>,
		scheduleId: number,
	): Promise<EatingPlan> {
		const { guidelines } = eatingPlan;

		const schedule = await this.scheduleRepository.findById(scheduleId);

		if (!schedule) {
			throw new AppError('Consulta não encontrada');
		}
		if (schedule.eating_plan_id) {
			throw new AppError(
				`Já existe um plano alimentar para essa consulta com Id ${schedule.eating_plan_id}`,
			);
		}

		const newEatingPlan = await this.eatingPlanRepository.create({
			guidelines,
		});

		await this.scheduleRepository.linkEatingPlan(newEatingPlan.id, schedule.id);

		return newEatingPlan;
	}
}

export default CreateEatingPlanService;
