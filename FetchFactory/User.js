const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");
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

exports.GetUserById = async (req, res) => {
  try {
    const {
      params: { id: _id },
    } = req;
    const user = await User.findById({ _id });
    return Succeshandler(200, res, user);
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};

exports.CheckIfUserNameExists = async (req, res) => {
  try {
    const {
      body: { Username },
    } = req;
    // const userNameExistBefore = await User.findOne({ Username });
    const userNameExistBefore = await User.findOne({
      Username: { $regex: new RegExp(Username, "i") },
    });
    if (userNameExistBefore) {
      return Errorhandler(400, res, `UserName Already Exists!`);
    } else {
      return Succeshandler(200, res, undefined);
    }
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};
