import mongoose from "mongoose";

const MONGO_URI = process.env.URI;

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://avinashsuthar19hmh:edbBpI5zV1IyCbhM@cluster0.a2qvp.mongodb.net/",
      {
        //@ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
