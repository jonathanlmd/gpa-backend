import { Schedule, PrismaClient, Prisma } from '@prisma/client';
import IScheduleRepository, {
	ICreateSchedule,
	IUpdateSchedule,
} from '../../model/IScheduleRepository';

export default class ScheduleRepository implements IScheduleRepository {
	private prismaClient: PrismaClient<Prisma.PrismaClientOptions, never>;

	constructor() {
		this.prismaClient = new PrismaClient();
	}

	public async create(schedule: ICreateSchedule): Promise<Schedule> {
		return await this.prismaClient.schedule.create({
			data: {
				...schedule,
			},
		});
	}

	public async update(schedule: IUpdateSchedule): Promise<Schedule> {
		const { id, ...schedule_ } = schedule;
		return await this.prismaClient.schedule.update({
			data: {
				...schedule_,
			},
			where: {
				id,
			},
		});
	}

	public async findByPatient(patientId: number): Promise<Schedule[]> {
		return await this.prismaClient.schedule.findMany({
			where: {
				patient_id: patientId,
			},
			include: {
				anamnesis_has_schedule: {
					include: {
						anamnesis: true,
					},
				},
				anthropometric_data: true,
				eating_plan: true,
			},
		});
	}

	public async findLastByPatient(patientId: number): Promise<Schedule | null> {
		return await this.prismaClient.schedule.findFirst({
			where: {
				patient_id: patientId,
			},
			orderBy: {
				date: 'desc',
			},
			include: {
				anamnesis_has_schedule: {
					include: {
						anamnesis: true,
					},
				},
				anthropometric_data: true,
				eating_plan: true,
			},
		});
	}

	public async linkEatingPlan(
		eatingPlanId: number,
		scheduleId: number,
	): Promise<Schedule> {
		return await this.prismaClient.schedule.update({
			data: {
				eating_plan_id: eatingPlanId,
			},
			where: {
				id: scheduleId,
			},
		});
	}

	public async findById(id: number): Promise<Schedule | null> {
		return await this.prismaClient.schedule.findFirst({
			where: {
				id,
			},
			include: {
				anamnesis_has_schedule: {
					include: {
						anamnesis: true,
					},
				},
				anthropometric_data: true,
				eating_plan: true,
			},
		});
	}
}
