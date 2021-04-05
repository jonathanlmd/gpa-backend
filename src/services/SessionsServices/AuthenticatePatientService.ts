import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { Patient } from '@prisma/client';
import authConfig from '../../config/auth';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import IPatientRepository from '../../repositories/model/IPatientRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {
	email: string;
	password: string;
}

interface IResponseDTO {
	user: Omit<Patient, 'password'>;
	token: string;
}

@injectable()
class AuthenticatePatientService {
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		email,
		password,
	}: IRequestDTO): Promise<IResponseDTO> {
		const patient = await this.patientRepository.findByEmail(email);

		if (!patient) {
			throw new AppError('Email/password incorretos.');
		}

		const passwordMatched = await this.hashProvider.compareHash(
			password,
			patient.password,
		);

		if (!passwordMatched) {
			throw new AppError('Email/password incorretos.');
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: patient.id.toString(),
			expiresIn,
		});

		const { password: _, ...patientWithoutPassword } = patient;
		return {
			user: patientWithoutPassword,
			token,
		};
	}
}

export default AuthenticatePatientService;
