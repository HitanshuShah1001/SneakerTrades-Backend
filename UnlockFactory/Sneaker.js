const Errorhandler = require("../Errorhandler/Errorhandler");
const Sneaker = require("../models/Sneaker");
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
    res.status(200).json({
      status: `Success`,
      data: userToUpdate,
    });
  } catch (e) {
    Errorhandler(400, res, e.message);
  }
};
