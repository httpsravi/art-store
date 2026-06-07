import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 120,
      trim: true,
    },
    medium: {
      type: String,
      required: true,
      enum: ["charcoal", "paintings", "sketches"],
    },
    year: {
      type: Number,
      required: true,
      min: 1900,
      max: 2100,
    },
    dimensions: {
      type: String,
      required: true,
      maxlength: 60,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
      maxlength: 800,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Artwork = mongoose.model("Artwork", artworkSchema);

export default Artwork;
