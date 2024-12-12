import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

import connectMongoDB from "./db/connectMongoDB.js";
dotenv.config();

const cors = require("cors");

app.use(
  cors({
    origin: "https://qianhao-fan-yue-yu-project3.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});
