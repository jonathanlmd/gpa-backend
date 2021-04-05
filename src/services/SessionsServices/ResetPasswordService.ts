import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import { verify } from 'jsonwebtoken';
import auth from '../../config/auth';
import AppError from '../../errors/AppError';
import IPatientRepository from '../../repositories/model/IPatientRepository';

import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

interface IRequest {
	token: string;
	password: string;
	confirmPassword: string;
}

@injectable()
export default class ResetPasswordService {
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		token,
		password,
		confirmPassword,
	}: IRequest): Promise<void> {
		if (password !== confirmPassword) {
			throw new AppError('Confirmação de senha não confere');
		}
		const { secret } = auth.jwt;
		const decodedToken = verify(token, secret);
		if (!decodedToken) {
			throw new AppError('Token inválido');
		}
		const userId = parseInt((decodedToken as any).sub, 10);

		const compare = await this.hashProvider.compareHash(
			JSON.stringify({
				id: userId,
			}),
			(decodedToken as any).hash,
		);
		if (!compare) {
			throw new AppError('Token inválido');
		}

		const patient = await this.patientRepository.findById(userId);
		if (!patient) {
			throw new AppError('Usuário não encontrado');
		}

		patient.password = await this.hashProvider.generateHash(password);
		await this.patientRepository.update(patient);
	}
}
