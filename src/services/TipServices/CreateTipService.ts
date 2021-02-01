import { inject, injectable } from 'tsyringe';
import { dica as Tip } from '@prisma/client';
import ITipRepository from '../../repositories/model/ITipRepository';
import AppError from '../../errors/AppError';

@injectable()
class CreateTipService {
	constructor(
		@inject('TipRepository')
		private tipRepository: ITipRepository,
	) {}

	public async execute(tip: Omit<Tip, 'id'>): Promise<Tip> {
		const { conteudo, data, nutricionista_id } = tip;

		if (!(conteudo && data && nutricionista_id)) {
			throw new AppError('All fields should be informed');
		}

		return await this.tipRepository.create({
			...tip,
		});
	}
}

export default CreateTipService;
