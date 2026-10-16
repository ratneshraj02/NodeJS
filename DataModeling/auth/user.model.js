import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase : true,
    }
},
    {
        timestamps : true
    }
);

export const User = mongoose.models("User", userSchema);