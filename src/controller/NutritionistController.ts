import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateNutritionistService } from '../services';

export default class NutritionistController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { email, name, crn, password } = request.body;
		const createNutritionistService = await container.resolve(
			CreateNutritionistService,
		);

		const nutritionist = await createNutritionistService.execute({
			email,
			senha: password,
			nome: name,
			crn,
		});

		return response.json(nutritionist);
	}
}
