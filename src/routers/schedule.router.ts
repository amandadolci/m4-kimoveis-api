import { Router } from 'express';
import middlewares from '../middlewares';
import { scheduleCreateSchema } from '../schemas';
import { scheduleControllers } from '../controllers';

const scheduleRouter: Router = Router();

scheduleRouter.use('', middlewares.verifyToken);

scheduleRouter.post(
	'',
	middlewares.validateBody(scheduleCreateSchema),
	middlewares.verifyRealEstateId,
	middlewares.validDateAndTime,
	middlewares.verifyFreeSchedule,
	scheduleControllers.create
);

scheduleRouter.get(
	'/realEstate/:id',
	middlewares.validateAdmin,
	middlewares.verifyRealEstateId,
	scheduleControllers.list
);

export default scheduleRouter;
