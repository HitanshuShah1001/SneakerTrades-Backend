const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");
const User = require("../models/User");

exports.UnlockSneakerRequestDetail = async (req, res) => {
  try {
    const {
      user: { _id: userId },
      params: { id: requestorId },
    } = req;
    const userToUpdate = await User.findById(userId);
    const userToSend = await User.findById(requestorId);
    if (userToUpdate.TotalCoinsLeft < 5) {
      return Errorhandler(403, res, `Insufficient balance`);
    }
    userToUpdate.TotalCoinsSpent += 5;
    userToUpdate.TotalCoinsLeft -= 5;
    await userToUpdate.save();
    Succeshandler(200, res, {
      user: userToSend,
    });
  } catch (e) {
    Errorhandler(500, res, e.message);
  }
};
