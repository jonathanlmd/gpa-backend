import { Schedule, PrismaClient, Prisma } from '@prisma/client';
import IScheduleRepository, {
	ICreateSchedule,
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

	public async findByPatient(patientId: number): Promise<Schedule[]> {
		return await this.prismaClient.schedule.findMany({
			where: {
				patient_id: patientId,
			},
		});
	}

	public async findById(id: number): Promise<Schedule | null> {
		return await this.prismaClient.schedule.findFirst({
			where: {
				id,
			},
		});
	}
}
