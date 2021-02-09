import { container } from 'tsyringe';
import IMealHasFoodRepository from '../repositories/model/IMealHasFoodRepository';
import MealHasFoodRepository from '../repositories/implementations/Prisma/MealHasFoodRepository';
import MealRepository from '../repositories/implementations/Prisma/MealRepository';
import IMealRepository from '../repositories/model/IMealRepository';

container.registerSingleton<IMealHasFoodRepository>(
	'MealHasFoodRepository',
	MealHasFoodRepository,
);

container.registerSingleton<IMealRepository>('MealRepository', MealRepository);
