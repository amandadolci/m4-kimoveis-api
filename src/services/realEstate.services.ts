import { Address, Category, RealEstate } from '../entities';
import { addressRepository, categoryRepository, realEstateRepository } from '../repositories';
import { AddressCreate, RealEstateCreate, RealEstateList } from '../interfaces';

async function create(payload: RealEstateCreate): Promise<RealEstate | null> {
	const category: Category = await categoryRepository.findOneByOrFail({
		id: payload.categoryId,
	});

	const addressBody: AddressCreate = payload.address;
	const address: Address = addressRepository.create(addressBody);
	await addressRepository.save(address);

	const partiallyCreatedPayload = {
		...payload,
		address,
		category,
	};

	const realEstate: RealEstate = realEstateRepository.create(partiallyCreatedPayload);
	await realEstateRepository.save(realEstate);
	const realEstateId = realEstate.id;

	const realEstateComplete: RealEstate | null = await realEstateRepository
		.createQueryBuilder('realEstate')
		.innerJoinAndSelect('realEstate.address', 'addresses')
		.innerJoinAndSelect('realEstate.category', 'categories')
		.where('realEstate.id = :realEstateId', {
			realEstateId,
		})
		.getOne();

	return realEstateComplete;
}

async function list(): Promise<RealEstateList> {
	const realEstateList: RealEstateList = await realEstateRepository
		.createQueryBuilder('realEstate')
		.innerJoinAndSelect('realEstate.address', 'addresses')
		.getMany();

	return realEstateList;
}

export default { create, list };
