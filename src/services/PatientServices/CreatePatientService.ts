import { inject, injectable } from 'tsyringe';
import { Patient } from '@prisma/client';
import IPatientRepository from '../../repositories/model/IPatientRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import AppError from '../../errors/AppError';

@injectable()
class CreatePatientService {
	constructor(
		@inject('PatientRepository')
		private patientRepository: IPatientRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute(
		patient: Omit<Patient, 'id'>,
	): Promise<Omit<Patient, 'password'>> {
		const {
			access_authorization,
			district,
			zip,
			city_id,
			adjunct,
			cpf,
			birthday,
			email,
			street,
			name,
			number,
			password,
			phone,
		} = patient;

		if (
			!(
				access_authorization &&
				district &&
				zip &&
				city_id &&
				cpf &&
				birthday &&
				email &&
				street &&
				name &&
				number &&
				password &&
				phone
			)
		) {
			throw new AppError('Todos os campos obrigatórios devem ser preenchidos');
		}

		const existentUser = await this.patientRepository.findByEmail(email);
		if (existentUser) {
			throw new AppError('Email já está em uso');
		}

		const newPatient = await this.patientRepository.create({
			...patient,
			password: await this.hashProvider.generateHash(password),
		});

		const { password: _, ...patientWithoutPassword } = newPatient;

		return patientWithoutPassword;
	}
}

export default CreatePatientService;
