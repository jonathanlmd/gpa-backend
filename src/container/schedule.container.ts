import { container } from 'tsyringe';
import IScheduleRepository from '../repositories/model/IScheduleRepository';
import ScheduleRepository from '../repositories/implementations/Prisma/ScheduleRepository';

container.registerSingleton<IScheduleRepository>(
	'ScheduleRepository',
	ScheduleRepository,
);
