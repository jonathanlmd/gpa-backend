import { paciente as Patient } from '@prisma/client';

export interface IPatientRepository {
	create(patient: Patient): Promise<Patient>;
	findByEmail(email: string): Promise<Patient | null>;
}
