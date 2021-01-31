import { inject, injectable } from 'tsyringe';
import { paciente as Patient } from '@prisma/client';
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
	): Promise<Omit<Patient, 'senha'>> {
		const {
			autorizacao_de_acesso,
			bairro,
			cep,
			cidades_id,
			complemento,
			cpf,
			data_nascimento,
			email,
			logradouro,
			nome,
			numero,
			senha,
			telefone,
		} = patient;

		if (
			!(
				autorizacao_de_acesso &&
				bairro &&
				cep &&
				cidades_id &&
				complemento &&
				cpf &&
				data_nascimento &&
				email &&
				logradouro &&
				nome &&
				numero &&
				senha &&
				telefone
			)
		) {
			throw new AppError('All fields should be informed');
		}

		const existentUser = await this.patientRepository.findByEmail(email);
		if (existentUser) {
			throw new AppError('Email already in use');
		}

		const newPatient = await this.patientRepository.create({
			...patient,
			senha: await this.hashProvider.generateHash(senha),
		});

		const { senha: _, ...patientWithoutPassword } = newPatient;

		return patientWithoutPassword;
	}
}

export default CreatePatientService;
