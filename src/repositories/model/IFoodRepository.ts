import { Food, Substitution } from '@prisma/client';

interface IFoodUpdate {
	id: number;
	measure?: number;
	calories?: number;
	name?: string;
	unity: string;
}
export interface IFoodUpdateResponse extends Food {
	substitutions: Substitution[];
}

export default interface IFoodRepository {
	create(food: Omit<Food, 'id'>): Promise<Food>;
	delete(id: number): Promise<Food>;
	findById(id: number): Promise<Food | null>;
	getAll(): Promise<Food[]>;
	update(food: IFoodUpdate): Promise<IFoodUpdateResponse>;
}
