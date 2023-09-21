import { z } from 'zod';
import { scheduleCreateSchema, scheduleCreateWithUserIdSchema } from '../schemas';

type ScheduleCreate = z.infer<typeof scheduleCreateSchema>;
type ScheduleCreateWithUserId = z.infer<typeof scheduleCreateWithUserIdSchema>;

export { ScheduleCreate, ScheduleCreateWithUserId };
