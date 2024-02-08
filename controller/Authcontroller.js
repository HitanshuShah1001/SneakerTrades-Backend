const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const UserUtil = require("../Utils/User");
require("dotenv").config();

exports.Protect = async (req, res, next) => {
  console.log("here in protect", req.headers.authorization);
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(`Bearer`)
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      console.log(`Token is not found`);
    } else {
      const result = await promisify(jwt.verify)(token, process.env.SECRET);
      const LoggedInUser = await User.findById(result.id);
      if (!LoggedInUser) {
        console.log(`User not found`);
      } else {
        req.user = LoggedInUser;
        next();
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};

exports.Login = async (req, res) => {
  let { Phone } = req.body;
  const user = await User.findOne({ Phone });
  if (!user) {
    return console.log(`User not found`);
  }
  UserUtil.createToken(user, 201, res);
};
