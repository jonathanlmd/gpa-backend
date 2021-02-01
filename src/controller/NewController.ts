import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
	CreateNewService,
	UpdateNewService,
	ShowNewService,
	ListNewService,
	DeleteNewService,
} from '../services/NewServices';

export default class NewController {
	public async create(request: Request, response: Response): Promise<Response> {
		const {
			title,
			link,
			description,
			date,
			nutritionist_id,
			image_link,
		} = request.body;

		console.log(request.body);

		const createNewService = await container.resolve(CreateNewService);

		const New = await createNewService.execute({
			titulo: title,
			link,
			descri__o: description,
			data: date,
			nutricionista_id: nutritionist_id,
			image_link,
		});

		return response.json(New);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const {
			id,
			title,
			link,
			description,
			date,
			nutritionist_id,
			image_link,
		} = request.body;

		const updateNewService = await container.resolve(UpdateNewService);

		const updatedNew = await updateNewService.execute({
			id,
			titulo: title,
			link,
			descri__o: description,
			data: date,
			nutricionista_id: nutritionist_id,
			image_link,
		});

		return response.json(updatedNew);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const showNewService = await container.resolve(ShowNewService);

		const showNew = await showNewService.execute({
			id: parseInt(id, 10),
		});

		return response.json(showNew);
	}

	public async list(request: Request, response: Response): Promise<Response> {
		const listNewService = await container.resolve(ListNewService);

		const News = await listNewService.execute();

		return response.json(News);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const deleteNewService = await container.resolve(DeleteNewService);

		const New = await deleteNewService.execute({
			id: parseInt(id, 10),
		});

		return response.json(New);
	}
}
