import { inject, injectable } from 'tsyringe';
import { Schedule } from '@prisma/client';
import IPatientRepository from '../../repositories/model/IPatientRepository';
import IAnthropometricDataRepository from '../../repositories/model/IAnthropometricDataRepository';
import IScheduleRepository, {
	IUpdateSchedule,
} from '../../repositories/model/IScheduleRepository';
import AppError from '../../errors/AppError';

@injectable()
class UpdateScheduleService {
	constructor(
		@inject('ScheduleRepository')
		private scheduleRepository: IScheduleRepository,
		@inject('AnthropometricDataRepository')
		private anthropometricDataRepository: IAnthropometricDataRepository,
		@inject('PatientRepository')
		private PatientRepository: IPatientRepository,
	) {}

	public async execute(schedule: IUpdateSchedule): Promise<Schedule> {
		const { date, observation, patient_id, value, id } = schedule;

		if (!(id && date && value && patient_id && patient_id)) {
			throw new AppError('Todos os dados obrigatórios devem ser informados');
		}

		const validPatient = await this.PatientRepository.findById(patient_id);

		if (!validPatient) {
			throw new AppError('Paciente inválido');
		}

		return await this.scheduleRepository.update({
			id,
			date,
			observation,
			patient_id,
			value,
		});
	}
}

export default UpdateScheduleService;
