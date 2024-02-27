const mongoose = require("mongoose");
const SneakerRequestSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Brand: { type: String, required: true },
  Photo: { type: String, required: true },
  Gender: { type: String, enum: [`Male`, `Female`, `Unisex`], required: true },
  Type: { type: String, enum: [`buy`, `rent`, `both`], required: true },
  Size: { type: Number, required: true },
  Description: { type: String },
  RequestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const SneakerRequest = mongoose.model("SneakerRequest", SneakerRequestSchema);
module.exports = SneakerRequest;
