
import mongoose, { Schema } from "mongoose";

const sponsorSchema = new Schema({
    name: {
        type: String,
        trim : true,
        minLength: 2,
        maxLength: 100,
        required : [true, "Sponsor name is required"]
    }
}, { timestamps: true });

export default mongoose.model("Sponsor", sponsorSchema);