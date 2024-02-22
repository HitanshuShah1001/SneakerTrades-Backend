const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");
const User = require("../models/User");

exports.UnlockSneakerRequestDetail = async (req, res) => {
  try {
    const {
      user: { _id: userId },
    } = req;
    const userToUpdate = await User.findById(userId);
    if (userToUpdate.TotalCoinsLeft < 5) {
      return Errorhandler(403, res, `Insufficient balance`);
    }
    userToUpdate.TotalCoinsSpent += 5;
    userToUpdate.TotalCoinsLeft -= 5;
    await userToUpdate.save();
    Succeshandler(200, res, {
      data: userToUpdate,
    });
  } catch (e) {
    Errorhandler(500, res, e.message);
  }
};
