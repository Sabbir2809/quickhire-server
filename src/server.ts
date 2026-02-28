import { Server } from "http";
import app from "./app";
import config from "./config";
import { connectDatabase } from "./config/database";

let server: Server;

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception detected:", err);
  process.exit(1);
});

async function startServer() {
  try {
    await connectDatabase();

    server = app.listen(config.port, () => {
      console.log(`🔧 Environment: ${config.node_environment}`);
      console.log(`🚀 Server running on http://localhost:${config.port}`);
    });

    server.on("error", (err) => {
      console.error("❌ Server Error:", err);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
  if (server) {
    server.close(() => {
      console.log("Server closed due to unhandled rejection");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
