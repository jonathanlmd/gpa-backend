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
		const { title, description, date, nutritionist_id } = news_;

		if (!(title && description && date && nutritionist_id)) {
			throw new AppError('Some fields are required');
		}

		return await this.newsRepository.create({
			...news_,
			date: new Date(news_.date),
		});
	}
}

export default CreateNewsService;
