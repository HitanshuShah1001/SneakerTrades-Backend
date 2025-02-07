const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Username: { type: String, required: true, unique: true },
    Phone: { type: String, required: true, unique: true },
    Email: { type: String, unique: true },
    Password: { type: String, required: true },
    ProfilePhoto: { type: String },
    Gender: {
      type: String,
      enum: [`Male`, `Female`, `Other`],
      required: true,
    },
    UploadedSneakers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sneaker",
      },
    ],
    SneakerRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SneakerRequest" },
    ],
    IsPremium: { type: Boolean, default: false },
    PremiumActivatedAt: { type: Date },
    TotalSneakersUploaded: { type: Number, default: 0 },
    TotalRequestsDone: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserSchema.methods.correctPassword = async (password, Userpasssword) => {
  return await bcrypt.compare(password, Userpasssword);
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
