/* eslint-disable no-underscore-dangle */
import { noticia as New } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import INewRepository from '../../repositories/model/INewRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class ShowNewService {
	constructor(
		@inject('NewRepository')
		private newRepository: INewRepository,
	) {}

	public async execute({ id }: IRequest): Promise<New> {
		const new_ = await this.newRepository.findById(id);
		if (!new_) {
			throw new AppError('New not found');
		}

		return new_;
	}
}

export default ShowNewService;
