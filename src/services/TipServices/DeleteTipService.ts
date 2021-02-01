import { dica as Tip } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import ITipRepository from '../../repositories/model/ITipRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class DeleteTipService {
	constructor(
		@inject('TipRepository')
		private tipRepository: ITipRepository,
	) {}

	public async execute({ id }: IRequest): Promise<Tip> {
		const isValidTip = await this.tipRepository.findById(id);
		if (!isValidTip) {
			throw new AppError('Tip not found');
		}
		return await this.tipRepository.delete(id);
	}
}

export default DeleteTipService;
