const Sneaker = require("../models/Sneaker");
const User = require("../models/User");

exports.UnlockSneaker = async (req, res) => {
  try {
    const {
      user: { _id: userId },
    } = req;
    const userToUpdate = await User.findById(userId);
    if (userToUpdate.TotalCoinsLeft < 10) {
      console.log(`Insufficient balance`);
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
    console.log(e, `Error occured in Unlock Sneaker Api call`);
  }
};
