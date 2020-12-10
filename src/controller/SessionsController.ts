import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateNutritionistService from '../services/AuthenticateNutritionistService';
import AuthenticatePatientService from '../services/AuthenticatePatientService';

export default class SessionsController {
	async patientLogin(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;
		const authenticatePatientService = await container.resolve(
			AuthenticatePatientService,
		);

		const { user, token } = await authenticatePatientService.execute({
			email,
			password,
		});

		return response.json({ user, token });
	}

	async nutritionistLogin(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { email, password } = request.body;
		const authenticateNutritionistService = await container.resolve(
			AuthenticateNutritionistService,
		);

		const { user, token } = await authenticateNutritionistService.execute({
			email,
			password,
		});

		return response.json({ user, token });
	}
}
