import mongoose from "mongoose";

export async function connectDB(uri) {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri, { dbName: "task_manager" });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}
