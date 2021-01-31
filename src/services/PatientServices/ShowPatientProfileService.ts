import { paciente as Patient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IPatientRepository from '../../repositories/model/IPatientRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class ShowPatientProfileService {
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository,
	) {}

	public async execute({ id }: IRequest): Promise<Patient> {
		const patient = await this.patientRepository.findById(id);
		if (!patient) {
			throw new AppError('Patient not found');
		}

		return patient;
	}
}

export default ShowPatientProfileService;
