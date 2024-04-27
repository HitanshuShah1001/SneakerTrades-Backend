const express = require("express");
const AuthController = require("../controller/Authcontroller");
const UserSubscription = require("../CreateFactory/UserSubscriptionDetails");
const router = express.Router();

router.post(
  "/savesubscriptiondetails",
  AuthController.Protect,
  UserSubscription.SaveSubscriptionDetails
);

module.exports = router;
