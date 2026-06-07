import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    subject: {
      type: String,
      maxlength: 200,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Only need createdAt as per prompt schema
  }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
