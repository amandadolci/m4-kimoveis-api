import { Router } from 'express';
import middlewares from '../middlewares';
import { realEstateCreateSchema } from '../schemas';
import { realEstateControllers } from '../controllers';

const realEstateRouter: Router = Router();

realEstateRouter.post(
	'',
	middlewares.validateBody(realEstateCreateSchema),
	middlewares.verifyToken,
	middlewares.validateAdmin,
	middlewares.uniqueAddress,
	realEstateControllers.create
);

realEstateRouter.get('', realEstateControllers.list);

export default realEstateRouter;
