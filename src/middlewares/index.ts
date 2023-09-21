import { handleError } from './handleError.middleware';
import { validateBody } from './validateBody.middleware';
import { verifyToken } from './verifyToken.middleware';
import { verifyUserId } from './verifyUserId.middleware';
import { verifyCategoryId } from './verifyCategoryId.middleware';
import { verifyRealEstateId } from './verifyRealEstateId.middleware';
import { validateAdmin } from './validateAdmin.middleware';
import { isAdminOrOwner } from './isAdminOrOwner.middlewares';
import { uniqueEmail } from './uniqueEmail.middleware';
import { uniqueCategoryName } from './uniqueCategoryName.middleware';
import { uniqueAddress } from './uniqueAddress.middleware';
import { validDateAndTime } from './validDateAndTime.middleware';
import { verifyFreeSchedule } from './verifyFreeSchedule.middleware';

export default {
	handleError,
	validateBody,
	verifyUserId,
	verifyCategoryId,
	verifyRealEstateId,
	verifyToken,
	validateAdmin,
	isAdminOrOwner,
	uniqueEmail,
	uniqueCategoryName,
	uniqueAddress,
	validDateAndTime,
	verifyFreeSchedule,
};
