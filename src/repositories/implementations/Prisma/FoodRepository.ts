import { alimento as Food, PrismaClient, Prisma } from '@prisma/client';
import IFoodRepository from '../../model/IFoodRepository';

export default class FoodRepository implements IFoodRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(food: Omit<Food, 'id'>): Promise<Food> {
		return await this.prismaClient.alimento.create({
			data: {
				...food,
			},
		});
	}

	public async update(food: Food): Promise<Food> {
		const { id, ...food_ } = food;
		return await this.prismaClient.alimento.update({
			data: {
				...food_,
			},
			where: {
				id,
			},
		});
	}

	public async findById(id: number): Promise<Food | null> {
		return await this.prismaClient.alimento.findFirst({
			where: {
				id,
			},
		});
	}

	public async getAll(): Promise<Food[]> {
		return await this.prismaClient.alimento.findMany();
	}

	public async delete(id: number): Promise<Food> {
		return await this.prismaClient.alimento.delete({
			where: {
				id,
			},
		});
	}
}
