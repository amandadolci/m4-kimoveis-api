import { NextFunction, Request, Response } from 'express';
import { RealEstate } from '../entities';
import { realEstateRepository } from '../repositories';
import { AppError } from '../errors';

export async function verifyRealEstateId(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	let id: number = 0;
	if (request.method === 'GET') id = Number(request.params.id);
	if (request.method === 'POST') id = Number(request.body.realEstateId);

	const foundEntity: RealEstate | null = await realEstateRepository.findOneBy({ id });
	if (!foundEntity) throw new AppError('RealEstate not found', 404);

	response.locals = { ...response.locals, foundEntity };

	return next();
}
