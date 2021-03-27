import { container } from 'tsyringe';
import IAnthropometricDataRepository from '../repositories/model/IAnthropometricDataRepository';
import AnthropometricDataRepository from '../repositories/implementations/Prisma/AnthropometricDataRepository';

container.registerSingleton<IAnthropometricDataRepository>(
	'AnthropometricDataRepository',
	AnthropometricDataRepository,
);
