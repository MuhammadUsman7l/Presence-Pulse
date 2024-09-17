import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`
    );
    console.log(
      `\nMongoDB connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;
