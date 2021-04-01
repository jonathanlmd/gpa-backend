import { Anamnesis, Prisma } from '@prisma/client';

export default interface IAnamnesisRepository {
	createMany(anamnesis: Omit<Anamnesis, 'id'>[]): Promise<Prisma.BatchPayload>;
	create(
		anamnesis: Omit<Anamnesis, 'id'>,
		scheduleId: number,
	): Promise<Anamnesis>;
	findBySchedule(scheduleId: number): Promise<Anamnesis[]>;
	deleteBySchedule(scheduleId: number): Promise<Anamnesis[]>;
}
