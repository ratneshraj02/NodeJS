import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
	{
        name: {
            type: String,
            trim: true,
            minLength: 2,
            maxLength: 50,
            required : [true, "Name is required"]
        },
        email: {
            type: String,
            trim: true,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        password : {
            type: String,
            trim: true,
            minLength: 8,
            maxLength: 50,
            select: false,
            required : [true, "Password is required"]
        },
        role: {
            type: String,
            enum: ["customer", "seller", "admin"],
            default : "customer"
        },
        isVerified: {
            type: Boolean,
            default: false,
            
        },
        verificationToken: {
            type : String, select : false,
        },
        refreshToken: {
            type: String, 
            select : false,
        },
		resetPasswordToken: {
            type: String,
            select : false,
        },
        resetPasswordExpires: {
            type: Date,
            select: false,
        }
	},
	{
		timestamps: true,
	},
);

//Hash password before saving
userSchema.pre("save", async function () {
    if (this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword){
    return await bcrypt.compare(userPassword, this.password);
}


export default mongoose.model('User', userSchema);
