const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");
const User = require("../models/User");

exports.UnlockSneaker = async (req, res) => {
  try {
    const {
      user: { _id: userId },
    } = req;
    const userToUpdate = await User.findById(userId);
    if (userToUpdate.TotalCoinsLeft < 10) {
      Errorhandler(400, res, `Insufficient balance`);
      return;
    }
    userToUpdate.TotalCoinsSpent += 10;
    userToUpdate.TotalCoinsLeft -= 10;
    await userToUpdate.save();
    Succeshandler(200, res, {
      data: userToUpdate,
    });
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};
