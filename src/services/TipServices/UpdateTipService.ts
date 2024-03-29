import { Tip } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import AppError from '../../errors/AppError';
import ITipRepository from '../../repositories/model/ITipRepository';

interface IRequest {
	id: number;
	content: string;
	date: Date;
	nutritionist_id: number;
}

@injectable()
class UpdateTipService {
	constructor(
		@inject('TipRepository')
		private tipsRepository: ITipRepository,
	) {}

	public async execute({
		id,
		content,
		date,
		nutritionist_id,
	}: IRequest): Promise<Tip> {
		const tip = await this.tipsRepository.findById(id);
		if (!tip) {
			throw new AppError('Dica não encontrada');
		}

		if (!(id && content && date && nutritionist_id)) {
			throw new AppError('Todos os campos obrigatórios devem ser informados');
		}

		return this.tipsRepository.update({
			id,
			content,
			date,
			nutritionist_id,
		});
	}
}

export default UpdateTipService;
