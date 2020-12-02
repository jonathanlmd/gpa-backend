import { Request, Response } from 'express';

export default class SessionsController {
	async patientLogin(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		return response.json({ hello: 'world' });
	}

	async nutritionistLogin(
		request: Request,
		response: Response,
	): Promise<Response> {
		return response.json({ hello: 'world' });
	}
}
