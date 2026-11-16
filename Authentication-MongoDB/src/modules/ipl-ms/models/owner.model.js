import mongoose, { Schema } from 'mongoose';

const ownerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minLength: 2,
			maxLength: 100,
		},
		company: {
			type: String,
			required: [true, 'company name is required'],
			trim: true,
			minLength: 2,
			maxLength: 100,
		},
	},

	{
		timestamps: true,
	},
);

export default mongoose.model('Owner', ownerSchema);
