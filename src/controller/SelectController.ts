import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SelectCitiesService } from '../services/SelectServices';

export default class SelectController {
	public async selectCityByUF(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { uf } = request.params;

		const selectCitiesService = await container.resolve(SelectCitiesService);

		const cities = await selectCitiesService.execute({ uf });

		return response.json(cities);
	}
}
