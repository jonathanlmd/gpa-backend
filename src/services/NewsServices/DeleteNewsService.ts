import { News } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import INewsRepository from '../../repositories/model/INewsRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class DeleteNewsService {
	constructor(
		@inject('NewsRepository')
		private newsRepository: INewsRepository,
	) {}

	public async execute({ id }: IRequest): Promise<News> {
		const isValidNews = await this.newsRepository.findById(id);
		if (!isValidNews) {
			throw new AppError('News not found');
		}
		return await this.newsRepository.delete(id);
	}
}

export default DeleteNewsService;
