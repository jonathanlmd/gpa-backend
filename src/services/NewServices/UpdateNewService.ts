/* eslint-disable no-underscore-dangle */
import { noticia as New } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import AppError from '../../errors/AppError';
import INewRepository from '../../repositories/model/INewRepository';

interface IRequest {
	id: number;
	titulo?: string;
	link?: string;
	descri__o?: string;
	data?: Date;
	nutricionista_id?: number;
	image_link?: string;
}

@injectable()
class UpdateNewService {
	constructor(
		@inject('NewRepository')
		private newsRepository: INewRepository,
	) {}

	public async execute({
		id,
		descri__o,
		image_link,
		link,
		titulo,
		data,
		nutricionista_id,
	}: IRequest): Promise<New> {
		const new_ = await this.newsRepository.findById(id);
		if (!new_) {
			throw new AppError('New not found');
		}

		if (!(id && link && titulo && data && nutricionista_id)) {
			throw new AppError('All fields should be informed');
		}

		return this.newsRepository.update({
			id,
			descri__o,
			image_link,
			link,
			titulo,
			data,
			nutricionista_id,
		});
	}
}

export default UpdateNewService;
