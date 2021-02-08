import { EatingPlan } from '@prisma/client';

export interface IEatingPlanUpdate {
	id: number;
	guidelines?: string | null;
}

export default interface IEatingPlanRepository {
	create(eating_plan: Omit<EatingPlan, 'id'>): Promise<EatingPlan>;
	deleteById(id: number): Promise<EatingPlan>;
	getById(id: number): Promise<EatingPlan | null>;
	getAll(): Promise<EatingPlan[]>;
	update(eating_plan: IEatingPlanUpdate): Promise<EatingPlan>;
}
