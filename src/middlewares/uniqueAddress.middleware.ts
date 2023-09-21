import { NextFunction, Request, Response } from 'express';
import { Address } from '../entities';
import { addressRepository } from '../repositories';
import { AppError } from '../errors';
import { AddressCreate } from '../interfaces';

export async function uniqueAddress(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const address: AddressCreate = request.body.address;

	const foundEntity: Address | null = await addressRepository.findOne({
		where: {
			street: address.street,
			zipCode: address.zipCode,
			city: address.city,
			state: address.state,
		},
	});

	if (foundEntity && address.number === foundEntity.number)
		throw new AppError('Address already exists', 409);

	return next();
}
