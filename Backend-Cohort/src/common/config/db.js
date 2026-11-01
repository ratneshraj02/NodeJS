import mongoose from "mongoose";

const connectDB = async () => {
    const dbUrl = process.env.MONGODB_URL;
    const connection = await mongoose.connect(dbUrl);
    console.log(connection.connection.host);
}

export default connectDB;