import { dica as Tip } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import AppError from '../../errors/AppError';
import ITipRepository from '../../repositories/model/ITipRepository';

interface IRequest {
	id: number;
	conteudo: string;
	data: Date;
	nutricionista_id: number;
}

@injectable()
class UpdateTipService {
	constructor(
		@inject('TipRepository')
		private tipsRepository: ITipRepository,
	) {}

	public async execute({
		id,
		conteudo,
		data,
		nutricionista_id,
	}: IRequest): Promise<Tip> {
		const tip = await this.tipsRepository.findById(id);
		if (!tip) {
			throw new AppError('Tip not found');
		}

		if (!(id && conteudo && data && nutricionista_id)) {
			throw new AppError('All fields should be informed');
		}

		return this.tipsRepository.update({
			id,
			conteudo,
			data,
			nutricionista_id,
		});
	}
}

export default UpdateTipService;
