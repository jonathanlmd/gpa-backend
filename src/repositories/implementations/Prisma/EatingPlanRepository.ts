import { EatingPlan, PrismaClient, Prisma } from '@prisma/client';
import IEatingPlanRepository, {
	IEatingPlanUpdate,
	IResponseGet,
} from '../../model/IEatingPlanRepository';
import { PrismaClientConnection } from '../../../server';

export default class EatingPlanRepository implements IEatingPlanRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = PrismaClientConnection;
	}

	public async create(
		eating_plan: Omit<EatingPlan, 'id'>,
	): Promise<EatingPlan> {
		const { guidelines } = eating_plan;
		return await this.prismaClient.eatingPlan.create({
			data: { guidelines },
		});
	}

	public async update(eating_plan: IEatingPlanUpdate): Promise<EatingPlan> {
		const { id, guidelines } = eating_plan;
		return await this.prismaClient.eatingPlan.update({
			data: {
				guidelines,
			},
			where: {
				id,
			},
		});
	}

	public async getById(id: number): Promise<IResponseGet | null> {
		return await this.prismaClient.eatingPlan.findFirst({
			where: {
				id,
			},
			include: {
				meal: {
					include: {
						meal_has_food: {
							include: {
								food: {
									include: {
										substitutions: {
											include: {
												substitution: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});
	}

	public async getAll(): Promise<EatingPlan[]> {
		return await this.prismaClient.eatingPlan.findMany();
	}

	public async deleteById(id: number): Promise<any> {
		return await this.prismaClient.eatingPlan.deleteMany({
			where: {
				id,
			},
		});
	}
}
