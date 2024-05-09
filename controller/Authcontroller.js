const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserUtil = require("../Utils/User");
const Errorhandler = require("../Errorhandler/Errorhandler");
const sendEmail = require("../Utils/SendEmail");
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
  const user = await User.findOne({ Email }).select("+Password");
  if (!user || !(await user.correctPassword(Password, user.Password))) {
    return Errorhandler(401, res, "Incorrect Email or Password");
  }
  UserUtil.createToken(user, 201, res);
};

exports.emailService = async (req, res, next) => {
  const {
    body: { Email },
  } = req;
  await sendEmail({ Email, otp: 12121 });
  res.status(200).json({
    status: "Success",
  });
};
