import { Request, Response, NextFunction } from 'express';
import { Schedule } from '../entities';
import { scheduleRepository } from '../repositories';
import { AppError } from '../errors';

export async function verifyFreeSchedule(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const userId: number = response.locals.decoded.sub;
	const realEstateId: number = request.body.realEstateId;
	const date: Date | string = request.body.date;
	const hour: string = request.body.hour;

	const scheduleQueryBuilder = scheduleRepository.createQueryBuilder('schedules');

	const userSchedule: Schedule | null = await scheduleQueryBuilder
		.where('schedules.userId = :userId', { userId })
		.andWhere('schedules.date = :date', { date })
		.andWhere('schedules.hour = :hour', { hour })
		.getOne();

	const realEstateSchedule: Schedule | null = await scheduleQueryBuilder
		.where('schedules.realEstateId = :realEstateId', {
			realEstateId,
		})
		.andWhere('schedules.date = :date', { date })
		.andWhere('schedules.hour = :hour', { hour })
		.getOne();

	let message: string | null = null;

	if (userSchedule)
		message = 'User schedule to this real estate at this date and time already exists';
	else if (realEstateSchedule)
		message = 'Schedule to this real estate at this date and time already exists';

	if (message) throw new AppError(message, 409);

	return next();
}
