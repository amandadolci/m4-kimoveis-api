import { User } from '../entities';
import { userRepository } from '../repositories';
import { userListSchema, userReadSchema } from '../schemas';
import { UserCreate, UserRead, UserList, UserUpdate, UserLogin, LoginReturn } from '../interfaces';
import { compare } from 'bcryptjs';
import { AppError } from '../errors';
import { sign } from 'jsonwebtoken';

async function create(payload: UserCreate): Promise<UserRead> {
	const user: User = userRepository.create(payload);
	await userRepository.save(user);

	return userReadSchema.parse(user);
}

async function login({ email, password }: UserLogin): Promise<LoginReturn> {
	const foundUser: User | null = await userRepository.findOneBy({ email });

	if (!foundUser) {
		throw new AppError('Invalid credentials', 401);
	}

	const samePwd: boolean = await compare(password, foundUser.password);

	if (!samePwd) {
		throw new AppError('Invalid credentials', 401);
	}

	const token: string = sign({ admin: foundUser.admin }, process.env.SECRET_KEY!, {
		subject: foundUser.id.toString(),
		expiresIn: process.env.EXPIRES_IN!,
	});

	return { token };
}

async function list(): Promise<UserList> {
	return userListSchema.parse(await userRepository.find());
}

async function update(payload: UserUpdate, id: number): Promise<UserRead> {
	const user: User | null = await userRepository.findOne({
		where: {
			id,
		},
	});

	const updatedUser: User = userRepository.create({
		...user!,
		...payload,
	});

	await userRepository.save(updatedUser);

	return userReadSchema.parse(updatedUser);
}

async function destroy(user: User): Promise<void> {
	await userRepository.softRemove(user);
}

export default { create, login, list, update, destroy };
