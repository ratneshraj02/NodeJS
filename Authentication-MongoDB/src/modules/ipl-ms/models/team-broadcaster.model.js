import mongoose, { Schema } from 'mongoose';

const teamBroadcaster = new Schema(
	{
		teamId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Team',
			required: [true, 'Team is required'],
		},
		broadcasterId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Broadcaster',
			required: [true, 'Broadcaster is required'],
		},
	},
	{ timestamps: true },
);

teamSponsorSchema.index({ teamId: 1, broadcasterId: 1 }, { unique: true });

export default mongoose.model('TeamBroadcaster', teamBroadcaster);
