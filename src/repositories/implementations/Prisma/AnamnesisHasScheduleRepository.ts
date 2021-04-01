import { PrismaClient, Prisma } from '@prisma/client';
import IAnamnesisHasScheduleRepository from '../../model/IAnamnesisHasScheduleRepository';

export default class AnamnesisHasScheduleRepository
	implements IAnamnesisHasScheduleRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async deleteBySchedule(scheduleId: number): Promise<any> {
		return await this.prismaClient.anamnesisHasSchedule.deleteMany({
			where: {
				schedule_id: scheduleId,
			},
		});
	}
}
