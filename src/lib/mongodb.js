import mongoose from "mongoose"
import "../../models/user";
import "../../models/question";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected");
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

export const connectMongoDBClose = async () => {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}

export default connectMongoDB;