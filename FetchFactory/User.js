const {
  STATUS_SUCCESS,
  NO_USER_FOUND,
  USERNAME_ALREADY_EXISTS,
  PHONE_ALREADY_EXISTS,
  EMAIL_ALREADY_EXISTS,
} = require("../Constants/constants");
const Errorhandler = require("../Errorhandler/Errorhandler");
const Succeshandler = require("../Succeshandler/Succeshandler");
const User = require("../models/User");

exports.GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      status: STATUS_SUCCESS,
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
        ? { status: STATUS_SUCCESS, user }
        : { status: STATUS_SUCCESS, user: null, message: NO_USER_FOUND };
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
        ? { status: STATUS_SUCCESS, user }
        : { status: STATUS_SUCCESS, user: null, message: NO_USER_FOUND };

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

exports.CheckIfUserNameEmailPhoneExists = async (req, res) => {
  try {
    const {
      body: { Username, Phone, Email },
    } = req;
    // const userNameExistBefore = await User.findOne({ Username });
    const [userNameExistBefore, phoneExistBefore, emailExistBefore] =
      await Promise.all([
        User.findOne({
          Username: { $regex: new RegExp(Username, "i") },
        }),
        User.findOne({
          Phone: { $regex: new RegExp(Phone, "i") },
        }),
        User.findOne({
          Email: { $regex: new RegExp(Email, "i") },
        }),
      ]);
    if (userNameExistBefore) {
      return Errorhandler(400, res, USERNAME_ALREADY_EXISTS);
    } else if (phoneExistBefore) {
      return Errorhandler(400, res, PHONE_ALREADY_EXISTS);
    } else if (emailExistBefore) {
      return Errorhandler(400, res, EMAIL_ALREADY_EXISTS);
    } else {
      return Succeshandler(200, res, undefined);
    }
  } catch (e) {
    return Errorhandler(500, res, e.message);
  }
};
