import { paciente as Patient } from '@prisma/client';

interface IPatientUpdate {
	id: number;
	autorizacao_de_acesso?: number;
	cpf?: string;
	telefone?: string | null;
	nome?: string;
	email?: string;
	senha?: string;
	data_nascimento?: Date;
	cidades_id?: number;
	bairro?: string;
	logradouro?: string;
	cep?: number;
	numero?: number;
	complemento?: string;
}

export default interface IPatientRepository {
	create(patient: Omit<Patient, 'id'>): Promise<Patient>;
	delete(id: number): Promise<Patient>;
	findByEmail(email: string): Promise<Patient | null>;
	findById(id: number): Promise<Patient | null>;
	getAll(): Promise<Omit<Patient, 'senha'>[]>;
	update(patient: IPatientUpdate): Promise<Omit<Patient, 'senha'>>;
}
