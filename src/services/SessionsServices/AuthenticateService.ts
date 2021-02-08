import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { Nutritionist, Patient } from '@prisma/client';
import INutritionistRepository from '../../repositories/model/INutritionistRepository';
import authConfig from '../../config/auth';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import IPatientRepository from '../../repositories/model/IPatientRepository';

interface IRequestDTO {
	email: string;
	password: string;
}

interface IResponseDTO {
	user: Patient | Nutritionist;
	token: string;
	role: string;
}

@injectable()
class AuthenticatePatientService {
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository,
		@inject('NutritionistRepository')
		private nutritionistRepository: INutritionistRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		email,
		password,
	}: IRequestDTO): Promise<IResponseDTO> {
		let user:
			| Nutritionist
			| Patient
			| null = await this.nutritionistRepository.findByEmail(email);
		let role: string;

		if (!user) {
			user = await this.patientRepository.findByEmail(email);
			if (!user) {
				throw new Error('Incorrect email/password combination.');
			}
			role = 'patient';
		} else {
			role = 'nutritionist';
		}
		const passwordMatched = await this.hashProvider.compareHash(
			password,
			user.password,
		);

		if (!passwordMatched) {
			throw new Error('Incorrect email/password combination');
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: user.id.toString(),
			expiresIn,
		});

		return {
			user,
			token,
			role,
		};
	}
}

export default AuthenticatePatientService;