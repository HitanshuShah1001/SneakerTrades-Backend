const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  Phone: { type: String, required: true },
  Email: { type: String },
  ProfilePhoto: { type: String },
  UploadedSneakers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sneaker",
    },
  ],
  SneakersLent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sneaker",
    },
  ],
  SneakersSold: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sneaker",
    },
  ],
  SneakersToBeSold: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sneaker" }],
  SneakersToBeLent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sneaker" }],
  TotalCoinsLeft: { type: Number, default: 100 },
  TotalCoinsSpent: { type: Number, default: 0 },
  TotalSneakersUploaded: { type: Number, default: 0 },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
