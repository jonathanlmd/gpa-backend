import { inject, injectable } from 'tsyringe';
import { Anamnesis } from '@prisma/client';
import IAnamnesisHasScheduleRepository from '../../repositories/model/IAnamnesisHasScheduleRepository';
import IAnamnesisRepository from '../../repositories/model/IAnamnesisRepository';

@injectable()
class DeleteAnamneseService {
	constructor(
		@inject('AnamnesisHasScheduleRepository')
		private anamnesisHasScheduleRepository: IAnamnesisHasScheduleRepository,
		@inject('AnamnesisRepository')
		private anamnesisRepository: IAnamnesisRepository,
	) {}

	public async execute(scheduleId: number): Promise<Anamnesis[]> {
		await this.anamnesisHasScheduleRepository.deleteBySchedule(scheduleId);
		return await this.anamnesisRepository.deleteBySchedule(scheduleId);
	}
}

export default DeleteAnamneseService;
