const Succeshandler = require("../Succeshandler/Succeshandler");
const User = require("../models/User");

exports.UpdateUserCoins = async (req, res) => {
  try {
    const {
      user: { _id },
      body: { increaseCoinsBy },
    } = req;
    const totalCoinsLeftPreviously = req.user.TotalCoinsLeft;
    const userToUpdateCoinsFor = await User.findByIdAndUpdate(
      _id,
      {
        TotalCoinsLeft: totalCoinsLeftPreviously + increaseCoinsBy,
      },
      { new: true }
    );
    return Succeshandler(
      200,
      res,
      { user: userToUpdateCoinsFor },
      `User coins updated succesfully`
    );
  } catch (e) {
    return Errorhandler(400, res, e.message);
  }
};

exports.DeductUserCoins = async (req, res) => {
  try {
    const {
      user: { _id },
      body: { spentCoins },
    } = req;
    const totalCoinsLeftPreviously = req.user.TotalCoinsLeft;
    const totalCoinsSpentPreviously = req.user.TotalCoinsSpent;
    const userToUpdateCoinsFor = await User.findByIdAndUpdate(
      _id,
      {
        TotalCoinsLeft: totalCoinsLeftPreviously - spentCoins,
        TotalCoinsSpent: totalCoinsSpentPreviously + spentCoins,
      },
      { new: true }
    );
    return Succeshandler(
      200,
      res,
      { user: userToUpdateCoinsFor },
      `User coins updated succesfully`
    );
  } catch (e) {
    return Errorhandler(400, res, e.message);
  }
};
