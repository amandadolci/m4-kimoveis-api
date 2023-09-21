import { Request, Response } from 'express';
import { LoginReturn, UserList, UserRead } from '../interfaces';
import { userServices } from '../services';

async function create(request: Request, response: Response): Promise<Response> {
	const user: UserRead = await userServices.create(request.body);
	return response.status(201).json(user);
}

async function login(request: Request, response: Response): Promise<Response> {
	const token: LoginReturn = await userServices.login(request.body);
	return response.status(200).json(token);
}

async function list(request: Request, response: Response): Promise<Response> {
	const users: UserList = await userServices.list();

	return response.status(200).json(users);
}

async function update(request: Request, response: Response): Promise<Response> {
	const { id } = request.params;
	const user: UserRead = await userServices.update(request.body, Number(id));

	return response.status(200).json(user);
}

async function destroy(request: Request, response: Response): Promise<Response> {
	await userServices.destroy(response.locals.foundEntity);
	return response.status(204).json();
}

export default { create, login, list, update, destroy };
