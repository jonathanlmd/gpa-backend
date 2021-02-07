import { Tip } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import ITipRepository from '../../repositories/model/ITipRepository';

@injectable()
class ListTipService {
	constructor(
		@inject('TipRepository')
		private tipRepository: ITipRepository,
	) {}

	public async execute(): Promise<Tip[]> {
		return (await this.tipRepository.getAll()) as Tip[];
	}
}

export default ListTipService;
