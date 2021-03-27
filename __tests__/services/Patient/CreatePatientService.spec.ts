import 'reflect-metadata';
import { Patient } from '@prisma/client';
import CreatePatientService from '../../src/services/CreatePatientService';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakePatientRepository from '../repositories/fakes/FakeUsersRepository';

describe('Create patient', () => {
	it('should be able to create a new patient', async () => {
		const patientFakeRepository = new FakePatientRepository();
		const hashFakeProvider = new FakeHashProvider();

		const createPatientService = new CreatePatientService(
			patientFakeRepository,
			hashFakeProvider,
		);

		const patient: Omit<Patient, 'id'> = {
			autorizacao_de_acesso: 1,
			bairro: 'Bairro da gloria',
			cep: 89456767,
			cpf: '098-345-345-22',
			cidades_id: 1,
			complemento: 'Casa',
			data_nascimento: new Date(),
			email: 'email@email.com',
			logradouro: 'R. das casas',
			nome: 'Fulano',
			numero: 100,
			senha: '1234',
			telefone: '4200000000',
		};

		const newPatient = await createPatientService.execute(patient);

		const { senha, ...patientWithoutPassword } = patient;
		expect(newPatient).toEqual(patientWithoutPassword);
	});
});
