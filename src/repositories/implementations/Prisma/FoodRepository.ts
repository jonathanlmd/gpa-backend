import { Food, PrismaClient, Prisma } from '@prisma/client';
import IFoodRepository, {
	IFoodUpdateResponse,
} from '../../model/IFoodRepository';
import { PrismaClientConnection } from '../../../server';

export default class FoodRepository implements IFoodRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = PrismaClientConnection;
	}

	public async create(food: Omit<Food, 'id'>): Promise<Food> {
		return await this.prismaClient.food.create({
			data: {
				...food,
			},
		});
	}

	public async update(food: Food): Promise<IFoodUpdateResponse> {
		const { id, ...food_ } = food;
		return await this.prismaClient.food.update({
			data: {
				...food_,
			},
			where: {
				id,
			},
			include: {
				substitutions: true,
			},
		});
	}

	public async findById(id: number): Promise<Food | null> {
		return await this.prismaClient.food.findFirst({
			where: {
				id,
			},
			include: {
				substitutions: true,
			},
		});
	}

	public async getAll(): Promise<Food[]> {
		return await this.prismaClient.food.findMany();
	}

	public async delete(id: number): Promise<Food> {
		return await this.prismaClient.food.delete({
			where: {
				id,
			},
		});
	}
}
