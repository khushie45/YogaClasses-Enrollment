import express, { response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import formModel from "./userSchema.js";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 8000;
dotenv.config();

const databaseUri = process.env.MONGODB_URI || "";
mongoose.connect(databaseUri);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CompletePayment = async () => {
  app.post("/paymentStatus", (req, res) => {
    const paymentStatus = req.body;
    res.json(paymentStatus);
  });
};

CompletePayment();

app.post("/submit-form", async (req, res) => {
  const { name, email, mobileNo, age, selectedBatch } = req.body;

  if (!name || !mobileNo || !age || !selectedBatch) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill out all fields." });
  }

  const ageNumber = parseInt(age, 10);
  if (isNaN(ageNumber) || ageNumber < 18 || ageNumber > 65) {
    return res
      .status(400)
      .json({ success: false, message: "Age must be between 18 and 65" });
  }

  const formData = new formModel({
    name,
    email,
    mobileNo,
    age,
    selectedBatch,
    enrollmentDate: new Date(),
  });

  try {
    await formData.save();

    return res.status(200).json({
      success: true,
      formData: formData,
      message: "Enrollment successful.",
    });
  } catch (error) {
    console.error("Error during enrollment:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
