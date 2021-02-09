import { container } from 'tsyringe';
import ITipRepository from '../repositories/model/ITipRepository';
import TipRepository from '../repositories/implementations/Prisma/TipRepository';

container.registerSingleton<ITipRepository>('TipRepository', TipRepository);
