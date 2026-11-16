import mongoose, { Schema } from "mongoose";

const broadcasterSchema = new Schema(
	{
		name: {
            type: String,
            trim : true,
			minLength: 2,
			maxLength: 100,
			required: [true, 'Broadcaster name is required'],
		},
	},
	{ timestamps: true },
);

export default mongoose.model('Broadcaster', broadcasterSchema);