import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
	CreateTipService,
	UpdateTipService,
	ShowTipService,
	ListTipService,
	DeleteTipService,
} from '../services/TipServices';

export default class TipController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { content, date, nutritionist_id } = request.body;

		const createTipService = await container.resolve(CreateTipService);

		const tip = await createTipService.execute({
			content,
			date,
			nutritionist_id,
		});

		return response.json(tip);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id, content, date, nutritionist_id } = request.body;

		const updateTipService = await container.resolve(UpdateTipService);

		const updatedTip = await updateTipService.execute({
			id,
			content,
			date,
			nutritionist_id,
		});

		return response.json(updatedTip);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const showTipService = await container.resolve(ShowTipService);

		const showTip = await showTipService.execute({
			id: parseInt(id, 10),
		});

		return response.json(showTip);
	}

	public async list(request: Request, response: Response): Promise<Response> {
		const listTipService = await container.resolve(ListTipService);

		const Tips = await listTipService.execute();

		return response.json(Tips);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const deleteTipService = await container.resolve(DeleteTipService);

		const Tip = await deleteTipService.execute({
			id: parseInt(id, 10),
		});

		return response.json(Tip);
	}
}
