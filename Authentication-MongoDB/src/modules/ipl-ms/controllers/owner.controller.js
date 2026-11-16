import * as ownerService from '../services/owner.service.js';
import ApiError from '../../../common/utils/api-error.js';
import ApiResponse from '../../../common/utils/api-response.js';

const createOwner = async (req, res) => {
	const owner = ownerService.createOwner(req.body);
	ApiResponse.created(res, 'Owner created successfully', owner);
};

const getAllOwner = async (req, res) => {
    const allOwner = await ownerService.getAllOwner();
	ApiResponse.ok(res, 'Owners fetch successfully', allOwner);
};

const getOwnerById = async (req, res) => {
	const getOwner = ownerService.getOwnerById(req.params.id);
	ApiResponse.ok(res, 'Owner is fetched', getOwner);
};

const updateOwner = async (req, res) => {
	const updatedOwner = ownerService.updateOwner(req.params.id, req.body);
	ApiResponse.ok(res, 'Owner updated successfully', updatedOwner);
};

const deleteOwner = async (req, res) => {
	const deletedOwner = ownerService.deleteOwner(req.params.id);
	ApiResponse.ok(res, 'Owner deleted successfully', deletedOwner);
};

export { createOwner, getAllOwner, deleteOwner, getOwnerById, updateOwner };
