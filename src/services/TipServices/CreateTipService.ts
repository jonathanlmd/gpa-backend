import { inject, injectable } from 'tsyringe';
import { Tip } from '@prisma/client';
import ITipRepository from '../../repositories/model/ITipRepository';
import AppError from '../../errors/AppError';

@injectable()
class CreateTipService {
	constructor(
		@inject('TipRepository')
		private tipRepository: ITipRepository,
	) {}

	public async execute(tip: Omit<Tip, 'id'>): Promise<Tip> {
		const { content, date, nutritionist_id } = tip;

		if (!(content && date && nutritionist_id)) {
			throw new AppError('All fields should be informed');
		}

		return await this.tipRepository.create({
			...tip,
		});
	}
}

export default CreateTipService;
