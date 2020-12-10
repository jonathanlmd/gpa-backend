import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';
// import { v4 as uuid } from 'uuid';

export default class PatientController {
	public async create(request: Request, response: Response): Promise<Response> {
		const {
			email,
			password,
			data_nascimento,
			autorizacao_de_acesso,
			cpf,
			numero,
			nome,
			bairro,
			complemento,
			logradouro,
			cep,
			cidades,
		} = request.body;

		try {
			const prismaClient = new PrismaClient();
			console.log('ok');

			const city = await prismaClient.cidades.findFirst({
				where: {
					id: 1,
				},
			});
			console.log(city);
			let patient;

			if (city) {
				patient = await prismaClient.paciente.create({
					data: {
						data_nascimento: new Date(),
						autorizacao_de_acesso: 1,
						cpf: '0981231',
						nome: 'Hugo Davi',
						numero: 300,
						bairro: 'asd',
						complemento: 'sda',
						logradouro: 'asdasd',
						cep: 123123,
						cidades: {
							connect: city,
						},
						email: 'teste@email.com',
						senha: await hash(password, 24),
					},
				});
			}

			console.log('ok b', patient);

			return response.json({ patient });
		} catch (err) {
			console.log(err);

			return response.json({ err });
		}
	}
}
