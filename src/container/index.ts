import { container } from 'tsyringe';
import INutritionistRepository from '../repositories/model/INutritionistRepository';
import NutritionistRepository from '../repositories/implementations/Prisma/NutritionistRepository';
import IPatientRepository from '../repositories/model/IPatientRepository';
import PatientRepository from '../repositories/implementations/Prisma/PatientRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IPatientRepository>(
	'PatientRepository',
	PatientRepository,
);
container.registerSingleton<INutritionistRepository>(
	'NutritionistRepository',
	NutritionistRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
