import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
	CreateFoodService,
	UpdateFoodService,
	ShowFoodService,
	ListFoodService,
	DeleteFoodService,
} from '../services/FoodServices';

export default class FoodController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, measure, unity, calories, substitutions } = request.body;

		const createFoodService = await container.resolve(CreateFoodService);

		const food = await createFoodService.execute({
			nome: name,
			medida: measure,
			caloria: calories,
			unindade: unity,
			substitutions,
		});

		return response.json(food);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id, name, measure, unity, calories, substitutions } = request.body;

		const updateFoodService = await container.resolve(UpdateFoodService);

		const updatedFood = await updateFoodService.execute({
			id,
			unindade: unity,
			caloria: calories,
			medida: measure,
			nome: name,
			substitutions,
		});

		return response.json(updatedFood);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const showFoodService = await container.resolve(ShowFoodService);

		const showFood = await showFoodService.execute({
			id: parseInt(id, 10),
		});

		return response.json(showFood);
	}

	public async list(request: Request, response: Response): Promise<Response> {
		const listFoodService = await container.resolve(ListFoodService);

		const foods = await listFoodService.execute();

		return response.json(foods);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const deleteFoodService = await container.resolve(DeleteFoodService);

		const food = await deleteFoodService.execute({
			id: parseInt(id, 10),
		});

		return response.json(food);
	}
}
