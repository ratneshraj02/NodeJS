import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Team name is required'],
			trim: true,
			minLength: 2,
			maxLength: 100,
		},
		ownerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Owner',
			required: [true, 'Owner is required'],
		},
	},
	{ timestamps: true },
);

export default mongoose.model('Team', teamSchema);
