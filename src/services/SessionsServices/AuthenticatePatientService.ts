import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { paciente as Patient } from '@prisma/client';
import authConfig from '../../config/auth';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import IPatientRepository from '../../repositories/model/IPatientRepository';

interface IRequestDTO {
	email: string;
	password: string;
}

interface IResponseDTO {
	user: Omit<Patient, 'senha'>;
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
			throw new Error('Incorrect email/password combination.');
		}

		const passwordMatched = await this.hashProvider.compareHash(
			password,
			patient.senha,
		);

		if (!passwordMatched) {
			throw new Error('Incorrect email/password combination');
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: patient.id.toString(),
			expiresIn,
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { senha, ...patientWithoutPassword } = patient;
		return {
			user: patientWithoutPassword,
			token,
		};
	}
}

export default AuthenticatePatientService;
