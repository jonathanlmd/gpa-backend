/* eslint-disable no-underscore-dangle */
import { News } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import INewsRepository from '../../repositories/model/INewsRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class ShowNewsService {
	constructor(
		@inject('NewsRepository')
		private newsRepository: INewsRepository,
	) {}

	public async execute({ id }: IRequest): Promise<News> {
		const news_ = await this.newsRepository.findById(id);
		if (!news_) {
			throw new AppError('Notícia não encontrada');
		}

		return news_;
	}
}

export default ShowNewsService;
