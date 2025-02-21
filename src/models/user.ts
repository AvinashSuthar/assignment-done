import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    rollNumber: { type: String, required: true, unique: true },
    numbers: { type: [Number], default: [] }, // Array of numbers
    alphabets: { type: [String], default: [] }, // Array of alphabets
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
