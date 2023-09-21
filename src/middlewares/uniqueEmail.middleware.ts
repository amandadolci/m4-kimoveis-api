import { NextFunction, Request, Response } from 'express';
import { User } from '../entities';
import { userRepository } from '../repositories';
import { AppError } from '../errors';

export async function uniqueEmail(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const email: string = request.body.email;

	if (!email) {
		return next();
	}

	const foundEntity: User | null = await userRepository.findOneBy({ email });
	if (foundEntity) throw new AppError('Email already exists', 409);

	return next();
}
