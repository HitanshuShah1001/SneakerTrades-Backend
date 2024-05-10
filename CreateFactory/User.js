require("util");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const UserUtil = require("../Utils/User");
const Errorhandler = require("../Errorhandler/Errorhandler");
require("dotenv").config();

exports.SignUp = async (req, res) => {
  try {
    let encryptedPassword = await bcrypt.hash(req.body.Password, 1);
    const image = {
      ProfilePhoto: req.file ? req.file.location : ``,
    };
    const data = { ...req.body, Password: encryptedPassword, ...image };
    const user = await User.create(data);
    UserUtil.createToken(user, 201, res);
  } catch (e) {
    if (e.code === 11000) {
      return Errorhandler(
        400,
        res,
        `${Object.keys(e.keyPattern)[0]} is duplicated`
      );
    }
    return Errorhandler(400, res, e);
  }
};
