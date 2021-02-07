import { Tip } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import ITipRepository from '../../repositories/model/ITipRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class ShowTipService {
	constructor(
		@inject('TipRepository')
		private tipRepository: ITipRepository,
	) {}

	public async execute({ id }: IRequest): Promise<Tip> {
		const tip = await this.tipRepository.findById(id);
		if (!tip) {
			throw new AppError('Tip not found');
		}

		return tip;
	}
}

export default ShowTipService;
