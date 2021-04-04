import { Tip, PrismaClient, Prisma } from '@prisma/client';
import ITipRepository from '../../model/ITipRepository';
import { PrismaClientConnection } from '../../../server';

export default class TipRepository implements ITipRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = PrismaClientConnection;
	}

	public async create(tip: Omit<Tip, 'id'>): Promise<Tip> {
		const { nutritionist_id, ...tip_ } = tip;
		return await this.prismaClient.tip.create({
			data: {
				nutritionist: {
					connect: {
						id: nutritionist_id,
					},
				},
				...tip_,
			},
		});
	}

	public async update(tip: Tip): Promise<Tip> {
		const { id, nutritionist_id, ...tip_ } = tip;
		return await this.prismaClient.tip.update({
			data: {
				...tip_,
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

	public async findById(id: number): Promise<Tip | null> {
		return await this.prismaClient.tip.findFirst({
			where: {
				id,
			},
		});
	}

	public async getAll(): Promise<Tip[]> {
		return await this.prismaClient.tip.findMany();
	}

	public async delete(id: number): Promise<Tip> {
		return await this.prismaClient.tip.delete({
			where: {
				id,
			},
		});
	}
}
