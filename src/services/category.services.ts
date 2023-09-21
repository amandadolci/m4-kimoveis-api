import { Category } from '../entities';
import { categoryRepository } from '../repositories';
import { CategoryCreate, CategoryList } from '../interfaces';

async function create(payload: CategoryCreate): Promise<Category> {
	const category: Category = categoryRepository.create(payload);
	await categoryRepository.save(category);

	return category;
}

async function list(): Promise<CategoryList> {
	const categories: CategoryList | null = await categoryRepository.find();

	return categories;
}

async function listRealEstates(categoryId: number): Promise<Category | null> {
	const realEstateList: Category | null = await categoryRepository
		.createQueryBuilder('cat')
		.innerJoinAndSelect('cat.realEstate', 'realEstate')
		.where('cat.id = :categoryId', { categoryId })
		.getOne();

	return realEstateList;
}

export default { create, list, listRealEstates };
