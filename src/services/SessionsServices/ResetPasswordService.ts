import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import { verify } from 'jsonwebtoken';
import auth from 'config/auth';
import AppError from '../../errors/AppError';
import IPatientRepository from '../../repositories/model/IPatientRepository';

import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

interface IRequest {
	token: string;
	password: string;
}

@injectable()
export default class ResetPasswordService {
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ token, password }: IRequest): Promise<void> {
		// const { secret } = auth.jwt;
		// const decodedToken = verify(token, secret);
		// console.log('decodedToken', decodedToken);
		// if (!decodedToken) {
		// 	throw new AppError('User token does not exist');
		// }
		// const patient = await this.patientRepository.findById(userToken.user_id);
		// if (!patient) {
		// 	throw new AppError('User does not exist');
		// }
		// const tokenCreatedAt = userToken.created_at;
		// if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
		// 	throw new AppError('Token expired');
		// }
		// patient.senha = await this.hashProvider.generateHash(password);
		// await this.patientRepository.update(patient);
	}
}
