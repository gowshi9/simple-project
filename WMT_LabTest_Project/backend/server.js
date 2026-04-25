import express from "express";
import dotenv from "dotenv";
import dns from "dns";
import cors from "cors";
import mongoose from "mongoose";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();
dns.setDefaultResultOrder("ipv4first");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Item Manager API is running..." });
});

app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5000;

const connectWithRetry = () => {
  console.log("Attempting to connect to MongoDB Atlas...");
  mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Faster timeout for quicker feedback
    })
    .then(() => {
      console.log("✅ MongoDB connected successfully!");
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("❌ Database connection error:", error.message);
      if (error.message.includes("timeout")) {
        console.log("👉 TIP: This usually means your IP is NOT whitelisted in Atlas.");
        console.log("👉 Please go to Atlas -> Network Access -> Add IP Address (0.0.0.0/0).");
      }
      console.log("Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();