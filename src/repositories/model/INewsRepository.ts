import { News } from '@prisma/client';

interface INewsUpdate {
	id: number;
	title?: string;
	link?: string | null;
	description?: string | null;
	subtitle?: string | null;
	date?: Date;
	nutritionist_id?: number;
	image_link?: string | null;
}

export default interface INewsRepository {
	create(news: Omit<News, 'id'>): Promise<News>;
	delete(id: number): Promise<News>;
	findById(id: number): Promise<News | null>;
	getAll(): Promise<News[]>;
	getByMonthAndYear(month: number, year: number): Promise<News[]>;
	update(news: INewsUpdate): Promise<News>;
}
