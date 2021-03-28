import { City, PrismaClient, Prisma } from '@prisma/client';
import ICityRepository from '../../model/ICityRepository';

export default class CityRepository implements ICityRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
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
