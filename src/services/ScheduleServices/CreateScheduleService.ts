import { inject, injectable } from 'tsyringe';
import { Schedule } from '@prisma/client';
import IPatientRepository from '../../repositories/model/IPatientRepository';
import IAnthropometricDataRepository from '../../repositories/model/IAnthropometricDataRepository';
import IScheduleRepository from '../../repositories/model/IScheduleRepository';
import AppError from '../../errors/AppError';

@injectable()
class CreatePatientService {
	constructor(
		@inject('ScheduleRepository')
		private scheduleRepository: IScheduleRepository,
		@inject('AnthropometricDataRepository')
		private anthropometricDataRepository: IAnthropometricDataRepository,
		@inject('PatientRepository')
		private PatientRepository: IPatientRepository,
	) {}

	public async execute(schedule: Omit<Schedule, 'id'>): Promise<Schedule> {
		const {
			date,
			anthropometric_data_id,
			observation,
			patient_id,
			value,
		} = schedule;

		if (
			!(date && value && patient_id && patient_id && anthropometric_data_id)
		) {
			throw new AppError('Todos os dados obrigatórios devem ser informados');
		}

		const validPatient = await this.PatientRepository.findById(patient_id);
		console.log('Paciente', validPatient);

		if (!validPatient) {
			throw new AppError('Paciente inválido');
		}

		const validAnthropometricData = await this.anthropometricDataRepository.findById(
			anthropometric_data_id,
		);

		if (!validAnthropometricData) {
			throw new AppError('Dados antropométricos não encontrados');
		}

		return await this.scheduleRepository.create({
			anthropometric_data_id,
			date,
			observation,
			patient_id,
			value,
		});
	}
}

export default CreatePatientService;
