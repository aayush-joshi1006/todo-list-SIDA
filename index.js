import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

let app = express();

let PORT = process.env.PORT || 8000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
