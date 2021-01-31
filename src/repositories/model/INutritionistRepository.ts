import { nutricionista as Nutritionist } from '@prisma/client';

export default interface INutritionistRepository {
	create(nutritionist: Omit<Nutritionist, 'id'>): Promise<Nutritionist>;
	findByEmail(email: string): Promise<Nutritionist | null>;
}
