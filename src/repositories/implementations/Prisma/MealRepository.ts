import { Meal, PrismaClient, Prisma } from '@prisma/client';
import IMealRepository, { IMealUpdate } from '../../model/IMealRepository';
import { PrismaClientConnection } from '../../../server';

export default class MealRepository implements IMealRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = PrismaClientConnection;
	}

	public async create(meal: Omit<Meal, 'id'>): Promise<Meal> {
		const { eating_plan_id, name, observations } = meal;
		return await this.prismaClient.meal.create({
			data: { eating_plan_id, name, observations },
			include: {
				meal_has_food: true,
			},
		});
	}

	public async update(meal: IMealUpdate): Promise<Meal> {
		const { id, eating_plan_id, name, observations } = meal;
		return await this.prismaClient.meal.update({
			data: {
				name,
				observations,
				eating_plan_id,
			},
			where: {
				id,
			},
		});
	}

	public async getByEatingPlan(eating_plan_id: number): Promise<Meal[]> {
		return await this.prismaClient.meal.findMany({
			where: {
				eating_plan_id,
			},
		});
	}

	public async deleteByEatingPlan(eating_plan_id: number): Promise<any> {
		return await this.prismaClient.meal.deleteMany({
			where: {
				eating_plan_id,
			},
		});
	}

	public async deleteById(id: number): Promise<any> {
		return await this.prismaClient.meal.deleteMany({
			where: {
				id,
			},
		});
	}

	public async findById(id: number): Promise<Meal | null> {
		return await this.prismaClient.meal.findFirst({
			where: {
				id,
			},
		});
	}
}
