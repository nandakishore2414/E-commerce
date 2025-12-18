import mongoose from "mongoose";
//database creation
export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('connected');

    }
    catch (error) {
        console.log(error);

    }
}