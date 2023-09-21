import { NextFunction, Request, Response } from 'express';
import { User } from '../entities';
import { userRepository } from '../repositories';
import { AppError } from '../errors';

export async function verifyUserId(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const id = Number(request.params.id);

	const foundEntity: User | null = await userRepository.findOneBy({ id });
	if (!foundEntity) throw new AppError('User not found', 404);

	response.locals = { ...response.locals, foundEntity };

	return next();
}
