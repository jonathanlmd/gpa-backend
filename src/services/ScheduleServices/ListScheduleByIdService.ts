import { inject, injectable } from 'tsyringe';
import { Schedule } from '@prisma/client';
import IScheduleRepository from '../../repositories/model/IScheduleRepository';
import AppError from '../../errors/AppError';

@injectable()
class ListScheduleByIdService {
	constructor(
		@inject('ScheduleRepository')
		private scheduleRepository: IScheduleRepository,
	) {}

	public async execute(id: number): Promise<Schedule | null> {
		if (id === undefined || id === null) {
			throw new AppError('Paciente não informado');
		}
		return this.scheduleRepository.findById(id);
	}
}

export default ListScheduleByIdService;
