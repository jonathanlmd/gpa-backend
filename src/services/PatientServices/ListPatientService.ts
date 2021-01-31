import { paciente as Patient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IPatientRepository from '../../repositories/model/IPatientRepository';

@injectable()
class ListPatientService {
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository,
	) {}

	public async execute(): Promise<Patient[]> {
		return (await this.patientRepository.getAll()) as Patient[];
	}
}

export default ListPatientService;
