import mongoose from "mongoose";
const connectDB = async () => {
    try {
      console.log("Connecting to MongoDB...");
      const conn = await mongoose.connect("mongodb://localhost:27017/practice", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        minPoolSize: 50,
        maxPoolSize: 100,
        dbName: "practice",
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(
        `MongoDB connection failed to establish, Reason: Error ${error.message}`
      );
    }
  };

export default connectDB;