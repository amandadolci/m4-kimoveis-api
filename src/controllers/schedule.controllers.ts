import { Request, Response } from 'express';
import { scheduleServices } from '../services';
import { RealEstate } from '../entities';
import { ScheduleCreateWithUserId } from '../interfaces';

async function create(request: Request, response: Response): Promise<Response> {
	const userId = Number(response.locals.decoded.sub);

	const payload: ScheduleCreateWithUserId = {
		...request.body,
		userId,
	};

	const schedule: object = await scheduleServices.create(payload);
	return response.status(201).json(schedule);
}

async function list(request: Request, response: Response): Promise<Response> {
	const realEstateId = request.params.id;
	const scheduleList: RealEstate | null = await scheduleServices.list(Number(realEstateId));

	return response.status(200).json(scheduleList);
}

export default { create, list };
