import { inject, injectable } from 'tsyringe';
import { noticia as New } from '@prisma/client';
import INewRepository from '../../repositories/model/INewRepository';
import AppError from '../../errors/AppError';

@injectable()
class CreateNewService {
	constructor(
		@inject('NewRepository')
		private newRepository: INewRepository,
	) {}

	public async execute(new_: Omit<New, 'id'>): Promise<New> {
		const {
			titulo,
			link,
			descri__o,
			data,
			nutricionista_id,
			image_link,
		} = new_;
		console.log(new_);

		if (
			!(titulo && link && descri__o && data && nutricionista_id && image_link)
		) {
			throw new AppError('All fields should be informed');
		}

		return await this.newRepository.create({
			...new_,
		});
	}
}

export default CreateNewService;
