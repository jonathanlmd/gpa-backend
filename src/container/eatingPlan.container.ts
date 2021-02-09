import { container } from 'tsyringe';
import IEatingPlanRepository from '../repositories/model/IEatingPlanRepository';
import EatingPlanRepository from '../repositories/implementations/Prisma/EatingPlanRepository';

container.registerSingleton<IEatingPlanRepository>(
	'EatingPlanRepository',
	EatingPlanRepository,
);
