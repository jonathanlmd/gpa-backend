import { City } from '@prisma/client';

export default interface ITipRepository {
	findById(id: number): Promise<City | null>;
	findByUf(id: string): Promise<City[]>;
}
