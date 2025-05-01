import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DBconnector = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    }
};
 
export default DBconnector; 
