import { Router } from 'express';
import middlewares from '../middlewares';
import { userCreateSchema, userUpdateSchema } from '../schemas';
import { userControllers } from '../controllers';

const userRouter: Router = Router();

userRouter.post(
	'',
	middlewares.validateBody(userCreateSchema),
	middlewares.uniqueEmail,
	userControllers.create
);

userRouter.use('', middlewares.verifyToken);
userRouter.use('/:id', middlewares.verifyUserId);

userRouter.patch(
	'/:id',
	middlewares.validateBody(userUpdateSchema),
	middlewares.isAdminOrOwner,
	middlewares.uniqueEmail,
	userControllers.update
);

userRouter.use('', middlewares.validateAdmin);

userRouter.get('', userControllers.list);
userRouter.delete('/:id', userControllers.destroy);

export default userRouter;
