import { City, PrismaClient, Prisma } from '@prisma/client';
import ICityRepository from '../../model/ICityRepository';
import { PrismaClientConnection } from '../../../server';

export default class CityRepository implements ICityRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = PrismaClientConnection;
	}

	public async findById(id: number): Promise<City | null> {
		return await this.prismaClient.city.findFirst({
			where: {
				id,
			},
		});
	}

	public async findByUf(uf: string): Promise<City[]> {
		return await this.prismaClient.city.findMany({
			where: {
				uf,
			},
		});
	}
}
