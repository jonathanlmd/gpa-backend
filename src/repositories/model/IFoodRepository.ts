import { alimento as Food } from '@prisma/client';

interface IFoodUpdate {
	id: number;
	medida?: number;
	caloria?: number;
	nome?: string;
	unindade: string;
}

export default interface IFoodRepository {
	create(food: Omit<Food, 'id'>): Promise<Food>;
	delete(id: number): Promise<Food>;
	findById(id: number): Promise<Food | null>;
	getAll(): Promise<Food[]>;
	update(food: IFoodUpdate): Promise<Food>;
}
