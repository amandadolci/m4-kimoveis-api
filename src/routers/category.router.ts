import { Router } from 'express';
import middlewares from '../middlewares';
import { categoryCreateSchema } from '../schemas';
import { categoryControllers } from '../controllers';

const categoryRouter: Router = Router();

categoryRouter.get('', categoryControllers.list);

categoryRouter.get(
	'/:id/realEstate',
	middlewares.verifyCategoryId,
	categoryControllers.listRealEstates
);

categoryRouter.post(
	'',
	middlewares.validateBody(categoryCreateSchema),
	middlewares.verifyToken,
	middlewares.validateAdmin,
	middlewares.uniqueCategoryName,
	categoryControllers.create
);

export default categoryRouter;
