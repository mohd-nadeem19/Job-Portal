import mongoose from "mongoose";

const connectBD = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
            console.log("Mongoose connected successfully");
            
    } catch (error) {
        console.log(error);
        
    }
}

export default connectBD