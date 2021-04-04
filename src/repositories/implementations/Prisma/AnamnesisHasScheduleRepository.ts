import { PrismaClient, Prisma } from '@prisma/client';
import IAnamnesisHasScheduleRepository from '../../model/IAnamnesisHasScheduleRepository';
import { PrismaClientConnection } from '../../../server';

export default class AnamnesisHasScheduleRepository
	implements IAnamnesisHasScheduleRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = PrismaClientConnection;
	}

	public async deleteBySchedule(scheduleId: number): Promise<any> {
		return await this.prismaClient.anamnesisHasSchedule.deleteMany({
			where: {
				schedule_id: scheduleId,
			},
		});
	}
}
