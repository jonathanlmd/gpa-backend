import { MealHasFood, PrismaClient, Prisma } from '@prisma/client';
import IMealHasFoodRepository, {
	IMealHasFoodIds,
	IMealHasFoodUpdate,
} from '../../model/IMealHasFoodRepository';

export default class MealHasFoodRepository implements IMealHasFoodRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(mealHasFood: MealHasFood): Promise<MealHasFood> {
		const { food_id, meal_id, description, measure } = mealHasFood;
		return await this.prismaClient.mealHasFood.create({
			data: {
				description,
				measure,
				food_id,
				meal_id,
			},
		});
	}

	public async update(mealHasFood: IMealHasFoodUpdate): Promise<MealHasFood> {
		const { food_id, meal_id, description, measure } = mealHasFood;
		return await this.prismaClient.mealHasFood.update({
			data: {
				description,
				measure,
			},
			where: {
				meal_id_food_id: {
					food_id,
					meal_id,
				},
			},
		});
	}

	public async findByIds({
		food_id,
		meal_id,
	}: IMealHasFoodIds): Promise<MealHasFood | null> {
		return await this.prismaClient.mealHasFood.findFirst({
			where: {
				food_id,
				meal_id,
			},
		});
	}

	public async getByFood(food_id: number): Promise<MealHasFood[]> {
		return await this.prismaClient.mealHasFood.findMany({
			where: {
				food_id,
			},
		});
	}

	public async getByMeal(meal_id: number): Promise<MealHasFood[]> {
		return await this.prismaClient.mealHasFood.findMany({
			where: {
				meal_id,
			},
		});
	}

	public async deleteByMeal(meal_id: number): Promise<any> {
		return await this.prismaClient.mealHasFood.deleteMany({
			where: {
				meal_id,
			},
		});
	}
}
