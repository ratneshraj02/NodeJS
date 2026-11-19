import ApiError from '../../../common/utils/api-error.js';
import Broadcaster from '../models/broadcaster.model.js';

const createBroadcaster = async ({ name }) => {
	const already = await Broadcaster.findOne({ name });

	if (already) {
		throw ApiError.conflict(`${already.name} already exist`);
	}

	const broadcaster = await Broadcaster.create({ name });
	return broadcaster;
};

const getAllBroadcaster = async () => {
	const broadcasters = await Broadcaster.find();
	return broadcasters;
};

const getBroadcasterById = async ({ broadcasterId }) => {
	const broadcaster = await Broadcaster.findById(broadcasterId);

	if (!broadcaster) {
		throw ApiError.notfound('Broadcaster not found');
	}
	return broadcaster;
};

const updateBroadcaster = async ({ broadcasterId, name }) => {
	const broadcaster = await Broadcaster.findByIdAndUpdate(
		broadcasterId,
		{ name },
		{
			new: true,
			runValidators: true,
		},
	);

	if (!broadcaster) {
		throw ApiError.notfound('Broadcaster not found');
	}

	return broadcaster;
};

const deleteBroadcaster = async ({ broadcasterId }) => {
	const broadcaster = await Broadcaster.findByIdAndDelete(broadcasterId);

	if (!broadcaster) {
		throw ApiError.notfound('Broadcaster not found');
	}

	return broadcaster;
};

export {
	createBroadcaster,
	getAllBroadcaster,
	getBroadcasterById,
	updateBroadcaster,
	deleteBroadcaster,
};
