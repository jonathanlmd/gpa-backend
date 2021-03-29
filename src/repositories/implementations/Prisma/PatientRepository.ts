import { Patient, PrismaClient, Prisma } from '@prisma/client';
import IPatientRepository from '../../model/IPatientRepository';

export default class PatientRepository implements IPatientRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(patient: Omit<Patient, 'id'>): Promise<Patient> {
		const { city_id, ...patient_ } = patient;
		return await this.prismaClient.patient.create({
			data: {
				...patient_,
				city: {
					connect: {
						id: city_id,
					},
				},
			},
		});
	}

	public async findByEmail(email: string): Promise<Patient | null> {
		return await this.prismaClient.patient.findFirst({
			where: {
				email,
			},
		});
	}

	public async update(patient: Patient): Promise<Omit<Patient, 'password'>> {
		const { id, city_id, ...patient_ } = patient;
		return await this.prismaClient.patient.update({
			data: {
				...patient_,
				...(city_id
					? {
							city: {
								connect: {
									id: city_id,
								},
							},
					  }
					: null),
			},
			where: {
				id,
			},
			select: {
				appointment: true,
				access_authorization: true,
				district: true,
				zip: true,
				city: true,
				city_id: true,
				adjunct: true,
				consultation: true,
				cpf: true,
				birthday: true,
				email: true,
				id: true,
				street: true,
				name: true,
				number: true,
				password: false,
				phone: true,
			},
		});
	}

	public async findById(id: number): Promise<Patient | null> {
		return await this.prismaClient.patient.findFirst({
			include: {
				city: true,
			},
			where: {
				id,
			},
		});
	}

	public async getAll(): Promise<any> {
		return await this.prismaClient.patient.findMany({
			select: {
				password: false,
				appointment: true,
				access_authorization: true,
				district: true,
				zip: true,
				city: true,
				adjunct: true,
				schedule: true,
				cpf: true,
				birthday: true,
				email: true,
				id: true,
				street: true,
				name: true,
				number: true,
				phone: true,
			},
		});
	}

	public async delete(id: number): Promise<Patient> {
		return await this.prismaClient.patient.delete({
			where: {
				id,
			},
		});
	}
}
