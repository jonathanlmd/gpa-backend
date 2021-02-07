import { container } from 'tsyringe';
import SubstitutionRepository from '../repositories/implementations/Prisma/SubstitutionRepository';
import ISubstitutionRepository from '../repositories/model/ISubstitutionRepository';
import NewsRepository from '../repositories/implementations/Prisma/NewsRepository';
import IFoodRepository from '../repositories/model/IFoodRepository';
import FoodRepository from '../repositories/implementations/Prisma/FoodRepository';
import INutritionistRepository from '../repositories/model/INutritionistRepository';
import NutritionistRepository from '../repositories/implementations/Prisma/NutritionistRepository';
import IPatientRepository from '../repositories/model/IPatientRepository';
import PatientRepository from '../repositories/implementations/Prisma/PatientRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';
import ITipRepository from '../repositories/model/ITipRepository';
import TipRepository from '../repositories/implementations/Prisma/TipRepository';
import INewsRepository from '../repositories/model/INewsRepository';

container.registerSingleton<IPatientRepository>(
	'PatientRepository',
	PatientRepository,
);
container.registerSingleton<INutritionistRepository>(
	'NutritionistRepository',
	NutritionistRepository,
);
container.registerSingleton<IFoodRepository>('FoodRepository', FoodRepository);
container.registerSingleton<ITipRepository>('TipRepository', TipRepository);
container.registerSingleton<INewsRepository>('NewsRepository', NewsRepository);
container.registerSingleton<ISubstitutionRepository>(
	'SubstitutionRepository',
	SubstitutionRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
