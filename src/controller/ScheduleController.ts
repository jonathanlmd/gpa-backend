import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
	ListScheduleByPatientService,
	ListScheduleByIdService,
	CreateScheduleService,
} from '../services/ScheduleServices';
import { AnamnesisCreateService } from '../services/AnamnesisService';
import { AnthropometricDataService } from '../services/AnthropometricServices';

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

		const anthropometricDataService = await container.resolve(
			AnthropometricDataService,
		);

		const newAnthropometricData = await anthropometricDataService.execute(
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

	public async findById(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id } = request.params;
		const listScheduleByIdService = await container.resolve(
			ListScheduleByIdService,
		);

		const schedule = await listScheduleByIdService.execute(parseInt(id, 10));
		return response.json(schedule);
	}
}
