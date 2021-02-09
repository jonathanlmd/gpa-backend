import { container } from 'tsyringe';
import NewsRepository from '../repositories/implementations/Prisma/NewsRepository';
import INewsRepository from '../repositories/model/INewsRepository';

container.registerSingleton<INewsRepository>('NewsRepository', NewsRepository);
