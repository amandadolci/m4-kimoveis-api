import { NextFunction, Request, Response } from 'express';
import { Category } from '../entities';
import { categoryRepository } from '../repositories';
import { AppError } from '../errors';

export async function uniqueCategoryName(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const name: string = request.body.name;

	if (!name) {
		return next();
	}

	const foundEntity: Category | null = await categoryRepository.findOneBy({ name });
	if (foundEntity) throw new AppError('Category already exists', 409);

	return next();
}
