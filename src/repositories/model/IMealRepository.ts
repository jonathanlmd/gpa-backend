import { Meal } from '@prisma/client';

export interface IMealUpdate {
	id: number;
	eating_plan_id: number;
	name: string;
	observations?: string | null;
}

export default interface IMealRepository {
	create(meal: Omit<Meal, 'id'>): Promise<Meal>;
	deleteByEatingPlan(eating_plan_id: number): Promise<Meal>;
	deleteById(id: number): Promise<Meal>;
	findById(id: number): Promise<Meal | null>;
	getByEatingPlan(eating_plan_id: number): Promise<Meal[]>;
	update(meal: IMealUpdate): Promise<Meal>;
}
