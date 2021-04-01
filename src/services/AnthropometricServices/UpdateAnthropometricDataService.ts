import { inject, injectable } from 'tsyringe';
import { AnthropometricData } from '@prisma/client';
import IAnthropometricDataRepository from '../../repositories/model/IAnthropometricDataRepository';
import AppError from '../../errors/AppError';

@injectable()
class UpdatePatientService {
	constructor(
		@inject('AnthropometricDataRepository')
		private anthropometricRepository: IAnthropometricDataRepository,
	) {}

	public async execute(
		anthropometricData: AnthropometricData,
	): Promise<AnthropometricData> {
		const {
			arm_circumference,
			bicipital_skin_fold,
			bioimpedance,
			waist_circumference,
			height,
			metabolic_age,
			percentage_of_muscle_mass,
			sum_of_pleats,
			supra_iliac,
			suprascapular,
			tricipital_skin_fold,
			visceral_fat,
			weight,
			id,
		} = anthropometricData;

		if (
			!(
				arm_circumference &&
				bicipital_skin_fold &&
				bioimpedance &&
				waist_circumference &&
				height &&
				metabolic_age &&
				percentage_of_muscle_mass &&
				sum_of_pleats &&
				supra_iliac &&
				suprascapular &&
				tricipital_skin_fold &&
				visceral_fat &&
				weight &&
				id
			)
		) {
			throw new AppError(
				'Todos os campos dos dados antropométricos são obrigatórios',
			);
		}

		return await this.anthropometricRepository.update({
			arm_circumference,
			bicipital_skin_fold,
			bioimpedance,
			height,
			metabolic_age,
			percentage_of_muscle_mass,
			sum_of_pleats,
			supra_iliac,
			suprascapular,
			tricipital_skin_fold,
			visceral_fat,
			waist_circumference,
			weight,
			id,
		});
	}
}

export default UpdatePatientService;
