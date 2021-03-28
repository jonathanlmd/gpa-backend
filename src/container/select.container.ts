import { container } from 'tsyringe';
import ICityRepository from '../repositories/model/ICityRepository';
import CityRepository from '../repositories/implementations/Prisma/CityRepository';

container.registerSingleton<ICityRepository>('CityRepository', CityRepository);
