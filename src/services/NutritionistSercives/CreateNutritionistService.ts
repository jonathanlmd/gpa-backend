import { inject, injectable } from 'tsyringe';
import { nutricionista as Nutritionist } from '@prisma/client';
import INutritionistRepository from '../../repositories/model/INutritionistRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import AppError from '../../errors/AppError';

@injectable()
class CreatePatientService {
	constructor(
		@inject('NutritionistRepository')
		private nutritionistRepository: INutritionistRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute(
		nutritionist: Omit<Nutritionist, 'id'>,
	): Promise<Omit<Nutritionist, 'senha'>> {
		const { crn, email, nome, senha } = nutritionist;

		if (!(crn && email && nome && senha)) {
			throw new AppError('All fields should be informed');
		}

		const existentUser = await this.nutritionistRepository.findByEmail(email);
		if (existentUser) {
			throw new AppError('Email already in use');
		}

		const newNutritionist = await this.nutritionistRepository.create({
			...nutritionist,
			senha: await this.hashProvider.generateHash(senha),
		});

		const { senha: _, ...nutritionistWithoutPassword } = newNutritionist;

		return nutritionistWithoutPassword;
	}
}

export default CreatePatientService;
