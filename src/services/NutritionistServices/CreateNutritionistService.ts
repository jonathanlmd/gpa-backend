import { inject, injectable } from 'tsyringe';
import { Nutritionist } from '@prisma/client';
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
	): Promise<Omit<Nutritionist, 'password'>> {
		const { crn, email, name, password } = nutritionist;

		if (!(crn && email && name && password)) {
			throw new AppError('Todos os campos devem ser informados');
		}

		const existentUser = await this.nutritionistRepository.findByEmail(email);
		if (existentUser) {
			throw new AppError('Email já está em uso');
		}

		const newNutritionist = await this.nutritionistRepository.create({
			...nutritionist,
			password: await this.hashProvider.generateHash(password),
		});

		const { password: _, ...nutritionistWithoutPassword } = newNutritionist;

		return nutritionistWithoutPassword;
	}
}

export default CreatePatientService;
