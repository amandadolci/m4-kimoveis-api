import { z } from 'zod';
import { Category } from '../entities';
import { categoryCreateSchema } from '../schemas';

type CategoryCreate = z.infer<typeof categoryCreateSchema>;
type CategoryList = Array<Category>;

export { CategoryCreate, CategoryList };
