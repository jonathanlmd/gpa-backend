import { AnamnesisHasSchedule } from '@prisma/client';

export default interface IAnamnesisHasScheduleRepository {
	deleteBySchedule(scheduleId: number): Promise<AnamnesisHasSchedule[]>;
}
