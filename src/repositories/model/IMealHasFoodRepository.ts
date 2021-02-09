import { MealHasFood } from '@prisma/client';

export interface IMealHasFoodUpdate {
	meal_id: number;
	food_id: number;
	measure: number;
	description?: string | null;
}

export interface IMealHasFoodIds {
	food_id: number;
	meal_id: number;
}

export default interface IMealHasFoodRepository {
	create(mealHasFood: MealHasFood): Promise<MealHasFood>;
	deleteByMeal(meal_id: number): Promise<MealHasFood>;
	findByIds(ids: IMealHasFoodIds): Promise<MealHasFood | null>;
	getByFood(food_id: number): Promise<MealHasFood[]>;
	getByMeal(mealHasFood_id: number): Promise<MealHasFood[]>;
	update(mealHasFood: IMealHasFoodUpdate): Promise<MealHasFood>;
}
