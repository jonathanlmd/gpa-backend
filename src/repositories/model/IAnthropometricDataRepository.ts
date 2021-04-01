import { AnthropometricData } from '@prisma/client';

export default interface IAnthropometricDataRepository {
	create(
		anthropometricData: Omit<AnthropometricData, 'id'>,
	): Promise<AnthropometricData>;
	update(anthropometricData: AnthropometricData): Promise<AnthropometricData>;
	findBySchedule(scheduleId: number): Promise<AnthropometricData[]>;
	findById(id: number): Promise<AnthropometricData | null>;
}
