import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowEatingPlanService from '../services/EatingPlanServices/ShowEatingPlanService';
import {
	CreateEatingPlanService,
	DeleteEatingPlanService,
	UpdateEatingPlanService,
} from '../services/EatingPlanServices';

export default class MealController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { guidelines } = request.body;

		const createEatingPlanService = await container.resolve(
			CreateEatingPlanService,
		);

		const meal = await createEatingPlanService.execute({
			guidelines,
		});

		return response.json(meal);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { guidelines, id } = request.body;

		const updateEatingPlanService = await container.resolve(
			UpdateEatingPlanService,
		);

		const updatedMeal = await updateEatingPlanService.execute({
			guidelines,
			id,
		});

		return response.json(updatedMeal);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const deleteEatingPlanService = await container.resolve(
			DeleteEatingPlanService,
		);

		const meal = await deleteEatingPlanService.execute({
			id: parseInt(id, 10),
		});

		return response.json(meal);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const showEatingPlanService = await container.resolve(
			ShowEatingPlanService,
		);

		const meal = await showEatingPlanService.execute({
			id: parseInt(id, 10),
		});

		return response.json(meal);
	}
}
