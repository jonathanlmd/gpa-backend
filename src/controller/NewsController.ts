import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
	ListNewsService,
	DeleteNewsService,
	ShowNewsService,
	GetNewsByMonthService,
	UpdateNewsService,
	CreateNewsService,
} from '../services/NewsServices';

export default class NewsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const {
			title,
			link,
			description,
			date,
			subtitle,
			nutritionist_id,
			image_link,
		} = request.body;

		const createNewsService = await container.resolve(CreateNewsService);

		const news = await createNewsService.execute({
			title,
			link,
			description,
			subtitle,
			date,
			nutritionist_id,
			image_link,
		});

		return response.json(news);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const {
			id,
			title,
			link,
			description,
			subtitle,
			date,
			nutritionist_id,
			image_link,
		} = request.body;

		const updateNewsService = await container.resolve(UpdateNewsService);

		const updatedNews = await updateNewsService.execute({
			id,
			title,
			link,
			description,
			subtitle,
			date,
			nutritionist_id,
			image_link,
		});

		return response.json(updatedNews);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const showNewsService = await container.resolve(ShowNewsService);

		const showNews = await showNewsService.execute({
			id: parseInt(id, 10),
		});

		return response.json(showNews);
	}

	public async list(request: Request, response: Response): Promise<Response> {
		const listNewsService = await container.resolve(ListNewsService);

		const news = await listNewsService.execute();

		return response.json(news);
	}

	public async getByMonthAndYear(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { month, year } = request.params;
		const getNewsByMonthService = await container.resolve(
			GetNewsByMonthService,
		);

		const news = await getNewsByMonthService.execute(
			parseInt(month, 10),
			parseInt(year, 10),
		);

		return response.json(news);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const deleteNewsService = await container.resolve(DeleteNewsService);

		const news = await deleteNewsService.execute({
			id: parseInt(id, 10),
		});

		return response.json(news);
	}
}
