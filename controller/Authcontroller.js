const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserUtil = require("../Utils/User");
const Errorhandler = require("../Errorhandler/Errorhandler");
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
  console.log(req.body);
  let { Phone } = req.body;
  const user = await User.findOne({ Phone });
  if (!user) {
    return Errorhandler(401, res, "No User found");
  }
  UserUtil.createToken(user, 201, res);
};
