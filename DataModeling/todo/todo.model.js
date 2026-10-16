import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
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

		subTodos: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'SubTodoSchema',
			},
		], // Array of todos
	},
	{
		timestamps: true,
	},
);

export const Todo = mongoose.models('Todo', todoSchema);
