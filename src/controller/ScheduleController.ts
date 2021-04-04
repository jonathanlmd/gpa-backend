import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
	ListScheduleByPatientService,
	ListScheduleByIdService,
	UpdateScheduleService,
	LastScheduleByPatientService,
	CreateScheduleService,
} from '../services/ScheduleServices';
import {
	AnamnesisCreateService,
	AnamnesisDeleteService,
} from '../services/AnamnesisService';
import {
	CreateAnthropometricDataService,
	UpdateAnthropometricDataService,
} from '../services/AnthropometricServices';

export default class ScheduleController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { anamnesis, anthropometricData, schedule } = request.body;
		const {
			appointment_id,
			date,
			observation,
			eating_plan_id,
			patient_id,
			value,
		} = schedule;
		console.table(schedule);
		const createAnthropometricDataService = await container.resolve(
			CreateAnthropometricDataService,
		);

		const newAnthropometricData = await createAnthropometricDataService.execute(
			anthropometricData,
		);

		const createScheduleService = await container.resolve(
			CreateScheduleService,
		);

		const newSchedule = await createScheduleService.execute({
			anthropometric_data_id: newAnthropometricData.id,
			appointment_id,
			date,
			eating_plan_id,
			observation,
			patient_id,
			value,
		});

		const anamnesisCreateService = await container.resolve(
			AnamnesisCreateService,
		);

		const newAnamnese = await anamnesisCreateService.execute(
			anamnesis,
			newSchedule.id,
		);

		return response.json({
			anamnesis: newAnamnese,
			schedule: newSchedule,
			anthropometricData: newAnthropometricData,
		});
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { anamnesis, anthropometricData, schedule } = request.body;

		const updateAnthropometricDataService = await container.resolve(
			UpdateAnthropometricDataService,
		);

		const updateAnthropometricData = await updateAnthropometricDataService.execute(
			anthropometricData,
		);

		const updateScheduleService = await container.resolve(
			UpdateScheduleService,
		);

		const updateSchedule = await updateScheduleService.execute(schedule);

		const anamnesisDeleteService = await container.resolve(
			AnamnesisDeleteService,
		);

		await anamnesisDeleteService.execute(schedule.id);

		const anamnesisCreateService = await container.resolve(
			AnamnesisCreateService,
		);

		const updateAnamnese = await anamnesisCreateService.execute(
			anamnesis,
			schedule.id,
		);

		return response.json({
			anamnesis: updateAnamnese,
			schedule: updateSchedule,
			anthropometricData: updateAnthropometricData,
		});
	}

	public async findByPatient(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id } = request.params;
		const listScheduleByPatientService = await container.resolve(
			ListScheduleByPatientService,
		);

		const schedules = await listScheduleByPatientService.execute(
			parseInt(id, 10),
		);
		return response.json(schedules);
	}

	public async findLastByPatient(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id } = request.params;
		const lastScheduleByPatientService = await container.resolve(
			LastScheduleByPatientService,
		);

		const schedules = await lastScheduleByPatientService.execute(
			parseInt(id, 10),
		);
		return response.json(schedules);
	}

	public async findById(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id } = request.params;
		const listScheduleByIdService = await container.resolve(
			ListScheduleByIdService,
		);

		const schedule: any = await listScheduleByIdService.execute(
			parseInt(id, 10),
		);
		const anamnesis = schedule.anamnesis_has_schedule.map(item => ({
			...item.anamnesis,
		}));
		const {
			anamnesis_has_schedule: _,
			eating_plan,
			anthropometric_data,
			...rest
		} = schedule;

		return response.json({
			schedule: rest,
			anamnesis,
			anthropometricData: anthropometric_data,
			eatingPlan: eating_plan,
		});
	}
}
