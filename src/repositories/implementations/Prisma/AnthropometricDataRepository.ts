import { AnthropometricData, PrismaClient, Prisma } from '@prisma/client';
import IAnthropometricRepository from '../../model/IAnthropometricDataRepository';

export default class AnthropometricDataRepository
	implements IAnthropometricRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(
		anthropometric: Omit<AnthropometricData, 'id'>,
	): Promise<AnthropometricData> {
		return await this.prismaClient.anthropometricData.create({
			data: {
				...anthropometric,
			},
		});
	}

	public async findBySchedule(
		scheduleId: number,
	): Promise<AnthropometricData[]> {
		return await this.prismaClient.anthropometricData.findMany({
			where: {
				schedule: {
					some: {
						id: scheduleId,
					},
				},
			},
		});
	}

	public async findById(id: number): Promise<AnthropometricData | null> {
		return await this.prismaClient.anthropometricData.findFirst({
			where: {
				id,
			},
		});
	}
}
