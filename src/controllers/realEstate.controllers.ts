import { Request, Response } from 'express';
import { RealEstateList } from '../interfaces';
import { realEstateServices } from '../services';
import { RealEstate } from '../entities';

async function create(request: Request, response: Response): Promise<Response> {
	const realEstate: RealEstate | null = await realEstateServices.create(request.body);
	return response.status(201).json(realEstate);
}

async function list(request: Request, response: Response): Promise<Response> {
	const realEstateList: RealEstateList = await realEstateServices.list();

	return response.status(200).json(realEstateList);
}

export default { create, list };
