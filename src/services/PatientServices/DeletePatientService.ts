import { paciente as Patient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IPatientRepository from '../../repositories/model/IPatientRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class DeletePatientService {
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository,
	) {}

	public async execute({ id }: IRequest): Promise<Patient> {
		const isValidPatient = await this.patientRepository.findById(id);
		if (!isValidPatient) {
			throw new AppError('Patient not found');
		}
		return await this.patientRepository.delete(id);
	}
}

export default DeletePatientService;
