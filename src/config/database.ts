import mongoose from "mongoose";
import config from "./index";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database_url);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("🔥 MongoDB error:", err);
});
