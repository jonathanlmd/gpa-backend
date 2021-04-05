import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { Nutritionist } from '@prisma/client';
import authConfig from '../../config/auth';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import INutritionistRepository from '../../repositories/model/INutritionistRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {
	email: string;
	password: string;
}

interface IResponseDTO {
	user: Omit<Nutritionist, 'password'>;
	token: string;
}

@injectable()
class AuthenticateNutritionistService {
	constructor(
		@inject('NutritionistRepository')
		private nutritionistRepository: INutritionistRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		email,
		password,
	}: IRequestDTO): Promise<IResponseDTO> {
		const nutritionist = await this.nutritionistRepository.findByEmail(email);

		if (!nutritionist) {
			throw new AppError('Email/password incorretos.');
		}

		const passwordMatched = await this.hashProvider.compareHash(
			password,
			nutritionist.password,
		);

		if (!passwordMatched) {
			throw new AppError('Email/password incorretos.');
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: nutritionist.id.toString(),
			expiresIn,
		});

		const { password: _, ...nutritionistWithoutPassword } = nutritionist;
		return {
			user: nutritionistWithoutPassword,
			token,
		};
	}
}

export default AuthenticateNutritionistService;
