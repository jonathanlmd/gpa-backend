import { Patient } from '@prisma/client';
import IPatientRepository from '../../../src/repositories/model/IPatientRepository';

export default class FakePatientRepository implements IPatientRepository {
	private fakePatientRepository: Patient[];

	constructor() {
		this.fakePatientRepository = [];
	}

	public async create(patient: Patient): Promise<Patient> {
		this.fakePatientRepository.push(patient);
		return patient;
	}

	public async findByEmail(email: string): Promise<Patient | null> {
		const patient = this.fakePatientRepository.find(
			patient_ => patient_.email === email,
		);

		return patient || null;
	}
}
