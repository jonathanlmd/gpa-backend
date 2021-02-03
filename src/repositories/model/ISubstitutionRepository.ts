import { substitutos as Substitution } from '@prisma/client';

export interface ISubstitutionUpdate {
	alimento_id: number;
	alimento_substituto_id: number;
	medida?: number;
	descricao?: string | null;
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
