const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserUtil = require("../Utils/User");
const Errorhandler = require("../Errorhandler/Errorhandler");
const sendEmail = require("../Utils/SendEmail");
const GenerateOTP = require("../Utils/GenerateOtp");
const Succeshandler = require("../Succeshandler/Succeshandler");
const {
  INC_EMAIL_PASSWORD,
  OTP_SENT_SUCCESFULLY,
  NO_USER_FOUND,
} = require("../Constants/constants");
require("dotenv").config();

exports.Protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(`Bearer`)
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return Errorhandler(401, res, "No token found");
    } else {
      const result = await promisify(jwt.verify)(token, process.env.SECRET);
      const LoggedInUser = await User.findById(result.id);
      if (!LoggedInUser) {
        return Errorhandler(401, res, "No User found");
      } else {
        req.user = LoggedInUser;
        next();
      }
    }
  } catch (e) {
    return Errorhandler(401, res, e);
  }
};

exports.Login = async (req, res) => {
  let { Password, Email } = req.body;
  const user = await User.findOne({
    Email: { $regex: new RegExp("^" + Email + "$", "i") },
  }).select("+Password");
  if (!user || !(await user.correctPassword(Password, user.Password))) {
    return Errorhandler(401, res, INC_EMAIL_PASSWORD);
  }
  UserUtil.createToken(user, 201, res);
};

exports.emailService = async (req, res, next) => {
  const {
    body: { Email },
  } = req;
  const user = await User.findOne({
    Email: { $regex: new RegExp("^" + Email + "$", "i") },
  });
  if (!user) {
    return Errorhandler(404, res, NO_USER_FOUND);
  }
  const otp = GenerateOTP();
  await sendEmail({ Email, otp });
  return Succeshandler(201, res, { otp }, OTP_SENT_SUCCESFULLY);
};
