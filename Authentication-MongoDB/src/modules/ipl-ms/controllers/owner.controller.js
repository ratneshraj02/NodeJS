import * as ownerService from '../services/owner.service.js';
import ApiResponse from '../../../common/utils/api-response.js';

const createOwner = async (req, res) => {
	const owner = await ownerService.createOwner(req.body);
	ApiResponse.created(res, 'Owner created successfully', owner);
};

const getAllOwner = async (req, res) => {
    const allOwner = await ownerService.getAllOwner();
	ApiResponse.ok(res, 'Owners fetch successfully', allOwner);
};

const getOwnerById = async (req, res) => {
	const getOwner = await ownerService.getOwnerById({
		ownerId: req.params.id,
	});
	ApiResponse.ok(res, 'Owner is fetched', getOwner);
};

const updateOwner = async (req, res) => {
	const updatedOwner = await ownerService.updateOwner({
		ownerId: req.params.id,
		...req.body,
	});
	ApiResponse.ok(res, 'Owner updated successfully', updatedOwner);
};

const deleteOwner = async (req, res) => {
	const deletedOwner = await ownerService.deleteOwner({
		ownerId: req.params.id,
	});
	ApiResponse.ok(res, 'Owner deleted successfully', deletedOwner);
};

export { createOwner, getAllOwner, deleteOwner, getOwnerById, updateOwner };
