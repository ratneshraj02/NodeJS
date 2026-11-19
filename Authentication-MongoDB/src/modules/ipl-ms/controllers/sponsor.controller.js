import * as sponsorService from '../services/sponsor.service.js';
import ApiResponse from '../../../common/utils/api-response.js';

const createSponsor = async (req, res) => {
	const sponsor = await sponsorService.createSponsor(req.body);
	ApiResponse.created(res, 'Sponsor created successfully', sponsor);
};

const getAllSponsor = async (req, res) => {
	const sponsors = await sponsorService.getAllSponsor();
	ApiResponse.ok(res, 'Sponsors fetch successfully', sponsors);
};

const getSponsorById = async (req, res) => {
	const sponsor = await sponsorService.getSponsorById({
		sponsorId: req.params.id,
	});
	ApiResponse.ok(res, 'Sponsor is fetched', sponsor);
};

const updateSponsor = async (req, res) => {
	const sponsor = await sponsorService.updateSponsor({
		sponsorId: req.params.id,
		...req.body,
	});
	ApiResponse.ok(res, 'Sponsor updated successfully', sponsor);
};

const deleteSponsor = async (req, res) => {
	const sponsor = await sponsorService.deleteSponsor({
		sponsorId: req.params.id,
	});
	ApiResponse.ok(res, 'Sponsor deleted successfully', sponsor);
};

export {
	createSponsor,
	getAllSponsor,
	getSponsorById,
	updateSponsor,
	deleteSponsor,
};
