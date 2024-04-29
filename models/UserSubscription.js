const mongoose = require("mongoose");

const UserSubscriptionDetailsSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    razorpay_payment_id: { type: String, required: true },
    razorpay_order_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserSubscriptionDetails = mongoose.model(
  "UserSubscriptionDetails",
  UserSubscriptionDetailsSchema
);

module.exports = UserSubscriptionDetails;
