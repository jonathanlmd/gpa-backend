import { inject, injectable } from 'tsyringe';
import { Schedule } from '@prisma/client';
import IScheduleRepository from '../../repositories/model/IScheduleRepository';
import AppError from '../../errors/AppError';

@injectable()
class LastScheduleByPatientService {
	constructor(
		@inject('ScheduleRepository')
		private scheduleRepository: IScheduleRepository,
	) {}

	public async execute(patientId: number): Promise<Schedule | null> {
		if (patientId === undefined || patientId === null) {
			throw new AppError('Paciente não informado');
		}
		return this.scheduleRepository.findLastByPatient(patientId);
	}
}

export default LastScheduleByPatientService;
