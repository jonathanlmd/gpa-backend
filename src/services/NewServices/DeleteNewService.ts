import { noticia as New } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import INewRepository from '../../repositories/model/INewRepository';
import AppError from '../../errors/AppError';

interface IRequest {
	id: number;
}
@injectable()
class DeleteNewService {
	constructor(
		@inject('NewRepository')
		private newRepository: INewRepository,
	) {}

	public async execute({ id }: IRequest): Promise<New> {
		const isValidNew = await this.newRepository.findById(id);
		if (!isValidNew) {
			throw new AppError('New not found');
		}
		return await this.newRepository.delete(id);
	}
}

export default DeleteNewService;
