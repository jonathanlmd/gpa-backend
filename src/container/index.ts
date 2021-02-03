import { container } from 'tsyringe';
import SubstitutionRepository from '../repositories/implementations/Prisma/SubstitutionRepository';
import ISubstitutionRepository from '../repositories/model/ISubstitutionRepository';
import INewRepository from '../repositories/model/INewRepository';
import NewRepository from '../repositories/implementations/Prisma/NewRepository';
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
container.registerSingleton<INewRepository>('NewRepository', NewRepository);
container.registerSingleton<ISubstitutionRepository>(
	'SubstitutionRepository',
	SubstitutionRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
