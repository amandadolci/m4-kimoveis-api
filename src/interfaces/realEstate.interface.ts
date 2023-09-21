import { z } from 'zod';
import { RealEstate } from '../entities';
import { realEstateCreateSchema, realEstateCompleteSchema } from '../schemas';

type RealEstateCreate = z.infer<typeof realEstateCreateSchema>;
type RealEstateCompleteSchema = z.infer<typeof realEstateCompleteSchema>;
type RealEstateList = Array<RealEstate>;

export { RealEstateCreate, RealEstateCompleteSchema, RealEstateList };
