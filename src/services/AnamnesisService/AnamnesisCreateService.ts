import { inject, injectable } from 'tsyringe';
import { Anamnesis } from '@prisma/client';
import IAnamnesisRepository from '../../repositories/model/IAnamnesisRepository';
import IScheduleRepository from '../../repositories/model/IScheduleRepository';
import AppError from '../../errors/AppError';

@injectable()
class CreateAnamneseService {
	constructor(
		@inject('ScheduleRepository')
		private scheduleRepository: IScheduleRepository,
		@inject('AnamnesisRepository')
		private anamnesisRepository: IAnamnesisRepository,
	) {}

	public async execute(
		anamnesis: Omit<Anamnesis, 'id'>[],
		scheduleId: number,
	): Promise<Anamnesis[]> {
		if (!scheduleId) {
			throw new AppError('Consulta inválida');
		}

		const existentSchedule = this.scheduleRepository.findById(scheduleId);

		if (!existentSchedule) {
			throw new AppError('Consulta inválida');
		}

		const newAnamnesisPromises = anamnesis.map(anamnese => {
			return this.anamnesisRepository.create(
				{
					type: anamnese.type,
					description: anamnese.description,
					dangerousness: anamnese.dangerousness,
				},
				scheduleId,
			);
		});

		const newAnamnesis = await Promise.allSettled(newAnamnesisPromises);
		console.log(newAnamnesis);

		const filtered = newAnamnesis.filter(
			anamnese => anamnese.status === 'fulfilled',
		);

		return filtered.map(item => (item as { value: Anamnesis }).value);
	}
}

export default CreateAnamneseService;
