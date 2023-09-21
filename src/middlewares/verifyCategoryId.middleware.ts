import { NextFunction, Request, Response } from 'express';
import { Category } from '../entities';
import { categoryRepository } from '../repositories';
import { AppError } from '../errors';

export async function verifyCategoryId(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const id = Number(request.params.id);

	const foundEntity: Category | null = await categoryRepository.findOneBy({ id });
	if (!foundEntity) throw new AppError('Category not found', 404);

	response.locals = { ...response.locals, foundEntity };

	return next();
}
