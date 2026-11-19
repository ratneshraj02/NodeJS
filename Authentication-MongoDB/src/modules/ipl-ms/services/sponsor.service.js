import Sponsor from '../models/sponsor.model.js';
import ApiError from '../../../common/utils/api-error.js';

const createSponsor = async ({ name }) => {
	const sponsor = await Sponsor.findOne({ name });

	if (sponsor) {
		throw ApiError.conflict('Sponsor already exist');
	}

	sponsor = await Sponsor.create({ name });
	return sponsor;
};

const getAllSponsor = async ({}) => {
	const sponsors = await Sponsor.find();

	if (sponsor.length <= 0) {
		throw ApiError.notfound('Sponsor not found');
	}

	return sponsors;
};

const getSponsorById = async ({ sponsorId }) => {
	const sponsor = await Sponsor.findById(sponsorId);

	if (!sponsor) {
		throw ApiError.notfound('Sponsor not found');
	}

	return sponsor;
};

const updateSponsor = async ({ sponsorId, name }) => {
	const sponsor = await Sponsor.findByIdAndUpdate(
		sponsorId,
		{ name },
		{ new: true, runValidators: true },
	);
};

const deleteSponsor = async ({ sponsorId }) => {
	const sponsor = await Sponsor.findByIdAndDelete(sponsorId);
	return sponsor;
};

export {
	createSponsor,
	getAllSponsor,
	getSponsorById,
	updateSponsor,
	deleteSponsor,
};
