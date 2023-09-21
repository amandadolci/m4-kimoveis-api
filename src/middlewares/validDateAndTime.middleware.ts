import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

export function validDateAndTime(request: Request, response: Response, next: NextFunction): void {
	const date = new Date(request.body.date);
	const weekDay = date.getDay();

	const hoursMinutes: string = request.body.hour;
	const hour = Number(hoursMinutes.substring(0, 2));

	let message: string | null = null;

	if (weekDay === 0 || weekDay === 6) message = 'Invalid date, work days are monday to friday';
	else if (hour < 8 || hour > 18) message = 'Invalid hour, available times are 8AM to 18PM';

	if (message) throw new AppError(message, 400);

	return next();
}
