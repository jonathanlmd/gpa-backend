import { News } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import INewsRepository from '../../repositories/model/INewsRepository';

@injectable()
class ListNewsService {
	constructor(
		@inject('NewsRepository')
		private newsRepository: INewsRepository,
	) {}

	public async execute(): Promise<News[]> {
		return (await this.newsRepository.getAll()) as News[];
	}
}

export default ListNewsService;
