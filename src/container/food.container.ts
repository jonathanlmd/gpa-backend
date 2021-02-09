import { container } from 'tsyringe';
import SubstitutionRepository from '../repositories/implementations/Prisma/SubstitutionRepository';
import ISubstitutionRepository from '../repositories/model/ISubstitutionRepository';
import IFoodRepository from '../repositories/model/IFoodRepository';
import FoodRepository from '../repositories/implementations/Prisma/FoodRepository';

container.registerSingleton<IFoodRepository>('FoodRepository', FoodRepository);
container.registerSingleton<ISubstitutionRepository>(
	'SubstitutionRepository',
	SubstitutionRepository,
);
