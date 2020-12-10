import { container } from 'tsyringe';
import { IPatientRepository } from '../repositories/model/IPatientRepository';
import PatientRepository from '../repositories/implementations/Prisma/PatientRepository';
import IHashProvider from '../provider/HashProvider/models/IHashProvider';
import BCryptHashProvider from '../provider/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IPatientRepository>(
	'PatientRepository',
	PatientRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
