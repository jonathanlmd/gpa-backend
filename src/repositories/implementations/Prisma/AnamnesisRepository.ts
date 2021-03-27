import { Anamnesis, PrismaClient, Prisma } from '@prisma/client';
import IAnamnesisRepository from '../../model/IAnamnesisRepository';

export default class AnamnesisRepository implements IAnamnesisRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async createMany(
		anamnesis: Omit<Anamnesis, 'id'>[],
	): Promise<Prisma.BatchPayload> {
		return await this.prismaClient.anamnesis.createMany({data: anamnesis});
	}

	public async create(
		anamnesis: Omit<Anamnesis, 'id'>,
		scheduleId: number,
	): Promise<Anamnesis> {
		  return await this.prismaClient.anamnesis.create({data: {
			anamnesis_has_schedule: {
				create: {
					schedule_id: scheduleId,
				}
			},
			...anamnesis
		}});
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
