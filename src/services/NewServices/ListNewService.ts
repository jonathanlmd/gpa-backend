import { noticia as New } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import INewRepository from '../../repositories/model/INewRepository';

@injectable()
class ListNewService {
	constructor(
		@inject('NewRepository')
		private newRepository: INewRepository,
	) {}

	public async execute(): Promise<New[]> {
		return (await this.newRepository.getAll()) as New[];
	}
}

export default ListNewService;
