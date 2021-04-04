import { PrismaClient, Prisma, Nutritionist } from '@prisma/client';
import INutritionistRepository from '../../model/INutritionistRepository';
import { PrismaClientConnection } from '../../../server';

export default class NutritionistRepository implements INutritionistRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = PrismaClientConnection;
	}

	public async create(nutritionist: Nutritionist): Promise<Nutritionist> {
		return await this.prismaClient.nutritionist.create({
			data: nutritionist,
		});
	}

	public async findByEmail(email: string): Promise<Nutritionist | null> {
		return await this.prismaClient.nutritionist.findFirst({
			where: {
				email,
			},
		});
	}
}
