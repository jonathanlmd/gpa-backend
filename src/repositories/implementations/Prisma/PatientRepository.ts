import { paciente as Patient, PrismaClient, Prisma } from '@prisma/client';
import { IPatientRepository } from '../../model/IPatientRepository';

export default class PatientRepository implements IPatientRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(patient: Patient): Promise<Patient> {
		const newPatient = await this.prismaClient.paciente.create({
			data: {
				...patient,
				cidades: {
					connect: {
						id: patient.cidades_id,
					},
				},
			},
		});

		return newPatient;
	}

	public async findByEmail(email: string): Promise<Patient | null> {
		const patient = await this.prismaClient.paciente.findFirst({
			where: {
				email,
			},
		});

		return patient;
	}
}
