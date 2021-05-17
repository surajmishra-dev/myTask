import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      maxLength: 32,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      maxLength: 32,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      maxLength: 32,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      maxLength: 32,
      trim: true,
      required: true,
    },
    hobbies: {
      type: Array,
      default: [],
    },
    phoneNumber: {
      type: Number,
      required: true,
      maxLength: 15,
      trim: true,
    },
    profilePicture: {
      data: Buffer,
      contentType: String,
    },
  },
  { timeStamps: true }
);

export default mongoose.model("User", userSchema);
