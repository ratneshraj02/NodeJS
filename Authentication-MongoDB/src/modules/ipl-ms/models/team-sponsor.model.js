import mongoose, { Schema } from 'mongoose';

const teamSponsorSchema = new Schema(
	{
		teamId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Team',
			required: [true, 'Team is required'],
		},
		sponsorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Sponsor',
			required: [true, 'Sponsor is required'],
		},
	},
	{ timestamps: true },
);

teamSponsorSchema.index({ teamId: 1, sponsorId: 1 }, { unique: true });

export default mongoose.model('TeamSponsor', teamSponsorSchema);
