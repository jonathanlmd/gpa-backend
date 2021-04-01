import { container } from 'tsyringe';
import IAnamnesisHasScheduleRepository from 'repositories/model/IAnamnesisHasScheduleRepository';
import IAnamnesisRepository from '../repositories/model/IAnamnesisRepository';
import AnamnesisRepository from '../repositories/implementations/Prisma/AnamnesisRepository';
import AnamnesisHasScheduleRepository from '../repositories/implementations/Prisma/AnamnesisHasScheduleRepository';

container.registerSingleton<IAnamnesisRepository>(
	'AnamnesisRepository',
	AnamnesisRepository,
);

container.registerSingleton<IAnamnesisHasScheduleRepository>(
	'AnamnesisHasScheduleRepository',
	AnamnesisHasScheduleRepository,
);
