import { PrismaClient, Prisma, Nutritionist } from '@prisma/client';
import INutritionistRepository from '../../model/INutritionistRepository';

export default class NutritionistRepository implements INutritionistRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
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
