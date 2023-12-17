import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNo: Number,
  age: Number,
  selectedBatch: String,
  enrollmentDate: Date,
});

const formModel = mongoose.model("UserDetails", formSchema);

export default formModel;
