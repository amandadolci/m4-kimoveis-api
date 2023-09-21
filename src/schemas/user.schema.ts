import { z } from 'zod';

const userSchema = z.object({
	id: z.number().positive(),
	name: z.string().max(45).nonempty(),
	email: z.string().email().max(45),
	password: z.string().max(120).nonempty(),
	admin: z.boolean().default(() => false),
	createdAt: z.string().or(z.date()),
	updatedAt: z.string().or(z.date()),
	deletedAt: z.string().or(z.date()).nullable(),
});

const userCreateSchema = userSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
});
const userUpdateSchema = userCreateSchema.omit({ admin: true }).partial();
const userReadSchema = userSchema.omit({ password: true });
const userListSchema = userReadSchema.array();
const userLoginSchema = userSchema.pick({ email: true, password: true });

export {
	userSchema,
	userCreateSchema,
	userUpdateSchema,
	userReadSchema,
	userListSchema,
	userLoginSchema,
};
