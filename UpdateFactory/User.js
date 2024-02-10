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
    res.status(200).json({
      status: `Success`,
      message: `User coins updated succesfully`,
      user: userToUpdateCoinsFor,
    });
  } catch (e) {
    console.log(e, `Error occured in updating coins for the user`);
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
    res.status(200).json({
      status: `Success`,
      message: `User coins updated succesfully`,
      user: userToUpdateCoinsFor,
    });
  } catch (e) {
    console.log(e, `Error occured in updating coins for the user`);
  }
};
