import mongoose from "mongoose";

const connectDB = async () => {
    try{
        console.log("MONGO_URI:", process.env.MONGO_URI);
        // await mongoose.connect("mongodb://localhost:27017");
            await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected");
    } catch(error){
        console.error("DB Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;