import { z } from 'zod';
import { userCreateSchema, userLoginSchema, userReadSchema } from '../schemas';
import { DeepPartial } from 'typeorm';

type UserCreate = z.infer<typeof userCreateSchema>;
type UserRead = z.infer<typeof userReadSchema>;
type UserUpdate = DeepPartial<UserCreate>;
type UserList = Array<UserRead>;
type UserLogin = z.infer<typeof userLoginSchema>;
type LoginReturn = {
	token: string;
};

export { UserCreate, UserRead, UserList, UserUpdate, UserLogin, LoginReturn };
