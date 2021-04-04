import { Anamnesis, PrismaClient, Prisma } from '@prisma/client';
import IAnamnesisRepository from '../../model/IAnamnesisRepository';
import { PrismaClientConnection } from '../../../server';

export default class AnamnesisRepository implements IAnamnesisRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = PrismaClientConnection;
	}

	public async createMany(
		anamnesis: Omit<Anamnesis, 'id'>[],
	): Promise<Prisma.BatchPayload> {
		return await this.prismaClient.anamnesis.createMany({ data: anamnesis });
	}

	public async create(
		anamnesis: Omit<Anamnesis, 'id'>,
		scheduleId: number,
	): Promise<Anamnesis> {
		return await this.prismaClient.anamnesis.create({
			data: {
				anamnesis_has_schedule: {
					create: {
						schedule_id: scheduleId,
					},
				},
				...anamnesis,
			},
		});
	}

	public async deleteBySchedule(scheduleId: number): Promise<any> {
		return await this.prismaClient.anamnesis.deleteMany({
			where: {
				anamnesis_has_schedule: {
					every: {
						schedule_id: scheduleId,
					},
				},
			},
		});
	}

	public async findBySchedule(scheduleId: number): Promise<Anamnesis[]> {
		return await this.prismaClient.anamnesis.findMany({
			where: {
				anamnesis_has_schedule: {
					some: {
						schedule_id: scheduleId,
					},
				},
			},
		});
	}
}
