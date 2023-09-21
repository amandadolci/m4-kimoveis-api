import { Request, Response } from 'express';
import { CategoryCreate, CategoryList } from '../interfaces';
import { categoryServices } from '../services';
import { Category } from '../entities';

async function create(request: Request, response: Response): Promise<Response> {
	const category: CategoryCreate = await categoryServices.create(request.body);
	return response.status(201).json(category);
}

async function list(request: Request, response: Response): Promise<Response> {
	const categoryList: CategoryList = await categoryServices.list();

	return response.status(200).json(categoryList);
}

async function listRealEstates(request: Request, response: Response): Promise<Response> {
	const { id } = request.params;
	const realEstateList: Category | null = await categoryServices.listRealEstates(Number(id));

	return response.status(200).json(realEstateList);
}

export default { create, list, listRealEstates };
