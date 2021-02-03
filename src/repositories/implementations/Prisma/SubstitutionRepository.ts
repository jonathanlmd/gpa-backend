import {
	substitutos as Substitution,
	PrismaClient,
	Prisma,
} from '@prisma/client';
import ISubstitutionRepository, {
	ISubstitutionUpdate,
	ISubstitutionIds,
} from '../../model/ISubstitutionRepository';

export default class SubstitutionRepository implements ISubstitutionRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(substitution: Substitution): Promise<Substitution> {
		const {
			alimento_id,
			alimento_substituto_id,
			descricao,
			medida,
		} = substitution;
		return await this.prismaClient.substitutos.create({
			data: {
				descricao,
				medida,
				alimento_alimentoTosubstitutos_alimento_id: {
					connect: {
						id: alimento_id,
					},
				},
				alimento_alimentoTosubstitutos_alimento_substituto_id: {
					connect: {
						id: alimento_substituto_id,
					},
				},
			},
		});
	}

	public async update(
		substitution: ISubstitutionUpdate,
	): Promise<Substitution> {
		const {
			alimento_id,
			alimento_substituto_id,
			descricao,
			medida,
		} = substitution;
		return await this.prismaClient.substitutos.update({
			data: {
				descricao,
				medida,
			},
			where: {
				alimento_id_alimento_substituto_idZ: {
					alimento_id,
					alimento_substituto_id,
				},
			},
		});
	}

	public async findByIds({
		food_id,
		substitution_id,
	}: ISubstitutionIds): Promise<Substitution | null> {
		return await this.prismaClient.substitutos.findFirst({
			where: {
				alimento_id: food_id,
				alimento_substituto_id: substitution_id,
			},
		});
	}

	public async getByFood(food_id: number): Promise<Substitution[]> {
		return await this.prismaClient.substitutos.findMany({
			where: {
				alimento_id: food_id,
			},
		});
	}

	public async getBySubstitution(
		substitution_id: number,
	): Promise<Substitution[]> {
		return await this.prismaClient.substitutos.findMany({
			where: {
				alimento_substituto_id: substitution_id,
			},
		});
	}

	public async deleteByFood(food_id: number): Promise<any> {
		return await this.prismaClient.substitutos.deleteMany({
			where: {
				alimento_id: food_id,
			},
		});
	}
}
