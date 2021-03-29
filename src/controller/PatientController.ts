import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
	CreatePatientService,
	UpdatePatientProfileService,
	ShowPatientProfileService,
	ListPatientService,
	DeletePatientService,
} from '../services/PatientServices';

export default class PatientController {
	public async create(request: Request, response: Response): Promise<Response> {
		const {
			email,
			password,
			birthday,
			authorization,
			cpf,
			number,
			name,
			district,
			complement,
			street,
			zipCode,
			phone,
			city_id,
		} = request.body;

		console.table(request.body);

		const createPatientService = await container.resolve(CreatePatientService);

		const patient = await createPatientService.execute({
			email,
			password,
			birthday,
			access_authorization: authorization,
			cpf,
			number,
			name,
			district,
			adjunct: complement,
			street,
			zip: zipCode,
			city_id,
			phone,
		});

		return response.json(patient);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const {
			id,
			email,
			password,
			old_password,
			birthday,
			authorization,
			cpf,
			number,
			name,
			district,
			complement,
			street,
			zipCode,
			phone,
			city_id,
		} = request.body;

		const updatePatientProfileService = await container.resolve(
			UpdatePatientProfileService,
		);

		const updatedPatient = await updatePatientProfileService.execute({
			id,
			email,
			password,
			old_password,
			birthday,
			access_authorization: authorization,
			cpf,
			number,
			name,
			district,
			adjunct: complement,
			street,
			zip: zipCode,
			city_id,
			phone,
		});

		return response.json(updatedPatient);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const showPatientProfileService = await container.resolve(
			ShowPatientProfileService,
		);

		const showPatient = await showPatientProfileService.execute({
			id: parseInt(id, 10),
		});

		return response.json(showPatient);
	}

	public async list(request: Request, response: Response): Promise<Response> {
		const listPatientService = await container.resolve(ListPatientService);

		const patients = await listPatientService.execute();

		return response.json(patients);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const deletePatientService = await container.resolve(DeletePatientService);

		const patients = await deletePatientService.execute({
			id: parseInt(id, 10),
		});

		return response.json(patients);
	}
}
