import { paciente as Patient, PrismaClient, Prisma } from '@prisma/client';
import IPatientRepository from '../../model/IPatientRepository';

export default class PatientRepository implements IPatientRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(patient: Omit<Patient, 'id'>): Promise<Patient> {
		const { cidades_id, ...patient_ } = patient;
		return await this.prismaClient.paciente.create({
			data: {
				...patient_,
				cidades: {
					connect: {
						id: cidades_id,
					},
				},
			},
		});
	}

	public async findByEmail(email: string): Promise<Patient | null> {
		return await this.prismaClient.paciente.findFirst({
			where: {
				email,
			},
		});
	}

	public async update(patient: Patient): Promise<Omit<Patient, 'senha'>> {
		const { id, cidades_id, ...patient_ } = patient;
		return await this.prismaClient.paciente.update({
			data: {
				...patient_,
				...(cidades_id
					? {
							cidades: {
								connect: {
									id: cidades_id,
								},
							},
					  }
					: null),
			},
			where: {
				id,
			},
			select: {
				agendamento: true,
				autorizacao_de_acesso: true,
				bairro: true,
				cep: true,
				cidades: true,
				cidades_id: true,
				complemento: true,
				consulta: true,
				cpf: true,
				data_nascimento: true,
				email: true,
				id: true,
				logradouro: true,
				nome: true,
				numero: true,
				senha: false,
				telefone: true,
			},
		});
	}

	public async findById(id: number): Promise<Patient | null> {
		return await this.prismaClient.paciente.findFirst({
			where: {
				id,
			},
		});
	}

	public async getAll(): Promise<any> {
		return await this.prismaClient.paciente.findMany({
			select: {
				senha: false,
				agendamento: true,
				autorizacao_de_acesso: true,
				bairro: true,
				cep: true,
				cidades: {
					include: {
						estados: true,
					},
				},
				complemento: true,
				consulta: true,
				cpf: true,
				data_nascimento: true,
				email: true,
				id: true,
				logradouro: true,
				nome: true,
				numero: true,
				telefone: true,
			},
		});
	}

	public async delete(id: number): Promise<Patient> {
		return await this.prismaClient.paciente.delete({
			where: {
				id,
			},
		});
	}
}
