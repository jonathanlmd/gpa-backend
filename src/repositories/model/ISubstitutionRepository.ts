import { Substitution } from '@prisma/client';

export interface ISubstitutionUpdate {
	food_id: number;
	food_substitution_id: number;
	measure?: number;
	description?: string | null;
}

export interface ISubstitutionIds {
	food_id: number;
	substitution_id: number;
}

export default interface ISubstitutionRepository {
	create(substitution: Substitution): Promise<Substitution>;
	deleteByFood(food_id: number): Promise<Substitution>;
	findByIds(ids: ISubstitutionIds): Promise<Substitution | null>;
	getByFood(food_id: number): Promise<Substitution[]>;
	getBySubstitution(substitution_id: number): Promise<Substitution[]>;
	update(substitution: ISubstitutionUpdate): Promise<Substitution>;
}
