import { injectable, inject } from 'tsyringe';
import path from 'path';
import { sign } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import authConfig from '../../config/auth';
import IMailProvider from '../../providers/MailProvider/models/IMailProvider';
import IPatientRepository from '../../repositories/model/IPatientRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

interface IRequest {
	email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
	constructor(
		@inject('UsersRepository')
		private patientsRepository: IPatientRepository,
		@inject('MailProvider')
		private mailProvider: IMailProvider,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ email }: IRequest): Promise<void> {
		const patient = await this.patientsRepository.findByEmail(email);
		if (!patient) {
			throw new AppError('Patient does not exists');
		}

		const hash = this.hashProvider.generateHash(
			JSON.stringify({
				created_at: new Date(),
				id: patient.id,
			}),
		);

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({ hash }, secret, {
			subject: patient.id.toString(),
			expiresIn,
		});

		const forgotPasswordTemplate = path.resolve(
			__dirname,
			'..',
			'..',
			'views',
			'forgot_password.hbs',
		);

		await this.mailProvider.sendMail({
			to: {
				name: patient.name,
				email: patient.email,
			},
			subject: '[GPA] Recuperação de senha',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: patient.name,
					link: `${process.env.WEB_APP_URL}/reset_password?token=${token}`,
				},
			},
		});
	}
}
