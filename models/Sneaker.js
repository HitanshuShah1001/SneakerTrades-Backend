const mongoose = require("mongoose");
const SneakerSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Brand: { type: String },
    Photos: { type: [String], required: true },
    Gender: {
      type: String,
      enum: [`Male`, `Female`, `Unisex`],
      required: true,
    },
    Type: { type: String, enum: [`lend`, `sell`, `both`], required: true },
    Size: { type: Number, required: true },
    To_Show: { type: Boolean, default: true },
    Owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    OwnerDetails: {
      type: Object,
      required: true,
    },
    Price: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Sneaker = mongoose.model("Sneaker", SneakerSchema);
module.exports = Sneaker;
