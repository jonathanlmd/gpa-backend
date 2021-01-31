import { paciente as Patient } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import AppError from '../../errors/AppError';
import IPatientRepository from '../../repositories/model/IPatientRepository';

interface IRequest {
	id: number;
	email?: string;
	senha?: string;
	senha_antiga?: string;
	data_nascimento?: Date;
	autorizacao_de_acesso?: number;
	cpf?: string;
	numero?: number;
	nome?: string;
	bairro?: string;
	complemento?: string;
	logradouro?: string;
	cep?: number;
	cidades_id?: number;
	telefone?: string;
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
		nome,
		email,
		autorizacao_de_acesso,
		bairro,
		cep,
		cidades_id,
		complemento,
		cpf,
		data_nascimento,
		logradouro,
		numero,
		senha,
		senha_antiga,
		telefone,
	}: IRequest): Promise<Omit<Patient, 'senha'>> {
		const patient = await this.patientsRepository.findById(id);
		if (!patient) {
			throw new AppError('Patient not found');
		}

		if (email) {
			const patientWithUpdatedEmail = await this.patientsRepository.findByEmail(
				email,
			);

			if (patientWithUpdatedEmail && patientWithUpdatedEmail.id !== id) {
				throw new AppError('Email already in use');
			}
		}

		if (senha && !senha_antiga) {
			throw new AppError(
				'You need  to inform the old password to set a new password',
			);
		}

		let newPassword;

		if (senha && senha_antiga) {
			const checkOldPassword = await this.hashProvider.compareHash(
				senha_antiga,
				patient.senha,
			);

			if (!checkOldPassword) {
				throw new AppError('Old password does not match');
			}
			newPassword = await this.hashProvider.generateHash(senha);
		}

		return this.patientsRepository.update({
			id,
			nome,
			email,
			autorizacao_de_acesso,
			bairro,
			cep,
			cidades_id,
			complemento,
			cpf,
			data_nascimento,
			logradouro,
			numero,
			senha: newPassword,
			telefone,
		});
	}
}

export default UpdatePatientProfileService;
