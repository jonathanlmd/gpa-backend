import { container } from 'tsyringe';
import INutritionistRepository from '../repositories/model/INutritionistRepository';
import NutritionistRepository from '../repositories/implementations/Prisma/NutritionistRepository';
import IPatientRepository from '../repositories/model/IPatientRepository';
import PatientRepository from '../repositories/implementations/Prisma/PatientRepository';

container.registerSingleton<IPatientRepository>(
	'PatientRepository',
	PatientRepository,
);
container.registerSingleton<INutritionistRepository>(
	'NutritionistRepository',
	NutritionistRepository,
);
