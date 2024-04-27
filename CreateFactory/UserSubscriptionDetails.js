const UserSubscriptionDetails = require("../models/UserSubscription");
const Errorhandler = require("../Errorhandler/Errorhandler");
const User = require("../models/User");
const Succeshandler = require("../Succeshandler/Succeshandler");

exports.SaveSubscriptionDetails = async (req, res) => {
  try {
    const {
      body,
      user: { _id },
    } = req;
    const [userToBeSwitchedToPremium, createUserSubscriptionRecord] =
      await Promise.all([
        User.findById({ _id }),
        UserSubscriptionDetails.create({ ...body }),
      ]);
    userToBeSwitchedToPremium.IsPremium = true;
    await userToBeSwitchedToPremium.save();
    return Succeshandler(
      201,
      res,
      createUserSubscriptionRecord,
      "You have subscribed succesfully"
    );
  } catch (e) {
    return Errorhandler(400, res, e);
  }
};
