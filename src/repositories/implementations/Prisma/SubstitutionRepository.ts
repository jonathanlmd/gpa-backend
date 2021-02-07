import { Substitution, PrismaClient, Prisma } from '@prisma/client';
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
			food_id,
			food_substitution_id,
			description,
			measure,
		} = substitution;
		return await this.prismaClient.substitution.create({
			data: {
				description,
				measure,
				is_substitution_for: {
					connect: {
						id: food_id,
					},
				},
				substitution: {
					connect: {
						id: food_substitution_id,
					},
				},
			},
		});
	}

	public async update(
		substitution: ISubstitutionUpdate,
	): Promise<Substitution> {
		const {
			food_id,
			food_substitution_id,
			description,
			measure,
		} = substitution;
		return await this.prismaClient.substitution.update({
			data: {
				description,
				measure,
			},
			where: {
				food_id_food_substitution_id: {
					food_id,
					food_substitution_id,
				},
			},
		});
	}

	public async findByIds({
		food_id,
		substitution_id,
	}: ISubstitutionIds): Promise<Substitution | null> {
		return await this.prismaClient.substitution.findFirst({
			where: {
				food_id,
				food_substitution_id: substitution_id,
			},
		});
	}

	public async getByFood(food_id: number): Promise<Substitution[]> {
		return await this.prismaClient.substitution.findMany({
			where: {
				food_id,
			},
		});
	}

	public async getBySubstitution(
		substitution_id: number,
	): Promise<Substitution[]> {
		return await this.prismaClient.substitution.findMany({
			where: {
				food_substitution_id: substitution_id,
			},
		});
	}

	public async deleteByFood(food_id: number): Promise<any> {
		return await this.prismaClient.substitution.deleteMany({
			where: {
				food_id,
			},
		});
	}
}
