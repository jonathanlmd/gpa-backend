import { nutricionista as Nutritionist } from '@prisma/client';

export interface INutritionistRepository {
	create(nutritionist: Nutritionist): Promise<Nutritionist>;
	findByEmail(email: string): Promise<Nutritionist | null>;
}
