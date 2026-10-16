import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
	},
	quantity: {
		type: Number,
		required: true,
	},
});


const orderSchema = mongoose.Schema(
	{
		orderPrice: {
			type: Number,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		status: {
			type: String,
			enum: ['PENDING', 'CANCELLED', 'DELIVERED'],
			default: 'PENDING',
		},
		orderItems: {
			type: [orderItemSchema],
		},
	},
	{ timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);