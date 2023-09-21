import { z } from 'zod';

const scheduleSchema = z.object({
	id: z.number().positive(),
	date: z.string().nonempty(),
	hour: z.string().nonempty(),
	realEstateId: z.number().positive(),
	userId: z.number().positive(),
});

const scheduleCreateSchema = scheduleSchema.omit({ id: true, userId: true });
const scheduleCreateWithUserIdSchema = scheduleSchema.omit({ id: true });

export { scheduleSchema, scheduleCreateSchema, scheduleCreateWithUserIdSchema };
