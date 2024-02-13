const Errorhandler = require("../Errorhandler/Errorhandler");
const User = require("../models/User");

exports.GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      status: `Success`,
      users,
      count: users.length,
    });
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};

exports.GetIndividualUser = async (req, res) => {
  try {
    const { phone: Phone } = req.body;
    const user = await User.find({ Phone });
    const userobj =
      user.length > 0
        ? { status: `Success`, user }
        : { status: `Success`, user: null, message: `User not found!` };
    return res.status(200).json({
      status: `Success`,
      ...userobj,
    });
  } catch (e) {
    Errorhandler(500, res, e.message);
  }
};
exports.GetIndividualUserByEmail = async (req, res) => {
  try {
    const { email: Email } = req.body;
    const user = await User.find({ Email });
    const userobj =
      user.length > 0
        ? { status: `Success`, user }
        : { status: `Success`, user: null, message: `User not found!` };

    return Succeshandler(200, res, {
      user: userobj,
    });
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};

exports.FetchTotalUserCoins = async (req, res) => {
  try {
    const {
      user: { _id },
    } = req;
    const userToGetCoinsFor = await User.findById({ _id });
    const userCoins = userToGetCoinsFor.TotalCoinsLeft;
    const userCoinsSpent = userToGetCoinsFor.TotalCoinsSpent;
    return Succeshandler(200, res, {
      totalCoinsLeft: userCoins,
      totalCoinsSpent: userCoinsSpent,
    });
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};
