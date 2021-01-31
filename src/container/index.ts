import { container } from 'tsyringe';
import IFoodRepository from '../repositories/model/IFoodRepository';
import FoodRepository from '../repositories/implementations/Prisma/FoodRepository';
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
container.registerSingleton<IFoodRepository>('FoodRepository', FoodRepository);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
