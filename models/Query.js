const mongoose = require("mongoose");
const QuerySchema = new mongoose.Schema(
  {
    Subject: { type: String, required: true },
    Details: { type: String },
    RaisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Query = mongoose.model("Query", QuerySchema);
module.exports = Query;
