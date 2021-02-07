import { inject, injectable } from 'tsyringe';
import { News } from '@prisma/client';
import INewsRepository from '../../repositories/model/INewsRepository';
import AppError from '../../errors/AppError';

@injectable()
class CreateNewsService {
	constructor(
		@inject('NewsRepository')
		private newsRepository: INewsRepository,
	) {}

	public async execute(news_: Omit<News, 'id'>): Promise<News> {
		const {
			title,
			link,
			description,
			date,
			nutritionist_id,
			image_link,
		} = news_;

		if (
			!(title && link && description && date && nutritionist_id && image_link)
		) {
			throw new AppError('All fields should be informed');
		}

		return await this.newsRepository.create({
			...news_,
		});
	}
}

export default CreateNewsService;
