import { Router } from 'express';
import middlewares from '../middlewares';
import { userLoginSchema } from '../schemas';
import { userControllers } from '../controllers';

const loginRouter: Router = Router();

loginRouter.post('', middlewares.validateBody(userLoginSchema), userControllers.login);

export default loginRouter;
