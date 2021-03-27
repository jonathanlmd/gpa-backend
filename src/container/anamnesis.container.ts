import { container } from 'tsyringe';
import IAnamnesisRepository from '../repositories/model/IAnamnesisRepository';
import AnamnesisRepository from '../repositories/implementations/Prisma/AnamnesisRepository';

container.registerSingleton<IAnamnesisRepository>(
	'AnamnesisRepository',
	AnamnesisRepository,
);
