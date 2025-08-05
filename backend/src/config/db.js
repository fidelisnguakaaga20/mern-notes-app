import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // ✅ Uses the MONGO_URI from your Render environment variables
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    // ❌ Will log the full connection error
    console.error("Error connecting to MONGODB", error);

    // ❗ Exit the app if DB fails to connect
    process.exit(1);
  }
};
