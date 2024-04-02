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
    Category: { type: String, enum: ["casual", "non-casual"] },
    To_Show: { type: Boolean, default: true },
    Is_Bought: { type: Boolean, default: false },
    Is_Lent: { type: Boolean, default: false },
    Owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    OwnerDetails: {
      type: Object,
      required: true,
    },
    Price: {
      type: Number,
    },
    ChargePerDay: {
      type: Number,
    },
    OverdueCharge: {
      type: Number,
      required: function () {
        return ["lend", "both"].includes(this.Type);
      },
    },
    TransactionComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Sneaker = mongoose.model("Sneaker", SneakerSchema);
module.exports = Sneaker;
