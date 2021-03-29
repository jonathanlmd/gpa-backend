import { News } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import INewsRepository from '../../repositories/model/INewsRepository';

@injectable()
class GetNewsByMonthService {
	constructor(
		@inject('NewsRepository')
		private newsRepository: INewsRepository,
	) {}

	public async execute(month: number, year: number): Promise<News[]> {
		return (await this.newsRepository.getByMonthAndYear(month, year)) as News[];
	}
}

export default GetNewsByMonthService;
