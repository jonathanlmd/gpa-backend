import { Schedule } from '@prisma/client';

export interface ICreateSchedule {
	value: number;
	date: Date;
	patient_id: number;
	anthropometric_data_id: number;
	observation: string | null;
}

export default interface IScheduleRepository {
	create(schedule: ICreateSchedule): Promise<Schedule>;
	findByPatient(patientId: number): Promise<Schedule[]>;
	findById(id: number): Promise<Schedule | null>;
}
