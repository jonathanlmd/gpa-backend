import { Tip } from '@prisma/client';

interface ITipUpdate {
	id: number;
	content?: string;
	date?: Date;
	nutritionist_id?: number;
}

export default interface ITipRepository {
	create(tip: Omit<Tip, 'id'>): Promise<Tip>;
	delete(id: number): Promise<Tip>;
	findById(id: number): Promise<Tip | null>;
	getAll(): Promise<Tip[]>;
	update(tip: ITipUpdate): Promise<Tip>;
}
