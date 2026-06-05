import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
	name: String,
	email: String,
	password: String,
	phone: Number,
	role: String,

}, {
	versionKey: false
}
);

const User = mongoose.model('users', userSchema);

export default User;
