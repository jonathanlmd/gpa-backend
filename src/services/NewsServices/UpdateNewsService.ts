/* eslint-disable no-underscore-dangle */
import { News } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import AppError from '../../errors/AppError';
import INewsRepository from '../../repositories/model/INewsRepository';

interface IRequest {
	id: number;
	title?: string;
	link?: string;
	description?: string;
	subtitle?: string;
	date?: Date;
	nutritionist_id?: number;
	image_link?: string;
}

@injectable()
class UpdateNewsService {
	constructor(
		@inject('NewsRepository')
		private newsRepository: INewsRepository,
	) {}

	public async execute({
		id,
		description,
		image_link,
		subtitle,
		link,
		title,
		date,
		nutritionist_id,
	}: IRequest): Promise<News> {
		const news_ = await this.newsRepository.findById(id);
		if (!news_) {
			throw new AppError('News not found');
		}

		if (!(id && title && description && date && nutritionist_id)) {
			throw new AppError('All fields should be informed');
		}

		return this.newsRepository.update({
			id,
			description,
			image_link,
			link,
			subtitle,
			title,
			date: new Date(date),
			nutritionist_id,
		});
	}
}

export default UpdateNewsService;
