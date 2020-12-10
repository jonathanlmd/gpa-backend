import {
	PrismaClient,
	Prisma,
	nutricionista as Nutritionist,
} from '@prisma/client';
import { INutritionistRepository } from '../../model/INutritionistRepository';

export default class NutritionistRepository implements INutritionistRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(nutritionist: Nutritionist): Promise<Nutritionist> {
		const newNutritionist = await this.prismaClient.nutricionista.create({
			data: nutritionist,
		});

		return newNutritionist;
	}

	public async findByEmail(email: string): Promise<Nutritionist | null> {
		const nutritionist = await this.prismaClient.nutricionista.findFirst({
			where: {
				email,
			},
		});

		return nutritionist;
	}
}
