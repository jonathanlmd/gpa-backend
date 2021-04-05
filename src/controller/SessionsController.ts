import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
	AuthenticateService,
	ResetPasswordService,
	SendForgotPasswordEmailService,
} from '../services/SessionsServices';

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

	async forgotPassword(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { email } = request.body;
		const sendForgotPasswordEmailService = await container.resolve(
			SendForgotPasswordEmailService,
		);

		if (process.env.APP_ENV === 'development') {
			const link = await sendForgotPasswordEmailService.execute({
				email,
			});
			return response.json({ link });
		}

		sendForgotPasswordEmailService.execute({
			email,
		});
		return response.status(201).send();
	}

	async resetPassword(request: Request, response: Response): Promise<Response> {
		const { password, confirmPassword, token } = request.body;
		const resetPasswordService = await container.resolve(ResetPasswordService);

		await resetPasswordService.execute({
			password,
			confirmPassword,
			token,
		});

		return response.status(201).send();
	}
}
