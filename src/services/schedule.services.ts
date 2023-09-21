import { RealEstate, Schedule } from '../entities';
import { realEstateRepository, scheduleRepository } from '../repositories';
import { ScheduleCreateWithUserId } from '../interfaces';

async function create(payload: ScheduleCreateWithUserId): Promise<object> {
	const schedule: Schedule = scheduleRepository.create(payload);
	await scheduleRepository.save(schedule);

	return { message: 'Schedule created' };
}

async function list(realEstateId: number): Promise<RealEstate | null> {
	const realEstatesScheduleList: RealEstate | null = await realEstateRepository
		.createQueryBuilder('realEstate')
		.innerJoinAndSelect('realEstate.schedules', 'schedules')
		.innerJoinAndSelect('realEstate.address', 'addresses')
		.innerJoinAndSelect('realEstate.category', 'categories')
		.innerJoinAndSelect('schedules.user', 'user')
		.where('realEstate.id = :realEstateId', { realEstateId })
		.getOne();

	return realEstatesScheduleList;
}

export default { create, list };
