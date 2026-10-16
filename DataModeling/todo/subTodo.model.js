import mongoose from 'mongoose';

const subTodoSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		complete: {
			type: Boolean,
			default: false,
		},
		createBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamp: true,
	},
);

export const SubTodoSchema = mongoose.models('SubTodoSchema', subTodoSchema);
