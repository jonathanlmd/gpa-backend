import { AnthropometricData, PrismaClient, Prisma } from '@prisma/client';
import IAnthropometricRepository from '../../model/IAnthropometricDataRepository';
import { PrismaClientConnection } from '../../../server';

export default class AnthropometricDataRepository
	implements IAnthropometricRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = PrismaClientConnection;
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

	public async update(
		anthropometricData: AnthropometricData,
	): Promise<AnthropometricData> {
		const { id, ...anthropometricData_ } = anthropometricData;
		return await this.prismaClient.anthropometricData.update({
			data: {
				...anthropometricData_,
			},
			where: {
				id,
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
