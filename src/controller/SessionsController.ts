import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateService } from '../services/SessionsServices';

export default class SessionsController {
	async login(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;
		const authenticateService = await container.resolve(AuthenticateService);

		const {
			user: { password: _, ...user },
			token,
			role,
		} = await authenticateService.execute({
			email,
			password,
		});

		return response.json({ user, token, role });
	}
}
