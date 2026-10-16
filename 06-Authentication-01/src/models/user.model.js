import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			lowercase: true,
		},
		email: {
			type: String,
			unique: true,
        },
        password: {
            type: String,
            
        }
	},
	{
		timestamps: true,
	},
);

export const User = mongoose.model('User', userSchema);
