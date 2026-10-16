import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		productImage: {
			type: String,
		},
		price: {
			type: Number,
			default: 0,
		},
		stock: {
			type: Number,
			default: 0,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required : true,
		},
	},
	{ timestamp: true },
);

export const Product = mongoose.model('Product', productSchema);
