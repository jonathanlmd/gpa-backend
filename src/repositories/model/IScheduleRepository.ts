import { Schedule } from '@prisma/client';

export interface ICreateSchedule {
	value: number;
	date: Date;
	patient_id: number;
	anthropometric_data_id: number;
	observation: string | null;
}
export interface IUpdateSchedule {
	value: number;
	id: number;
	date: Date;
	patient_id: number;
	observation: string | null;
}

export default interface IScheduleRepository {
	create(schedule: ICreateSchedule): Promise<Schedule>;
	update(schedule: IUpdateSchedule): Promise<Schedule>;
	linkEatingPlan(eatingPlanId: number, scheduleId: number): Promise<Schedule>;
	findByPatient(patientId: number): Promise<Schedule[]>;
	findLastByPatient(patientId: number): Promise<Schedule | null>;
	findById(id: number): Promise<Schedule | null>;
}
