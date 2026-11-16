import ApiError from '../../../common/utils/api-error.js';
import Owner from '../models/owner.model.js';

const createOwner = async ({ name, company }) => {
	const owner = await Owner.create({ name, company });
	return owner;
};

const getAllOwner = async () => {
	const owner = await Owner.find();
	return owner;
};

const getOwnerById = async ({ ownerId }) => {
	const owner = await Owner.findById(ownerId);

	if (!owner) {
		throw ApiError.notfound('Owner not found');
	}
	return owner;
};

const updateOwner = async ({ ownerId, name, company }) => {
	const owner = await Owner.findByIdAndUpdate(
		ownerId,
		{
			name,
			company,
		},
		{
			new: true,
			runValidators: true,
		},
	);

	if (!owner) {
		ApiError.notfound('Owner not found');
	}

	return owner;
};

const deleteOwner = async ({ ownerId }) => {
	const owner = await Owner.findByIdAndDelete(ownerId);

	if (!owner) {
		ApiError.notfound('Owner not found');
	}

	return owner;
};

export { createOwner, getAllOwner, getOwnerById, updateOwner, deleteOwner };
