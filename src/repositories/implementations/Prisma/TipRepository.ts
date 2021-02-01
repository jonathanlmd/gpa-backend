import { dica as Tip, PrismaClient, Prisma } from '@prisma/client';
import ITipRepository from '../../model/ITipRepository';

export default class TipRepository implements ITipRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(tip: Omit<Tip, 'id'>): Promise<Tip> {
		const { nutricionista_id, ...tip_ } = tip;
		return await this.prismaClient.dica.create({
			data: {
				nutricionista: {
					connect: {
						id: nutricionista_id,
					},
				},
				...tip_,
			},
		});
	}

	public async update(tip: Tip): Promise<Tip> {
		const { id, nutricionista_id, ...tip_ } = tip;
		return await this.prismaClient.dica.update({
			data: {
				...tip_,
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

	public async findById(id: number): Promise<Tip | null> {
		return await this.prismaClient.dica.findFirst({
			where: {
				id,
			},
		});
	}

	public async getAll(): Promise<Tip[]> {
		return await this.prismaClient.dica.findMany();
	}

	public async delete(id: number): Promise<Tip> {
		return await this.prismaClient.dica.delete({
			where: {
				id,
			},
		});
	}
}
