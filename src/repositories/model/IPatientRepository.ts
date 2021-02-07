import { Patient } from '@prisma/client';

interface IPatientUpdate {
	id: number;
	access_authorization?: number;
	cpf?: string;
	phone?: string | null;
	name?: string;
	email?: string;
	password?: string;
	birthday?: Date;
	city_id?: number;
	district?: string;
	street?: string;
	zip?: number;
	number?: number;
	adjunct?: string;
}

export default interface IPatientRepository {
	create(patient: Omit<Patient, 'id'>): Promise<Patient>;
	delete(id: number): Promise<Patient>;
	findByEmail(email: string): Promise<Patient | null>;
	findById(id: number): Promise<Patient | null>;
	getAll(): Promise<Omit<Patient, 'password'>[]>;
	update(patient: IPatientUpdate): Promise<Omit<Patient, 'password'>>;
}
