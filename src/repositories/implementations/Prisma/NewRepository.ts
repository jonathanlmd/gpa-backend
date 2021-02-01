import { noticia as New, PrismaClient, Prisma } from '@prisma/client';
import INewRepository from '../../model/INewRepository';

export default class NewRepository implements INewRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(new_: Omit<New, 'id'>): Promise<New> {
		const { nutricionista_id, ...new__ } = new_;
		return await this.prismaClient.noticia.create({
			data: {
				nutricionista: {
					connect: {
						id: nutricionista_id,
					},
				},
				...new__,
			},
		});
	}

	public async update(new_: New): Promise<New> {
		const { id, nutricionista_id, ...new__ } = new_;
		return await this.prismaClient.noticia.update({
			data: {
				...new__,
				...(nutricionista_id
					? {
							nutricionista: {
								connect: {
									id: nutricionista_id,
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

	public async findById(id: number): Promise<New | null> {
		return await this.prismaClient.noticia.findFirst({
			where: {
				id,
			},
		});
	}

	public async getAll(): Promise<New[]> {
		return await this.prismaClient.noticia.findMany();
	}

	public async delete(id: number): Promise<New> {
		return await this.prismaClient.noticia.delete({
			where: {
				id,
			},
		});
	}
}
