import { News, PrismaClient, Prisma } from '@prisma/client';
import INewsRepository from '../../model/INewsRepository';

export default class NewRepository implements INewsRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(news: Omit<News, 'id'>): Promise<News> {
		const { nutritionist_id, ...news_ } = news;
		return await this.prismaClient.news.create({
			data: {
				nutritionist_id,
				...news_,
			},
		});
	}

	public async update(news: News): Promise<News> {
		const { id, nutritionist_id, ...news_ } = news;
		return await this.prismaClient.news.update({
			data: {
				...news_,
				...(nutritionist_id
					? {
							nutritionist: {
								connect: {
									id: nutritionist_id,
								},
							},
					  }
					: null),
			},
			where: {
				id,
			},
		});
	}

	public async findById(id: number): Promise<News | null> {
		return await this.prismaClient.news.findFirst({
			where: {
				id,
			},
		});
	}

	public async getAll(): Promise<News[]> {
		return await this.prismaClient.news.findMany();
	}

	public async getByMonthAndYear(month: number, year: number): Promise<News[]> {
		return await this.prismaClient.$queryRaw(
			`SELECT * FROM noticia n WHERE MONTH(n.data) = ${month} AND YEAR(n.data) = ${year}`,
		);
	}

	public async delete(id: number): Promise<News> {
		return await this.prismaClient.news.delete({
			where: {
				id,
			},
		});
	}
}
