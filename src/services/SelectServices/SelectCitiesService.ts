import { City } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import ICityRepository from '../../repositories/model/ICityRepository';

interface IRequest {
	uf: string;
}

@injectable()
class SelectCitiesService {
	constructor(
		@inject('CityRepository')
		private CityRepository: ICityRepository,
	) {}

	public async execute({ uf }: IRequest): Promise<City[]> {
		return await this.CityRepository.findByUf(uf);
	}
}

export default SelectCitiesService;
