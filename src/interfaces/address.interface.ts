import { z } from 'zod';
import { addressCreateSchema } from '../schemas';

type AddressCreate = z.infer<typeof addressCreateSchema>;

export { AddressCreate };
