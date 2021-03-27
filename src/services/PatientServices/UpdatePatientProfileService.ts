import { Patient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import AppError from '../../errors/AppError';
import IPatientRepository from '../../repositories/model/IPatientRepository';

interface IRequest {
	id: number;
	email?: string;
	password?: string;
	old_password?: string;
	birthday?: Date;
	access_authorization?: number;
	cpf?: string;
	number?: number;
	name?: string;
	district?: string;
	adjunct?: string;
	street?: string;
	zip?: number;
	city_id?: number;
	phone?: string;
}

@injectable()
class UpdatePatientProfileService {
	constructor(
		@inject('PatientRepository')
		private patientsRepository: IPatientRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		id,
		name,
		email,
		access_authorization,
		district,
		zip,
		city_id,
		adjunct,
		cpf,
		birthday,
		street,
		number,
		password,
		old_password,
		phone,
	}: IRequest): Promise<Omit<Patient, 'password'>> {
		const patient = await this.patientsRepository.findById(id);
		if (!patient) {
			throw new AppError('Paciente não encontrado');
		}

		if (email) {
			const patientWithUpdatedEmail = await this.patientsRepository.findByEmail(
				email,
			);

			if (patientWithUpdatedEmail && patientWithUpdatedEmail.id !== id) {
				throw new AppError('Email já está em uso');
			}
		}

		if (password && !old_password) {
			throw new AppError(
				'You need  to inform the old password to set a new password',
			);
		}

		let newPassword;

		if (password && old_password) {
			const checkOldPassword = await this.hashProvider.compareHash(
				old_password,
				patient.password,
			);

			if (!checkOldPassword) {
				throw new AppError('Old password does not match');
			}
			newPassword = await this.hashProvider.generateHash(password);
		}

		return this.patientsRepository.update({
			id,
			name,
			email,
			access_authorization,
			district,
			zip,
			city_id,
			adjunct,
			cpf,
			birthday,
			street,
			number,
			password: newPassword,
			phone,
		});
	}
}

export default UpdatePatientProfileService;
