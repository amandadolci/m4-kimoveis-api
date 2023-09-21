import { z } from 'zod';
import { addressCreateSchema, addressSchema, categorySchema } from './index';

const realEstateSchema = z.object({
	id: z.number().positive(),
	sold: z.boolean().default(() => false),
	value: z
		.string()
		.or(z.number().positive())
		.default(() => 0),
	size: z.number().positive().int(),
	createdAt: z.string().or(z.date()),
	updatedAt: z.string().or(z.date()),
});

const realEstateCreateSchema = realEstateSchema
	.pick({
		value: true,
		size: true,
	})
	.extend({ address: addressCreateSchema, categoryId: z.number() });

const realEstateCompleteSchema = realEstateSchema.extend({
	address: addressSchema,
	category: categorySchema,
});

export { realEstateSchema, realEstateCreateSchema, realEstateCompleteSchema };
