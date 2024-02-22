const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");
const Sneaker = require("../models/Sneaker");
const User = require("../models/User");

exports.UnlockSneaker = async (req, res) => {
  try {
    const {
      user: { _id: userId },
    } = req;
    const userToUpdate = await User.findById(userId);
    if (userToUpdate.TotalCoinsLeft < 10) {
      return Errorhandler(403, res, `Insufficient balance`);
    }
    userToUpdate.TotalCoinsSpent += 10;
    userToUpdate.TotalCoinsLeft -= 10;
    await userToUpdate.save();
    return Succeshandler(200, res, {
      data: userToUpdate,
    });
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};

exports.HideSneaker = async (req, res) => {
  try {
    const {
      params: { id: _id },
    } = req;
    const sneakerToHide = await Sneaker.findById({ _id });
    sneakerToHide.To_Show = false;
    await sneakerToHide.save();
    return Succeshandler(200, res);
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};
