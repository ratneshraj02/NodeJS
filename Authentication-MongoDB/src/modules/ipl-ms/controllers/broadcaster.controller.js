import * as broadcasterService from '../services/broadcaster.service.js';
import ApiResponse from '../../../common/utils/api-response.js';

const createBroadcaster = async (req, res) => {
	const broadcaster = await broadcasterService.createBroadcaster(req.body);
	ApiResponse.created(res, 'Broadcaster created successfully', broadcaster);
};

const getAllBroadcaster = async (req, res) => {
	const broadcasters = await broadcasterService.getAllBroadcaster();
	ApiResponse.ok(res, 'Broadcasters fetch successfully', broadcasters);
};

const getBroadcasterById = async (req, res) => {
	const broadcaster = await broadcasterService.getBroadcasterById({
		broadcasterId: req.params.id,
	});
	ApiResponse.ok(res, 'Broadcaster is fetched', broadcaster);
};

const updateBroadcaster = async (req, res) => {
	const broadcaster = await broadcasterService.updateBroadcaster({
		broadcasterId: req.params.id,
		...req.body,
	});
	ApiResponse.ok(res, 'Broadcaster updated successfully', broadcaster);
};

const deleteBroadcaster = async (req, res) => {
	const broadcaster = await broadcasterService.deleteBroadcaster({
		broadcasterId: req.params.id,
	});
	ApiResponse.ok(res, 'Broadcaster deleted successfully', broadcaster);
};

export {
	createBroadcaster,
	getAllBroadcaster,
	getBroadcasterById,
	updateBroadcaster,
	deleteBroadcaster,
};
