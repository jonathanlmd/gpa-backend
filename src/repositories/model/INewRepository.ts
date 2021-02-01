import { noticia as New } from '@prisma/client';

interface INewUpdate {
	id: number;
	titulo?: string;
	link?: string | null;
	descri__o?: string | null;
	data?: Date;
	nutricionista_id?: number;
	image_link?: string | null;
}

export default interface INewRepository {
	create(new_: Omit<New, 'id'>): Promise<New>;
	delete(id: number): Promise<New>;
	findById(id: number): Promise<New | null>;
	getAll(): Promise<New[]>;
	update(new_: INewUpdate): Promise<New>;
}
